"""Checks for the film side: text for the ear, the lexicon, narration-led timing and the clean-up.

Run: python -m unittest discover -s tests -v      (no browser or voice model needed)
"""
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = ROOT / "film" / "scripts"
sys.path.insert(0, str(SCRIPTS))
import speech  # noqa: E402


class SpeechTests(unittest.TestCase):
    def test_money_times_and_abbreviations(self):
        n = speech.normalise
        self.assertEqual(n("$1.17M"), "1.17 million dollars")
        self.assertEqual(n("from $450K to $2.5bn"), "from 450 thousand dollars to 2.5 billion dollars")
        self.assertEqual(n("$1,200 a month"), "1,200 dollars a month")
        self.assertEqual(n("due by 11:30 AM"), "due by eleven thirty A M")
        self.assertEqual(n("just before 7:30"), "just before seven thirty")
        self.assertEqual(n("at 7:05"), "at seven oh five")
        self.assertEqual(n("at 9:00"), "at nine o'clock")
        self.assertEqual(n("1.5x faster, 24/7, e.g. returns"), "1.5 times faster, twenty-four seven, for example returns")
        self.assertEqual(n("3-4 weeks"), "3 to 4 weeks")
        self.assertEqual(n("21% of orders"), "21 percent of orders")
        self.assertEqual(n("in FY26"), "in F Y twenty-six")

    def test_lexicon_and_suspects(self):
        say, ipa = speech.load_lexicon(home=tempfile.mkdtemp(), build=tempfile.mkdtemp())
        self.assertIn("Tredence", ipa)
        sp = speech.spoken("Orders in D365 and the ERP feed Power BI.", say, ipa)
        self.assertEqual(sp, "Orders in Dynamics three sixty-five and the E R P feed Power B I.")
        self.assertEqual(speech.spoken("Tredence and Contoso", say, ipa), "/Tredence/ and /Contoso/")
        self.assertEqual(speech.suspects("The OEE on line X7 in SmartPlan, per the CEO.", say, ipa), ["OEE", "SmartPlan", "X7"])
        self.assertEqual(speech.split_ipa("at Woodgrove Bank", {"Woodgrove": "wˈʊdɡɹoʊv"}),
                         [(False, "at "), (True, "wˈʊdɡɹoʊv"), (False, " Bank")])

    def test_film_lexicon_wins(self):
        b = tempfile.mkdtemp()
        Path(b, "lexicon.json").write_text(json.dumps({"say": {"ERP": "the planning system"}}), encoding="utf-8")
        say, _ = speech.load_lexicon(home=tempfile.mkdtemp(), build=b)
        self.assertEqual(speech.apply_say("our ERP", say), "our the planning system")


OUTLINE = {"engine": "1.14.8", "scenes": [
    {"id": "cover", "kind": "frame", "beats": [{"beat": 0, "trigger": "start"}]},
    {"id": "ask", "kind": "product", "beats": [
        {"beat": 0, "trigger": "start"}, {"beat": 1, "trigger": "auto", "after": 500},
        {"beat": 2, "trigger": "auto", "after": 1000, "stream": 3000},
        {"beat": 3, "trigger": "click", "click": "Approve"}]},
    {"id": "close", "kind": "frame", "beats": [{"beat": 0, "trigger": "start"}, {"beat": 1, "trigger": "next"}]},
    {"id": "closing", "kind": "frame", "beats": [{"beat": 0, "trigger": "start"}]}]}


