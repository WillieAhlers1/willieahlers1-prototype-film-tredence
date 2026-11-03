---
name: prototype-film-tredence
description: Tredence prototypes and concept films. Builds clickable "art of the possible" HTML prototypes a Tredence team shows a customer: a custom agent app for the customer (Fluent 2, built on Microsoft's AI stack) as home, realistic Teams, Outlook, Dynamics 365 and Power BI screens, framed in the Tredence 2026 brand (Bright Orange, Poppins, official logos, #BeyondPossible). Then, if wanted, turns the prototype into a narrated, captioned 1080p concept film with an offline voice, original music and Tredence graphics. All data fictitious; ships as one HTML file and one MP4. Use to prototype, mock up, storyboard, demo or visualise an AI, agent or Copilot scenario for a Tredence customer meeting; to change, fix or repackage a prototype; to make a film, video or narrated walkthrough of one; or to change a film's narration, pronunciation, voice, pacing, graphics, music or length. Not for slide decks (pptx-tredence).
---

# Tredence prototypes and concept films

**The test that matters most: does the room leave saying "we have to do this", because they've seen their
business work in a way they hadn't pictured, and would a Tredence lead show it to them with a
straight face?**  Not "nice tool", not "that would save us time".  Before you show any scene, picture it on the
meeting-room screen with the customer's business leader and IT lead watching.  If it only makes today's work
faster or wider, think bigger.  If anything looks generic, fake-shiny, or promises more than a concept can, fix it.

**You bring the idea.**  You know this industry: how it makes money, what its customers want and can't get, what
its regulators watch, where its best people lose their days, and what agents now make cheap.  Use all of it.  The
room didn't come to see its process a little faster; it came to see a future it hadn't pictured, made concrete
enough to believe.  Don't hold back, and don't settle for your first idea: every competitor has that one too.
Tell the fullest version of the story, not the smallest: real work has friction, judgement and people on the
other side.  The rules in this skill keep the demo honest and well made.  None of them asks you to think small.

What you build is a **concept, not a product**: scripted, fictitious, offline, and always labelled.  It shows how
the business *could* work.  It never calls a real system, never uses real customer data, and never implies
something ships.  The prototype comes first; a **concept film** of it is an option at the end (§The film), and the
prototype is designed so that the film paces itself from it.

**You design it.**  The plumbing is fixed (kit, engine, label, packing) and so is the quality bar below.  The
story, the screens, their order and their layout come from this customer.  Two prototypes for different customers
should never look like the same demo with the names swapped.

## Think big: reimagine the business

A prototype that shows one person getting through a task faster is a productivity demo; one that shows the same
business covering more is an operations upgrade.  The room nods and moves on.  Aim for the business itself
changing because people and agents now work together, and show what that is worth.
→ `references/story-and-data.md` §Start with the business shift

| Ambition | What the room sees | What they say |
|---|---|---|
| Faster task | The same work, done quicker with an assistant | "Nice tool" |
| Work taken off | Agents gather, check and draft; people decide | "That would save us time" |
| Same business, run better | The rationing stops: everyone covered, every case checked, ahead of the request | "We could do more of what we do" |
| **Business reimagined** | Because the work is now fast and cheap, the business becomes what it couldn't be: perhaps it sells what it couldn't deliver, changes its relationship with its customers, redesigns jobs around judgment, or competes on new ground | "We have to do this" |

Aim for the fourth.  The first three are how you get there and how you prove it, not the point.  If it's the same
business doing the same things earlier, faster or for more people, it's the third.  The fourth row gives
directions, not a list to pick from: the right idea belongs to this customer.  If the user asks for something
smaller (one task, one workflow), build what they asked, and offer the bigger idea in one line.

- **Tredence's point of view is the last mile**: insight matters when it changes a decision someone makes every
  day.  Most customers already have the data and the dashboards; look for the decision that still doesn't change,
  and show the agent putting the answer in front of the person who makes it, while the person still decides.
- **Go wide before you choose.**  In `brief.md`, write at least three ideas for this customer: the one they'd
  expect, one that stretches them, and one that changes what the business is (what it sells, who it serves, how
  it earns, what its people do).  Then argue with your pick as their CEO would: "Isn't that what we do now, just
  sooner or for more clients?"  If the honest answer is yes, take the bolder idea and make it believable.  The
  room can always dial an idea down; it can't imagine one it wasn't shown.
  → `references/story-and-data.md` §Questions that break the frame
- **Then pin it down before the screens**: the constraint the business lives with today, how it could work
  instead (what it offers, who it serves, how, by whom), the measure that moves and the leader who owns it, and
  the work before and after: steps that disappear, hand-offs that collapse, who owns what now, where people
  decide.  → `references/story-and-data.md` §Start with the business shift
- **Make it real at two heights**: the room should see real work change, with someone deciding (one person, a
  team, their customer, whoever shows it best), and grasp what that means across the business (the book, the
  region, the network, the measure).  That's what they understand, not two scenes: one moment can carry both,
  and a leader's report is only one way to show scale.
- **Show it, don't just say it.**  The new business and the redesigned work happen on screen somewhere, in
  whatever way suits this story.  If the only place you can point to is the close, it's a claim, not a demo.
- **A list of capabilities is not a storyline.**  Tell the story the list is for, and let each capability appear
  where it matters; map items to scenes in `brief.md`, not on screen.
- **Cover and close, if you use them, carry the idea**: the business change in the customer's words; what it
  could become and be worth; an ask only if the meeting needs one.  Never a product tagline, a recap, or a
  fill-in of the starter's placeholders.
- **Bold idea, honest labels.**  The caution in this skill is about numbers, labels and what the agent may do
  without a person; it never limits the idea.  Don't shrink the vision to make the numbers easy.  Numbers are
  rounded, labelled "Illustrative", with their basis in `brief.md` and the presenter notes.  Time freed is
  capacity for more or better work, never a cut in staff.  For a full value case or proposal, use `pptx-tredence`: the same brand and story as an editable deck.

## Find the skill folder

Everything ships next to this SKILL.md.  Call that folder `<skill>` (it may have a suffix such as `-2`; use the
newest).  It can be read-only: never build inside it.  If you need to find it:

```bash
find / -path '*prototype-film-tredence*/assets/frames.html' 2>/dev/null
```

```powershell
Get-ChildItem C:\ -Recurse -Filter frames.html -ErrorAction SilentlyContinue | Where-Object FullName -match 'prototype-film-tredence' | Select-Object -ExpandProperty FullName
```

## Where you're running

- **Claude Cowork on a Mac (primary).**  Commands run in Cowork's Linux sandbox against the folder the user shared
  (the workspace).  `pip install` works there; use it for what's missing (`playwright`, `numpy scipy pillow`,
  `kokoro-onnx soundfile`, `imageio-ffmpeg`).  Keep everything worth keeping in the workspace: `working/<name>/`
  for each prototype and `.tredence/` for the voice model, the voice profile and your pronunciation list.  The
  user's Mac itself (its `say` voices, its apps) is out of reach.  There's no image generator: ask the user for
  photos when the film needs them.
