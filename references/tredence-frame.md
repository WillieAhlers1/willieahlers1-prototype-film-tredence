# Tredence frame

The frame is where the story and the ask live: the cover, an optional chapter break, a scene that names the tension
or shows the business from above, and the close.  It's the Tredence 2026 PowerPoint template, redrawn by the kit at
half size, so a prototype and a `pptx-tredence` deck for the same meeting look like one piece of work.

Sources: the `pptx-tredence` skill's design system (Tredence Brand Guidelines FY2025 and the Tredence 2026 template)
and its customer voice guide.  All sizes here are CSS px on the 1920 × 1080 stage; the template's px are exactly
double (3840 × 2160).

## When to use the frame

| Use it for | Don't use it for |
|---|---|
| The cover: the business change, in the customer's words | Anything the product should show happening |
| A chapter break between acts (about 10+ scenes) | A slide per capability or a feature list |
| Their world and the turn, when the room needs the tension named before the demo | A recap of what the room just saw |
| The business from above, when a Power BI page isn't the right screen | Charts (numbers drawn as charts come from Power BI, in a product scene) |
| The close: from → to, what it could be worth, one ask; then the sign-off | Long text, paragraphs, or a slide-deck version of the demo |

Most prototypes need a cover and a close, nothing more.  The product scenes are the proof; if the frame starts
carrying the story, build a deck with `pptx-tredence` instead.

## Layouts

Every frame scene is `<section class="scene frame td-…">`.  The kit draws the chrome (CSS `::before` and a few lines
of script), at the template's coordinates.  Never draw chrome yourself, and never put content on top of it.

| Layout | Markup | Chrome the kit draws | Use for |
|---|---|---|---|
| Cover ("Tredence 2026 1") | `scene frame td-cover` + `.td-photo` + `.td-shade` | White TREDENCE wordmark, orange client tag with arrow, orange band with the T cut-out, #BeyondPossible, footer | The first scene |
| Content ("Tredence 2026 2") | `scene frame td-content` | Orange top rule, three brand squares (orange, teal, deep green) top right, copyright footer, scene number between orange dashes, orange T bottom right | Their world, from → to, where we'd start, the close |
| Section ("Tredence Section") | `scene frame td-section` | #BeyondPossible banner top left with an orange spine down the left edge, footer, T | A light chapter break: a badge, a big centred title, one line |
| Divider ("Tredence Blank", orange) | `scene frame td-divider` + `kit/brand/t-white.png` | None (solid Bright Orange) | A loud chapter break in a short demo |
| Ask ("Tredence Blank", photo) | `scene frame td-ask` + `.td-photo` + `.td-shade` | None | The ask on a photo, with the wordmark and Beyond Possible |
| Closing ("Tredence Closing") | `scene frame td-closing` (empty except the notes) | Full-bleed mountain photo, white #beyondpossible, orange band with the T | Sign-off after the ask.  Add nothing to it |

Pick one chapter style per prototype: the #BeyondPossible section for longer demos, the solid orange divider for
short ones.  The closing scene follows the ask; it never replaces it.

Working outlines of every layout are in `assets/frames.html` (every word a `[[placeholder]]`).  The starter has a
cover, a content-layout close and the closing.

### Zones to keep clear

| Zone | Where (px) |
|---|---|
| Top rule | y 0 to 9, full width (content) |
| Brand squares | x 1814 to 1904, y 20 to 42 (content) |
| Footer | y 1022 to 1080: hairline, copyright, the concept label, scene number, T |
| Cover wordmark | x 64 to 328, y 82 to 111 |
| Cover client tag | x 64 to 428, y 208 to 258.  The text goes in `.td-cover-tag` at left 88.5, top 215; keep it to about 16 characters |
| Cover band | y 775 to 1023 (and the T stem below it, x 96 to 136) |
| Section banner and spine | x 0 to 1466, y 0 to 202 (banner); x 0 to 48 down to y 1023 (spine).  Content in x 80 to 1888, y 250 to 995 |
| Closing | The whole scene |

