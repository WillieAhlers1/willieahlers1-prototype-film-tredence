# The film: from the packed prototype to a narrated MP4

A 2:30-3:30 film (a short cut is fine if the user asks): one calm narrator; the prototype filmed stop by stop in
the engine's driven mode; short graphics sequences in the Tredence brand where the story jumps in time or place;
an original ambient score; burned-in captions in Poppins.  It carries the same story as the prototype, and every
number in it traces to `brief.md` or an engine run.

Read with: `narration.md` (story and voice), `voice.md` (voice and pronunciation), `film-look.md` (graphics,
images, captions), `film-qa.md` (review, feedback, delivery), `film-pacing.md` (what the prototype needs).

## Environment

Python 3.10+ with `numpy`, `scipy`, `Pillow`, `playwright` (with Chromium, or Edge/Chrome); ffmpeg with libx264,
aac and libass; for the voice, `kokoro-onnx` and `soundfile` plus the Kokoro model.  Check once from a build folder:
`python -c "import numpy, scipy, PIL, playwright, kokoro_onnx; import filmcfg; print(filmcfg.ffmpeg())"`.

- **Claude Cowork (Mac, primary).**  The commands run in Cowork's Linux sandbox, not on the Mac itself.
  `pip install numpy scipy pillow playwright imageio-ffmpeg kokoro-onnx soundfile` works there (Playwright's own
  Chromium: `python -m playwright install chromium` if none is found; `imageio-ffmpeg` brings an ffmpeg with
  libass if there's none on PATH).  Keep `<home>` in the workspace (`<workspace>/.tredence`) so the Kokoro model
  and the voice profile survive between sessions; `new_film.py` finds it there.  If the model download is blocked,
  ask the user to download the two files listed in `voice.md` in their browser and drop them into
  `<workspace>/.tredence/kokoro/`.  macOS `say` can't be reached from the sandbox.
- **Copilot Cowork (Windows, secondary).**  Don't `pip install`.  Use what the sandbox has (Node Playwright under
  docgen-utils: `record.js`, `stills.js`, `outline.js`; ffmpeg).  Kokoro usually isn't available there: voice with
  Azure AI Speech (`--engine azure`, `SPEECH_KEY`/`SPEECH_REGION`, a non-multilingual voice such as
  `en-US-AndrewNeural`), still line by line through `voice.py` so the lexicon applies.  ImageGenerate can make the
  images.
- If something is missing, say exactly what.

## The loop

Work in small, visible turns: show the narration before voicing, an audition before the first full voicing,
stills before filming, contact sheets before delivering.  Every command runs in the build folder.

0. **Ready check.**  `python <skill>/assets/film_ready.py working/<name>/dist/<name>.html --target 3:00`: fix its
   errors (and its warnings, or say why they stay).  It writes `film-draft.txt`: the prototype's `data-note` lines
   with stage directions.
1. **Build folder.**  `python <skill>/film/scripts/new_film.py <build> --prototype working/<name>/dist/<name>.html
   --name "<Concept> film"`.  Put `<build>` local and outside synced folders (`/tmp/film-<name>`;
   `%TEMP%\film-<name>` on Windows): filming writes thousands of frames.  It holds the scripts, the shared lexicon,
   `graphics.html`, Poppins, the logos, the prototype in `proto/`, and `film.json`, `narration.txt`,
   `lexicon.json` and `plan.py` (only for the press-schedule fallback) from the templates.  Re-running refreshes
   scripts and keeps your files.  In a Linux sandbox `/tmp` can be wiped between turns: re-run it if so.
2. **Narration** (`narration.txt`, → `narration.md`).  Start from `film-draft.txt`; keep its `@` directions, write
   25-40 lines in the Tredence voice.  The first line says it's a concept from Tredence and that the company, people
   and numbers are fictional; the close says how the business could work, what it could be worth (illustrative),
   and one ask.  Run `python check_film.py` and fix every error; tick its table of spoken numbers against the brief.
   Show the script to the user before voicing.
3. **Pronunciation** (→ `voice.md`).  Fill the film's `lexicon.json` with every person, company, product and acronym
   from the cast and data sheet that isn't in the shared list.  `python speech.py` shows each line as the voice will
   get it, and "check:" words with no entry.