- **Copilot Cowork on Windows (secondary).**  Never run `pip install` or `npm install` (no package source; they
  hang).  The checker and recorder fall back to Node Playwright under docgen-utils (`qa-and-feedback.md` §Running
  the check).  Voice with Azure AI Speech through `voice.py --engine azure`; ImageGenerate can make the film's
  photos.  PowerShell paths: `%TEMP%\film-<name>` for the film build folder.

## What's in this skill

- `assets/starter.html`: the kit wiring, the concept label, and frame examples (a Tredence cover, a close, and an
  optional #beyondpossible sign-off), every word a `[[placeholder]]`.  Copy it to start.  **The starter scenes show
  the styles and the code, not a story or layouts to reuse.**  Delete any you don't need; design the rest.
- `assets/shells.html`: each screen's chrome as an outline, every word a `[[placeholder]]`: the agent app's
  Home, a chat with a work trace and approval card, a Power BI answer, a multi-step plan with its Workspace drawer, proof in the browser pane, the agent's Activity view, Skills settings, Teams, Outlook mail and calendar,
  Dynamics 365, a Word draft, a Power BI report, and the customer's own business app.
- `assets/frames.html`: each Tredence frame layout as an outline: cover, their world, a from → to matrix, where
  we'd start, the #BeyondPossible chapter break, the solid orange divider, the ask on a photo, the closing.
- `assets/kit/`: the shared kit every prototype uses, unchanged: `proto-style.js` (Fluent 2 tokens and product
  shells, the custom agent app drawn in Fluent 2, the Tredence frame and its chrome), `proto.js` (upstream 1.14.8
  scene engine, play/pause, reading floor, driven API and presenter controls), `icons.js` (Fluent System Icons),
  `brand/` (official Tredence logos and template chrome), `fonts/` (Poppins), `photos/` (the brand photo set).  The
  film uses the same fonts and logos.
- `assets/check_prototype.py`: steps through the prototype like a presenter, screenshots every stop, makes contact
  sheets and flags problems.  `check_prototype.mjs` is its Node runner.
- `assets/pack_prototype.py`: turns the prototype into one self-contained HTML file and blocks network use.
- `assets/film_ready.py`: checks the packed prototype against the film's pacing rules and writes a narration draft
  from its `data-note` lines.
- `assets/cleanup.py`: the end-of-job clean-up (§Clean-up).
- `film/`: the concept-film pipeline: `scripts/` (build folder, voice, pronunciation, narration-led timing,
  recorder, music, mix, captions, assembly, review), `templates/` (`graphics.html`, `film.json`, `narration`,
  `lexicon.json`), `lexicon/tredence.json` (shared pronunciations), `examples/woodgrove-sample/` (a short worked
  film and test fixture).  → `film/scripts/README.md`
- `references/`: for the prototype `story-and-data.md`, `look-and-feel.md` (product scenes), `tredence-frame.md`
  (frame scenes, palette, logos, photos, voice), `engine.md`, `qa-and-feedback.md`, `film-pacing.md`; for the film
  `film.md` (the loop, timing, levers), `narration.md`, `voice.md`, `film-look.md`, `film-qa.md`.

Read references progressively: `story-and-data.md` before the storyboard questions; `film-pacing.md` before
building; only the product and engine sections needed while building; `tredence-frame.md` for frames;
`qa-and-feedback.md` before showing anything; the film references only once the user wants a film.

No finished prototype ships with this skill, on purpose: with one in the skill, agents copied its scenes, order and
layouts.  Find the story first; then choose the screens.  (The film example's prototype is a deliberately tiny
test fixture, not a model.)

## How you work

- **Folder per prototype**: `working/<short-name>/` in the user's workspace (not inside the skill), holding
  `brief.md`, `prototype.html` (a copy of `assets/starter.html`) and `kit/` (a copy of `assets/kit/`).  A film adds
  `film/` there; its build folder lives outside the workspace (`film.md`).
- **Fixed plumbing, open design.**  `prototype.html` holds the scenes and its own `<style>` block; never edit
  `kit/`.  No frameworks, CDNs, web fonts or network calls, so every prototype packs into one file.  On top of
  that, design freely: combine the kit's parts, restyle them in `<style>`, or build views the kit doesn't have
  from its tokens (Fluent in products, `--td-*` on frames).
- **Work in small, visible turns.**  Ask the storyboard questions before the storyboard; show the storyboard before
  building scenes; show screenshots after building; for a film, the script before voicing and contact sheets after.
- **Edit in place.**  Later changes go into the same `prototype.html`, then check and pack again.
- **Do the review yourself**, never with a subagent.

## The loop

1. **Brief** (`brief.md`).  Who is in the room (industry, roles), the problem in their words, the one moment that
   should make them lean in, what they should believe afterwards, the ask if there is one, how long they have, and
   anything that **must show**.  Go wide first (§Think big: three ideas, argued as their CEO would).
2. **Storyboard questions: one stop, before building** (§Storyboard questions).  One message, every answer already
   filled in with your best read, so "go" accepts them all.
3. **Storyboard** (in `brief.md`; show it in your reply, but don't stop for approval: the questions were the stop).
   The shift in one sentence; the beats the room must see happen, following the design-thinking stages; then, for
   each beat, the screen that shows it best.  The table: scene, stage, screen, what the presenter says (one spoken
   line), what happens on screen, what the presenter clicks, stop seconds.  Every must-show item has a row.
   → `references/story-and-data.md`, `references/film-pacing.md`, `references/look-and-feel.md` §What screens mean
4. **Cast and data sheet** (in `brief.md`).  The fictional company, people, records, dates and numbers, written
   once and reused identically in every scene, with how each name is said if it isn't obvious (the film's
   pronunciation list starts here).  **Their data looks like Power BI**: when a scene shows a trend, gap or
   breakdown from data the customer would really have, draw it as a Power BI visual (`figure.pbi[data-chart]`)
   from a named report, never a hand-made chart.  Projections and "with agents" what-ifs aren't report data: show
   them, labelled "Illustrative", in a view you design or on a frame scene.  No scene needs a chart.
   → `references/story-and-data.md`, `references/look-and-feel.md` §Power BI
5. **Build scenes** in `prototype.html`, each one for its beat, **following `references/film-pacing.md`** whether or
   not a film is planned: one idea per stop, a `data-note` on every stop (its "presenter says" line), streamed text
   that fits its line, a `data-hold` on the signature moment, clean scene ids.  Compose from the outlines in
   `shells.html` and the kit's building blocks, or build what the kit doesn't have from its tokens (Fluent in
   products, `--td-*` on frames).  Give the signature moment a view designed for it.  The agent app (its frame, the
   agent's message header, work trace, answer card, approval and input cards, and the Workspace drawer) uses the
   kit's Fluent 2 custom-app design, never Copilot's; keep their shape and write every word for this story.  Product
   scenes use `class="scene zoom"`; the Tredence frame (`td-` layouts from `frames.html`, Poppins and the closed
   palette) is for frame scenes (a cover, a chapter break, a close), if the story uses them.
   → `references/tredence-frame.md`, `references/look-and-feel.md` §Components you can draw, §The agent's work, `references/engine.md`
6. **Check.**  `python <skill>/assets/check_prototype.py working/<name>/prototype.html`.  Fix each finding, or say
   why it stays.  Then review the contact sheets against the checklist in `references/qa-and-feedback.md`.  After
   an edit, recheck that scene with `--scene <id>`; finish with one full pass that finds nothing new, then one
   `--motion` pass, and fix anything that jumps.  Delete `renders/` when done.  If the check can't find Playwright
   or a browser, see `qa-and-feedback.md` §Running the check.  If the check can't run at all, say so; never pass off
   a code read as a visual check.
7. **Pack.**  `python <skill>/assets/pack_prototype.py working/<name>/prototype.html` →
   `working/<name>/dist/<name>.html`.  Check the packed file once more.  Then
   `python <skill>/assets/film_ready.py working/<name>/dist/<name>.html --target <film length>` and fix what it
   finds, so the prototype is film-ready either way.
8. **Deliver the prototype.**  The packed file path, how to run it (Space plays and pauses, → steps, N notes), the
   big idea in one line, what's illustrative and its basis, and open questions (`qa-and-feedback.md` §Delivery
   note).  Give the Test question to ask in the room, put it in the presenter notes of the scene it tests, and leave
   a "What we learned" line in `brief.md`.  **Then offer the film**: "Want a narrated film of this to play in the
   meeting or send ahead?  (yes / later / no)", pre-selecting what the storyboard questions said.
9. **The film**, if wanted (§The film, `references/film.md`).
10. **Clean-up**, once the user is happy with what they have (§Clean-up).

## Storyboard questions

One message before the storyboard, built from the brief and what the user said.  Don't ask open questions: write
your best answer to every line, specific to this customer and industry, mark guesses "(my guess)", and give the
alternatives where there's a real choice.  Use the form tool if you have one (answers pre-filled, the
recommended option first), otherwise plain text: "Before I build, here's my read.  Reply **go**, or change any
line."  The questions follow the design-thinking stages, so the storyline does too:

| Stage | Question | Pre-filled with |
|---|---|---|
| Empathize | **Whose day do we follow?**  The role, and the fictitious name you'd use | The person whose work shows the shift best |
| Empathize | **Where does their work start today?**  An inbox, a phone in the field, a meeting, a queue in their own system, the customer's website | What's true for that role |
| Define | **The last-mile decision**: the everyday decision that still doesn't change, in their words, and what's hard about it | Drafted from the brief |
| Ideate | **The big idea**: what this business could become or do that it can't today, why agents make it possible now, the measure that moves (roughly, illustrative) and the leader who owns it.  Then: "Also considered: <the safer idea> · <the wilder one>" | The boldest idea you can make believable |
| Prototype | **The moment to land**: the one thing the agent does that makes the room lean in | Drafted |
| Prototype | **How the work changes**: what disappears or merges, what the agent does on its own, where a person decides | Drafted |
| Prototype | **Must show**: systems, screens, data, people or moments that have to appear (their ERP, a named Power BI report, a Teams hand-off, a regulator's view) | "Nothing specific" unless the brief names something |
| Test | **What we want to learn from them**: the one guess about how they work that the demo tests, asked in the room | Drafted |
| Format | **Opening**: Tredence cover · cold open on the trigger · the night before | Tredence cover |
| Format | **Close**: the business from above + one ask · the ask only · straight to the #beyondpossible sign-off | Business view + ask |
| Format | **Tone**: calm and executive · energetic · detailed for IT | Calm and executive |
| Format | **Length**: live demo (minutes) and film (2:30 · 3:00 · 3:30) | Demo ~5 min, film 3:00 |
| Format | **Customer name** on the cover tag and in the film's first line, or "Concept" | "Concept" |
| Format | **Film**: yes · decide after the prototype · no | Decide after the prototype |

If the big idea is the same business doing more of the same, it isn't big enough: go back to your ideas first.
Skip the stop if the user says "just build it" or has already answered everything: that skips the stop, not the
thinking.  One round only; never ask again.  Decide anything still open yourself, safe to show the customer, with
Microsoft's fictitious names.  Put the answers in `brief.md` and list what you decided in your reply.

## The film

Offered after the prototype is delivered (loop step 8), or asked for directly ("turn the prototype into a film").
It needs the packed prototype and `brief.md`; if either is missing, ask once.  → `references/film.md` for the whole
loop.  In short:

1. `film_ready.py` on the packed file; fix what it finds.
2. A build folder outside the workspace (`film/scripts/new_film.py`).
3. **Narration** from `film-draft.txt` (the prototype's notes with `@ scene beat` stage directions), rewritten in the
   Tredence voice, 25-40 lines; `check_film.py`.  Show the script before voicing.  → `references/narration.md`
4. **Pronunciation and voice**: the film's `lexicon.json` from the cast and data sheet; `speech.py` to see every line
   as spoken; first time on this workspace, `voice.py --setup`, `--audition` and `--use <voice>`; then `voice.py`
   (Kokoro, offline, line by line) and, if available, `voice.py --listen`.  → `references/voice.md`
5. **Images** from the user if the film uses the night or morning graphics; otherwise flat colour.
6. **Timing** with `autoplan.py`: no hand-placed presses; each stop lands as its line begins.
7. Film, music, mix, captions, assemble, review the contact sheets, deliver next to the prototype.
   → `references/film-qa.md`

## Clean-up

When the job is done (the user is happy with the prototype and, if there is one, the film), ask once:

> "Shall I tidy up?  I'll keep `<Name>.html` and `<Name>-Film-v<N>.mp4`, zip the sources (brief, prototype source,
> narration, pronunciation list, images) into `<Name>-sources-v<N>.zip`, and delete the rest: the kit copy,
> screenshots, older film drafts and the film build folder.  (Zip and tidy / Delete without a zip / Leave it.)"

Default **Zip and tidy**.  First run `python <skill>/assets/cleanup.py working/<name> --build <film build folder>`
(no `--yes`): it prints exactly what it will keep, zip and delete, with sizes; show that list with the question.
Only after the user agrees, run it again with `--yes` (and `--mode delete` if they chose no zip).  Never clean up
before the user says the work is finished, and never touch anything outside `working/<name>/` and the build folder.
To edit later: unzip into `working/<name>/`, copy `<skill>/assets/kit` back in as `kit/`, carry on.

## Where the agent shows up

The agent lives in **a custom-built app made for this customer**, not in Microsoft Copilot.  Tredence builds it on
Microsoft's AI stack (for example Copilot Studio or Azure AI Foundry for the agent, Microsoft Fabric and Power BI for
the data), but on screen it is the customer's own app: its own name, the agent's sparkle mark and the agent's name,
drawn in Fluent 2.  Never brand it as Microsoft Copilot, never show the Copilot logo as its identity, and never
recreate Copilot Cowork's look.  Prototypes don't follow a fixed route through it.

