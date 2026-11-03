// Node version of check_prototype.py, for environments with Node Playwright but no Python Playwright.
//   node check_prototype.mjs working/<name>/prototype.html [--scene <id>] [--motion] [--outline [file.json]]
// The in-page checks and the wording list are read from check_prototype.py, so the two can't drift apart.
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const py = fs.readFileSync(path.join(here, "check_prototype.py"), "utf8");
const block = name => {
  const m = py.match(new RegExp("^" + name + ' = r"""([\\s\\S]*?)"""', "m"));
  if (!m) throw new Error(`check_prototype.py has no ${name} block`);
  return new Function("return " + m[1])();
};
const [AUDIT, FRAME_TEXT, CONTRAST, SHEET, MOTION, PREVIEW, PLACEHOLDERS] = ["AUDIT", "FRAME_TEXT", "CONTRAST", "SHEET", "MOTION", "PREVIEW", "PLACEHOLDERS"].map(block);
const TELLS = [...py.match(/^TELLS = \[([\s\S]*?)\]\s*$/m)[1].matchAll(/r"((?:[^"\\]|\\.)*)"/g)].map(m => new RegExp(m[1], "gi"));
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu;

function loadPlaywright() {
  const roots = [process.cwd(), here, ...(process.env.NODE_PATH || "").split(path.delimiter).filter(Boolean)];
  try {
    // Playwright may sit inside another global package (Cowork: docgen-utils/node_modules/playwright).
    const g = execSync("npm root -g", { encoding: "utf8", timeout: 5000, stdio: ["ignore", "pipe", "ignore"] }).trim();
    roots.push(g);
    for (const d of fs.readdirSync(g)) roots.push(path.join(g, d), path.join(g, d, "node_modules"));
  } catch {}
  for (const root of roots) for (const name of ["playwright", "playwright-core", "@playwright/test"]) {
    try { return createRequire(path.join(root, "noop.js"))(name); } catch {}
  }
  return null;
}

function browserPaths() {
  const found = [process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, process.env.CHROME_PATH];
  for (const exe of ["chrome-headless-shell", "chromium", "chromium-browser", "google-chrome", "microsoft-edge"]) {
    try { found.push(execSync(`${process.platform === "win32" ? "where" : "command -v"} ${exe}`,
      { encoding: "utf8", timeout: 3000, shell: true, stdio: ["ignore", "pipe", "ignore"] }).split(/\r?\n/)[0].trim()); } catch {}
  }
  // Browser caches: Playwright's default, a custom PLAYWRIGHT_BROWSERS_PATH, and Cowork's /opt/docgen-browsers.
  for (const base of [process.env.PLAYWRIGHT_BROWSERS_PATH, path.join(os.homedir(), ".cache", "ms-playwright"), "/opt/docgen-browsers"])
    if (base && fs.existsSync(base)) for (const d of fs.readdirSync(base))
      for (const sub of ["chrome-linux/chrome", "chrome-linux64/chrome", "chrome-headless-shell-linux64/chrome-headless-shell"])
        found.push(path.join(base, d, sub));
  return found.filter(p => p && fs.existsSync(p));
}

async function launch(chromium) {
  for (const opts of [{ channel: "msedge" }, {}, ...browserPaths().map(executablePath => ({ executablePath }))]) {
    try { return await chromium.launch(opts); } catch {}
  }
  return null;
}

async function contactSheets(browser, out, names) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1000 } });
  let n = 0;
  for (let start = 0; start < names.length; start += 12) {
    n++;
    const cells = names.slice(start, start + 12).map(f => [f.slice(0, -4), fs.readFileSync(path.join(out, f)).toString("base64")]);
    await page.setContent("<body></body>");
    await page.evaluate(SHEET, cells);
    await page.screenshot({ path: path.join(out, `sheet-${n}.png`), fullPage: true });
  }
  await page.close();
  return n;
}