4. **Voice.**  First film on this machine: `python voice.py --setup` (model, once), `python voice.py --audition`
   (the first two lines in six voices, `audition/*.wav`), let the user pick, `python voice.py --use <voice>
   [--speed 0.95]`.  Then `python voice.py`: every line, `narr.wav`, `narr.txt` and `cues.json` with exact
   boundaries.  If `faster-whisper` is installed, `python voice.py --listen` flags words that came out wrong: add
   them to `lexicon.json` and voice again (only changed lines re-voice).
5. **Images** (→ `film-look.md` §Images).  Only if the film has `@ gfx night` or `@ gfx morning`: the user's images
   as `images/night.jpg`, `images/arrival.jpg`, `images/desk.jpg`; none, flat colour (say so).
6. **Graphics** (`film.json` `graphics`).  Kicker, title (`*key phrase*` turns Bright Orange), simulation labels,
   stat chips (numbers as format fields against the engine totals), morning clock, name card, work-list card, end
   card.  Simulation data: `simdata.json` straight from the engine (`film/examples/woodgrove-sample/make_simdata.py`
   shows the shape).  `python gfx_data.py`, then (after step 7) `python stills.py`: look at every still.
7. **Timing** (→ §Timing below).  `python autoplan.py`: reads the outline, the cue lengths and the `@` directions;
   writes `plan.json` and prints the timeline and every step time.  Aim for 2:30-3:30.
8. **Film.**  `python record_all.py` as a background job (`work/rec_all.log` ends with `ALLDONE`).  Each segment runs
   in headless Chromium at 1920 × 1080, page time at a quarter speed, captured by CDP screencast.  Prototype
   segments open with `?driven` and call `proto.step()` at the plan's times.  About 4-5 minutes of filming per minute
   of film.  Re-film one segment: `python record_all.py work/rec.log P3`.
9. **Music.**  `python music.py`: an original ambient score made here.  Never imitate a named artist or use a
   licensed or downloaded track.
10. **Mix.**  `python mix.py`, then `python mix.py --levels`: voice about -18 dB mean; music alone about -27 to -31 dB.
11. **Captions.**  `python subs.py`: Poppins Medium 34 on a Charcoal box, above the Tredence frame footer.  Captions
    show the line as written ("$1.17M"), not as spoken.
12. **Assemble.**  `python assemble.py segs`, then `python assemble.py final` (background): 0.6 s crossfades,
    captions burned in, AAC 192k, H.264 crf 19 → `work/<output.file>`.
13. **Review and deliver** (→ `film-qa.md`).  `python contact_sheet.py` → `review/sheet_NN.jpg`.  View every sheet.
    Fix and re-run the affected steps.  Then copy next to the prototype: `working/<name>/film/<Name>-Film-v<N>.mp4`,
    and the source (`film.json`, `narration.txt`, `lexicon.json`, `plan.json`, `cues.json`, `simdata.json`,
    `images/`, a short README) to `working/<name>/film/source-v<N>/`.
14. **Clean-up** (SKILL.md §Clean-up): ask once the user is happy with the film.

## Timing

`autoplan.py` replaces hand-placed presses.  `narration.txt` carries stage directions; everything else comes from
the voiced cue lengths and the prototype's outline:

```
@ cover                 the prototype's "cover" scene, opening stop
Host: This is a concept from Tredence ...
@ gfx night             graphics: night (+ simulation when simdata.json exists) | morning | endcard
Host: At two in the morning ...
@ ask                   scene "ask" opens: a new prototype segment, because the story jumped
Host: Adele asks what to work on first.
@ ask 3                 step on to beat 3; stops in between play at the live demo's pace
Host: The agent answers from the overnight plan ...
@ ask 5                 a stop with no line: shown, then on
@ hold 1.5              an extra pause before what comes next
@ closing               the #beyondpossible sign-off: holds pacing.end_hold_s with music only
```

- Each step lands just after the previous line ends (`pacing.tail_s` before a new scene, so the room gets a breath);
  the line about it starts `pacing.lead_s` later (`scene_lead_s` on a new scene).  The screen changes a breath
  before the narration talks about it.
- A stop always stays as long as its text takes to stream, plus `settle_s`, plus its `data-hold`; steps are at
  least `min_stop_s` apart.
- Graphics take their phase times from their lines; override one with `@ gfx night tS=s(3)-0.2` (`s(n)`, `e(n)`:
  start and end of its nth line).
- A new prototype segment starts when the story jumps: after graphics, a scene earlier than the current one, or one
  skipped over.  Each opens at `#<scene>?driven`.