- **Employees meet the agent in the custom agent app** (`.cpa` in the kit), named for this customer
  ("Contoso Assist", "Fabrikam Planner"): Home, Chat, and Agent mode for multi-step work, with Agents and Activity
  tabs.  Business data comes to it (Dynamics 365, Fabric and Power BI, the customer's own systems), with sources.
  Don't put the agent app inside Outlook or Teams.  Dynamics 365's own Copilot pane is Microsoft's product: show it
  only when the story is about Dynamics 365's built-in Copilot.
- **The story opens where the work starts.**  That may be the agent app's Home, or the trigger itself: an alert on a phone
  in the field, an email arriving, a live Teams meeting, a record in the customer's own app, or the customer's own
  customer on a website talking to the company's agent.  Pick what's true for this person.
- **Other apps appear when the story needs them**: where the work begins, people reached (Teams, Outlook), or proof
  in a system of record (often in the agent app's browser pane).  Business apps come to the person; the person doesn't
  tour the apps.
- **The customer's own systems and other platforms** (an ERP, a planning tool, a data platform that isn't
  Microsoft's) appear as an unbranded business app (`.lob`) reached through a connector.  Never imitate a real
  non-Microsoft product, including Tredence's partners' products.
- **Don't promise what isn't built.**  The custom app is a concept: say in the presenter notes what it would be
  built on and that nothing in it exists yet.
- Never copy Microsoft's or Tredence's marketing characters, or any internal or confidential material, into a
  prototype.

**Lean into the agent as a teammate, with people in the loop.**  An agent with its own name and identity that
works for a person or a team, that colleagues can @mention in Teams, and that keeps going on a goal for days while
its owner sets the objective and boundaries and stays in control.  That's often how the business changes shape:
work runs while people sleep, colleagues work with it directly, people keep the decisions.  Show it working with
the team; its Activity view shows what it did and what it left for people.  → `look-and-feel.md` §Where the agent shows up

## Design for this story

The guardrails keep it credible.  Inside them, the design is yours.

**Nothing in this skill is a scene list.**  Its rules say what must be true *if* something appears (an action
that needs approval waits for a person; their data looks like Power BI; a number is labelled) and what the room
should come away understanding.  None of them requires a screen, a scene or an order: not an approval, a proof
scene, a report, a leader's view, or even a cover and close.  If someone could guess your scene list from this
skill, you've followed it too literally.

- **Beats first, screens second.**  Write what the room must see happen, then choose the screen that says it
  best (`look-and-feel.md` §What screens mean).  Often the best one is a view the kit doesn't have.
- **Outlines are parts, not plots.**  Take the chrome you need from `shells.html`; the content, the layout inside
  it, and the order of scenes are yours.  There is no default scene list.
- **Design the signature moment.**  The one moment only this story has gets a view made for it: a timeline that
  shows the clash, the clause beside the record it contradicts, a map of who's affected, the plan before and
  after.  A stock chat answer is rarely enough.
- **Build what the kit lacks.**  A phone, a public website, a shift board, a map, a form: build it in `<style>`
  from the tokens, following the real conventions (Fluent for Microsoft products; plain and neutral for the
  customer's own systems).
- **Vary the rhythm.**  Not every scene needs a typed prompt and a streamed answer.  Open one on a notification,
  one on a finished result, one on two people at once.
- **The tests:** if this prototype's scene list could be swapped with another customer's, it isn't designed for
  this story yet.  Depth beats novelty: a full story in a familiar shape beats a thin one in a new shape.  If its
  close could be a list of features, or a fill-in of the starter's close, think again.

## Two looks, kept apart

**Product scenes look like Microsoft, not like AI**: the difference is specificity and restraint.
→ `references/look-and-feel.md`

- **Real product layouts, real density.**  Use the kit's shells.  Product scenes are mostly neutral greys and
  white; the brand blue appears only where it has a job (primary button, selection, link).
- **The agent app is the customer's own, in Fluent 2.**  Wherever people interact with the agent, draw it with
  the kit's custom agent app: the app's own name, the agent's sparkle mark and name over each reply, white message cards, brand-tinted
  messages from the person, an activity card for its work, Fluent cards for input and approval, a Fluent drawer for
  its plan.  Never brand it as Microsoft Copilot or recreate Copilot Cowork's look (serif greeting, black round send
  button, avatar-less plain-text replies, flat grey Workspace panel).  → `look-and-feel.md` §The agent's work, in Fluent
- **One AI accent.**  The teal→purple gradient marks the agent and what it touched.  Nowhere else.
- **Fluent icons only** (`<i class="ic" data-icon="...">`).  Never emoji, never icons from other sets.
- **Plausible, specific content.**  Real counts, names, dates and sources from the data sheet, never "Complete key
  tasks".  Every agent claim shows where it came from (cite chips, references).
- **The agent behaves like a careful colleague.**  It shows its work, asks before acting, admits gaps, and the
  human confirms.  No magic, no "100% accuracy", no instant everything.
- **When the agent acts, say who acts.**  Each step is *Done for you*, *Needs your input* or *Needs your approval*.
  Routine internal steps run on their own; money, trades, orders, anything sent to a customer, or anything hard to
  undo always waits for approval, with pre-checks and the policy reason. When the room needs to believe something
  happened, show where it landed; this does not require a separate proof scene.
  → `look-and-feel.md` §Who acts
- **No Tredence styling inside a product**: no Poppins, Bright Orange or Tredence logos in the agent app, Teams, Outlook,
  Dynamics 365, Power BI or the customer's app.

**Frame scenes look like Tredence**: the 2026 template, nothing invented.  → `references/tredence-frame.md`

- **The template's chrome, untouched**: the kit draws the top rule, brand squares, footer, T, cover band, wordmark,
  client tag, #BeyondPossible banner and closing photo.  Never draw them, never put content over them.
- **Poppins only, the closed palette only**, led by Bright Orange, with Orange Tint and Teal Tint as backgrounds.
  Flat colour on white: no gradients (the photo shade excepted), glows, glass or shadows.
- **Titles are sentences you'd say**, with the key phrase in Bright Orange (`.td-hl`).  Never open a title with a
  number or a count.
- **Official logos and brand photos** from `kit/brand/` and `kit/photos/`, unrecoloured.  White text on a photo only
  over the Charcoal shade.
- **The Tredence voice**: start in the customer's world, say what changes in someone's day, "we" and "you"
  together, confident but never promotional.  Sound out every word.

No AI-default design anywhere: no glassmorphism, neon glows, purple-gradient hero sections, card grids of
"features", giant stat counters, rocket/brain/sparkle-everywhere, or lorem-ipsum-grade copy.

## Non-negotiables

- **Nothing works for real.**  No network calls, APIs, logins or live data.  The packer refuses external URLs.
- **Fictitious data only.**  Microsoft's fictitious companies and demo personas (`story-and-data.md`).  Never a
  real customer's data, a real person (other than the presenter if the user asks), a real deal, a real internal
  system record, or a Tredence client, client result, quote or award.  The customer you're presenting *to* can be
  named on the cover tag only when the user confirms it's allowed; their data inside the scenes is still invented
  and labelled.
- **Always labelled.**  `<body data-concept="Concept demo · Fictitious data">` stays on, on every scene.
- **No promises.**  Real product names, used accurately ("Dynamics 365 Sales", "Microsoft
  Teams", "Copilot Studio", "Microsoft Fabric").  The custom agent app's name is the customer's, never a Microsoft product name.  Don't invent Microsoft product names, SKUs, prices, roadmap dates, scope,
  timelines or capability claims; describe the agent by what it does.  Tredence products and accelerators appear
  only if the user asks, described by what they do, never as a working product.
- **Brand.**  "Tredence" in text, never "TREDENCE".  Frame scenes use the Tredence template, Poppins and the palette
  only; the check blocks violations.  Product scenes stay Microsoft.
- **Accessible enough to present.**  Text at least 11 px at the 1920 stage (18 px on frame scenes), real contrast
  (orange text and white on orange only at 24 px and up), works with keyboard, and `prefers-reduced-motion` shows
  the final state.
- **Stay in scope.**  "Change scene 3" means scene 3.  Don't reopen approved scenes.
- **The film follows the same rules**: fictitious and labelled, every number traced and called illustrative, the
  Tredence voice, original music, images of fictional people only, never a scratch voice delivered, never a claim
  that the audio was listened to (`references/film.md` §Non-negotiables).

Feedback ("looks fake", "doesn't look like Tredence", "they all look the same", "too slow", "it just stopped"):
`references/qa-and-feedback.md` §Feedback playbook.  On a film ("it mispronounces X", "too fast", "the voice"):
`references/film-qa.md` §Feedback playbook.

## Human authority

You draft, build and check.  The user owns the story, the claims, and the decision to show it.  Never present a
prototype or film as a working product, send it externally, or claim approval that wasn't given.  Never delete
anything without the user's yes.  The Tredence voice guide
is a draft pending review by a Tredence brand or communications owner.

Merged from the `prototype-tredence` and `concept-film-tredence` skills.  Built on Harrison's `prototype-frontier`
skill (engine, Fluent kit, checker and story method), the Frontier `concept-film` pipeline, and the `pptx-tredence`
skill (Tredence 2026 template, brand and voice).  Voice: Kokoro-82M (Apache-2.0).
