# Designing a prototype that films well

Build every prototype as if it might become a film, whether or not the user asked for one: the same rules make the
live demo easier to present.  The film is narration-led: each stop of the prototype gets one or two spoken lines,
and the recorder steps to the next stop when the line before it has ended (`film.md` §Timing).  So the prototype's
stops *are* the film's shots.

## Rules for the build step

- **One stop, one idea, one line.**  Each place the demo stops (a scene's opening, a click, a run of automatic
  beats) should carry one idea a narrator can say in 3-10 seconds (~15 characters a second).  If a stop needs three
  sentences, split it into two beats.  If two stops say the same thing, merge them.
- **Seed every stop with `data-note`.**  On the beat's element (on the `<section>` for the opening stop), one plain
  spoken sentence of what the room sees happen: "The agent reads the plan it built overnight."  It shows in the
  presenter notes (N), and `film_ready.py` turns the notes into the film's first narration draft.  Write it from the
  storyboard's "presenter says" line.
- **Text that streams fits its line.**  An answer that types for 9 seconds under a 4-second line leaves the narrator
  silent.  Keep streamed answers short (two or three sentences), or set `data-speed` faster; `film_ready.py` warns
  when the streaming time is well over the line's.
- **Give the signature moment a `data-hold`** (2500-4000 ms).  The live demo lingers there and the film stays on it
  for two or three lines.  Never use `data-hold="pause"` for the film's sake: the film ignores it.
- **Automatic runs carry the work, clicks carry decisions.**  Chain `data-auto` beats for what the agent does on its
  own; leave a click where a person decides (approve, choose, edit).  The film shows the click as a press on the
  button, so a decision reads as a decision.
- **Scene ids the narration can name**: short, unique, letters, digits and hyphens (`ask`, `approve`, `region-view`).
  `narration.txt` refers to stops as `@ <scene-id> <beat>`.
- **No beat gaps** (beats 1, 2, 4 with no 3): the demo waits for an extra press and the film's steps slip.  The
  checker flags them.
- **Keep the bottom ~190 px of key moments clear** on product scenes when a film is likely: the captions sit there.
  Move a key button or number up rather than shrinking the captions.
- **Counters (`data-count`) out of wrapping text**: a changing width moves the layout mid-shot.
- **A cover and a close as frame scenes** if the story uses them: the film opens on the cover's line (whose concept,
  for whom, fictitious) and ends on the close's ask, then the #beyondpossible sign-off.
- **Mind the length.**  Count the stops: at roughly 6-8 seconds a stop, 20-28 stops make a 2:30-3:30 film.  A live
  demo can have more; the film then skips stops (they play through unnarrated), so put the essential ones first.

## Storyboard: plan the film in the same table

The storyboard table (`story-and-data.md` §The storyboard) gets two film columns, filled whether or not a film is
wanted yet:

| # | Stage | Screen | Presenter says (one line, out loud) | On screen | Click | Stop seconds |
|---|---|---|---|---|---|---|

- **Stage**: the design-thinking stage the scene serves (Empathize, Define, Ideate, Prototype, Test; see SKILL.md
  §Storyboard questions).  A story that skips Empathize (whose day, what's hard) or Test (what we'd measure) feels
  like a feature tour.
- **Stop seconds**: the time the line needs (characters ÷ 15) or the stop needs on screen, whichever is longer.  The
  column's total is the film's length within about 15 %.

## Check

`python <skill>/assets/film_ready.py working/<name>/dist/<name>.html --target 3:00` after packing: scene ids,
missing notes, notes too long to speak, streaming longer than its line, no hold, and the estimated length.  It
writes `film-draft.txt` beside the HTML.
