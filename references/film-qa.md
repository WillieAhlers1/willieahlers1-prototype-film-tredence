# Review, feedback and delivery

## Review checklist

Do the review yourself, frame by frame, on the contact sheets (`python contact_sheet.py` → `review/`), never with a
subagent and never from the code alone.

- **Line and picture agree.**  Each frame shows what its line says: the answer is on screen when the line talks
  about it, the approval card is visible when the line says it waits for approval, the stat is up when it's spoken.
- **Beat state.**  Nothing revealed early or late; no scene stuck waiting for a press (a frozen scene for several
  frames while the line moves on means a press was swallowed or a beat gap exists).
- **No presenter chrome.**  No Back/Next buttons, Next pill, scene dots, focus rings or key help in any frame.
- **Captions** don't cover the key UI of the moment (the answer, the approval button, the stat).  If they do, move
  the cue, shorten the line, or use the captions band below the picture.
- **Tredence look** on every graphic and frame scene: Poppins, palette, key phrase in Bright Orange, concept label.
- **Numbers on screen** match the narration and the source.
- **Pacing.**  Under 3:30; no stretch longer than ~8 s without narration except the opening and the sign-off.
- **Audio levels** from `python mix.py --levels`: voice about -18 dB mean; music alone about -27 to -31 dB.
  You can't listen to the audio: report the levels, never "it sounds good".

Fix, re-run only the affected steps (see the iteration levers in `film.md`), and review again.

## Feedback playbook

| They say | Do |
|---|---|
| "Too long" | Cut lines that explain instead of show; then scenes that repeat a point.  Keep the moment to land and the ask |
| "Too fast" / "too slow" | `pacing` in `film.json` (`line_gap_s`, `lead_s`, `tail_s`), or `@ hold <s>` in `narration.txt` on the moment to land; then autoplan, re-film, mix, captions, assemble |
| "The screen changes before / after the line" | `pacing.lead_s` (how long a line waits after its step), or move the `@ scene beat` line in `narration.txt` |
| "It mispronounces X" | Add X to the film's `lexicon.json` (a `say` respelling, or `ipa` phonemes: `python speech.py` shows how lines are spoken); re-run `voice.py` (only lines with X re-voice).  Names you reuse go in `<home>/lexicon.json`.  `voice.py --listen` finds the rest |
| "The voice sounds robotic / wrong" | A scratch (`say`, SAPI) voice was used: re-voice with Kokoro.  Otherwise `voice.py --audition`, pick another voice or `--speed 0.95`, `voice.py --use <voice>` |
| "Doesn't look like Tredence" | Check the graphics stills against `look.md`; check the prototype's frame scenes with `check_prototype.py`.  Never restyle product scenes with Tredence colours |
| "Looks like a product promo" | Rewrite lines that sell; say what the agent does and what the person decides; label impact illustrative |
| "Is that number real?" | Show the line, the number and its source (data sheet line or engine total).  No source: remove it |
| "Captions cover the screen" | Move the line, or captions band below the picture (`film.md` levers) |
| "Music too loud / too much" | `mix.music_db` -16 or -18; `music.bell_gain` 0.12; or a slower `bell_step_s` |
| "No captions" | `captions.enabled: false`, assemble final |
| "Use our customer's name" | Only with the user's confirmation; it goes in the first line and the end card, never inside the story |
| "Add a cold open" | `@ gfx night` first in `narration.txt`, with one line |

## Delivery note

In the reply (`film.md` §Your reply): the film, length, size; the scene timeline; what changed; what's illustrative
and its basis; what couldn't be checked; next options.  Files go next to the prototype:

```
working/<name>/film/<Customer-or-Concept>-<Concept>-Film-v<N>.mp4
working/<name>/film/source-v<N>/   film.json, narration.txt, lexicon.json, plan.json, cues.json, simdata.json, images/, README.md
```

Never overwrite an earlier version while iterating; the clean-up at the end keeps only the latest.  Don't email, post or share the film unless the user asks.  If the user also
needs slides, offer a `pptx-tredence` deck from the same brief.