class AutoplanTests(unittest.TestCase):
    def setUp(self):
        self.d = Path(tempfile.mkdtemp())
        for f in ("autoplan.py", "planlib.py", "filmcfg.py"):
            shutil.copy2(SCRIPTS / f, self.d / f)
        (self.d / "proto").mkdir()
        (self.d / "proto" / "p.html").write_text("<html></html>", encoding="utf-8")
        (self.d / "film.json").write_text(json.dumps({"tmp": "work", "prototype": {"dir": "proto", "file": "p.html"},
                                                      "narration": {"cue_ids": "A1 B1 B2 B3 C1"}}), encoding="utf-8")
        (self.d / "narration.txt").write_text(
            "@ cover\nHost: one\n@ ask\nHost: two\n@ ask 2\nHost: three\nHost: four\n@ ask 3\n@ close\nHost: five\n@ closing\n",
            encoding="utf-8")
        cues = {k: {"src": [0, d], "dur": d, "text": k} for k, d in
                [("A1", 4.0), ("B1", 2.0), ("B2", 3.0), ("B3", 2.5), ("C1", 3.0)]}
        (self.d / "cues.json").write_text(json.dumps(cues), encoding="utf-8")
        (self.d / "outline.json").write_text(json.dumps(OUTLINE), encoding="utf-8")
        os.utime(self.d / "proto" / "p.html", (1, 1))         # outline.json is newer: no browser needed

    def test_steps_follow_the_lines(self):
        r = subprocess.run([sys.executable, "autoplan.py"], cwd=self.d, capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        plan = json.loads((self.d / "plan.json").read_text(encoding="utf-8"))
        segs = plan["segments"]
        self.assertEqual([s["name"] for s in segs], ["P1"])          # cover -> ask -> close -> closing: one take
        s = segs[0]
        self.assertTrue(s["driven"])
        cues = dict(s["cues"])
        steps = s["steps"]
        # cover line, then the step to "ask" a breath (tail_s) after it ends
        self.assertAlmostEqual(cues["A1"], 0.9)
        self.assertAlmostEqual(steps[0], 0.9 + 4.0 + 0.9, places=2)
        # beat 1 and 2 are stepped after B1 ends; B2 starts lead_s after the beat-2 step
        self.assertGreater(steps[2], cues["B1"] + 2.0)
        self.assertAlmostEqual(cues["B2"], steps[2] + 0.35, places=2)
        # B3 follows B2 with the line gap; the approve click waits for B3 and for beat 2's streaming
        self.assertAlmostEqual(cues["B3"], cues["B2"] + 3.0 + 0.4, places=2)
        self.assertGreaterEqual(steps[3], cues["B3"] + 2.5)
        self.assertGreaterEqual(steps[3], steps[2] + 3.0 + 0.6)
        # no two lines overlap, and the sign-off holds at the end
        self.assertGreaterEqual(s["dur"], steps[-1] + 3.5 - 0.01)

    def test_unknown_scene_is_an_error(self):
        (self.d / "narration.txt").write_text("@ nowhere\nHost: one\n", encoding="utf-8")
        (self.d / "cues.json").write_text(json.dumps({"A1": {"src": [0, 1], "dur": 1, "text": "x"}}), encoding="utf-8")
        r = subprocess.run([sys.executable, "autoplan.py"], cwd=self.d, capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)
        self.assertIn("no scene 'nowhere'", r.stderr + r.stdout)


class CleanupTests(unittest.TestCase):
    def test_plan_then_zip_and_tidy(self):
        d = Path(tempfile.mkdtemp()) / "working" / "acme"
        (d / "dist").mkdir(parents=True); (d / "kit").mkdir(); (d / "renders").mkdir(); (d / "film" / "source-v2").mkdir(parents=True)
        (d / "brief.md").write_text("brief"); (d / "prototype.html").write_text("<html>")
        (d / "dist" / "acme.html").write_text("<packed>"); (d / "kit" / "proto.js").write_text("x")
        (d / "renders" / "01.png").write_text("png")
        (d / "film" / "Acme-Orders-Film-v1.mp4").write_text("old"); (d / "film" / "Acme-Orders-Film-v2.mp4").write_text("new")
        (d / "film" / "source-v2" / "narration.txt").write_text("Host: hi")
        build = Path(tempfile.mkdtemp()) / "film-acme"; build.mkdir(); (build / "work").mkdir()
        cmd = [sys.executable, str(ROOT / "assets" / "cleanup.py"), str(d), "--build", str(build)]
        r = subprocess.run(cmd, capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("Nothing changed yet", r.stdout)
        self.assertTrue((d / "kit").exists())
        r = subprocess.run(cmd + ["--yes"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertEqual(sorted(p.name for p in d.iterdir()),
                         ["Acme-Orders-Film-v2.mp4", "Acme-Orders-sources-v2.zip", "Acme-Orders.html"])
        self.assertEqual((d / "Acme-Orders-Film-v2.mp4").read_text(), "new")
        self.assertFalse(build.exists())
        import zipfile
        names = zipfile.ZipFile(d / "Acme-Orders-sources-v2.zip").namelist()
        self.assertIn("brief.md", names); self.assertIn("film/source-v2/narration.txt", names)
        self.assertFalse(any(n.startswith(("kit/", "renders/", "dist/")) for n in names))

    def test_refuses_the_skill_folder(self):
        r = subprocess.run([sys.executable, str(ROOT / "assets" / "cleanup.py"), str(ROOT)], capture_output=True, text=True)
        self.assertNotEqual(r.returncode, 0)


if __name__ == "__main__":
    unittest.main()