// A packed file played the way OneDrive and SharePoint preview it: a sandboxed srcdoc frame with no origin.
async function previewCheck(browser, src) {
  const doc = fs.readFileSync(src, "utf8");
  if (/<script[^>]*\ssrc=(?!["']?data:)/i.test(doc)) return [];
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
  const host = path.join(path.dirname(src), `.pf-preview-${process.pid}.html`);
  fs.writeFileSync(host, '<!doctype html><meta charset="utf-8"><body style="margin:0"><iframe sandbox="allow-scripts" ' +
    'style="border:0;width:1920px;height:1080px" srcdoc="' + esc(doc) + '"></iframe>');
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } }), errors = [];
  page.on("pageerror", e => errors.push(String(e.message || e)));
  try {
    await page.goto(pathToFileURL(host).href);
    const frame = page.mainFrame().childFrames()[0];
    await frame.waitForFunction("window.proto", null, { timeout: 10000 });
    await frame.evaluate(PREVIEW);
  } catch (e) {
    if (!errors.length) errors.push(`stopped: ${String(e.message || e).split("\n")[0]}`);
  } finally {
    await page.close();
    fs.rmSync(host, { force: true });
  }
  return [...new Set(errors)].map(e => `OneDrive/SharePoint preview: ${e}`);
}

const args = process.argv.slice(2);
const si = args.indexOf("--scene"), only = si >= 0 ? args[si + 1] : null, motionOnly = args.includes("--motion");
const oi = args.indexOf("--outline"), outlineTo = oi >= 0 && /\.json$/i.test(args[oi + 1] || "") ? args[oi + 1] : null;
const file = args.find((a, i) => !a.startsWith("--") && !(si >= 0 && i === si + 1) && !(outlineTo && i === oi + 1));
if (!file) { console.log("Usage: node check_prototype.mjs <prototype.html> [--scene <id>] [--motion] [--outline [file.json]]"); process.exit(2); }

const pw = loadPlaywright();
if (!pw) {
  console.log("Can't check: Node Playwright not found.  Set NODE_PATH to the node_modules folder that holds playwright and rerun.  " +
    "Until then the screenshots and layout checks did not run; tell the user.");
  process.exit(2);
}
const browser = await launch(pw.chromium);
if (!browser) {
  console.log("Can't check: no Chromium or Edge found.  Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to a chrome or chrome-headless-shell " +
    "binary and rerun.  Until then the screenshots and layout checks did not run; tell the user.");
  process.exit(2);
}

const src = path.resolve(file), out = path.join(path.dirname(src), "renders");
if (oi >= 0) {
  // --outline: the machine-readable outline (scenes, beats, text, triggers, notes) for a tool that drives the demo.
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(pathToFileURL(src).href + "?driven");
  await page.waitForFunction("window.proto && window.proto.outline");
  const o = await page.evaluate("proto.outline()"), dest = path.resolve(outlineTo || path.join(path.dirname(src), "outline.json"));
  await browser.close();
  fs.writeFileSync(dest, JSON.stringify(o, null, 2), "utf8");
  console.log(`Outline: ${o.scenes.length} scenes, ${o.scenes.reduce((n, s) => n + s.beats.length, 0)} stops → ${dest}`);
  process.exit(0);
}
if (motionOnly) {
  // --motion: play the scenes at presenter speed and report anything that jumps instead of gliding.
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } }), errors = [], issues = [], t0 = Date.now();
  page.on("pageerror", e => errors.push(String(e)));
  await page.goto(pathToFileURL(src).href);
  await page.waitForFunction("window.proto");
  await new Promise(r => setTimeout(r, 300));
  const scenes = await page.evaluate("proto.scenes");
  if (only && !scenes.some(s => s.id === only)) {
    console.log(`No scene with id '${only}'.  Scenes: ${scenes.map(s => s.id).join(", ")}`);
    await browser.close(); process.exit(2);
  }
  let played = 0;
  for (const [i, s] of scenes.entries()) {
    if (only && s.id !== only) continue;
    const r = await page.evaluate(MOTION, i);
    played++;
    for (const x of r.snaps) issues.push(`${String(i + 1).padStart(2, "0")} ${s.id} beat ${x.beat}: jumped ${x.px} px in one frame: ${x.el}`);
  }
  await browser.close();
  for (const e of [...new Set(errors)]) issues.push(`console: ${e}`);
  console.log(`Motion: played ${played} scene(s) in ${Math.round((Date.now() - t0) / 1000)} s`);
  console.log(issues.length ? issues.map(x => "  - " + x).join("\n") :
    "  Nothing jumped.  Still watch it once at full screen: the check can't judge pacing or taste.");
  process.exit(issues.length ? 1 : 0);
}
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(out)) if (f.endsWith(".png") && (!only || f.includes(`-${only}-b`) || f.startsWith("sheet-")))
  fs.unlinkSync(path.join(out, f));

