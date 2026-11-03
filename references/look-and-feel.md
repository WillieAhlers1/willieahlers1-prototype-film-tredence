# Look and feel

Two design languages, each with one job:

- **Fluent 2** for product scenes: the customer's custom agent app and the Microsoft products around it.  This is
  where "that looks like a real, well-made app" comes from.  The agent app is custom-built for the customer on
  Microsoft's AI stack (Copilot Studio or Azure AI Foundry, Microsoft Fabric, Power BI), so it's drawn in Fluent 2
  with the customer's own app name, never as Microsoft Copilot.  Teams, Outlook, Dynamics 365 and Power BI look
  exactly like the real ones.
- **The Tredence 2026 frame** for the cover, an optional chapter break, a scene that names the tension or shows the
  business from above, and the close.  This is where the story and the ask live.  → `tredence-frame.md`

The two never mix: no Poppins, Bright Orange or Tredence logos inside a product, and no Fluent chrome, agent
gradient or product UI on a frame scene.

All sizes are CSS px on the 1920 × 1080 stage.  Product scenes use `class="scene zoom"`, which lays the UI out at
1536 × 864 and shows it at 125%, the way a laptop shows it, readable from the back of a room.

**Design and product facts, last checked.**  Products change.  If you know something newer, the product wins: draw
what's true and note the change in `brief.md`.

| Facts | Source | Last checked |
|---|---|---|
| The agent app is a custom-built app for the customer, not Microsoft Copilot: its own name, the agent's sparkle mark and name, Home with Chat and Agent modes, Agents and Activity tabs, Skills settings, a browser pane | Tredence decision; drawn with Fluent 2 | 2026-10-27 |
| The agent UI: message header, work trace, answer and action cards, the Workspace drawer | Fluent 2 design system (web components and its AI patterns), never a copy of Microsoft Copilot or Copilot Cowork; Tredence decision | 2026-10-27 |
| Power BI visual defaults | Microsoft Learn: "Visual defaults in Power BI reports" | 2026-10-21 |

## Fluent 2 product scenes

**Type** (Segoe UI): caption 12/16, body 14/20, body-large 16/22, subtitle 20/28 semibold, title 24–32 semibold.
Weights 400 and 600 only.  Sentence case for everything, including buttons and headers.

**Colour.**  Neutrals do most of the work: page `--bg3` #f5f5f5, surfaces `--bg1` white, text `--fg1` #242424,
secondary `--fg3` #616161, strokes `--stroke2` #e0e0e0.  Brand blue `--brand` #0f6cbd only for the primary button,
selection, links and the active tab.  Teams uses `--teams` #5b5fc7 in the same places.  Status colours (success,
warning, danger) only for status chips and messages, never to fill bars or shapes.