## Grid

| | Value |
|---|---|
| Content span | x 50 to 1870 |
| Kicker | left 50, top 75 |
| Title | left 50, top 115 to 120 |
| Lead under a title | left 50, 15 to 35 px below the title's last line |
| Safe bottom | keep content above y 995 |
| Gaps | 15 to 25 px between columns and cards, 20 to 35 px card padding, 40+ px between groups |

**Position everything absolutely** (`.td-abs`, or `position:absolute` with `left`, `top` and, for anything that
wraps, `width`).  The chrome sits on a layer that covers anything left in normal flow.  Text goes in its own element
on top of an empty box (`.td-card`, `.td-panel`, `.td-tint`); don't pad text inside cards.

## Type (Poppins only)

Poppins ships in `kit/fonts` and is packed into the file, so the frame looks the same on every machine.  The brand
uses one family: no secondary font.  Weights: `.td-reg` 400, `.td-med` 500, `.td-semi` 600, `.td-bold` 700,
`.td-xbold` 800.

| Role | Class | Size | Details |
|---|---|---|---|
| Cover title | `.td-cover-title` | 64 | Bold, ALL CAPS (by the class: write it in sentence case), white, line-height 1.12 |
| Cover subtitle | `.td-cover-sub` | 36 | SemiBold, white |
| Cover client tag | `.td-cover-tag` | 20 | SemiBold, ALL CAPS, white |
| Kicker | `.td-kicker` | 24 | Bold, ALL CAPS, letter-spacing 3, Bright Orange |
| Title | `.td-title` | 64 | Bold, black, line-height 1.15; the key phrase in Bright Orange (`.td-hl`) |
| Lead | `.td-lead` | 32 | Regular, Charcoal, line-height 1.35 |
| Card name | `.td-cname` | 36 | Bold, black |
| Body | `.td-cdesc` | 27 | Regular, Charcoal, line-height 1.4 |
| Callout or question | `.td-callout` | 29 | Medium, Charcoal |
| Small label | `.td-label` | 18 | Bold, ALL CAPS, Deep Orange (Bright Orange is too light at this size) |
| Stat | `.td-stat` + `.td-stat-label` | 56 to 72, label 22 | Bright Orange value; Bold black label; an "Illustrative" line under it |
| Illustrative or source line | `.td-small` | 20 | Regular, Charcoal, directly under what it qualifies |
| The ask | `.td-cta` | 30 | SemiBold, white on a Bright Orange pill, Fluent `arrow_right` |

Floor on a frame scene: 18 px (the template's 36 px).  Titles are sentences you'd say out loud, in sentence case,
with the key phrase in Bright Orange; never open a title with a number or a count.

## Palette (closed)

"We always start our designs with Bright Orange.  Add more colors from this palette as required.  Do not add more
colors."  The check blocks any other colour on a frame scene.

| Name | Hex | Token | Use |
|---|---|---|---|
| Bright Orange | `#FE5000` | `--td-orange` | Primary: title key phrase, kickers, bars, number squares, accent bars, the ask, the divider |
| Teal | `#6DCDB8` | `--td-teal` | Accent: a second series or phase.  Black text only |
| Deep Green | `#004E42` | `--td-green` | Accent: a third phase, dark bars |
| Deep Orange | `#8A1F04` | `--td-deep-orange` | Small labels; a dark warm series |
| Highlight Orange | `#F48120` | `--td-hi-orange` | Rare light warm series.  Black text only |
| Charcoal Grey | `#404041` | `--td-charcoal` | Body text, the band, the photo shade, the "Today" header |
| Grey | `#929497` | `--td-grey` | Rules and secondary marks.  Not for text under 28 px |
| Off White | `#E6E7E8` | `--td-off-white` | Panels, card borders, hairlines |
| White, Black | `#FFFFFF`, `#000000` | | Backgrounds and cards; titles and headings |
| Orange Tint | `#FFEDE5` | `--td-orange-tint` | Backgrounds only: the "with agents" cells, defining sentences |
| Teal Tint | `#E2F5F1` | `--td-teal-tint` | Backgrounds only: a second row or series next to Orange Tint |

The frame is flat colour on white: no gradients (the photo shade is the one exception), glows, glass or shadows.
The agent gradient belongs to the agent in product scenes, never to the frame.

### Contrast

| Pair | Rule |
|---|---|
| Black or Charcoal on White, Off White or a tint | Any size |
| White on Charcoal, Deep Green or Deep Orange | Any size |
| Black on Bright Orange, Teal or Highlight Orange | Any size |
| White on Bright Orange; Bright Orange on White | 24 px and up only (bars, the ask, the divider, kickers, title key phrases) |
| White on Teal or Highlight Orange | Never |
| White on a photo | Only over the Charcoal `.td-shade`, and only the title, one line and the ask |

The check measures every line of text on a photo against what's actually behind it (WCAG 4.5:1, or 3:1 for text
24 px and up or 18.66 px bold).  If it fails, raise the shade's alpha a little (`--a0`, `--a1`) or shorten the text;
never add text shadows or a dark box.