const issues = [], errors = [], requests = [], taken = [], notes = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const uniq = a => [...new Set(a)];
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("pageerror", e => errors.push(String(e)));
page.on("console", m => { if (["error", "warning"].includes(m.type())) errors.push(m.text()); });
page.on("request", r => { if (!/^(file|data|blob):/.test(r.url())) requests.push(r.url()); });
await page.goto(pathToFileURL(src).href + "?check");
await page.waitForFunction("window.proto");
await page.addStyleTag({ content: ".pf-notext *{color:transparent!important;-webkit-text-fill-color:transparent!important;" +
  "text-shadow:none!important;fill:transparent!important}" });
await wait(300);
const scenes = await page.evaluate("proto.scenes");
if (only && !scenes.some(s => s.id === only)) {
  console.log(`No scene with id '${only}'.  Scenes: ${scenes.map(s => s.id).join(", ")}`);
  await browser.close(); process.exit(2);
}

for (const [i, s] of scenes.entries()) {
  if (only && s.id !== only) continue;
  await page.evaluate(`void proto.go(${i})`);
  await wait(150);
  const seen = new Set();
  for (let b = 0; b <= s.beats; b++) {
    const st = await page.evaluate("proto.state()");
    if (st.scene !== i) break;
    if (!seen.has(st.beat)) {
      seen.add(st.beat);
      await wait(120);
      const nn = String(i + 1).padStart(2, "0"), name = `${nn}-${s.id}-b${st.beat}.png`;
      await page.screenshot({ path: path.join(out, name) });
      taken.push(name);
      const a = await page.evaluate(AUDIT), tag = `${nn} ${s.id} beat ${st.beat}`;
      if (!a.label) issues.push(`${tag}: concept label not visible`);
      for (const c of uniq(a.clipped)) issues.push(`${tag}: clipped or overflowing text: '${c}'`);
      for (const t of uniq(a.tiny)) issues.push(`${tag}: text under 11 px: '${t}'`);
      const lines = await page.evaluate(FRAME_TEXT);
      if (lines !== null) {
        const bare = (await page.screenshot()).toString("base64");
        for (const t of uniq(await page.evaluate(CONTRAST, [bare, lines])))
          issues.push(`${tag}: hard to read against what's behind it (raise the .td-shade on a photo, or use a darker palette colour): '${t}'`);
      }
      if (st.beat === st.max) {
        for (const re of TELLS) for (const m of uniq(a.text.match(re) || [])) issues.push(`${tag}: wording to replace: '${m}'`);
        for (const m of uniq(a.text.match(EMOJI) || [])) issues.push(`${tag}: emoji '${m}' (use a Fluent icon)`);
        for (const f of a.findings || []) issues.push(`${tag}: ${f}`);
        if (!["cover", "close"].includes(s.id) && !a.clickable && st.max === 0)
          notes.push(`${tag}: a still scene (no beats, no click).  Fine if that's the point; otherwise give the room something to see happen`);
      }
    }
    if (st.beat >= st.max) break;
    await page.evaluate("proto.next()");
    await wait(100);
  }
}
const sheets = await contactSheets(browser, out, taken);
if (!only) {
  issues.push(...await page.evaluate(PLACEHOLDERS, fs.readFileSync(src, "utf8")));
  issues.push(...await previewCheck(browser, src));
}
await browser.close();
for (const e of uniq(errors)) issues.push(`console: ${e}`);
for (const r of uniq(requests)) issues.push(`network request (must be offline): ${r}`);
console.log(`${scenes.length} scenes, ${taken.length} screenshots and ${sheets} contact sheet(s) in ${out}`);
console.log(issues.length ? issues.map(x => "  - " + x).join("\n") :
  "  No automatic findings.  Now review the contact sheets, and open single screenshots where something looks off.");
if (notes.length) console.log("  Notes (not findings):\n" + notes.map(x => "  - " + x).join("\n"));
console.log("  This check sees layout, not story.  Before you show it, read the story back: is it the fullest version?");
process.exit(issues.length ? 1 : 0);
