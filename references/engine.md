# Engine

`kit/proto.js` turns `prototype.html` into a presentable, scripted demo.  You only write HTML attributes.

## Page structure

```html
<head> ... <script src="kit/proto-style.js"></script> <style>/* this prototype only */</style> </head>
<body data-concept="Concept demo · Fictitious data">
<main class="stage">
  <section class="scene zoom" id="ask" data-title="Ask the agent">
    ...shell markup...
    <aside class="notes">What the presenter says and clicks.</aside>
  </section>
  ...
</main>
<script src="kit/icons.js"></script>
<script src="kit/proto.js"></script>
</body>
```

- Every scene needs a unique `id` (used in the URL `#id`, `data-go`, and screenshot names) and a `data-title`.
- The stage is 1920 × 1080 and scales to any screen.  Position things with the shells' flex layouts; use absolute
  positions only for overlays (toasts, frame content).
- Prototype-specific CSS goes in the `<style>` block in `<head>`.  Never edit `kit/`.

## Beats (what appears when)

| Attribute | Effect |
|---|---|
| `data-beat="n"` | Hidden until the nth press of → (or click).  Unmarked elements are visible from the start. |
| `data-auto="ms"` | On a beat-n element: plays automatically `ms` after beat n−1 has finished (including its streamed text), without a key press.  Chain them for agent work. |
| `data-hide="n"` | Removes the element at beat n (for "before" content the agent replaces). To swap states in place, put the old and new versions side by side in one container: old with `data-hide="n"`, new with `data-beat="n"`. |
| `.keep` | Pending beats take no space by default, so revealed content is inserted the way a real app adds it. Add `.keep` to reserve the space instead (for example, so a layout doesn't shift). |
| `data-type` | Streams the text in when its beat appears.  `data-type="words"` streams words (agent answers).  `data-speed` = units per second (default 55 chars / 18 words).  The finished text's space is reserved up front, so nothing reflows while it streams, and anything after it in the same beat (sources, buttons) appears when it finishes. |
| `data-count` | Counts the number in its text up from 0 when its beat appears (`data-count="1200"` = duration ms). |
| `.work > li[data-beat]` | Spinner when revealed, then a thin check after `data-run` ms (default 1100), or once the text streaming inside it has finished if that takes longer.  On `li.think` the label reads "Thinking…" until then, "Thought process" after.  On `li.skill` its `.plug` icon takes the place of the check.  When every item of a `.work-box` is shown and done, the box gets `.done`: its `.sum` shows `.on-done` and the engine fills `.n` ("4 items"). |
| `.fade` `.slide-r` `.pop` | Alternative entrances for a beat element. |
| `data-morph="name"` | On an element that hides at beat n and one that appears at beat n: the new one glides from the old one's place (the home prompt becoming the chat prompt). |

Pattern for "user asks, agent works, agent answers" (the shape only; what it looks like and how to write each part
is in `look-and-feel.md` §The agent's work, in Fluent):

```html
<div class="cp-user" data-beat="1"><span data-type>[the person's question]</span></div>
<div class="cp-who" data-beat="2" data-auto="900"><span class="cp-mark"><i class="ic grad" data-icon="sparkle_filled"></i></span>[agent name]<span class="t-cap">Just now</span></div>
<div class="work-box" data-beat="2" data-auto="900"><div class="sum"><span class="on-run">Working on it</span><span class="on-done"><span class="n"></span> complete</span><i class="ic" data-icon="chevron_down"></i></div>
  <ul class="work">
    <li data-beat="2" data-auto="900">[step]</li>
    <li class="think open" data-beat="3" data-auto="1200"><span class="lbl"><span class="on-run">Thinking…</span><span class="on-done">Thought process</span><i class="ic" data-icon="chevron_right"></i></span>
      <div class="thought" data-type="words"><p>[reasoning]</p><p>[reasoning]</p></div></li>
    <li data-beat="4" data-auto="600">[step]</li>
  </ul></div>
<div class="cp-status" data-beat="2" data-auto="900" data-hide="5"><span class="cp-mark"><i class="ic grad" data-icon="sparkle_filled"></i></span><span class="t" data-hide="4">[now]</span><span class="t" data-beat="4">[next]</span></div>
<div class="cp-turn" data-beat="5" data-auto="900"><div class="cp-resp"><p data-type="words">...</p></div></div>
```

Clicking a thinking node's label opens or closes it, and clicking "Show more" under a `.work-box.clip` shows the
whole trace; replaying the scene (R) puts both back.  These are the only clicks that don't need `data-go`.

Beats are numbered per scene.  Several elements can share a beat (the work step and the record change it causes).

### Motion (automatic)

The engine animates every change, so you don't write any motion code:

- **Content glides.**  When a beat adds, hides or changes something, everything it pushes around glides to its new
  place (FLIP with `translate`) instead of jumping.  A new chat message rises with the conversation.
- **Exits fade.**  `data-hide` content fades out where it was while the rest closes the gap.
- **Panes push in.**  A `.cpa-pane` revealed on a beat slides in from the right while the conversation glides over.
- **Text streams like a chat agent.**  Words fade in one after another in space reserved for the finished text.
- **Scenes crossfade.**
- **Warm-up.**  While the first scene is up, the engine paints every other scene once, invisibly.  The first paint
  of new content is slow (fonts, icons and shadows are prepared once) and would otherwise hitch on the first run in
  front of the customer.  Give it two or three seconds on the cover before advancing.
- Off in `?check` mode and when the OS asks for reduced motion (everything shows at once).

Tune in the prototype's own `:root` if needed: `--t-enter` (340ms, appearing), `--t-glide` (520ms, moving),
`--t-exit` (180ms), `--t-scene` (400ms), `--t-word` (260ms, each word's fade), `--ease-out` (appearing),
`--ease-glide` (moving).  Pressing → while something is still running finishes it at once and moves on.

Authoring rules that keep motion smooth:

- Reveal content where it will stay.  Don't move things with your own CSS transitions on `left`, `top`, `width`
  or `height`; let the beat change the layout and the engine animate it.
- When one element replaces another in the same place, give both the same `data-morph` name.
- Keep the answer and its sources in one beat element; the sources wait for the text.

### Process steps (the agent runs a playbook)

`.steps` > `li.step` is a plan that stays on screen while the agent works through it.  A step is always visible;
its state changes on beats:

| Attribute on `li.step` | Effect |
|---|---|
| `data-run-at="n"` | At beat n: spinner, then a check after `data-run` ms (default 1100).  For *Done for you* steps. |
| `data-wait-at="n"` | At beat n: highlighted and waiting for the person.  For *Needs your input* / *Needs your approval*. |
| `data-done-at="n"` | At beat n: a check (green; in the Workspace drawer, a filled brand check).  Normally the beat after the click on the input or approval card. |
| `data-auto="ms"` | Plays its run-at or wait-at beat automatically, as on `data-beat` elements. |

Inside a step, `.on-queued`, `.on-run`, `.on-wait`, `.on-done` show text for one state only ("After you choose" →
"Updating" → "Est. revenue $1,240,000 to $1,178,000").  Put the result the person can verify in `.on-done`.

```html
<ol class="steps">
  <li class="step" data-run-at="3" data-auto="700"><div class="st"><div class="row"><span class="st-t grow">Book a prep session</span>
    <span class="mode auto"><i class="ic" data-icon="flash"></i>Done for you</span></div>
    <div class="st-d"><span class="on-queued">Internal meeting</span><span class="on-run">Finding a time</span><span class="on-done">Wed, Nov 4, 2:00 PM · added to 3 calendars</span></div></div></li>
  <li class="step" data-wait-at="4" data-auto="1000" data-done-at="5">...<span class="mode approval">...Needs your approval</span>...</li>
</ol>
<div class="acard" data-beat="4" data-hide="6">... <button class="btn primary" data-go="next" data-cue>Approve and send</button> ...</div>
```

In the agent app, the steps go in the Workspace drawer (`.cpa-pane.ws` > `.ws-sec`) as plain lines
(`.st` > `.st-t`, no `.mode` badge or `.st-d`), and the input and approval cards, which carry the mode, appear in the
conversation.  An empty `.ws-count` in the Steps heading shows "done / total" and updates itself.
`assets/shells.html` `plan` has the chrome as an outline: Steps, Output, References, Plugins, and an input card
with `.opt` choices.  The `chat` outline has an approval card (`.checks`, `.policy`).  How many steps, and
which need the person, comes from your story.  Outside the agent app, `.run` puts steps and the card side by side
(two columns), `.mode` badges and `.on-*` detail lines go on the steps, and `.log` shows the activity.

## Clicks

`data-go="next"` (or `"prev"`, or a scene id) on a button makes it work when the presenter clicks it.  The kit
puts a soft focus ring (cue) on the last clickable thing once a scene's beats are done; add `data-cue` to choose
which element gets it.  H turns cues off.  Every scene must also advance with → so a clicker remote works.

- **A cued control does what it says on the very next beat.**  `data-cue` rings the control as soon as it is
  visible, so if a → press is still due before the thing it names (a tab that opens the account, a button that
  sends), make the beats in between automatic (`data-auto`) or the click only reveals the in-between beat and the
  presenter is left stuck.
- **End a scene on a bridge where the story has one**: a real control in the product that leads into the next
  scene (for example, a chip or button that opens the next conversation or runs the next step), with
  `data-go="next"`.  Time jumps
  ("two days later") and the closing frame usually have none; don't invent one.
- **Next pill (automatic).**  When the demo is waiting for the presenter and nothing in the scene is cued, the
  engine fades in a small pill at the bottom right after about 1.5 s: "Next: ‹next scene's title› →" at the end of
  a scene, "Continue →" mid-scene.  Clicking it is the same as →.  It doesn't show on the last stop, in `?check`,
  or with cues off (H).  Keep `data-title` short enough to read there.
- **Back and Next buttons (automatic, always on).**  The engine puts a Back and a Next button at the bottom right
  of every scene, so anyone can click through without knowing the keys.  Next is the same as → (the next beat, or
  the next scene); Back opens the previous scene, finished.  They're quiet until the pointer is near, disabled at
  either end, and hidden in `?check` and `?driven` so they never appear in the check's screenshots.  Keep the bottom-right corner
  free of anything the presenter has to click.

## Power BI visuals

```html
<figure class="pbi" data-chart="line" data-h="180" data-fmt="$0.0M" data-xname="Month" data-dash="Forecast"
  data-x="Jan,Feb,Mar" data-series="Actual:0.6,1.3,2.0; Plan:0.8,1.6,2.4">
  <figcaption class="pbi-head"><b>Consumption vs plan</b><span>Cumulative, 2026</span></figcaption>
  <div class="pbi-tip" data-at="Mar" data-beat="2" data-auto="500"><span>Gap</span><b class="down">-$0.4M</b></div>
</figure>
```

| Attribute | Effect |
|---|---|
| `data-chart` | `line`, `area`, `column` (clustered), `bar` (clustered, horizontal), `waterfall` |
| `data-x` | Categories, comma separated.  Waterfall: `=Label` is a total bar at its own value |
| `data-series` | `Name:v1,v2,...` separated by `;`.  One value per category; leave a value empty for a gap in a line |
| `data-fmt` | Number format; values are already in display units: `$0.0M` (4.2 shows $4.2M), `0%` (75 shows 75%; 0.75 would show 0.75%, and the check flags it), `0.0` |
| `data-h` | Plot height in px (default 220) |
| `data-xname` | First tooltip row's label ("Month") |
| `data-line` | Series drawn as a line on a column chart (combo: actual vs plan) |
| `data-dash` | Series drawn dashed (forecast) |
| `data-style` | `labels` (data labels instead of an axis, Power BI's preset), `straight` (no smoothing) |
| `data-min` / `data-max` | Axis range; `data-min="auto"` lets the axis start above zero |
| `data-colors` | Override colours in series order; waterfall: increase, decrease, total |
| `data-total` | Waterfall final bar label, or `none` |
| `.pbi-tip` inside | Pins Power BI's tooltip at `data-at` (category or index) on its beat; its `span`/`b` pairs are extra rows |

A visual grows in with its beat (after any streamed text before it), and hovering shows the tooltip.  The check
flags a visual without a title or `data-fmt`, values that don't match the categories, a `%` format given
fractions, a chart that drew nothing, and a chart in an agent answer without its Power BI source.

## Presenter controls

**Space plays and pauses.**  The demo opens on its first scene with a "Play" pill; one press of Space (or the
pill) and it runs on its own: at each stop it holds, then presses the cued control where the room can see it (or
goes on).  Space again pauses everything where it is, streaming text and running steps included; Space carries
on.  → / PageDown / Enter step by hand at any time (a paused demo stays with the presenter until Space).  The
play / pause button also sits at the left of the scene dots.

← / PageUp previous scene (shown finished) · R replay scene · 1–9 jump to scene (beyond 9, use the scene dots or
`#scene-id`) · Home / End · N presenter notes (from `<aside class="notes">`) · H click cues · F full screen ·
? key help.  Moving the mouse to the bottom edge shows scene dots.  `prototype.html#record` opens a scene directly.

**Pacing is a floor, set by the engine: fast enough that nobody waits, slow enough that everyone sees what
happened.**  Text the room reads (answers, cards, mail, frame text) stays up about 0.6 s plus 0.12 s a word, at most
6 s, before the next automatic beat; a chart 2.5 s.  The agent's work trace, its latency pill, labels and hidden text
don't count: the trace keeps its own rhythm.  A product scene settles for 1.2 s before its first automatic beat.
When playing, every stop also holds at least 2 s, and 0.8 s after the last thing settles.  The presenter can always
skip ahead with →.

| Attribute | Effect |
|---|---|
| `data-hold="ms"` | On an element of beat n (on the `<section>` for its opening stop): that stop holds at least `ms` when playing, and the next automatic beat waits at least that long.  For the moment that matters most. |
| `data-hold="pause"` | On a beat where the demo would wait anyway: playback pauses there until the presenter presses Space.  For a question to the room. |
| `data-note="..."` | Optional, on any beat's element (on the `<section>` for its opening stop): one short line about that beat.  Shown under the scene's notes (N) when the beat plays, and in the outline, where a video tool can turn it into narration.  Never on screen. |

## Driving it from another tool

A prototype is built for a live room, not for video, but it plays well with tools that record it (a video skill,
a test).  Open it with **`?driven`**: nothing moves unless the tool says so (no reading floor, no automatic beats,
no autoplay), the presenter controls and click cues are hidden, and the concept label stays.  `&speed=2` streams
text, counters and work steps twice as fast; `&instant` shows them finished.  This skill's own film steps (`film.md`) drive it this way: `autoplan.py` reads the outline, `record.py` steps it.

`window.proto` (also in a normal or packed prototype; `proto.version` is the engine version):

| Call | Does | Returns |
|---|---|---|
| `await proto.ready` | Resolves once the warm-up has painted every scene once (a clean picture from then on); the `proto:ready` event fires too | the state |
| `proto.outline()` | The prototype as data: every scene in order (id, title, frame or product, presenter notes), its stops with how each starts (`start`, `auto` with `after` ms, `click` with the control's label, or `next`), the text it adds, the work steps it changes, how long its text streams at normal speed (`stream`, ms), its `note` and `hold`, and how the scene ends | an object |
| `await proto.go(scene, beat)` | Opens a scene by id or index at its start, or at `beat` with everything up to it finished (`true` = the scene's end) | the state, once settled |
| `await proto.step()` | One step, the way the demo plays: the next beat, or a press and click on the cued control (shown pressing), or on to the next scene | the state, once the beat has ended |
| `await proto.finish()` | Finishes whatever the current beat is still doing (streaming, steps, animations) | the state |
| `proto.state()` | `{scene, id, title, beat, beats, mode, settled, ready}` | an object |
| `proto.speed(n)` | Driven only: change the streaming speed (`"instant"` allowed) | the speed |

Events on `window`: `proto:beat` (a beat starts), `proto:beatend` (everything it started has finished),
`proto:sceneend` (the scene's last beat has ended), `proto:ready`; each carries the state as `detail`.  A typical
recording: open `?driven`, `await proto.ready`, read `proto.outline()`, then for each stop start the narration line,
`await proto.step()`, and hold until the line ends.  `python <skill>/assets/check_prototype.py <html> --outline
[file.json]` writes the outline to `outline.json` next to the HTML.

## Helpers

- Icons: `<i class="ic" data-icon="mail"></i>` → inline Fluent SVG.  `class="ic grad"` fills it with the agent
  gradient.  Unknown names log a console warning, which the check reports.
- Avatars: `<span class="avatar" data-name="Adele Vance"></span>` → initials and stable colour.
- Concept label: added to every scene from `<body data-concept>`.  Required; the packer checks for it.  On Tredence
  frame scenes it moves into the footer, between the copyright line and the scene number.
- Frame chrome: on `.scene.frame` scenes the kit adds the template's footer text (copyright with the current year,
  the scene number) and the #BeyondPossible marks.  Don't write them yourself.

## Check and pack

```
python <skill>/assets/check_prototype.py working/<name>/prototype.html [--scene <id>]
python <skill>/assets/check_prototype.py working/<name>/prototype.html --motion [--scene <id>]
python <skill>/assets/pack_prototype.py  working/<name>/prototype.html
```

`check` loads the page with `?check` (animations instant) and steps through it like a presenter.  It takes one
screenshot per stop: the scene's opening state and each point where the presenter has to press or click.
Automatic beats (`data-auto`) play straight through, so a scene with seven beats where only beat 2 needs a press
gives two screenshots, `b1` and `b7`.  It writes `renders/NN-<scene>-b<beat>.png` (the beat the scene stopped on)
plus `renders/sheet-N.png` contact sheets (12 screenshots each), and reports: script
errors, network requests, clipped or off-stage text, text under 11 px, low contrast on frame backgrounds, a missing
concept label, AI-tell wording (including the Tredence voice's banned words), emoji, and leftover `[[placeholders]]` from the starter or the outlines.  It exits
non-zero when it finds something. Tredence frame checks retain the closed palette, Poppins, flat colour,
contrast and naming rules in `tredence-frame.md`.  Still scenes (no beats, no click) are listed as notes, not findings: fine when
the stillness is the point.  `--scene <id>` rechecks one scene.  On a full pass of a packed file it also plays every beat inside a
sandboxed frame like the one OneDrive and SharePoint use to preview a shared file (no origin, no URL changes,
no storage, no pop-ups) and reports script errors that only happen there.  Without Python Playwright (or a browser for it) it hands over to
`check_prototype.mjs`, which runs the same in-page checks, read from `check_prototype.py`, with Node Playwright and
any installed Chromium, Edge or chrome-headless-shell.  Change the checks only in the `.py` file.

`--motion` plays the scenes at presenter speed instead (no screenshots) and samples every visible block each
frame.  It reports anything that moves more than 12 px in a single frame with no movement either side: content
that snapped into place instead of gliding.  About 4 seconds a scene, so a full prototype takes under a minute;
use `--scene <id>` after an edit.  It can't judge pacing or taste, so watch the demo once at full screen too.

`pack` inlines `kit/` CSS, JS, icons and images into `dist/<name>.html`, refuses external URLs, and requires the
concept label.  The packed file is what the user presents and shares.  Poppins (`kit/fonts`, SIL Open Font
License), the brand chrome and the photos a prototype uses are embedded, so the Tredence frame looks the same
everywhere; a typical packed prototype is 2 to 4 MB.  Product scenes use the machine's Segoe UI, as the real
products do.

## Skill regression checks

Run `python -m unittest discover -s tests -v` from the skill repository. The tests require Python Playwright,
Pillow and Microsoft Edge, and create their prototypes in temporary folders. They cover engine 1.14.8,
play/pause and mouse navigation, driven mode and outline export, work traces and Workspace counters, Tredence
brand checks, offline packing and the shared-file preview sandbox. The Tredence adaptation also fixes
`proto.go(scene, true)` settling on a scene with no beats, including the optional branded sign-off.
