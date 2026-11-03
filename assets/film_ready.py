"""Is this prototype ready to become a film?  Checks the pacing rules (references/film-pacing.md) from the engine's
outline and writes a first narration draft for the film steps.

    python <skill>/assets/film_ready.py working/<name>/prototype.html [--target 3:00]

Reads the outline through check_prototype.py --outline (Python or Node Playwright), then reports:
  - scene ids the film's stage directions can't name (they must be unique, letters, digits and hyphens)
  - stops with no data-note: the film has no seed line for them (they still play, just unnarrated)
  - notes too long for one spoken line (over ~13 s at ~15 characters a second): split the beat or the note
  - text that streams much longer than its line: the narration would wait in silence (shorten it or set data-speed)
  - no data-hold anywhere: give the signature moment room
  - the estimated film length against --target (default 3:00), counting each stop as its line or its streaming
Writes film-draft.txt next to the HTML: "@ scene beat" stage directions with each data-note as a "Host:" line, in
order.  The film steps start narration.txt from it (tighten every line in the Tredence voice first).
Exit code 1 if anything would break the film (bad ids, an engine without driven mode); warnings exit 0.
"""
import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
CPS = 15.0          # spoken characters a second (references/narration.md)


def secs(note):
    return len(note) / CPS


def fmt(s):
    return f"{int(s // 60)}:{s % 60:04.1f}"


def main():
    args = sys.argv[1:]
    if not args or args[0].startswith("--"):
        sys.exit(__doc__)
    src = Path(args[0]).resolve()
    target = 180.0
    if "--target" in args:
        m, _, s = args[args.index("--target") + 1].partition(":")
        target = int(m) * 60 + float(s or 0)
    with tempfile.TemporaryDirectory() as td:
        out = Path(td) / "outline.json"
        r = subprocess.run([sys.executable, str(HERE / "check_prototype.py"), str(src), "--outline", str(out)],
                           capture_output=True, text=True)
        if r.returncode or not out.exists():
            sys.exit("couldn't read the outline:\n" + (r.stdout + r.stderr)[-800:])
        O = json.loads(out.read_text(encoding="utf-8"))
    errors, warns = [], []
    ver = tuple(int(x) for x in re.findall(r"\d+", str(O.get("engine", "0")))[:3])
    if ver < (1, 14):
        errors.append(f"engine {O.get('engine')} has no driven mode: copy the skill's current kit/ and pack again")
    ids = [s["id"] for s in O["scenes"]]
    for i in ids:
        if not re.fullmatch(r"[A-Za-z0-9-]+", i or ""):
            errors.append(f"scene id '{i}': use letters, digits and hyphens so the film can name it")
    for i in set(x for x in ids if ids.count(x) > 1):
        errors.append(f"scene id '{i}' is used twice")

    est = 0.0; draft = []; any_hold = False; missing = []
    for s in O["scenes"]:
        est += 0.9 + 0.9                                     # a breath in, a breath out
        draft.append(f"@ {s['id']}")
        for b in s["beats"]:
            note = b.get("note", "")
            stream = b.get("stream", 0) / 1000
            if b.get("hold") not in (None, "pause"):
                any_hold = True
            if b.get("hold") == "pause":
                warns.append(f"{s['id']} b{b['beat']}: data-hold=\"pause\" waits for Space in a live demo; the film ignores it")
            if note:
                if b["beat"]:
                    draft.append(f"@ {s['id']} {b['beat']}")
                draft.append(f"Host: {note}")
                if secs(note) > 13:
                    warns.append(f"{s['id']} b{b['beat']}: note runs ~{secs(note):.0f} s spoken; split it into two beats or two lines")
                if stream > secs(note) + 2.5:
                    warns.append(f"{s['id']} b{b['beat']}: text streams {stream:.1f} s against a ~{secs(note):.0f} s line; "
                                 "shorten the text or speed it up (data-speed)")
            elif b["trigger"] in ("start", "click", "next") and not (s["kind"] == "frame" and s is O["scenes"][-1]):
                missing.append(f"{s['id']} b{b['beat']}")
            est += max(secs(note) if note else 0, stream + 0.6, 1.4 if b["beat"] else 0)
    if missing:
        warns.append("no data-note (no seed line for the film) at: " + ", ".join(missing))
    if not any_hold:
        warns.append("no data-hold anywhere: give the signature moment a hold so the film can stay on it")
    if est > target * 1.25:
        warns.append(f"estimated film {fmt(est)} against a {fmt(target)} target: cut a scene that repeats a point, or trim notes")
    elif est < target * 0.6:
        warns.append(f"estimated film {fmt(est)} against a {fmt(target)} target: the story may be thin for a film, or notes are missing")
    if draft and not draft[-1].startswith("@"):
        pass
    dest = src.parent / "film-draft.txt"
    dest.write_text("# Narration draft from the prototype's data-note lines (film_ready.py). Tighten every line in the\n"
                    "# Tredence voice (references/narration.md) before voicing. '@' lines are stage directions for autoplan.py.\n\n"
                    + "\n".join(draft) + "\n", encoding="utf-8")
    print(f"Film readiness: {len(O['scenes'])} scenes, {sum(len(s['beats']) for s in O['scenes'])} stops, "
          f"estimated {fmt(est)} (target {fmt(target)})")
    for e in errors:
        print("  ERROR ", e)
    for w in warns:
        print("  WARN  ", w)
    if not errors and not warns:
        print("  Ready to film.")
    print("Narration draft ->", dest)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
