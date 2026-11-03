"""Regression checks for the shared engine and the Tredence brand overlay.

Run: python -m unittest discover -s tests -v
Requires Python Playwright, Pillow and an installed Edge or Chromium browser.
"""

import json
from pathlib import Path
import re
import runpy
import shutil
import subprocess
import sys
import tempfile
import unittest

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
CHECK = runpy.run_path(str(ROOT / "assets" / "check_prototype.py"))


class PrototypeTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory(prefix="prototype-film-tredence-test-")
        cls.addClassCleanup(cls.temp.cleanup)
        cls.work = Path(cls.temp.name) / "smoke"
        cls.work.mkdir()
        shutil.copytree(ROOT / "assets" / "kit", cls.work / "kit")
        starter = (ROOT / "assets" / "starter.html").read_text(encoding="utf-8")
        shells = (ROOT / "assets" / "shells.html").read_text(encoding="utf-8")
        scenes = []
        for scene_id in ("chat", "plan"):
            match = re.search(
                rf'<section\b[^>]*\bid="{scene_id}"[^>]*>[\s\S]*?</section>',
                shells,
            )
            if not match:
                raise AssertionError(f"Missing product outline: {scene_id}")
            scenes.append(match[0])
        starter = starter.replace("<!-- Product scenes go here.", "\n".join(scenes) + "\n<!-- Product scenes go here.", 1)
        replacements = {
            "Customer": "Concept",
            "Person": "Adele Vance",
            "Company": "Contoso",
            "App name": "Contoso Assist",
            "Agent name": "Order desk agent",
            "product": "outlook",
            "word": "word",
            "glyph": "document",
            "#their colour": "#156082",
        }
        starter = re.sub(r"\[\[([^\]\n]+)\]\]", lambda m: replacements.get(m[1], "Sample"), starter)
        cls.html = cls.work / "prototype.html"
        cls.html.write_text(starter, encoding="utf-8")
        cls.packed = cls.work / "dist" / "smoke.html"
        cls.pw = sync_playwright().start()
        cls.addClassCleanup(cls.pw.stop)
        try:
            cls.browser = cls.pw.chromium.launch(channel="msedge")
        except Exception:                      # no Edge (Mac, Linux sandboxes): Playwright's own Chromium
            cls.browser = cls.pw.chromium.launch()
        cls.addClassCleanup(cls.browser.close)

    def setUp(self):
        self.page = self.browser.new_page(viewport={"width": 1920, "height": 1080})
        self.addCleanup(self.page.close)
        self.errors = []
        self.page.on("pageerror", lambda e: self.errors.append(str(e)))

    def open(self, query="?driven&instant", path=None):
        self.page.goto((path or self.html).as_uri() + query)
        self.page.evaluate("() => proto.ready")

    def command(self, *args):
        result = subprocess.run(
            [sys.executable, *map(str, args)],
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        return result.stdout

    def test_javascript_syntax(self):
        for rel in ("kit/proto.js", "kit/proto-style.js", "kit/icons.js"):
            with self.subTest(script=rel):
                source = (ROOT / "assets" / rel).read_text(encoding="utf-8")
                self.page.evaluate("(source) => { new Function(source); }", source)

    def test_driven_outline_and_events(self):
        self.open()
        self.assertEqual(self.page.evaluate("proto.version"), "1.14.8")
        outline = self.page.evaluate("proto.outline()")
        self.assertEqual([s["id"] for s in outline["scenes"]], ["cover", "chat", "plan", "close", "closing"])
        self.page.evaluate("window.seenBeats = []; addEventListener('proto:beatend', e => seenBeats.push(e.detail))")
        self.page.evaluate("() => proto.go('chat', 0)")
        before = self.page.evaluate("proto.state().beat")
        self.page.wait_for_timeout(700)
        self.assertEqual(self.page.evaluate("proto.state().beat"), before)
        state = self.page.evaluate("() => proto.step()")
        self.assertEqual(state["beat"], 1)
        self.assertTrue(self.page.evaluate("seenBeats.length > 0"))
        self.assertEqual(self.page.locator(".concept").count(), 1)
        self.assertFalse(self.page.locator(".proto-nav").count())
        self.assertEqual(self.page.locator(".proto-dots").evaluate("(e) => getComputedStyle(e).display"), "none")
        self.assertFalse(self.errors, self.errors)

    def test_tredence_frame_and_microsoft_product_separation(self):
        self.open()
        self.assertIn("Poppins", self.page.locator("#cover").evaluate("(e) => getComputedStyle(e).fontFamily"))
        self.assertEqual(self.page.locator("#close .td-hl").evaluate("(e) => getComputedStyle(e).color"), "rgb(254, 80, 0)")
        self.assertEqual(self.page.locator("#cover .td-ch-tag").inner_text(), "#BeyondPossible")
        self.assertEqual(self.page.locator("#closing .td-ch-close").inner_text(), "#beyondpossible")
        self.assertNotIn("Poppins", self.page.locator("#chat .cpa").evaluate("(e) => getComputedStyle(e).fontFamily"))
        self.assertIn("kit/brand/", self.page.locator("#cover").evaluate("(e) => getComputedStyle(e, '::before').backgroundImage"))
        for scene in ("cover", "close", "closing"):
            self.page.evaluate("(id) => proto.go(id, true)", scene)
            findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
            self.assertFalse(findings, findings)

    def test_finished_still_scene_settles(self):
        self.open()
        state = self.page.evaluate("""() => Promise.race([
            proto.go('closing', true),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Still scene did not settle')), 3000))
        ])""")
        self.assertEqual(state["id"], "closing")
        self.assertTrue(state["settled"])

    def test_work_trace_disclosures_and_workspace_counter(self):
        self.open()
        self.page.evaluate("() => proto.go('chat', true)")
        self.assertTrue(self.page.locator("#chat .work-box").evaluate("(e) => e.classList.contains('done')"))
        self.assertEqual(self.page.locator("#chat .work-box .sum .n").inner_text(), "3 items")
        thought = self.page.locator("#chat .work li.think")
        thought.locator(".lbl").click()
        self.assertFalse(thought.evaluate("(e) => e.classList.contains('open')"))
        self.page.evaluate("() => proto.go('chat', true)")
        self.assertTrue(thought.evaluate("(e) => e.classList.contains('open')"))
        self.page.evaluate("() => proto.go('plan', true)")
        counter = self.page.locator("#plan .ws-count").inner_text()
        self.assertRegex(counter, r"\d+\s*/\s*\d+")
        more = self.page.locator("#plan .work-box > .more")
        more.click()
        self.assertTrue(self.page.locator("#plan .work-box").evaluate("(e) => e.classList.contains('all')"))
        self.assertFalse(self.errors, self.errors)

    def test_fluent_agent_ui(self):
        self.open()
        self.page.evaluate("() => proto.go('chat', true)")
        chat = self.page.locator("#chat")
        self.assertIn("Order desk agent", chat.locator(".cp-who").first.inner_text())
        self.assertEqual(chat.locator(".cp-who .cp-mark").count(), 1)
        self.assertEqual(chat.locator(".cpa-brand .wm").inner_text(), "Contoso Assist")
        self.assertEqual(chat.locator(".cpa-switch > *").all_inner_texts(), ["Chat", "Agent"])
        self.assertEqual(chat.locator(".cpa .oi.copilot").count(), 0)
        self.assertNotIn("Copilot", chat.locator(".cpa").inner_text())
        style = lambda sel, prop: chat.locator(sel).first.evaluate(f"(e) => getComputedStyle(e).{prop}")
        self.assertNotRegex(style(".cpa", "fontFamily"), "Sitka|Georgia|Times")
        self.assertEqual(style(".cp-resp", "backgroundColor"), "rgb(255, 255, 255)")
        self.assertEqual(style(".cp-user", "backgroundColor"), "rgb(235, 243, 252)")
        self.assertEqual(style(".work-box", "borderTopStyle"), "solid")
        self.assertEqual(style(".cpa-modes > .on", "fontWeight"), "600")
        self.assertEqual(chat.locator(".cp-acts .cp-ai").inner_text(), "AI-generated content may be incorrect")
        self.assertEqual(chat.locator(".cpa-send [data-icon]").get_attribute("data-icon"), "send_filled")
        findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
        self.assertFalse([f for f in findings if ".cp-who" in f], findings)
        chat.locator(".cp-who").first.evaluate("(e) => e.remove()")
        findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
        self.assertTrue([f for f in findings if ".cp-who" in f], findings)
        chat.locator(".cpa-brand .wm").evaluate("(e) => { e.textContent = 'Copilot'; }")
        findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
        self.assertTrue([f for f in findings if "Microsoft Copilot identity" in f], findings)
        self.page.evaluate("() => proto.go('plan', true)")
        ws = self.page.locator("#plan .cpa-pane.ws")
        self.assertEqual(ws.evaluate("(e) => getComputedStyle(e).backgroundColor"), "rgb(255, 255, 255)")
        self.assertEqual(ws.locator(".ws-count").evaluate("(e) => getComputedStyle(e).backgroundColor"), "rgb(235, 243, 252)")
        self.assertFalse(self.errors, self.errors)

    def test_play_pause_and_existing_mouse_navigation(self):
        self.open("")
        self.page.keyboard.press("Space")
        self.assertEqual(self.page.evaluate("proto.state().mode"), "playing")
        self.page.keyboard.press("Space")
        self.assertEqual(self.page.evaluate("proto.state().mode"), "paused")
        self.page.locator(".proto-nav button[aria-label='Next']").click()
        self.assertEqual(self.page.evaluate("proto.state().id"), "chat")
        self.page.locator(".proto-nav button[aria-label='Back']").click()
        self.assertEqual(self.page.evaluate("proto.state().id"), "cover")
        self.page.evaluate("() => proto.go('chat', 1)")
        self.page.keyboard.press("Space")
        self.page.wait_for_timeout(120)
        self.page.keyboard.press("Space")
        snapshot = self.page.locator("#chat").inner_text()
        self.page.wait_for_timeout(1000)
        self.assertEqual(self.page.locator("#chat").inner_text(), snapshot)
        self.assertFalse(self.errors, self.errors)

    def test_checker_preserves_brand_rules_and_adds_product_rules(self):
        self.open("?check")
        self.page.evaluate("() => proto.go('close', true)")
        self.page.locator("#close .td-title").evaluate("(e) => { e.style.fontFamily = 'Arial'; e.style.color = '#123456'; }")
        findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
        self.assertTrue(any("not in Poppins" in f for f in findings), findings)
        self.assertTrue(any("outside the Tredence palette" in f for f in findings), findings)
        self.page.evaluate("() => proto.go('chat', true)")
        self.page.locator("#chat .cpa-chat").evaluate("""e => {
          e.insertAdjacentHTML('beforeend', `<figure class="pbi" data-chart="bar" data-fmt="0%" data-x="A,B" data-series="Actual:0.5,0.7"><div class="pbi-head"><b>Coverage</b></div></figure>
            <div style="width:60px;height:20px;background:#ff0000"></div>
            <div style="width:60px;height:20px;background:#00ff00"></div>
            <div class="cpa-doc"><div class="page"><div class="ai-touched">Draft</div></div></div>`);
        }""")
        findings = self.page.evaluate(CHECK["AUDIT"])["findings"]
        for expected in ("whole percents", "traffic lights", "inside a document"):
            self.assertTrue(any(expected in f for f in findings), findings)

    def test_autoplay_holds_presses_cued_control_and_pauses(self):
        fixture = self.work / "playback.html"
        fixture.write_text(
            """<!doctype html><html lang="en"><head><meta charset="utf-8">
            <script src="kit/proto-style.js"></script></head>
            <body data-concept="Concept demo · Fictitious data"><main class="stage">
            <section class="scene zoom" id="playback" data-title="Playback" data-hold="2500">
              <p>Sample</p>
              <button class="btn" data-beat="1" data-hide="2" data-go="next" data-cue>Approve</button>
              <p data-beat="2" data-hold="pause" data-note="Ask the room">Decision</p>
              <p data-beat="3">Finished</p>
            </section></main><script src="kit/icons.js"></script>
            <script src="kit/proto.js"></script></body></html>""",
            encoding="utf-8",
        )
        self.open("", fixture)
        self.page.evaluate("""() => {
            window.firstBeatAt = null;
            addEventListener('proto:beat', e => {
                if (e.detail.beat === 1) firstBeatAt = performance.now();
            });
            window.startedAt = performance.now();
            void proto.go('playback');
            proto.play();
        }""")
        self.page.wait_for_function("proto.state().mode === 'paused'", timeout=15000)
        self.assertEqual(self.page.evaluate("proto.state().beat"), 2)
        self.assertGreaterEqual(self.page.evaluate("firstBeatAt - startedAt"), 2500)
        self.assertTrue(self.page.locator("[data-go]").evaluate("(e) => e.classList.contains('clicked')"))
        outline = self.page.evaluate("proto.outline()")
        self.assertIn("Ask the room", json.dumps(outline))
        self.assertFalse(self.errors, self.errors)

    def test_outline_command(self):
        dest = self.work / "outline.json"
        self.command(ROOT / "assets" / "check_prototype.py", self.html, "--outline", dest)
        outline = json.loads(dest.read_text(encoding="utf-8"))
        self.assertEqual(outline["engine"], "1.14.8")
        self.assertEqual(len(outline["scenes"]), 5)

    def test_pack_and_sandbox_preview(self):
        self.command(ROOT / "assets" / "pack_prototype.py", self.html)
        self.assertTrue(self.packed.exists())
        self.assertLess(self.packed.stat().st_size, 15 * 1024 * 1024)
        packed_text = self.packed.read_text(encoding="utf-8")
        self.assertIn("data:font/ttf;base64,", packed_text)
        self.assertNotIn('src="kit/', packed_text)
        self.open(path=self.packed)
        self.assertEqual(self.page.evaluate("proto.version"), "1.14.8")
        self.page.evaluate("() => proto.go('plan', true)")
        self.assertFalse(self.errors, self.errors)
        self.page.close()
        findings = CHECK["preview_check"](self.browser, self.packed)
        self.assertFalse(findings, findings)

    def test_full_checker_on_frame_and_product_outlines(self):
        self.command(ROOT / "assets" / "check_prototype.py", self.html)

    def test_motion_checker(self):
        self.command(ROOT / "assets" / "check_prototype.py", self.html, "--motion")


if __name__ == "__main__":
    unittest.main()
