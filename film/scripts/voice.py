"""Voices the narration one line at a time and writes narr.wav, narr.txt and cues.json with exact boundaries.

Usage (from the build folder):
  python voice.py                       voice every "Host: " line with the saved voice profile
  python voice.py --setup               download the Kokoro model once (~350 MB) into <home>/kokoro
  python voice.py --audition [--voices af_heart,am_michael,...] [--text "..."]
                                        the same sample in several voices -> audition/<voice>.wav, to pick one
  python voice.py --use af_heart [--speed 0.95]
                                        save the voice profile (<home>/voice.json); every film after uses it
  python voice.py --listen              transcribe each voiced line offline (faster-whisper) and flag words that
                                        didn't come out as written
  python voice.py --engine azure|sapi|say|kokoro   override the profile for one run

Engines:
- kokoro (default): Kokoro-82M, open weights (Apache-2.0), fully offline, deterministic (same text and settings,
  same audio).  Needs `pip install kokoro-onnx soundfile` and the model (--setup).
- azure: Azure AI Speech neural voice (SPEECH_KEY + SPEECH_REGION).  For Copilot Cowork on Windows, where packages
  can't be installed.
- sapi (Windows) / say (macOS, only when running on the Mac itself, not in Cowork's sandbox): scratch tracks for
  timing drafts only; never deliver them.

Pronunciation: every line goes through speech.py first (numbers and abbreviations written for the ear, then the
lexicon: shared, yours in <home>, and this film's lexicon.json).  Words no list covers are printed as "check".

<home> is film.json "home" (new_film.py sets it to <workspace>/.tredence when it finds one), else $TREDENCE_HOME,
else ~/.tredence.  In Claude Cowork, keep it in the workspace folder so the model and profile survive sessions.

Each line is cached in voice/ by engine, voice, speed and spoken text, so after editing one line only that line is
re-voiced.  Lines are trimmed of edge silence, levelled to the same loudness and joined with narration.gap_s.
When the narration was voiced in one take elsewhere (a studio recording), skip this script: save the audio and its
"Host: " transcript as narration.audio / narration.transcript and run align.py.
"""
import argparse
import difflib
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import wave
from pathlib import Path
from xml.sax.saxutils import escape

import numpy as np

from filmcfg import load
import speech

SR = 48000
KOKORO_FILES = {
    "kokoro-v1.0.onnx": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx",
    "voices-v1.0.bin": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin",
}
AUDITION_VOICES = ["af_heart", "am_michael", "am_fenrir", "bf_emma", "bm_george", "af_bella"]
DEFAULT_PROFILE = {"engine": "kokoro", "name": "af_heart", "speed": 1.0, "lang": "en-us"}


# ---------- where things live ----------
def home_dir(cfg):
    h = cfg.get("home") or os.environ.get("TREDENCE_HOME") or str(Path.home() / ".tredence")
    p = Path(h).expanduser(); p.mkdir(parents=True, exist_ok=True)
    return p


def profile(cfg, home):
    """film.json "voice" wins over the saved profile, which wins over the defaults."""
    p = dict(DEFAULT_PROFILE)
    f = home / "voice.json"
    if f.exists():
        p.update(json.load(open(f, encoding="utf-8")))
    p.update({k: v for k, v in (cfg.get("voice") or {}).items() if v not in ("", None)})
    return p


# ---------- engines ----------
_kokoro = None


def kokoro_model(home):
    global _kokoro
    if _kokoro:
        return _kokoro
    try:
        from kokoro_onnx import Kokoro
    except ImportError:
        raise SystemExit("Kokoro isn't installed: pip install kokoro-onnx soundfile   (then python voice.py --setup)")
    d = home / "kokoro"
    missing = [f for f in KOKORO_FILES if not (d / f).exists()]
    if missing:
        raise SystemExit(f"Kokoro model not found in {d}: run  python voice.py --setup")
    _kokoro = Kokoro(str(d / "kokoro-v1.0.onnx"), str(d / "voices-v1.0.bin"))
    return _kokoro


def kokoro_voice(k, name):
    """'am_michael' or a blend 'am_michael:0.7,am_fenrir:0.3'."""
    if "," not in name and ":" not in name:
        return name
    parts = [(p.split(":")[0].strip(), float(p.split(":")[1]) if ":" in p else 1.0) for p in name.split(",")]
    tot = sum(w for _, w in parts)
    return sum(k.get_voice_style(v) * (w / tot) for v, w in parts).astype(np.float32)