## Logos

The official files are in `kit/brand/`.  Use them as they are: no recolouring, effects or stretching.  The cover,
footer and closing logos come from the chrome, so don't add them again.

| File | Use |
|---|---|
| `wordmark-white.svg` | On a photo, Bright Orange or a dark background (the ask scene) |
| `wordmark-orange.svg` | On white, if a view you design needs it |
| `wordmark-tagline-white.svg` / `-orange.svg` | Wordmark with Beyond Possible, standalone |
| `t-white.png` | The big T on the solid orange divider |
| `t-orange.svg` | The T mark (the chrome already places it) |

Clear space around any logo equals the height of the T.  Orange on light, white on dark or photo; there is no black
version.  Logos never appear inside product scenes: those belong to Microsoft products and the customer's systems.

## Photos

The brand's photo style is "adventurous attitude and friendly nature... companionship, aspirations, and the thrill
of exploration".  `kit/photos/` holds the brand set, resized to 1920 px (credits in `kit/photos/sources.json`):

| File | Content | Good for |
|---|---|---|
| `mountains.jpg` | Alpine lake, mountains, autumn colour | Cover (focus 50% 30%) |
| `explorer.jpg` | Person looking over a misty lake | The ask, chapter breaks |
| `aspiration-mountain-team.jpg` | Friends against a mountain range | Ambition, shared goals, the ask |
| `aspiration-sunrise-summit.jpg` | Sunrise over a rocky summit | Covers, what becomes possible |
| `community-campfire.jpg` | Friends around a campfire | Trust, team culture |
| `community-park-picnic.jpg` | Friends at a picnic (portrait) | Community, informal teamwork |
| `community-rooftop-joy.jpg` | Friends smiling on a rooftop | Positive outcomes |
| `companionship-beach-friends.jpg` | Friends walking by the coast (portrait) | Momentum, moving together |
| `companionship-forest-hike.jpg` | Friends ready for a forest hike | Shared exploration |
| `companionship-kayak-duo.jpg` | Two people kayaking | Partnership, coordinated action |
| `exploration-cliff-silhouette.jpg` | Explorers at an overlook (portrait) | Perspective, milestones |
| `exploration-kayak-group.jpg` | A group kayaking across open water | Progress, moving together |

A photo goes in a `.td-photo` div (`background-image:url(kit/photos/…)`, `background-position` for the focus),
with a `.td-shade` after it (`--a0` left alpha, `--a1` right alpha; about `.7`/`.2` on a cover, `.45` on the ask).
A photo the user supplies takes priority: put it in the prototype's `kit/photos/` at 1920 px wide or less.  Packed,
only the photos a prototype uses travel with it.

## Components

