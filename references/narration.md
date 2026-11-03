# Narration: story and voice

The narration is the presenter's voice, recorded.  It tells the prototype's story in the Tredence customer voice,
and every line is something a Tredence lead would say out loud across the table.  The voice guide behind it is a
draft (pptx-tredence `references/tredence-voice.md`), pending review by a Tredence brand or communications owner.

## From the brief to the film

The prototype's `brief.md` already holds the story (the storyboard questions' answers, the storyboard, the data sheet).  Map it; don't reinvent it.

| In `brief.md` | In the film |
|---|---|
| The big idea (Ideate: from → to, measure, owner) | The close: how the business could work and what it could be worth, on illustrative numbers |
| Whose day and the last-mile decision (Empathize, Define) | The opening: one person, one everyday decision that doesn't change today, and why |
| The moment to land (Prototype) | The longest, slowest part of the film; give it room and its own lines |
| How the work changes (Prototype) | A line in every agent scene on what the agent did and what the person decides |
| What we want to learn (Test) | Not in the film.  It's the question for the room after the film plays |
| Storyboard, "presenter says" (each stop's `data-note`, in `film-draft.txt`) | The seed line for each stop: tighten it, then add one line if the stop needs it |
| Data sheet | Every name and number the narration uses, written exactly as on screen |

A typical shape (a shape, not a template): the cover and their world → the night before (establishing shot, the
simulation if there's an engine) → what the agent prepared → the person's morning → the product scenes, on the
ground → the business from above → the close and the ask → the #beyondpossible sign-off, with music only.

## Stage directions

`narration.txt` says which prototype stop or graphic each line belongs to, with `@` lines (`film.md` §Timing):
`@ <scene-id>` before the lines spoken over a scene's opening, `@ <scene-id> <beat>` before the lines spoken over a
later stop, `@ gfx night|morning|endcard` for graphics, `@ hold 1.5` for a pause.  `film_ready.py` writes a first
draft from the prototype's `data-note` lines: keep its directions, rewrite its lines.

## Lines

- **25-40 lines** for 2:30-3:30.  One idea per line, 1.5-13 s spoken (about 15 characters a second).
- **Write for the ear.**  Short sentences.  Say what happens and who decides.  No aphorisms, no rhetorical
  questions, no "imagine a world".
- **The first line** says whose concept this is, for whom, whom we follow, and that the company, people and numbers
  are fictional: "This is a concept from Tredence for small-business lending.  We'll follow one credit analyst,
  Adele Vance, at Woodgrove Bank.  The bank, the people and the numbers are fictional."
- **Name the customer** (their real company) only if the user confirmed it's allowed, the same rule as the
  prototype's cover tag.  Otherwise name the industry.  Inside the story, the company is always the prototype's
  fictitious one.
- **Start in their world.**  Name what's true for them before any agent appears: how the decision gets made today,
  where the data really lives, why nobody has time to pull it together.
- **The agent is a careful colleague.**  It reads, checks, simulates and drafts; it asks before anything leaves
  the organisation; the person decides.  Say the limit once, plainly: "It can read, simulate and draft, but it
  can't approve a loan or contact a customer."
- **The close**: how the business could work (from → to, in operating terms), what it could be worth (illustrative),
  then one ask, spoken as the ask appears on screen.  Never a recap of the scenes, never a feature list.
- **The ask** is specific, small and measurable: "Let's run a 60-day shadow pilot with one lending team, measured
  against today's arrival order."  Not "let's talk about how AI can help".

## Numbers

- **Every number traces** to the data sheet or the engine output.  `check_film.py` prints every number it hears;
  tick each one against its source before voicing.  No source: leave it out and tell the user.
- **Round for the ear, keep it true**: "two or three of her five" for 2.43 of 5; "about one in five" for 21%;
  "millions of simulated days" for 3,000,000; "1.17 million dollars to 1.37 million".
- **Say "illustrative" once**, where the impact number is spoken.  The on-screen label carries it the rest of the way.
- **Capacity, not cuts.**  Time freed is more customers served, more cases checked, faster answers: never fewer
  people, headcount or FTEs.
- Write numbers as they appear on screen ("7:30", "$1.17M", "60-day"): `speech.py` turns them into words for the
  voice ("seven thirty", "1.17 million dollars") while the captions keep the written form.  `python speech.py`
  shows every line as it will be spoken.  Names, acronyms and products the voice could get wrong go in the film's
  `lexicon.json` (`voice.md`).

## Words

The Tredence voice, spoken.  `check_film.py` blocks the left column (and the same AI-tell list as the prototype checker).

| Never | Say instead |
|---|---|
| leverage, utilise | use, build on |
| unlock, unleash | say what changes |
| journey, transformation journey | what happens next |
| flywheel | each round builds on the last |
| empower, enable your organisation | your team can now … |
| seamless, best-in-class, world-class, game-changing, cutting-edge, revolutionary | a specific result, labelled illustrative |
| synergy, harness, delve, magic | say the plain thing |
| "TREDENCE", "Tredence Inc.", "Tredence Analytics" | Tredence |
| exclamation marks | a full stop |

Product names are used accurately and only as the prototype shows them: "Teams", "Outlook", "Power BI",
"Dynamics 365", "Copilot Studio", "Microsoft Fabric".  The agent app is the customer's own (its name from the
prototype, "Woodgrove Assist"), never "Copilot"; say "the agent" or the agent's name.  Never "Microsoft 365 Copilot".  Tredence products and
accelerators only if the user asks, by what they do.

## Before and after

> ✗ Woodgrove is on a transformation journey.  With Tredence's best-in-class agents, analysts are empowered to
> unlock seamless decisioning!

> ✓ Adele's queue runs in arrival order, but the customer deadlines live in notes and emails.  At two in the
> morning, while she sleeps, an agent plays her Tuesday forward.

What changed: it starts in her world; the banned words and the exclamation mark are gone; the claim became a
specific thing that happens.

## Sound it out

Read the whole script aloud at speaking pace before voicing.  If a line makes you wince, would make the presenter
wince, or sounds like a brochure, rewrite it.  Then read only the first and last three lines: they should say
who, what changes, what it's worth and the ask.
