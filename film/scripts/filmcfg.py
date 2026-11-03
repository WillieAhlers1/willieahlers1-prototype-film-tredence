"""Shared settings for the prototype-film-tredence film scripts.

Every script runs from the film's build folder and reads ./film.json, or the file named in $FILM_CONFIG.
Anything film.json leaves out falls back to DEFAULTS below. Works on Windows, macOS and Linux.
"""
import copy
import json
import os
import shutil
import subprocess
import tempfile

DEFAULTS = {
    "tmp": "",                          # frames, segment encodes, mix and the final MP4; "" = <system temp>/film-work
    "home": "",                         # voice profile, Kokoro model, your lexicon; "" = $TREDENCE_HOME or ~/.tredence
    "prototype": {
        "dir": "proto",                 # folder holding the packed prototype (new_film.py copies it here)
        "file": "prototype.html",
        "warmup_s": 30,                 # press-schedule recorder only: real seconds to wait for the engine warm-up
        "driven": True,                 # film with the engine's ?driven mode (autoplan.py); False = press schedule
        "keys": {"hide": "h", "replay": "r", "next": "ArrowRight"},
        # The kit always shows Back/Next buttons, a "Next" pill and scene dots for presenters.
        # They must not appear in a film, so the recorder hides them with this CSS (the kit itself is never edited).
        "film_css": ".proto-nav,.proto-next,.proto-dots,.proto-notes,.proto-help{display:none!important}"
                    ".cue{outline:none!important;box-shadow:none!important}",
    },
    "narration": {
        "script": "narration.txt",      # the narration with its @ stage directions
        "audio": "narr.wav",            # the voiced narration (one turn per cue line); "mp3" is accepted as an alias
        "transcript": "narr.txt",       # one "Host: " line per cue, in order
        "prefix": "Host: ",
        "cue_ids": [],                  # one id per line; empty = C01, C02, ...
        "gap_s": 0.6,                   # pause voice.py puts between lines
        "silence_noise_db": -38,
        "silence_min_s": 0.22,
        "boundary_pad_s": 0.06,
    },
    # Empty = the saved voice profile (<home>/voice.json, made with voice.py --use), else Kokoro am_michael.
    # Set keys here only to override the profile for this film: engine (kokoro | azure | sapi | say), name, speed.
    "voice": {},
    "cues": "cues.json",
    "plan": "plan.json",
    "crossfade_s": 0.6,
    "capture": {
        "rate": 0.25,                   # page time runs at this fraction of real time while filming
        "width": 1920,
        "height": 1080,
        "jpeg_quality": 86,
        "gfx_settle_ms": 4000,
        "pre_roll_ms": 1500,
        "chrome": "",                   # empty = $CHR, else Playwright's own Chromium, else Edge/Chrome
    },
    "graphics": {
        "file": "graphics.html",        # reads gfx-data.js next to it (written by gfx_data.py)
        "simdata": "simdata.json",      # optional: without it the simulation sequence is left out
    },
    "music": {"file": "music.wav", "seed": 7, "tail_s": 2.5},
    "mix": {"file": "mix.wav", "music_db": -14, "voice_lufs": -16, "limit": 0.89},
    "captions": {
        "enabled": True,
        "file": "film.ass",
        "font": "Poppins Medium",       # Tredence uses Poppins only; the TTFs are in ./fonts
        "size": 34,
        "max_chars": 72,
        "margin_v": 80,                 # keeps the Tredence frame footer (copyright, concept label, T) visible
        "margin_lr": 220,
        "fontsdir": "fonts",            # relative to the build folder (avoids drive-letter escaping in ffmpeg)
    },
    "output": {"file": "film.mp4", "crf": 19, "preset": "medium", "audio_kbps": 192},
    "review": {"every_s": 7, "cols": 3, "rows": 3},
    # autoplan.py: narration-led timing.  Seconds, film time.
    "pacing": {
        "lead_s": 0.35,                 # a line starts this long after the step that shows what it talks about
        "scene_lead_s": 0.9,            # ... or after a new scene starts (the 0.6 s crossfade plus a beat to look)
        "line_gap_s": 0.4,              # between two lines on the same stop
        "settle_s": 0.6,                # a stop with no line stays at least its streaming time plus this
        "min_stop_s": 1.4,              # no step sooner than this after the previous one (crossfades swallow presses)
        "tail_s": 0.9,                  # a scene ends this long after its last line
        "end_hold_s": 3.5,              # the last scene (#beyondpossible) holds this long with music only
    },
    "ffmpeg": "",                       # empty = $FFMPEG, PATH, then the imageio-ffmpeg binary
}


def _merge(base, extra):
    out = copy.deepcopy(base)
    for k, v in (extra or {}).items():
        if isinstance(v, dict) and isinstance(out.get(k), dict):
            out[k] = _merge(out[k], v)
        else:
            out[k] = v
    return out


def load(path=None):
    path = path or os.environ.get("FILM_CONFIG", "film.json")
    user = {}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            user = json.load(f)
    cfg = _merge(DEFAULTS, user)
    nc = cfg["narration"]
    if "mp3" in (user.get("narration") or {}) and "audio" not in user["narration"]:
        nc["audio"] = nc["mp3"]
    ids = nc.get("cue_ids") or []
    if isinstance(ids, str):
        nc["cue_ids"] = ids.split()
    if not cfg["tmp"]:
        cfg["tmp"] = os.path.join(tempfile.gettempdir(), "film-work")
    cfg["tmp"] = os.path.abspath(cfg["tmp"])
    os.makedirs(cfg["tmp"], exist_ok=True)
    return cfg


def tmp(cfg, name):
    return os.path.join(cfg["tmp"], name)


def ffmpeg(cfg=None):
    """Path to an ffmpeg with libx264, aac and libass (subtitles filter)."""
    cand = (cfg or {}).get("ffmpeg") or os.environ.get("FFMPEG") or shutil.which("ffmpeg")
    if cand:
        return cand
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        raise SystemExit("ffmpeg not found: put it on PATH, set $FFMPEG, or `pip install imageio-ffmpeg`")


def run_ffmpeg(cfg, args, check=True):
    """Runs ffmpeg with args; returns the CompletedProcess (stderr carries the log)."""
    r = subprocess.run([ffmpeg(cfg), "-hide_banner", *args], capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    if check and r.returncode:
        print(r.stderr[-1500:])
        raise SystemExit(1)
    return r


def media_seconds(cfg, path):
    import re
    log = run_ffmpeg(cfg, ["-i", path], check=False).stderr
    m = re.search(r"Duration: (\d+):(\d+):([\d.]+)", log)
    if not m:
        raise SystemExit(f"cannot read {path}")
    return int(m.group(1)) * 3600 + int(m.group(2)) * 60 + float(m.group(3))
