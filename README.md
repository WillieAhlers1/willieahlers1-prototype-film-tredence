# prototype-film-tredence

A Claude skill that builds clickable Tredence "art of the possible" prototypes (one self-contained HTML file) and,
when the user wants, turns them into a narrated, captioned 1080p concept film (one MP4).  It merges the earlier
`prototype-tredence` and `concept-film-tredence` skills.

- `SKILL.md`: what Claude follows.  Start here.
- `assets/`: the prototype kit, starter and outlines, checker, packer, `film_ready.py`, `cleanup.py`
- `film/`: the film pipeline (scripts, templates, shared pronunciation list, worked example)
- `references/`: the detailed guides
- `tests/`: `python -m unittest discover -s tests -v` (needs Playwright and Chromium or Edge)

## What's new in the merged skill

- **Storyboard questions** grouped by design-thinking stage (Empathize, Define, Ideate, Prototype, Test, plus
  format), with defaults filled in and a **must show** question.
- **Prototypes built to pace the film**: a `data-note` on every stop, streamed text that fits its line, a hold on
  the signature moment; `film_ready.py` checks it and drafts the narration.
- **Narration-led timing**: `@ scene beat` stage directions in `narration.txt`; `autoplan.py` times every step from
  the voiced lines, and the recorder drives the prototype in the engine's `?driven` mode.
- **Offline, consistent voice**: Kokoro-82M, line by line, with a saved voice profile, number normalising, a
  three-level pronunciation list and an optional speech-to-text listening check.
- **Clean-up** at the end: keeps the `.html` and the latest `.mp4`, zips the sources, deletes the rest (after
  asking).

## Installing in Claude Cowork

Zip this folder (with `SKILL.md` at the top of the zip) and add it as a skill.  First film on a workspace: the skill
downloads the Kokoro voice model (~350 MB) into `<workspace>/.tredence/kokoro/`.

Voice: Kokoro-82M (Apache-2.0) via `kokoro-onnx`.  Fonts: Poppins (SIL OFL).
