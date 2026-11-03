# QA and feedback

Assume there are problems and go looking for them.  The first render is rarely right.

## Every time you show the user something

- [ ] You ran the check on what you changed and looked at the screenshots yourself.
- [ ] Every visible word and every presenter line passes the out-loud test (`story-and-data.md`).
- [ ] The check finds nothing.  You fixed every finding or can explain why it stays.
- [ ] Only the scenes the user asked about changed.
- [ ] You built and edited in `working/<name>/`, and packed only at the end.

## Review checklist (every screenshot)

Read every word aloud in the Tredence voice (`tredence-frame.md` §Voice).

Do this yourself, never with a subagent.  Look at each contact sheet (`renders/sheet-N.png`, 12 screenshots each,
in order), then open single screenshots where something looks off.

1. **Would a Tredence lead show it?**  Nothing generic, silly or overclaimed.  Read every word aloud as the presenter.
2. **Looks like the real product?**  Chrome, spacing, type sizes, icon style and colours match the product.
   Employees meet the agent in the customer's custom agent app (its own name, never Microsoft Copilot); other apps
   appear where the work starts, as proof, or to show people reached.  The agent's work trace and the Workspace
   follow `look-and-feel.md` §The agent's work, in Fluent
   shows it: flat, thin checks, a thinking node whose reasoning uses this story's names and numbers, a status
   line, and Workspace sections with plain step lines.
3. **One idea per scene, obvious in 3 seconds.**  The eye lands on the agent's moment first.
4. **Consistent data.**  Same names, amounts, dates and counts everywhere (check against the data sheet).
5. **The human is in control** somewhere visible: confirm, edit, approve, undo, or set the rule the agent
   follows.  Nothing approval-class is marked *Done for you*; any approval shows checks and the policy reason.
6. **Sources shown** for anything the agent claims.
7. **Nothing clipped, overlapping or empty-looking**; no stray placeholder text; the concept label is visible.
   Frame scenes look like the Tredence template: chrome untouched, nothing over the footer, top rule, brand squares
   or cover band, Poppins and flat brand colour only, the key phrase of each title in Bright Orange.
8. **Flow works**: every beat reveals in reading order; the cue ring lands on the thing to click, and clicking it
   does what it says; scenes end on an in-product bridge where the story has one (otherwise the Next pill shows);
   → always advances.
9. **Made for this story?**  The scenes, their order, the screens and the signature moment come from this
   customer's story, not from the starter, the outlines, this skill's rules, or the last prototype you built.  If
   the scene list could be swapped with another customer's, it isn't designed yet.  Every scene is there because
   this story needs it, not because the skill mentions it.
10. **Is the idea big enough?**  The room understands the business change in the work and across the business,
    in the customer's words.  If there's a close, it says what the business could become and what it could be
    worth (rounded, "Illustrative", basis in the notes), never a recap of the scenes or a tick-list of the brief.
    Read the opening and the ending aloud as their CEO: would they repeat it to their board, and would a
    competitor worry?  If it's the same business doing the same things earlier, faster or for more people, go back
    to `story-and-data.md` §Questions that break the frame (unless the user asked for something smaller).
11. **Is the new shape shown, not just said?**  Point to the moment the room sees the new business, or the
    redesigned work, happen on screen.  If you can only point to the close or a presenter line, it's a claim:
    `story-and-data.md` §Show it, don't just say it.

## Running the check

`python <skill>/assets/check_prototype.py working/<name>/prototype.html`, then `--scene <id>` after an edit,
one full pass that finds nothing new, and one `--motion` pass.  Details: `engine.md` §Check and pack.

**If the check can't run**, never fall back to reading the code alone without telling the user that the
screenshots and layout checks didn't run.  If you have a browser that can open local files, step through every
beat yourself with the checklist above.

**In Claude Cowork** (Mac): the sandbox can install packages.  If Python Playwright is missing,
`pip install playwright` then `python -m playwright install chromium`, and run the check again.

**In Copilot Cowork** (and other sandboxes without a package source):
- Don't run `pip install` or `npm install`.  There's no package source; the calls hang for about a minute, then
  fail.  Python Playwright is missing, so the checker hands over to Node and looks for Playwright inside the
  global packages (`docgen-utils`) and for the browser in `/opt/docgen-browsers`.  If it still reports that
  Playwright or a browser wasn't found, point it at them (the folder names can change; list them first):
  ```
  NODE_PATH=/usr/local/lib/node_modules/docgen-utils/node_modules \
  PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/docgen-browsers/chromium_headless_shell-1208/chrome-headless-shell-linux64/chrome-headless-shell \
  python <skill>/assets/check_prototype.py working/<name>/prototype.html
  ```
- Don't link a `node_modules` folder into the workspace; the workspace refuses links.
- The browser tool there needs a web address and can't open workspace files, so it can't check a prototype.
- Segoe fonts aren't installed, so screenshots use a fallback font with different text widths.  If a label is
  only just clipped, ask the user to check it on Windows before cutting the wording.

