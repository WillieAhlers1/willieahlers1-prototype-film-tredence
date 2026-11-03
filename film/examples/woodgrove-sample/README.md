# Worked example: Woodgrove small-business lending (sample film)

A short (about 1:36) concept film for a fictitious bank, made end to end with this skill to show every step and to
test the pipeline: 13 narration lines, four segments (P1 the Tredence cover, G1 night + simulation, G2 Adele's
morning, P2 the Woodgrove Assist agent app through the close and #beyondpossible), original score, Poppins captions.  Woodgrove Bank,
Adele Vance and every number are fictional.  A real film is longer (2:30-3:30, 25-40 lines) and has more scenes.

| File | What |
|---|---|
| `film.json` | The config: prototype path, cue ids, all graphics text, output names |
| `narration.txt` | The 13 lines, with `@` stage directions for `autoplan.py` and the source of every number in comments |
| `plan.py` | The old hand-written press schedule, kept as a fallback example (`prototype.driven: false`) |
| `make_simdata.py` | The seeded queue model standing in for a customer's engine; writes `simdata.json` |
| `simdata.json` | 9 applications × 260 simulated days in each order, plus the engine totals |
| `prototype/prototype.html` | A deliberately tiny demo (cover, one agent-app scene with a `data-note` on each stop, close, closing) used as a test fixture.  Not a model for prototypes: design those with prototype-tredence |

Not bundled: images (the sample uses the flat-colour fallback) and audio (re-voiced with Kokoro on each run).

## Story numbers (engine seed 2710)

Arrival order: 2.43 of 5 deadline files decided in time (spoken "two or three of her five"), $1.17M expected to
fund per day.  Best order: 5 of 5, $1.37M.  1,500 orders tried × 2,000 simulated days = 3,000,000 simulated days.
Northwind Traders in time on 10 % of simulated days in arrival order, every day in the plan's order.

## Re-make it

```bash
S=<skill>; P=/tmp/woodgrove/working/woodgrove
mkdir -p $P && cp -r $S/assets/kit $P/kit && cp $S/film/examples/woodgrove-sample/prototype/prototype.html $P/
python $S/assets/check_prototype.py $P/prototype.html
python $S/assets/pack_prototype.py $P/prototype.html                # -> $P/dist/woodgrove.html
python $S/assets/film_ready.py $P/dist/woodgrove.html --target 1:45

python $S/film/scripts/new_film.py /tmp/film-woodgrove --prototype $P/dist/woodgrove.html --example woodgrove-sample
cd /tmp/film-woodgrove
python check_film.py && python speech.py
python voice.py --setup             # once: the Kokoro model into <home>/kokoro
python voice.py                     # every line, offline
python autoplan.py && python gfx_data.py && python stills.py
python record_all.py                # background, ~7 min
python music.py && python mix.py && python mix.py --levels && python subs.py
python assemble.py segs && python assemble.py final   # -> work/woodgrove-film.mp4
python contact_sheet.py
```

On Windows use the same commands with `%TEMP%\...` paths.
