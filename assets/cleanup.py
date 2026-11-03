"""End-of-job clean-up: leaves only the packed prototype (.html) and the latest film (.mp4) in the prototype's folder,
optionally with the sources zipped beside them.

Usage:
  python <skill>/assets/cleanup.py working/<name> [--build <film build folder>] [--mode zip|delete] [--yes]

Without --yes it only prints the plan (what's kept, zipped, deleted, and the sizes) so you can show it to the user
and ask first.  With --yes it does it.

  kept     working/<name>/<Name>.html              the packed prototype (from dist/)
           working/<name>/<Name>-Film-v<N>.mp4     the newest film draft (from film/), if there is one
  zipped   working/<name>/<Name>-sources-v<N>.zip  --mode zip (default): brief.md, prototype.html, the film's
           source folder (film.json, narration.txt, plan, cues, lexicon, images), anything else you made here.
           Not zipped: kit/ (a copy of the skill's kit), renders/, dist/, older films, frames and encodes: all
           of them can be made again.
  deleted  everything else in working/<name>, every older film draft, and the film build folder (--build)

To edit later from the zip: unzip it into working/<name>, copy <skill>/assets/kit to working/<name>/kit, and carry on.
"""
import argparse
import re
import shutil
import sys
import zipfile
from pathlib import Path

SKIP_IN_ZIP = {"kit", "renders", "dist", "__pycache__", "voice", "work"}


def size(p):
    p = Path(p)
    if p.is_file():
        return p.stat().st_size
    return sum(f.stat().st_size for f in p.rglob("*") if f.is_file()) if p.exists() else 0


def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024 or u == "GB":
            return f"{n:.0f} {u}" if u in ("B", "KB") else f"{n:.1f} {u}"
        n /= 1024


def version(p):
    m = re.search(r"-v(\d+)\.mp4$", p.name, re.I)
    return int(m.group(1)) if m else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folder", help="working/<name>")
    ap.add_argument("--build", help="the film build folder (outside the workspace) to delete too")
    ap.add_argument("--mode", choices=["zip", "delete"], default="zip")
    ap.add_argument("--yes", action="store_true", help="do it (without: print the plan only)")
    a = ap.parse_args()
    D = Path(a.folder).resolve()
    if not D.is_dir():
        sys.exit(f"no folder {D}")
    if (D / "SKILL.md").exists() or (D / "assets" / "kit").is_dir():
        sys.exit(f"{D} looks like the skill itself, not a prototype folder; refusing")

    packed = sorted((D / "dist").glob("*.html")) if (D / "dist").is_dir() else []
    packed = packed or sorted(p for p in D.glob("*.html") if p.name != "prototype.html")
    if not packed:
        sys.exit("no packed prototype in dist/: pack it first (pack_prototype.py), then clean up")
    html = max(packed, key=lambda p: p.stat().st_mtime)
    films = sorted(D.rglob("*.mp4"), key=lambda p: (version(p), p.stat().st_mtime))
    film = films[-1] if films else None
    base = film.stem.split("-Film-")[0] if film and "-Film-" in film.stem else html.stem
    n = version(film) if film else 1

    keep_html = D / f"{base}.html" if film else D / html.name
    keep_film = D / film.name if film else None
    zip_path = D / f"{base}-sources-v{n or 1}.zip"
    keep = {keep_html, keep_film, zip_path} - {None}

    to_zip = []
    if a.mode == "zip":
        for f in sorted(D.rglob("*")):
            if not f.is_file() or f in (html, film) or f.suffix.lower() == ".mp4" or f == zip_path:
                continue
            rel = f.relative_to(D)
            if rel.parts[0] in SKIP_IN_ZIP or any(p in SKIP_IN_ZIP for p in rel.parts[:-1]):
                continue
            if f.suffix.lower() == ".zip" and "-sources-v" in f.name:
                continue
            to_zip.append(f)
    doomed = [p for p in D.iterdir() if p not in keep and p not in (html, film)]
    build = Path(a.build).resolve() if a.build else None

    print("Clean-up plan for", D)
    print(f"  keep    {keep_html.name}  ({human(size(html))})")
    if film:
        print(f"  keep    {keep_film.name}  ({human(size(film))})")
    else:
        print("  (no film found: only the prototype is kept)")
    if a.mode == "zip":
        print(f"  zip     {zip_path.name}  <- {len(to_zip)} source files ({human(sum(size(f) for f in to_zip))} before compression)")
    for p in doomed:
        print(f"  delete  {p.name}{'/' if p.is_dir() else ''}  ({human(size(p))})")
    for f in films[:-1]:
        print(f"  delete  {f.relative_to(D)}  (older film draft)")
    if build and build.exists():
        print(f"  delete  {build}  (film build folder, {human(size(build))})")
    if not a.yes:
        print("Nothing changed yet.  Re-run with --yes once the user agrees.")
        return

    if a.mode == "zip" and to_zip:
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
            for f in to_zip:
                z.write(f, f.relative_to(D))
    shutil.move(str(html), keep_html) if html != keep_html else None
    if film and film != keep_film:
        shutil.move(str(film), keep_film)
    for p in D.iterdir():
        if p in keep:
            continue
        shutil.rmtree(p) if p.is_dir() else p.unlink()
    if build and build.exists() and build != D and D not in build.parents:
        shutil.rmtree(build, ignore_errors=True)
    print("Done.  Left in", D, ":", ", ".join(sorted(p.name for p in D.iterdir())))


if __name__ == "__main__":
    main()