Export the scene and beat outline for a recording or automation tool with
`python <skill>/assets/check_prototype.py <html> --outline [file.json]`.
Still scenes are notes, not failures. Product checks also flag percent fractions, clipped agent highlights,
highlights inside Word drafts and red/green traffic-light figures. Tredence frame checks remain unchanged.

## Feedback playbook

Users often give one-line feedback.  Read the intent, fix the cause, and show the result.

| They say | What it usually means | Do this |
|---|---|---|
| "Looks fake", "too AI" | Decoration and generic content | Remove gradients and decoration outside the agent moments, add real product detail and specific content, cut marketing words.  `look-and-feel.md` §AI tells |
| "Too busy" | Too much competing for the eye | Hide non-essential panes, fewer list rows, one agent moment per scene |
| "Too many apps" | A tour, not a story | Keep the employee's agent work in the agent app; show other apps only where the work starts, in the browser pane, or as one proof scene |
| "They all look the same" | Screens chosen before the story, or the same parts in every build (an approval, a proof scene, a leader's report) | Go back to the beats.  Drop any part this story doesn't need, open where this work really starts, replace stock scenes with views designed for this story, and give the signature moment its own view |
| "So what?", "think bigger", "is it ambitious?", "it's just a productivity tool", "where's the business impact?" | The story stops at one person's task, ticks off a feature list, or shows the same business doing more of the same | Go back to `story-and-data.md` §Start with the business shift.  Write three new ideas with §Questions that break the frame, take the boldest one their leaders could believe, then rebuild the cover, the close and whatever shows the change across the business around it.  Keep the scenes that still prove it; fold any feature list into one story |
| "Too slow" | Too many beats, or beats that show nothing new | Cut beats and scenes that don't show something new.  Don't add `data-hold` except at the one moment that matters; the presenter can press → to skip ahead, or pause |
| "Too fast", "I can't read it" | A stop with a lot on it | The engine already holds text long enough to skim; add `data-hold` at the moment that matters, or `data-hold="pause"` where the presenter will talk (`engine.md` §Presenter controls) |
| "We want a video of it", "the recording drags" | Play mode is paced for a room | Don't slow or speed play mode for a video.  A recording tool opens it with `?driven` and steps it to its own narration (`engine.md` §Driving it from another tool); `data-note` on a beat gives it a line to start from |
| "Looks like Copilot", "looks like Cowork", "doesn't look like a real app", "the thinking looks fake" | Microsoft Copilot's logo, name or look in the custom app, a home-made trace or Workspace, or thinking that narrates instead of reasoning | Give the app the customer's own name and the agent's sparkle and name, redraw with the parts in `look-and-feel.md` §The agent's work, in Fluent, and rewrite the thought: first person, the story's real names and numbers, the thing that doesn't add up, what it will do next |
| "Jumpy", "not smooth" | Content snapping into place | Run `--motion`; reveal content where it stays, pair replaced elements with `data-morph`, give the warm-up a few seconds on the cover.  `engine.md` §Motion |
| "I clicked and then it just stopped" | A cue fired one beat early, or nothing to click | Make the beats before the named thing automatic, or add an in-product bridge if the story has one.  `engine.md` §Clicks |
| "Make it ours" | Not specific enough | Put the customer's industry, roles and real-world artefacts (fictional) into the data sheet, and rebuild the signature moment around their problem |
| "Can it do X for real?" | A question for the Tredence team | Note it in `brief.md`; don't make the prototype claim it |
| "How would it know how *we* do it?", "who controls what it does?" | The story doesn't show where the customer's own method lives or who owns it | If their method is the point, weave in their own skill in the agent app: one rule from it applied visibly, and the person who owns it.  `story-and-data.md` §The customer's own way of working |
| "That's wrong", "take a step back" | You are patching symptoms | Stop.  Name the root cause in one line and offer 2–4 genuinely different directions with a recommendation |
| "Doesn't look like Tredence" | The frame drifted, or product styling leaked into it | Use the `td-` layouts and classes from `frames.html`; Poppins and the palette only; the orange key phrase in titles; a brand photo on the cover.  Leave the Microsoft product scenes as they are |
| "Doesn't look like Microsoft" | Tredence styling leaked into a product scene | Take Poppins, orange and logos out of the product scenes; use the kit's shells as they are |
| "Sounds like a brochure" | Marketing words, slogans, no "we" or "you" | Rewrite every line out loud in the Tredence voice: their world first, what changes in someone's day, one ask |

## Delivery note (keep it short)

```
The prototype is ready: <path to dist/<name>.html>  (source: <path to prototype.html>)
- Run it: Space to play and pause, → to step by hand, N for presenter notes, ? for keys
- Illustrative: <what's invented, what's labelled Preview>
- The big idea: <what the business could become, in one line>; <the measure that moves, rounded> (illustrative; basis in brief.md).  Also considered: <the safer idea> · <the wilder one>
- Question to ask in the room: <the Test answer from the storyboard questions>, also in the notes of scene <n>
- Checked: every stop screenshotted and reviewed; motion pass clean; packed file plays in the preview sandbox
```

Then log decisions in `brief.md`, leave a "What we learned" line for after the meeting, and delete `renders/`.
End with the film offer (SKILL.md loop step 8).  The clean-up question comes only when the user says they're done.