- `plan.py` + `planlib.py` (hand-written press schedule, `prototype.driven: false`) remain as a fallback for a
  prototype older than engine 1.14.

## Your reply

Short, plain language, no script or tool names:
- **Film**: file, length (m:ss), size
- **Scene timeline**: start time → what's on screen (from autoplan's printed timeline)
- **What changed** since the last draft (first draft: what the film covers, and the business shift in one line)
- **What's illustrative**, and its basis
- **What couldn't be checked**: the audio can't be listened to here (give the measured levels and the listening
  check's result); a scratch voice if one was used; images if they fell back to flat colour
- **Next options**: 2-4 specific changes from the levers below
- Then the clean-up question (SKILL.md §Clean-up), once the user says the film is done

## Iteration levers

| Change | Edit | Re-run |
|---|---|---|
| A narration line | the line in `narration.txt` | check_film, voice (only that line re-voices), autoplan, re-film segments whose steps moved, mix, captions, assemble |
| A mispronounced word | `lexicon.json` (`voice.md`) | voice (only lines with it), then as above |
| The voice | `voice.py --audition`, `--use <voice> [--speed]`; or `film.json` `voice` for this film only | voice, autoplan, re-film, mix, captions, assemble |
| Pacing | `film.json` `pacing`, or `@ hold` / moving an `@` line | autoplan, re-film affected segments, mix, captions, `assemble.py segs <SEG>`, final |
| Graphics text or phases | `graphics` in `film.json`, or overrides on the `@ gfx` line | gfx_data, stills, autoplan, re-film G segments, assemble |
| Music level or mood | `mix.music_db`; `music.seed`, `chords`, `bass`, `bell_gain`, `lowpass_hz` | music, mix, assemble final |
| Captions off | `captions.enabled: false` | assemble final |
| Captions in a band below the picture | scale the picture to leave a ~160 px band (assemble change) and raise `captions.margin_v` into it | captions, assemble final |
| Length | target 2:30-3:30; trim lines first, then scenes that repeat a point | autoplan, re-film, mix, captions, assemble |
| Cold open | `@ gfx night` first, with one line | gfx_data, autoplan, film, all audio, assemble |
| End card | `@ gfx endcard` last, when the prototype has no closing scene | as cold open |
| The prototype itself | fix it in `prototype.html`, check, pack, `new_film.py` again (refreshes `proto/`) | autoplan, re-film prototype segments, assemble |

## Gotchas

- **Driven mode needs engine 1.14+** (`film_ready.py` checks).  The recorder no longer hides presenter chrome
  itself: `?driven` has none.  The press-schedule fallback still hides it with `prototype.film_css`.
- `slowtime.js`'s requestAnimationFrame wrapper must call `cb(performance.now())`; passing rAF's own timestamp
  stalls text streaming once Animation.setPlaybackRate is set.
- **Captions and the frame footer.**  `captions.margin_v` 80 keeps the footer (copyright, concept label, page
  number, T) visible on Tredence frame scenes.
- **Key phrase on orange.**  The end card's title is all white; `*key phrase*` only turns orange on dark or photo
  backgrounds.
- Keep counters (`data-count`) out of wrapping text in the prototype: a changing width breaks the layout.
- Run long jobs (filming, the final encode) in the background, from a local build folder.  A synced folder or a
  workspace mount can stall mid-run.
- ffprobe and drawtext may be missing: the scripts only use `ffmpeg -i` and libass.
- Pull review frames with one accurate seek per time (as `contact_sheet.py` does).

## Non-negotiables (film)

- **Fictitious and labelled.**  Say so once at the start; the prototype's concept label stays on screen and the
  graphics carry it too.  The customer you present to is named only if the user confirmed it.
- **Every number traces** to the data sheet or the engine output, rounded truthfully for the ear.  Impact is called
  illustrative.  No source: leave it out and tell the user.  Time freed is capacity, never a cut in staff.
- **The Tredence voice** and **brand on graphics** (`narration.md`, `film-look.md`).  `check_film.py` blocks the
  banned words.
- **Images and music**: fictional people only, no logos, no text; music generated here, never imitated or licensed.
- **Never claim the audio was listened to**; report the measured levels.  Never deliver a scratch voice as final.
- If a step fails (cue count mismatch, missing frames, encode error), fix it or say what's missing.