| Component | Markup |
|---|---|
| Kicker and title with an orange key phrase | `<p class="td-abs td-kicker">` + `<h2 class="td-abs td-title">Plain words <span class="td-hl">key phrase</span></h2>` |
| White card | `<div class="td-card" style="left;top;width;height">` (flat, Off White border, radius 12) |
| Panel | `<div class="td-panel">` (Off White, radius 12) with a `.td-accent` (8 px orange bar) on its left edge |
| Tinted cell | `.td-tint` (Orange Tint) or `.td-tint-teal`, square corners, text in its own element on top |
| Number square, section badge | `.td-num` (orange square), `.td-badge` (orange circle) |
| Header bar, pill header | `.td-bar` (white Bold on orange; `style="background:#404041"` for a Charcoal one), `.td-pillh` |
| Band | `.td-band`: Charcoal, white text; what runs under everything above it |
| Hairline | `.td-rule` (Off White; `background:#fe5000` between matrix rows) |
| Bullets | `<ul class="td-abs td-bul">` (orange bullets) |
| Stat | `.td-stat` + `.td-stat-label` + a `.td-small` "Illustrative · basis" line |
| The ask | `<div class="td-abs" style="left;top"><span class="td-cta">Let's agree the first region <i class="ic" data-icon="arrow_right"></i></span></div>` |
| Fluent icon | `<div class="td-ico" style="left;top;width;height"><i class="ic" data-icon="…"></i></div>` (orange; size the wrapper) |

Motifs to repeat: the orange key phrase in titles, numbered squares, orange header bars over white cards, Off White
panels with an orange accent bar, the Charcoal band, Orange Tint for "with agents".

### What the layout says

People read the layout before the words.  Left to right means time and sequence.  Up and to the right means growth.
Equal columns mean options of equal weight; a band underneath means something that runs through all of them.  Size
and contrast mean importance: the title wins.  Colour order follows the brand: Bright Orange first, then Teal and
Deep Green.

## Beats on frame scenes

Frame scenes use the same engine as product scenes (`engine.md`).  Reveal in reading order with `data-beat`
(the "with agents" column row by row, then the measure, then the ask), and keep the cover still: the engine
warms up the other scenes while it's showing.  Every element that shares a beat (a box and the text on it) carries
the same `data-beat`.  The concept label sits in the footer; leave that space clear.

## Voice

The Tredence customer voice applies to every word on a frame scene and in the presenter notes (it's a draft, pending
review by a Tredence brand or communications owner):

- **Start in the customer's world.**  Name what's true for them before you mention Tredence.
- **The last mile.**  Insight matters when it changes a decision someone makes every day.  Say what changes in
  someone's day, not which accelerator is involved.
- **One team with theirs.**  "We" and "you" together: we build it with your team and leave it able to run it.
- **Confident, not promotional.**  No superlatives, no exclamation marks, no manufactured urgency.
- **Sound it out.**  Read every visible word aloud as the presenter, across a table.  If nobody would say it that
  way, rewrite it.  Slogans ("Unify your data. Activate insights."), commands at the customer, noun stacks and
  internal words all fail.

| Say | Not |
|---|---|
| "Use", "build on" | "Leverage", "utilise" |
| "Say what changes" | "Unlock", "unleash" |
| "What happens next" | "Journey", "transformation journey" |
| "Each round builds on the last" | "Flywheel" |
| "Your team can now…" | "Empower", "enable your organisation" |
| A specific result, labelled illustrative | "Best-in-class", "world-class", "seamless", "game-changing" |

**Naming.**  "Tredence" in text, never "TREDENCE" (that's the logo), "Tredence Inc." or "Tredence Analytics".
"Beyond Possible" in the logo lockup; "#BeyondPossible" is chrome.  Tredence products and accelerators (MLWorks,
Sancus, UnityGO, Customer Cosmos, ATOM.AI and others) appear only if the user asks, described by what they do, and
never as a working product in a scene.

**Evidence.**  No Tredence client names, client results, quotes or awards in a prototype.  The customer you present
to can be named on the cover tag only when the user confirms it's allowed; everything inside the scenes stays
fictitious and labelled.
