"""Creates (or refreshes) a film build folder from this skill.

Usage: python <skill>/scripts/new_film.py <build_dir> --prototype <packed.html> [--name "Woodgrove lending film"]
                                                    [--example woodgrove-sample] [--force]

Copies the pipeline scripts, the shared lexicon, graphics.html, Poppins and the Tredence logos (from assets/kit) into <build_dir>, the packed prototype
into <build_dir>/proto/, and starts film.json, plan.py, narration.txt and lexicon.json from the templates (or from an example).
Scripts, graphics, fonts and logos are always refreshed; film.json, plan.py and narration.txt are kept unless
--force. Frames and encodes go to <build_dir>/work (film.json "tmp").
Put the build folder somewhere local and writable, outside a synced folder (OneDrive), for example
%TEMP%\\film-<short> on Windows or /tmp/film-<short> elsewhere: filming writes thousands of frames.
"""
import argparse
import json
import os
import shutil
from pathlib import Path

FILM = Path(__file__).resolve().parent.parent          # <skill>/film
SKILL = FILM.parent                                     # <skill>
KIT = SKILL / "assets" / "kit"
BRAND = ["t-white.png", "t-orange.svg", "wordmark-white.svg", "wordmark-orange.svg", "wordmark-tagline-white.svg"]


def find_home(proto):
    """Where the voice profile, the Kokoro model and your lexicon live: $TREDENCE_HOME, else a .tredence folder in
    the workspace (the folder holding working/), else ~/.tredence.  In Cowork the workspace survives sessions."""
    if os.environ.get("TREDENCE_HOME"):
        return os.environ["TREDENCE_HOME"]
    if proto:
        for d in Path(proto).resolve().parents:
            if (d / ".tredence").is_dir():
                return str(d / ".tredence")
            if d.name == "working":
                return str(d.parent / ".tredence")
    return str(Path.home() / ".tredence")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("build_dir")
    ap.add_argument("--prototype", help="packed prototype HTML (working/<name>/dist/<name>.html)")
    ap.add_argument("--name", help="film name for film.json")
    ap.add_argument("--example", help="start from examples/<name> instead of the templates")
    ap.add_argument("--force", action="store_true", help="overwrite film.json, plan.py and narration.txt")
    a = ap.parse_args()
    B = Path(a.build_dir).resolve(); B.mkdir(parents=True, exist_ok=True)
    for f in (FILM / "scripts").iterdir():
        if f.suffix in (".py", ".js") and f.name != "new_film.py":
            shutil.copy2(f, B / f.name)
    shutil.copytree(FILM / "lexicon", B / "lexicon", dirs_exist_ok=True)
    shutil.copy2(FILM / "templates" / "graphics.html", B / "graphics.html")
    (B / "fonts").mkdir(exist_ok=True); (B / "brand").mkdir(exist_ok=True)
    for f in (KIT / "fonts").iterdir():
        if f.suffix == ".ttf" or f.name == "OFL.txt":
            shutil.copy2(f, B / "fonts" / f.name)
    for f in BRAND:
        shutil.copy2(KIT / "brand" / f, B / "brand" / f)
    (B / "images").mkdir(exist_ok=True)
    src = {"film.json": FILM / "templates" / "film.json",
           "plan.py": FILM / "templates" / "plan_template.py",
           "narration.txt": FILM / "templates" / "narration-script-template.txt",
           "lexicon.json": FILM / "templates" / "lexicon.json"}
    if a.example:
        ex = FILM / "examples" / a.example
        assert ex.is_dir(), f"no example {a.example} in {FILM / 'examples'}"
        for f in ex.iterdir():
            if f.is_file() and f.name not in src and f.suffix != ".md":
                shutil.copy2(f, B / f.name)
        if (ex / "images").is_dir():
            shutil.copytree(ex / "images", B / "images", dirs_exist_ok=True)
        src.update({k: ex / k for k in src if (ex / k).exists()})
    for name, s in src.items():
        if a.force or not (B / name).exists():
            shutil.copy2(s, B / name); print("new", name)
        else:
            print("kept", name)
    cfg = json.load(open(B / "film.json", encoding="utf-8"))
    if a.prototype:
        p = Path(a.prototype).resolve()
        assert p.exists(), f"prototype not found: {p}"
        (B / "proto").mkdir(exist_ok=True)
        shutil.copy2(p, B / "proto" / p.name)
        cfg.setdefault("prototype", {}).update({"dir": "proto", "file": p.name})
    if a.name:
        cfg["name"] = a.name
    if not cfg.get("home"):
        cfg["home"] = find_home(a.prototype)
    cfg["tmp"] = cfg.get("tmp") or "work"
    json.dump(cfg, open(B / "film.json", "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print("build folder ready:", B)
    print("voice home (profile, Kokoro model, your lexicon):", cfg["home"])
    print("next: write narration.txt and lexicon.json, then  python check_film.py  (run every script from this folder)")


if __name__ == "__main__":
    main()
