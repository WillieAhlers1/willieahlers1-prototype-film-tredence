// Node fallback for autoplan.py: prints the prototype's outline (proto.outline()) as JSON.
// Usage: node outline.js <file:///.../prototype.html?driven>
let pw;
try { pw = require("playwright"); } catch (e) { pw = require("/usr/local/lib/node_modules/docgen-utils/node_modules/playwright"); }
(async () => {
  let b;
  for (const o of [{}, { channel: "msedge" }, { channel: "chrome" }]) { try { b = await pw.chromium.launch(o); break; } catch (e) { /* next */ } }
  if (!b) throw new Error("no browser for Playwright");
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  await p.goto(process.argv[2]);
  await p.waitForFunction("window.proto && window.proto.outline");
  process.stdout.write(JSON.stringify(await p.evaluate("proto.outline()")));
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