def kokoro_phonemes(k, text, ipa, lang):
    out = []
    for is_ipa, chunk in speech.split_ipa(text, ipa):
        if is_ipa:
            out.append(chunk)
        elif chunk.strip():
            ph = k.tokenizer.phonemize(chunk, lang)
            # keep the space at a chunk edge so "at /Woodgrove/ Bank" doesn't run together
            out.append((" " if chunk[:1].isspace() else "") + ph.strip() + (" " if chunk[-1:].isspace() else ""))
    return re.sub(r"\s{2,}", " ", "".join(out)).strip()


def kokoro(text, P, ipa, home, dest):
    k = kokoro_model(home)
    ph = kokoro_phonemes(k, text, ipa, P.get("lang", "en-us"))
    a, sr = k.create(ph, voice=kokoro_voice(k, P["name"]), speed=float(P.get("speed", 1.0)),
                     lang=P.get("lang", "en-us"), is_phonemes=True)
    write_wav(dest, resample(np.asarray(a, dtype=np.float32) * 32767, sr))


def azure(text, P, dest):
    key = os.environ.get("SPEECH_KEY") or os.environ.get("AZURE_SPEECH_KEY")
    region = os.environ.get("SPEECH_REGION") or os.environ.get("AZURE_SPEECH_REGION")
    url = os.environ.get("SPEECH_ENDPOINT") or (region and f"https://{region}.tts.speech.microsoft.com/cognitiveservices/v1")
    if not (key and url):
        raise SystemExit("Azure AI Speech needs SPEECH_KEY and SPEECH_REGION (or SPEECH_ENDPOINT).")
    voice = P.get("azure_name") or (P["name"] if "Neural" in P["name"] else "en-US-AndrewNeural")
    lang = "-".join(voice.split("-")[:2])
    rate = P.get("rate") or f"{round((float(P.get('speed', 1.0)) - 1) * 100):+d}%"
    ssml = (f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='{lang}'>"
            f"<voice name='{voice}'><prosody rate='{rate}'>{escape(text)}</prosody></voice></speak>")
    req = urllib.request.Request(url, data=ssml.encode("utf-8"), method="POST", headers={
        "Ocp-Apim-Subscription-Key": key, "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "riff-48khz-16bit-mono-pcm", "User-Agent": "prototype-film-tredence"})
    with urllib.request.urlopen(req, timeout=60) as r:
        open(dest, "wb").write(r.read())


def sapi(text, P, dest):
    if sys.platform != "win32":
        raise SystemExit("the sapi engine is Windows only")
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as f:
        f.write(text); src = f.name
    ps = ("Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; "
          f"$s.Rate = {int(P.get('sapi_rate', 0))}; "
          "$fmt = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(48000, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono); "
          f"$s.SetOutputToWaveFile('{dest}', $fmt); $s.Speak([IO.File]::ReadAllText('{src}')); $s.Dispose()")
    try:
        subprocess.run(["powershell", "-NoProfile", "-Command", ps], check=True, capture_output=True)
    finally:
        os.unlink(src)


def say(text, P, dest):
    if sys.platform != "darwin" or not shutil.which("say"):
        raise SystemExit("the say engine needs macOS itself (it can't run inside Cowork's sandbox)")
    v = P.get("say_name") or "Ava (Premium)"
    subprocess.run(["say", "-v", v, "-o", dest, "--file-format=WAVE", "--data-format=LEI16@48000", text], check=True)


# ---------- audio helpers ----------
def resample(a, sr):
    if sr == SR:
        return a
    return np.interp(np.linspace(0, len(a) - 1, int(len(a) * SR / sr)), np.arange(len(a)), a).astype(np.float32)


def write_wav(path, a):
    a = np.clip(a, -32768, 32767).astype(np.int16)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(a.tobytes())


def read_wav(path):
    with wave.open(str(path)) as w:
        assert w.getsampwidth() == 2, f"{path}: expected 16-bit PCM"
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
        if w.getnchannels() > 1:
            a = a.reshape(-1, w.getnchannels()).mean(1)
        sr = w.getframerate()
    return resample(a, sr)


def trim(a, db=-45.0, pad_s=0.04):
    thr = 32767 * 10 ** (db / 20); idx = np.flatnonzero(np.abs(a) > thr)
    if not len(idx):
        return a
    p = int(pad_s * SR)
    return a[max(0, idx[0] - p): min(len(a), idx[-1] + p)]


def level(a, target_db=-20.0):
    """Every line at the same speech loudness: RMS of the voiced 50 ms windows to target_db (dBFS)."""
    n = int(0.05 * SR)
    if len(a) < n:
        return a
    w = a[: len(a) // n * n].reshape(-1, n)
    rms = np.sqrt((w ** 2).mean(1))
    voiced = rms[rms > rms.max() * 0.1]
    cur = 20 * np.log10(max(np.sqrt((voiced ** 2).mean()), 1e-6) / 32767)
    g = 10 ** ((target_db - cur) / 20)
    return a * g


# ---------- commands ----------
def setup(home):
    d = home / "kokoro"; d.mkdir(parents=True, exist_ok=True)
    for f, url in KOKORO_FILES.items():
        if (d / f).exists() and (d / f).stat().st_size > 1_000_000:
            print("have", d / f); continue
        print("downloading", f, "...", flush=True)
        tmp = d / (f + ".part")
        with urllib.request.urlopen(url, timeout=120) as r, open(tmp, "wb") as o:
            shutil.copyfileobj(r, o, 1 << 20)
        tmp.rename(d / f)
    try:
        import kokoro_onnx  # noqa: F401
        print("Kokoro ready in", d)
    except ImportError:
        print("model downloaded; now: pip install kokoro-onnx soundfile")


def synth(engine, text, P, ipa, home, dest):
    if engine == "kokoro":
        kokoro(text, P, ipa, home, dest)
    elif engine == "azure":
        azure(text, P, dest)
    elif engine == "sapi":
        sapi(text, P, dest)
    elif engine == "say":
        say(text, P, dest)
    else:
        raise SystemExit(f"unknown engine {engine}")


def audition(cfg, home, P, voices, text, say_, ipa):
    out = Path("audition"); out.mkdir(exist_ok=True)
    if not text:
        lines = speech.read_script(cfg["narration"]["script"], cfg["narration"]["prefix"]) \
            if os.path.exists(cfg["narration"]["script"]) else []
        text = " ".join(lines[:2]) or ("This is a concept from Tredence. We'll follow one planner, Adele Vance, at "
                                      "Contoso. Her first order is due by 11:30, worth $1.17M, and the ERP shows none of it.")
    sp = speech.spoken(text, say_)
    print("sample:", sp)
    for v in voices:
        q = dict(P, name=v)
        dest = out / f"{re.sub(r'[^A-Za-z0-9_.-]+', '_', v)}.wav"
        synth(P["engine"], sp, q, ipa, home, str(dest))
        write_wav(dest, level(trim(read_wav(dest))))
        print("  ", dest)
    print("Listen, then save the one you like:  python voice.py --use <voice> [--speed 0.95]")


def listen(cfg, cues):
    """Offline speech-to-text of each voiced line; flags lines whose words don't match the script."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        raise SystemExit("the listening check needs: pip install faster-whisper  (model ~150 MB, downloaded once)")
    home = home_dir(cfg)
    m = WhisperModel(os.environ.get("WHISPER_MODEL", "base.en"), device="cpu", compute_type="int8",
                     download_root=str(home / "whisper"))
    norm = lambda s: re.findall(r"[a-z0-9']+", s.lower().replace("-", " "))
    report = {}
    flagged = 0
    for cid, c in cues.items():
        segs, _ = m.transcribe(c["file"], language="en", beam_size=5, condition_on_previous_text=False)
        heard = " ".join(s.text for s in segs).strip()
        want, got = norm(c["spoken"]), norm(heard)
        sm = difflib.SequenceMatcher(a=want, b=got)
        diffs = [(" ".join(want[i1:i2]), " ".join(got[j1:j2])) for op, i1, i2, j1, j2 in sm.get_opcodes() if op != "equal"]
        report[cid] = {"script": c["spoken"], "heard": heard, "ratio": round(sm.ratio(), 3), "diffs": diffs}
        if diffs:
            flagged += 1
            print(f"  {cid}  {sm.ratio():.2f}  " + "; ".join(f"'{a}' heard as '{b}'" for a, b in diffs))
    json.dump(report, open("listen.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"{flagged} of {len(cues)} lines differ from the script -> listen.json.  Not every difference is a "
          "mispronunciation (speech-to-text writes numbers its own way): listen to the flagged lines, then add a "
          "'say' or 'ipa' entry to lexicon.json and re-run voice.py.")


def main():
    cfg = load(); NC = cfg["narration"]
    ap = argparse.ArgumentParser()
    ap.add_argument("script", nargs="?", default=NC.get("script", "narration.txt"))
    ap.add_argument("--engine", choices=["kokoro", "azure", "sapi", "say"])
    ap.add_argument("--voice")
    ap.add_argument("--speed", type=float)
    ap.add_argument("--setup", action="store_true")
    ap.add_argument("--audition", action="store_true")
    ap.add_argument("--voices")
    ap.add_argument("--text")
    ap.add_argument("--use")
    ap.add_argument("--listen", action="store_true")
    a = ap.parse_args()
    home = home_dir(cfg)
    if a.setup:
        return setup(home)
    P = profile(cfg, home)
    if a.engine:
        P["engine"] = a.engine
    if a.voice:
        P["name"] = a.voice
    if a.speed:
        P["speed"] = a.speed
    if a.use:
        saved = dict(P, name=a.use)
        json.dump(saved, open(home / "voice.json", "w", encoding="utf-8"), indent=1)
        return print("voice profile saved:", home / "voice.json", saved)
    say_, ipa = speech.load_lexicon(str(home))
    if P["engine"] != "kokoro":
        ipa = {}                                   # phonemes are Kokoro's; other engines get the respellings only
    if a.audition:
        return audition(cfg, home, P, (a.voices.split(",") if a.voices else AUDITION_VOICES), a.text, say_, ipa)

    lines = speech.read_script(a.script, NC["prefix"])
    ids = NC["cue_ids"] or [f"C{k + 1:02d}" for k in range(len(lines))]
    assert lines, f"no '{NC['prefix'].strip()}' lines in {a.script}"
    assert len(ids) == len(lines), f"{len(lines)} narration lines but {len(ids)} cue ids in film.json"
    os.makedirs("voice", exist_ok=True)
    gap = np.zeros(int(NC["gap_s"] * SR), dtype=np.float32)
    parts = []; cues = {}; t = 0.0; check = {}
    for cid, text in zip(ids, lines):
        sp = speech.spoken(text, say_)
        for w in speech.suspects(text, say_, ipa):
            check.setdefault(w, []).append(cid)
        key = f"{P['engine']}|{P['name']}|{P.get('speed')}|{P.get('lang')}|{sp}|{json.dumps(ipa, sort_keys=True) if P['engine'] == 'kokoro' else ''}"
        f = os.path.abspath(os.path.join("voice", f"{cid}-{hashlib.sha1(key.encode()).hexdigest()[:12]}.wav"))
        if not os.path.exists(f):
            print("voicing", cid, sp[:70], flush=True)
            synth(P["engine"], sp, P, ipa, home, f)
        x = level(trim(read_wav(f)))
        if parts:
            parts.append(gap); t += len(gap) / SR
        d = len(x) / SR
        cues[cid] = {"src": [round(t, 3), round(t + d, 3)], "dur": round(d, 3), "text": text, "spoken": sp, "file": f}
        parts.append(x); t += d
    if a.listen:
        return listen(cfg, cues)
    audio = np.concatenate(parts); peak = np.abs(audio).max()
    if peak > 32767 * 0.9:
        audio = audio * (32767 * 0.9 / peak)
    write_wav(NC["audio"], audio)
    with open(NC["transcript"], "w", encoding="utf-8") as fo:
        fo.write("".join(f"{NC['prefix']}{x}\n" for x in lines))
    json.dump(cues, open(cfg["cues"], "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    if P["engine"] in ("sapi", "say"):
        print(f"SCRATCH VOICE ({P['engine']}): for timing drafts only. Re-voice with Kokoro before delivery.")
    print(f"{len(lines)} lines, {t:.1f} s, voice {P['engine']}:{P['name']} x{P.get('speed', 1.0)} ->",
          NC["audio"], NC["transcript"], cfg["cues"])
    for cid in ids:
        print(f"  {cid} {cues[cid]['dur']:5.2f}s  {cues[cid]['text'][:70]}")
    if check:
        print("Check how these sound (no pronunciation entry yet; add any that are wrong to lexicon.json):")
        for w, where in sorted(check.items()):
            print(f"  {w:20} {' '.join(where)}")


if __name__ == "__main__":
    main()