**Data colours** (bars, lines, shapes in a figure outside Power BI: in a document the agent drafts, or a view you
design).  Use the palette of the product the figure lives in: in Word, Excel or PowerPoint, the Office theme
(`--office-1` #156082, `--office-2` #e97132, `--office-3` #196b24, `--office-4` #0f9ed5, `--office-5` #a02b93,
`--office-6` #4ea72e, in that order); in Power BI and the views you design, Power BI's (`.pbi` defaults).  Make the
point with one colour, not many: the value that matters in the first accent, the ones it's compared with in light
grey (`--data-muted` #d9d9d9), a limit or target as a thin dark grey dashed line (`--data-ref` #595959) labelled in
the same grey.  If a value breaks a limit, say so in words beside it; at most it gets the second accent.  Never red
for bad and green for good (traffic lights): it reads as an alarm, and colour-blind viewers can't tell them apart.
Never the agent's gradient or `.ai-touched` inside a document: the whole draft is the agent's, and Word doesn't
draw one.

**Shape and depth.**  Radius 4 for controls, 8 for cards; the agent app uses the same Fluent 2 shapes (8 for
the agent's message cards, the activity card, the prompt and the prompt starters; 12 for the person's message, with a
4 px corner by the edge it comes from) and Segoe UI throughout, with no serif greeting.  Shadows are soft
(`--sh2`, `--sh4`); only toasts and dialogs float (`--sh28`).

**Density.**  Real apps are dense and calm: lists of 3–6 items, 32 px controls, 8–16 px gaps.  Fill the shell the
way the product does (folder pane, list, reading pane) instead of leaving big empty areas.  If a pane would be
empty, add realistic secondary content (older mail, timeline items) or remove the pane.

**Icons.**  `<i class="ic" data-icon="mail"></i>` (20 px; `s16`, `s24`, `s28`, `s32`, `s48` for other sizes).
The kit has 103 Fluent System Icons; `icons.js` lists them.  Need another?  Add it to the prototype's own copy of
`kit/icons.js` from github.com/microsoft/fluentui-system-icons (20 px regular SVG path) and note it in `brief.md`.

**People.**  `<span class="avatar" data-name="Adele Vance"></span>` gives initials and a stable colour.  Sizes
`xs sm md lg xl`; `org` for a square company/team avatar; add `<i class="pres"></i>` (`away`, `busy`) for presence.

### Where the agent shows up

The agent lives in a custom app built for this customer (`.cpa` in the kit): the customer's own app name, the
agent's sparkle mark and name, Home with Chat and Agent modes, Agents and Activity tabs.  It's built on
Microsoft's AI stack, but on screen it's theirs, not Microsoft Copilot.  Prototypes have no fixed route through it.

- **Employees meet the agent in the custom agent app** by default, with business data coming to them there
  (Dynamics 365, Fabric and Power BI, the customer's own systems), with sources.  Name the app for the customer
  ("Contoso Assist", "Northwind Ops"), and name the agent by its job ("Order desk agent").  Never the Microsoft
  Copilot logo, name or Copilot Cowork's look as its identity (the checker flags the logo, and "Copilot" as the
  app's or the agent's name).  Don't put the agent app inside Outlook or Teams (the checker flags it).  Dynamics
  365's own Copilot side pane (`d365-home`, `.d3-cp`) is Microsoft's product: use it only when the story is about
  Dynamics 365's built-in Copilot, for example a seller working a record.
- **The story opens where the work starts.**  That may be the agent app's Home, or the trigger itself: an alert on a phone
  in the field, an email arriving, a live Teams meeting, a record in the customer's own app, or the customer's own
  customer on a website talking to the company's agent.  Pick what's true for this work.
- **Other apps appear when the story needs them**: where the work begins, people reached (Teams, Outlook), or
  proof in a system of record (often in the agent app's browser pane).  Business apps come to the person; the
  person doesn't tour the apps.
- **Their way of working, if that's the point**: the customer's own skill in the agent app (`story-and-data.md`
  §The customer's own way of working).
- **The agent as a teammate.**  The agent has its own name and identity and works for a person or a team; it can
  watch a queue, follow up on threads, run recurring work, pick a goal back up days later, and reach out to people
  for updates, while its owner sets the objective and boundaries and stays in control.  Stories can show:
  - a colleague messaging or @mentioning the agent in a Teams chat or channel, and it answering as itself (its own
    name and sparkle mark, clearly working for its owner), never posing as the person;
  - the owner seeing that conversation in the agent app and stepping in: redirecting it, answering, or stopping it;
  - work it carried on overnight or across days, in its Activity view (`shells.html` `activity`), with the
    decisions it left for people;
  - anything consequential (sent outside, money, commitments) waiting for its owner's approval.
  Teams and Outlook stay exactly as they are; the agent appears in them as a participant with its own name.
- **It's a concept.**  Say in the presenter notes what the custom app would be built on and that it doesn't exist
  yet.  Don't present Microsoft features that haven't been announced as part of it.
- Never copy Microsoft's own marketing characters or any internal or confidential material into a prototype.

### What screens mean

Pick screens from the story's beats, not from this list.  None of them is required, and most stories use only a
few.  Each kind of screen tells the room something; choose the one that says what this beat needs to say, and
switch screens only when the beat needs it.

| Screen | What it tells the room | Good for |
|---|---|---|
| The agent app's Home, or a Today briefing | Work starts here; the agent already knows what matters | An opening ask, a morning catch-up |
| The business at scale (a view you design: the whole book, a map, coverage before and after, the customer's own customers; or a Power BI page of their real data) | This isn't one faster day; the business works differently | The shift at scale, the measure that moves |
| The agent's answer with sources | It read the right things and shows where | A question answered, a gap found |
| Multi-step plan (Workspace drawer) | Multi-step work you can watch, with who acts on each step | A process run end to end |
| The customer's own skill (a trace step, Skills settings, the owner writing it) | It works the way *we* work, and our people decide how | A house method, a review standard, expert judgement shared with the team |
| Approval card (checks, policy reason) | A person stays in control of what matters | Money, anything sent to a customer, anything hard to undo |
| Power BI visual | The number is governed and traceable | A trend, a gap, a breakdown in data they really have |
| The record in the browser pane, or the system itself | It really happened | When the room needs to believe an action landed |
| Teams chat or meeting | People are pulled in where they already work | A hand-off, a live meeting, a team reply |
| Outlook mail or calendar | It reached someone; time was booked | A sent note, a meeting set up |
| The agent's Activity view, a notification | It kept working while you were away | Watching, overnight work, a nudge |
| A phone | This happens away from a desk | Field, frontline, travel |
| The customer's own app or website | The agent meets people where they already are | End customers, line-of-business work |
| Two views side by side | Before and after, or two sides of one moment | The change itself, a hand-off between people |
| The work, before and after (a view you design: the process today and redesigned, steps gone, hand-offs collapsed, who owns what) | The work itself changed shape, not just sped up | Process redesign, a role that changed |
| A view you design (timeline, map, comparison, board) | The thing only this story has | The signature moment |

### Components you can draw

Compose these to fit each beat.  The starter holds the frame scenes as working code, and `assets/shells.html` holds
each product's chrome as an outline (every word a `[[placeholder]]`, numbers only so charts draw).  Copy the
chrome, write your own content, and design the rest for your story.  The outlines show how a product is built,
not what to put in it or in what order.

- Frame cover, with the headline's last phrase in gradient (starter, first scene)
- Agent conversation in the custom app: the agent's message header, its work in an activity card (steps, a
  thinking node, a latency pill), an answer card with citations, source chips and the message footer, an approval
  card with checks and the policy reason, a suggestion pill (`shells.html` `chat`)
- Frame close: what the business could become, what it could be worth, and an ask if there is one (starter, last scene)
- The business at scale: a view you design, or a full Power BI report of their real data (`shells.html` `report`)
- The agent app's Home with prompt-starter cards and a typed prompt (`shells.html` `home`)
- A Power BI answer, and the report in the browser pane (`pbi-answer`)
- A multi-step plan with its Workspace drawer (Steps, Output, References, Plugins), with an attachment, a clipped
  activity card and an input card, in Agent mode (`plan`)
- Skills settings: the customer's own skill next to the built-in ones (`skills`; only when
  the story uses the customer's own way of working, see story-and-data.md)
- Proof in the browser pane: a business app row and a Dynamics 365 record change (`proof`)
- A Teams chat with a post sent with the agent app (`teams`)
- The agent's Activity view: what it did and an item that needs the person (`activity`)
- Outlook mail (`mail`) and calendar (`calendar`)
- A full Dynamics 365 record (`record`), Dynamics 365 home with its own Copilot side pane (`d365-home`; Microsoft's
  built-in Copilot, only when the story is about it), the agent drafting a Word file (`doc`), a full Power BI report (`report`), the customer's own back-office system
  (`business-app`)
- No code, design it: a phone in someone's hand, the customer's own website, two views side by side, a timeline,
  a map, a comparison, a board, a notification arriving (see *Need a view the kit doesn't have?* below)

**The custom agent app is where employees meet the agent.**  Most stories spend their agent moments here; the
other screens show where the work starts, people reached, and proof.  The kit draws it as the customer's own app in
Fluent 2: a neutral frame with a NavDrawer (the app's name and the agent's sparkle mark at the top), a lighter
content layer, and Fluent 2's AI patterns for everything the agent says and does.  Its name, its agent's name and
its tabs are the customer's; never Microsoft Copilot's logo, name or layout.

| Agent app view | Root | Parts | Use when |
|---|---|---|---|
| Window and left panel | `.cpa` (`.nav-off` hides the panel) | `.cpa-title` (`.cpa-win`), `.cpa-side` (a Fluent NavDrawer) > `.cpa-brand` (`.cp-mark` sparkle + `.wm` app name), `.cpa-modes` (a TabList: Home, Agents, Activity; `on` gets the brand underline), `.cpa-nav` (`on` gets the brand selection bar; `hdr`, `sub`, `.lbl`, `.plus`), `.cpa-me`; `.cpa-main` > `.cpa-top` (`.pick` dropdowns, `.ttl`, `.end`) | Every agent app scene |
| Home | `.cpa-home` | `.cp-mark.cpa-logo` (48 px sparkle), `.cpa-hello` (Fluent title, centred), `.cpa-sub` (one line under it), `.cpa-chips` (prompt-starter cards: an `.ic` in brand blue, a `b` title, the prompt), `.cpa-prompt` (`.ph`, `.txt`, `.tools` with `.cpa-switch` Chat/Agent toggle buttons and `.cpa-send` with `send_filled`) | The person asks; the story's first click |
| Conversation | `.cpa-work` > `.cpa-conv` | `.cpa-chat` > `.cp-time`, `.cp-file`, `.cp-user`, `.cp-who` (the agent's message header), `.work-box` (the activity card), `.cp-status` (latency pill), `.cp-turn` > `.cp-resp` (answer card), `.refs`, `.cp-acts` (message footer), `.chips` (suggestion pills), `.acard`; a docked `.cpa-prompt` | The agent works, answers with sources, asks for input or approval.  Draw the work as in *The agent's work, in Fluent* |
| Workspace drawer | `.cpa-pane.ws` (width `--pane`; about 420) beside `.cpa-conv` | `.cpa-pane-head` (drawer title, close), `.cpa-pane-body` > `.ws-sec` accordion sections (`h4` with `.end`) for Steps (`.ws-count` badge, `.steps`), Output and References (`.ws-item`), Plugins (`.ws-plug` tags) | The agent runs a multi-step process in Agent mode: the plan, what it made, what it was given, what it used |
| Skills settings | `.cz` in `.cpa-main` after `.cpa-top` (`.cpa.nav-off`) | `h1`, `.cz-tabs` (a TabList: Preferences, Connectors, Skills; `on`), `.cz-bar` (`.cz-search`, `.cz-add` split button), `.cz-sec` > `h3`, `p`, `.cz-row` cards (`.plug.l` or `.cz-ic` > `.oi`, a `<div>` with `.nm` and `.t-cap`, `.tgl` switch for plugins, a chevron), `.cz-more` | Where the customer's own skills live, next to the built-in ones.  Skills tab lists: "Your skills", "Built-in".  Connectors tab lists: "Connected" (with toggles), "Available".  Keep it to this page: a skill's own editor is best shown as a conversation with the agent |
| Browser pane | `.cpa-pane` with `.cpa-url` (back, refresh, `.addr` pill: globe, the site, a clear ✕; `.end` expand and close) and `.cpa-page` | Put a `.lob`, `.m365.d3` or `.pbi-app` shell inside `.cpa-page`, without its left nav.  Use `.nav-off` and `--pane:1000px`.  The pane is a full-height split (from the conversation's header row to the window's edges, with a divider), as are document panes; the kit lays it out.  No tab strip: the address pill shows where it is.  While the agent drives it: `.cp-browsing` (frame and "[agent name] is browsing" tab) and `.cp-cursor` (`style="left:…;top:…"`, "[agent name] is working") in the page, the prompt's `.ph` "Working on it. What's next?" and `.cpa-send.stop`; hide them all (`data-hide`) when it's done | Proof: the system of record that changed, without leaving the agent app; the agent doing the work in a site when the doing is the point |
| Document pane | `.cpa-pane` with `.cpa-pane-head` (`.oi.word`, `.oi.excel`, `.oi.powerpoint` file mark, `.doc-name`, then `.end` with `.doc-acts` round comment / edit / share buttons, `.btn.primary` "Open in Word", more, close), `.doc-tabs` (File, Home `on`, Insert, Layout, References, Review, View, Help) and `.cpa-doc` > `.page` | The agent drafts a Word, Excel or PowerPoint file next to the chat.  The page uses Word's default styles: `h1` Title (large, regular, black), `p.sub` subtitle, `h2` Heading 1 and `h3` Heading 2 (regular, dark blue), `ol` / `ul` with nested `ol` lettered.  Not bold blue titles |
| Activity | `.cpa-over` (the Activity tab `on`) | `.ap-hello` (`.ap-av` + `.cpa-hello`), `.cpa-prompt`, `.feed` > `.feed-head`, a `<div>` per day with `.feed-day` and `.feed-item` (`.t`, `.dot`, text, `.det`; `need`) | An agent with its own identity keeps working and comes back when it needs the person |

Supporting screens: Microsoft's own products, drawn as they are.  Use one when the story needs it, never with the agent app inside.

| Shell | Root | Parts | Use when |
|---|---|---|---|
| Teams | `.tm` | `.tm-bar` (search "Search or ask Copilot", `.tm-org`, `.cpa-win`), `.tm-rail` (icon-only; `on`, `.badge`), `.tm-list` > `.tm-list-head`, `.tm-pills`, `.tm-sec` (Favorites, Chats), `.tm-item` (20 px avatar and name; `sel`, `unread`, `.n` count), `.tm-main` > `.tm-head` (avatar, name, tabs Chat / Shared / Notes, `.end` icons), `.tm-chat` (centred column) > `.tm-date`, `.tm-msg` (`me` right in lavender; others grey with avatar), `.tm-compose` (`.tools` icon row) | People reached where they work: a plan posted for the person, the team replying, a colleague messaging someone's Autopilot |
| Outlook (web) | `.m365.ol` | `.m365-bar`, `.app-rail`, `.ol-ribbon`, `.ol-folders`, `.ol-list` > `.ol-mail` (`unread`, `sel`), `.ol-read` | A message that reached someone, or a reply coming back |
| Outlook calendar | `.m365.ol` with `.cal-main` | `.cal-side` (`.sw` swatches), `.cal` > `.cal-bar`, `.cal-days` (`.today`), `.cal-grid` > `.cal-h`, `.ev` (`c2`–`c5`, `ai`) | Proof that a meeting was booked.  Grid starts 8 AM; `grid-row: (hour − 8) × 2 + 1`; column 2 = Monday.  Events under an hour: title only |
| Dynamics 365 (model-driven, new look) | `.m365.d3` | `.d3-bar` (waffle, app name, bordered `.search`, `.tools` new / settings / help / notifications, `.d3-copilot` button, avatar), `.d3-nav` (`.menu`, Home, Recent and Pinned with `.chev`, `.hdr` groups, rows, `.area` switcher at the bottom), `.d3-page` (floating panel) > `.d3-cmd`, `.d3-head`, `.bpf`, `.d3-content` > `.section`; or `.d3-page.home` > `.d3-home-head`, `.d3-dash` > `.d3-card` (`.hd` with `.all` "View all", `.bd` with rows, `.d3-kpis` or `.empty`); `.d3-cp` Copilot side pane (`.d3-cp-head`, `.d3-cp-sub`, `.d3-cp-body` with greeting, `.sug`, `.cp-user`, `.cp-turn`; `.d3-cp-prompt`) and `.d3-rail`; `.d3-copilot.on` while it's open | The record or the seller's home is the point and the browser pane is too small; Copilot's side pane only when the work happens inside Dynamics 365 |
| Business app (customer's own system) | `.lob` | `.lob-bar` (`.glyph`, `.name`, `.search`), `.lob-body` > `.lob-nav`, `.lob-page` > `.lob-head`, `.section`, `table.grid` (`tr.new`) | A system that isn't Microsoft's (orders, contracts, claims, core banking), reached through a connector |
| Adaptive Card | `.acard` | `.acard-head`, `.acard-body` > `.item`, `.acard-foot` | Anything a person acts on: in the agent app, Teams or Outlook |
| Windows notification | `.toast` | `.t-app` | Background work finished |

Building blocks for any shell: `.btn` (`primary`, `subtle`, `icon`, `sm`, `lg`), `.input`, `.search`, `.tabs`,
`.badge` (`brand success warning danger solid count`), `.tag`, `.card`, `.field`, `.kv`, `table.grid` (`compact`),
`.timeline` > `.tl-item`, `.kpi`, `.progress`, `.spinner`, `.check`/`.radio` (`on`), `.chips` > `.chip`,
`.seg` (toggle group such as "Mine / Reassign"; `on` marks the choice), and `.diff` (a before → after value:
`<span class="diff"><span class="old">11/27/2026</span><i class="ic" data-icon="arrow_right"></i><span class="new">12/11/2026</span></span>`).

Agent-action blocks: `.steps` > `.step` (see `engine.md` §Process steps), `.mode` badges, `.run` (steps beside the
card being acted on), `.opt` (a choice row; `on` marks it), `.checks` (pre-checks; `li.warn` for a flag), `.policy`
(why this needs a person) and `.log` (activity: time, actor, what happened, mode badge; `.by` for a second line).

**Microsoft product icons.**  The kit carries the official icons.  Put one on an empty `<span>`: `.oi` (20 px app or
file mark: sources, chips, pane heads) or `.fav` (16 px browser-tab favicon), plus the product key:
`copilot cstudio automate dataverse d365 sales ado fabric powerbi onelake lakehouse teams outlook word excel
powerpoint sharepoint onedrive loop`.  Markup: `<span class="ref"><span class="oi teams"></span>[chat name] ·
Teams</span>`.  Rules (Microsoft's icon terms): only for the Microsoft product it belongs to; never cropped,
stretched, rotated or recoloured; the product name nearby.  `copilot` belongs only to Microsoft's own Copilot
inside its products (Teams, Dynamics 365, Power BI): never the custom agent app's identity.  Product headers (Outlook, Teams, Dynamics 365) show the
app name, as the real ones do, not an icon.  Customer and third-party systems get no icon (see below).

### Power BI: how numbers are shown

Data the customer would really have, shown as a chart, comes from Power BI, wherever it appears.  Projections and
"with agents" scenarios aren't report data: a real report wouldn't hold them, so inside one they read as measured.
Show them in a view you design or on a frame scene, labelled "Illustrative".  A figure inside a document the
agent drafts (a client letter, a memo) is drawn as that document would draw it, in the Office theme's colours
(§Fluent 2 product scenes, "Data colours").  In the agent app: the agent finds the report, queries
its semantic model, answers in a line or two, shows the visual under the answer and cites the report (a `.ref`
with the `.oi.powerbi` icon); "Open in Power BI" opens the report in the agent app's browser pane.  See `shells.html`
`pbi-answer`; `report` there is the full screen version.  A visual can also sit on a Teams card or a
view you design, still titled and cited to its report.

| Part | Markup | Notes |
|---|---|---|
| Chart visual | `figure.pbi[data-chart]` with `figcaption.pbi-head` (`b` title, `span` subtitle) | Syntax in `engine.md` §Power BI visuals |
| Card | `.pbi.card` > `.l` label, `.v` value (`data-count` to count up), `.r` reference line (`b`, `.up`, `.down`) | 3–4 in a row |
| Table | `.pbi` > `.pbi-head` + `table` (`th.n`/`td.n` for numbers, `tr.tot` total, `.up`/`.down`) | No gridlines, as Power BI |
| Slicer | `.pbi-slicer` > `b` + `span` | Top of the page |
| Report in the service | `.pbi-app` > `.pbi-bar` (`.crumb`), `.pbi-act`, `.pbi-main` > `.pbi-canvas` > `.pbi-page` (12-column grid; `grid-column:span n`), `.pbi-filters`; pages as `.pbi-tabs` (browser pane) or `.pbi-pages` (full screen) | Fill the page; check nothing runs off the bottom |

Fluent 2 base theme (Power BI's default base theme): data colours in order `#118DFF #12239E #E66C37 #6B007B
#E044A7 #744EC2`, titles and subtitles on, axis titles off, smooth lines, light gridlines, rounded visuals on a grey
canvas.  The kit applies all of this; don't restyle visuals.  Waterfalls use blue up, orange down, navy total.
Every number in the answer, the visual and the report agrees with the data sheet.

**Need a view the kit doesn't have?**  Build it in the prototype's `<style>` block from the same tokens and
building blocks.  For a Microsoft product (SharePoint, Excel, Teams on a phone), match the real product's layout:
top bar height 48, left navigation, command bar, content on `--bg3` with white surfaces.  For a phone, draw a
plain device outline (no maker's branding) around an app at phone scale, with large touch targets; put it beside
other content rather than alone on a big empty stage.  For a website the customer's own customers use, give the
fictitious company a simple, believable site (its name, one brand colour, plain navigation) with the agent as a
chat panel or card on it.  For the signature moment, design what explains it best (a timeline, a comparison, a
map, a board) with Fluent type, neutrals and one agent accent.  A line-of-business app built on Power Apps should
reuse `.d3`; the customer's own back-office system uses `.lob`.

**Customer and third-party systems.**  Never imitate a real non-Microsoft product (its name, logo, colours or
layout): no fake Salesforce, SAP, Aladdin, Bloomberg, Epic.  Show it as `.lob` with a plain functional name
("Order management", "Contract management"), and say the agent reached it through a connector.  The `.lob` bar
colour can change (`style="--lob:#..."`) but stays neutral.

### Who acts: done for you, needs input, needs approval

When the agent carries out a process, every step says who acts, with one of three `.mode` badges.  This governs
what the agent does when the story has it act; it doesn't mean a story needs an approval step or a proof scene.

| Badge | Use for | Examples |
|---|---|---|
| `.mode.auto` *Done for you* | Internal, low-risk, reversible, or already agreed | Calendar holds, reminders, logging an activity in the CRM, pulling data, drafting |
| `.mode.input` *Needs your input* | A judgement only the person can make | Which discount, which option, what the client said |
| `.mode.approval` *Needs your approval* | Money, trades, orders, binding commitments, anything sent to a customer, anything hard to undo | Place an order, send a quote, move funds, change a policy |

- Never show an approval-class action as *Done for you*, even if a customer asks for "full automation".  Show the
  approval, and make it fast.
- Every approval card shows what will happen (`.kv`), the pre-checks the agent ran (`.checks`, with at least one
  honest flag when there is one), the policy reason (`.policy`), and Approve / Edit / Decline.
- When the room needs to believe it happened, show where it landed: the `.log`, or the change in the system of
  record, often in the agent app's browser pane (a `tr.new` row in the business app, a `.diff` on the record, an `.ev.ai`
  event in the calendar), or the reply, the customer's own screen, whatever this story has.  "It says it did it"
  is weaker than "there it is".

### The agent's look

- In the agent app, each reply opens under the agent's message header (`.cp-who`: the gradient sparkle, the
  agent's name, the time).  The same sparkle is the app's mark in the NavDrawer and on Home.  Elsewhere (logs,
  records, cards), the agent's mark is the gradient sparkle too: `<span class="cp-mark"><i class="ic grad" data-icon="sparkle_filled"></i></span>`.
  On its Activity view the agent gets the larger `.ap-av` avatar.  Give an agent a plain job name (what it does, then "agent").  No
  mascot, no robot, no Microsoft marketing characters.
- When the agent acts as the person (a Teams post, a sent mail), show it as the person's own message with a small
  "Sent with [app name]" caption, not as a bot.
- The agent's interactions use the kit's Fluent 2 custom-app design: see *The agent's work, in Fluent* below.
- `.ai-touched` puts the gradient border on the one thing the agent created or changed; `.ai-flag` says so in
  words ("Added by [agent name]").  One per scene.  On a list row (`.tl-item`, `.acard .item`, `.log` row) it
  adds its own side padding and keeps all four edges, even as the first row; don't add inline padding.  Inside a
  rounded container that clips (`overflow:hidden`), the engine rounds the highlight's corners to match wherever
  it sits in one of the container's corners, so the ring isn't cut; don't override its `border-radius`.  The check
  flags a highlight that spills outside a clipping container.
- Answers are short, specific, and cite sources (`.cite` numbers, `.ref` chips).

### The agent's work, in Fluent

The agent's side of the demo is the customer's own custom app, drawn with Fluent 2's AI patterns (a message
header with the agent's sparkle and name, message cards, an activity card, Fluent cards for input and approval, a
drawer for the plan), built from Fluent 2 tokens.  It deliberately looks like neither Microsoft Copilot nor Copilot
Cowork: no Copilot logo or name, no serif greeting, no black round send button, no avatar-less plain-text replies,
no flat grey Workspace panel.  One consistent shape keeps every
prototype calm and credible, so the **shape** below is fixed, and **every word** comes from your story: a different
customer, person and task each time.  The markup is in `assets/shells.html` `chat` (conversation) and `plan`
(attachment, clipped activity card, Workspace drawer).

**In the conversation, top to bottom:**

| Part | Markup | How it looks and behaves |
|---|---|---|
| Time divider (optional) | `.cp-time` | Small grey relative time ("1 min ago") between hairlines |
| Attachment (optional) | `.cp-file` > `.oi` file mark, `.nm`, `.t-cap` | A white Fluent card above the person's message, right-aligned: the file they gave the agent and its type |
| The person's message | `.cp-user` | A brand-tinted bubble on the right |
| Message header | `.cp-who` > `.cp-mark` (the gradient sparkle) + the agent's name + `.t-cap` (the time) | Opens every agent reply: at the start of the chat and after each message from the person.  Give it the same `data-beat` and `data-auto` as the first thing the agent shows.  The check flags a reply without one |
| Activity card | `.work-box` > `.sum` > `.on-run` ("Working on it"), `.on-done` (`.n` + " complete"), chevron | A white card.  While it works: a brand spinner, "Working on it" and a thin indeterminate progress bar along the top edge; once every item is shown and done the engine swaps in a filled brand check and "9 items complete" (it counts and fills `.n`).  Keep the words |
| Step | `.work > li` (`data-beat`, `data-auto`) | A brand spinner, then a filled brand check; a hairline joins each item to the next.  Brand blue, never green |
| Customer's skill (optional) | `li.skill` > `.plug` (`--plug` colour, a white `.ic` glyph) + "Reviewed custom skill <b>name</b>" | The agent loading the customer's own skill: the skill's icon in place of the check, the name in bold.  Usually early in the trace.  Only when the story uses it (story-and-data.md) |
| Thinking | `li.think` > `.lbl` (`.on-run`, `.on-done`, `chevron_right`) + `.thought` (`data-type="words"`, one `<p>` per paragraph); `open` shows it | A lightbulb.  "Thinking…" shimmers while the reasoning streams, then reads "Thought process".  The reasoning sits in a quoted panel (a brand rule on its left).  Clicking the label opens or closes it |
| Show more | `.work-box.clip` + `<button class="more">Show more</button>` | Only the latest items stay in view (`--clip`, default 136 px), faded at the top.  While a thought streams, the window ends at the newest words and the earlier steps scroll up under the fade (the engine does this).  "Show more" appears as the card's footer once something is really hidden; clicking it shows everything |
| Latency pill | `.cp-status` > `.cp-mark` + `.t` | A small white pill under the card: the agent's sparkle and one shimmering line.  Swap the `.t` on later beats as the work moves on; hide the pill (`data-hide`) when the answer starts |
| Answer card | `.cp-turn` > `.cp-resp`, `.refs`, `.cp-acts` | A white card with the answer and `.cite` numbers, the source chips under it, then the message footer: copy, like and dislike buttons and "AI-generated content may be incorrect" |
| Input and approval | `.acard` (see *Who acts*) | Fluent cards in the flow of the conversation |
| Suggestion (optional) | `.chips` > `.chip` | A rounded brand-outlined pill: the next thing the presenter clicks |

A long conversation behaves like a real one: the oldest messages scroll up under the fade at the top; nothing
gets squashed.  Plan the stops so what matters is in view.

**Write them in the agent's voice** (forms, not content):

- **Steps**: an -ing verb, the specific thing from the data sheet, and where it comes from.  Sentence case, no full
  stop, about seven words.  Real counts and names, never "Processing data".
- **Thinking**: first person, present tense, two to four short paragraphs.  It weighs the story's real options or
  sources against each other using their names and numbers, notices the one thing that doesn't add up, and ends
  with what it will do next, including why that part needs the person.  This is where the audience sees judgement,
  so put the story's tension here.  Never a recap of the steps, marketing, or "As an AI".
- **Latency pill**: a few casual words in the present progressive, about what it's doing right now.
- **The customer's skill**, if the story has one: "Reviewed custom skill" and its kebab-case name, exactly.  Then
  let the work show it: a step or the thinking applies one of its rules by name ("[their rule], so …").
- As many steps and thinking nodes as the work really has; use `.clip` when the trace gets long.

Pacing: give a thinking node a `data-auto` of at least the previous step's run time (default 1100 ms), so each item
finishes before the next appears.  The engine keeps "Thinking…" until the reasoning has streamed.  A thought without
`open` costs no time; its text is there when someone opens it.

**The Workspace drawer** is a Fluent 2 inline drawer at the right edge: a white panel with a "Workspace" title and
a close button, then accordion sections divided by hairlines.  Each is a `.ws-sec` whose `h4` holds the title and
an `.end` (a chevron, plus any buttons):

| Section | Markup | What goes in it |
|---|---|---|
| Steps | `h4` with an empty `.ws-count` (a brand badge; the engine fills in "done / total"); `.steps` > `li.step` > `.st` > `.st-t` | The plan: three to seven -ing steps as plain lines that may wrap.  An outline circle while queued, a brand spinner while running, a filled brand check when done; while waiting for the person, a brand ring and a brand-tinted row.  No mode badges or detail lines here; the input and approval cards in the conversation carry the mode |
| Output | `.ws-item` > a file mark (`.oi`, or `.ic` `globe` for a web page) + `<div>` with `.nm` and `.t-cap` | What the agent made, revealed on the beat it makes it, with "Updated" and a date underneath.  For a long file name, cut the middle yourself and keep the extension |
| References | `.ws-item` rows; a `folder_open` button in the `h4` | What the person gave it: the attachment, a linked file |
| Plugins | `.ws-plugs` > `.ws-plug` tags (a `.plug` tile for the customer's own skill or plugin, or the product's `.oi` for a built-in one) | The plugins or skills it used, by plain name |

**A customer's skill or plugin icon** is a `.plug` tile: a colour that suits the customer (`style="--plug:#…"`) and
one white kit glyph that says what the skill is about.  Use the same tile everywhere the skill appears (trace,
Workspace, Customize).  Never a Microsoft product logo, and never the customer's real logo.

Draw it in the kit's light theme, and never mix themes.  The sparkle in the message header and the latency pill
uses the agent gradient; don't recolour it or swap in the Copilot logo.  Restyle these parts in a prototype's `<style>` only to fit
its story, never towards Microsoft Copilot's or Copilot Cowork's look.

## Tredence frame scenes

`class="scene frame td-cover|td-content|td-section|td-divider|td-ask|td-closing"`.  The kit draws the Tredence 2026
template's chrome; you place Poppins text and flat Tredence-palette shapes absolutely on top.  Layouts, zones, the
type scale, the palette, contrast, logos, photos and components: `tredence-frame.md`.  Outlines: `assets/frames.html`.

**Readable on a photo.**  Only the cover title, its subtitle, the ask's one line and the ask pill sit on a photo,
over the Charcoal `.td-shade`.  Everything else goes on a white content scene.  The check measures the contrast
behind every line of text on a frame scene and flags anything under 4.5:1 (3:1 for text 24 px and up, or 18.66 px
bold), and flags any colour, font, gradient or shadow that isn't Tredence's.

If the story uses a frame, keep it short and let it carry the business idea (`story-and-data.md` §Start with the business shift):

- **The cover** names the change for the business, in the customer's words: the tension they live with, or what
  becomes possible.  Not a product tagline ("insights and actions in one place", "your AI assistant for X"), and
  not a list of what the demo will show.
- **The close** says how the business could work (from → to), what it could be worth (rounded, labelled
  "Illustrative", basis in the notes), and makes an ask only if the meeting needs one.  Never a recap of the scenes, a checklist against the
  brief or the customer's notes, or a list of features.  If the close would still make sense with "What you saw"
  above it, rewrite it.

Shape both for this story (one from → to, the measure before and after, the first move and the ask); neither has
to be numbered cards.  The product scenes are the proof.

## AI tells and what to do instead

| AI tell | Do this instead |
|---|---|
| Gradient hero sections, glassmorphism, neon glows, blobs | Product chrome on neutral surfaces; the gradient only on the agent |
| Giant stat counters; rocket, brain or sparkle icons everywhere | Numbers in Power BI or the record, at product size; icons only where the product would put them |
| Traffic-light figures (red bar for bad, green for good), a rainbow of bar colours, the agent's gradient ring inside a document | The product's palette (Office theme in documents, Power BI's elsewhere): one accent for the value that matters, light grey for the rest, a dark grey dashed line for a limit, and the verdict in words (§Data colours) |
| Emoji or mixed icon styles | Fluent icons only, 20 px, `currentColor` |
| A grid of identical feature cards | The real place the work happens (the agent conversation, the record) |
| Big unlabelled claims ("Save 10 hours a week!", "99.9%") | The business measure, rounded and labelled "Illustrative", with its basis in the notes; record data specific and from the data sheet |
| "Acme", "John Doe", "Lorem ipsum", "Task 1" | Microsoft fictitious companies and demo personas, specific tasks |
| Marketing words: unlock, seamless, leverage, supercharge, revolutionise, empower, game-changing | Plain verbs that say what happens |
| The agent knows everything instantly | Visible steps, sources, a gap it admits, a person who confirms |
| The agent's work as a checklist of green ticks you styled yourself, a Workspace you invented, or the app drawn as Microsoft Copilot or Copilot Cowork (Copilot logo or name, serif greeting, black round send button, avatar-less plain-text replies, flat grey panel) | The kit's custom agent app in Fluent 2 (§The agent's work, in Fluent) |
| The customer's skill in every demo, or a skill that only shows up as a badge | Only when doing it *their* way is the point; then the work visibly follows one of its rules, and a named person owns it |
| Thinking that narrates the steps ("Now I will read the file") | Reasoning with the story's names and numbers, the thing that doesn't add up, and what it will do next |
| Everything centred and floating | Product grid alignment: left-aligned, edge-to-edge panes |
| Inter/Poppins/system-rounded fonts | Segoe UI in product, Segoe Sans Display in the frame |
| Dark mode "AI dashboard" | Light theme product UI, as customers see it at work |
| Every prototype in the same scene order, the agent moment always a chat answer, or the same parts every time (an approval, a proof scene, a leader's report) | Screens chosen for this story's beats, and only the parts this story needs; a view designed for the signature moment |
| One person's task done faster, or the same business covering more, and nothing more | The business reimagined: what it can be now, visible in the story, with the measure that moves |
| A close that recaps the demo or ticks off the brief ("What you saw", "in one place", "single pane of glass") | What the business could become and what it could be worth (illustrative); an ask only if the meeting needs one |

## Motion

Motion explains, it doesn't decorate: things arrive when the agent produces them.  Default beat transition is a
short rise-in; `.fade`, `.slide-r` (toasts), `.pop` (cards) are alternatives.  The engine makes every change
graceful on its own (content glides, exits fade, panes push in, answers stream word by word, scenes crossfade);
see `engine.md` §Motion.  Typing is for the user's prompt or the agent's streamed answer only.  Let the agent's
work feel deliberate rather than instant, and give each moment the time the story needs.  The engine sets a
reading floor for every beat and plays the demo itself when the presenter presses Space (`engine.md` §Presenter
controls); `data-hold` gives the moment that matters more time.
