"""Narration-led timing plan: builds plan.json from narration.txt's stage directions, the voiced cue lengths
(cues.json) and the prototype's outline, so nobody hand-places presses.

Usage (from the build folder, after voice.py):  python autoplan.py [--outline outline.json] [--dry]

narration.txt, with stage directions (lines starting with "@"; "#" lines are comments):

    @ cover                 prototype scene "cover" at its opening stop (beat 0)
    Host: This is a concept from Tredence ...
    @ gfx night             a graphics sequence (night | morning | endcard); optional overrides:
    Host: At two in the morning ...            @ gfx night tSim=e(1)+0.3 tS=s(3)  (s(n)/e(n): start/end of its nth line)
    @ ask                   scene "ask" opens (a new segment, because the story jumped)
    Host: Adele asks what to work on first.
    @ ask 3                 step on to beat 3: every stop in between plays at its natural pace
    Host: The agent answers from the overnight plan ...
    @ ask end               the scene's last beat
    @ hold 1.5              an extra pause before whatever comes next
    @ closing               the #beyondpossible sign-off: no line, holds pacing.end_hold_s at the end

Each step comes just after the previous line ends, and the line about a stop starts pacing.lead_s after the step
(pacing.scene_lead_s on a new scene), so the screen changes a breath before the narration talks about it.  A stop
always stays at least as long as its text takes to stream, plus pacing.settle_s, plus its data-hold.  Stops the
narration skips play in between at the pace the live demo would (their data-auto delay).

Prototype segments are filmed in the engine's ?driven mode (record.py): the recorder calls proto.step() at each
step time; nothing in the prototype moves on its own clock.  A new segment starts when the story jumps (a graphics
sequence, a scene earlier than the current one, or a scene skipped over).
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

from filmcfg import load
from planlib import Plan

GFX = ("night", "morning", "endcard")


def get_outline(cfg, path):
    proto = Path(cfg["prototype"]["dir"], cfg["prototype"]["file"])
    if path and Path(path).exists() and Path(path).stat().st_mtime >= proto.stat().st_mtime:
        return json.load(open(path, encoding="utf-8"))
    url = proto.resolve().as_uri() + "?driven"
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as pw:
            b = None
            for opts in ({}, {"channel": "msedge"}, {"channel": "chrome"}):
                try:
                    b = pw.chromium.launch(**opts); break
                except Exception:
                    continue
            if not b:
                raise RuntimeError("no browser")
            p = b.new_page(viewport={"width": 1920, "height": 1080})
            p.goto(url)
            p.wait_for_function("window.proto && window.proto.outline")
            o = p.evaluate("proto.outline()")
            b.close()
    except (ImportError, RuntimeError):
        r = subprocess.run(["node", str(Path(__file__).with_name("outline.js")), url], capture_output=True, text=True)
        if r.returncode:
            raise SystemExit("couldn't read the prototype's outline: " + r.stderr[-500:])
        o = json.loads(r.stdout)
    json.dump(o, open(path or "outline.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    return o


def parse(path, prefix):
    """[(directive, [line indexes])] in order."""
    pre = prefix.strip(); out = []; n = 0
    for raw in open(path, encoding="utf-8"):
        s = raw.strip()
        if s.startswith("@"):
            out.append([s[1:].strip(), []])
        elif s.startswith(pre):
            if not out:
                raise SystemExit(f"narration line {n + 1} comes before any '@ scene' direction")
            out[-1][1].append(n); n += 1
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--outline", default="outline.json")
    ap.add_argument("--dry", action="store_true", help="print the plan, don't write plan.json")
    a = ap.parse_args()
    cfg = load(); NC = cfg["narration"]; PC = cfg["pacing"]
    P = Plan(cfg)
    ids = list(P.C.keys())
    dirs = parse(NC["script"], NC["prefix"])
    nlines = sum(len(l) for _, l in dirs)
    if nlines != len(ids):
        raise SystemExit(f"narration.txt has {nlines} lines but cues.json has {len(ids)}: run voice.py again")
    O = get_outline(cfg, a.outline)
    scenes = O["scenes"]; index = {s["id"]: i for i, s in enumerate(scenes)}

    def visual(si, b):
        """How long stop (si, b) needs on screen before the next step, from the outline."""
        st = scenes[si]["beats"][b]
        v = st.get("stream", 0) / 1000 + PC["settle_s"]
        if b == 0:
            v += cfg["crossfade_s"]
        if st.get("trigger") == "click":
            v += 0.35                                   # the press animation on the cued control
        h = st.get("hold")
        if isinstance(h, (int, float)):
            v = max(v, h / 1000)
        return v

    def after(si, b):
        st = scenes[si]["beats"][b]
        return st.get("after", 0) / 1000 if st.get("trigger") == "auto" else 0.0

    seg = None; segs = []; gfx_count = [0]; proto_count = [0]

    def close_seg(extra_hold=0.0):
        nonlocal seg
        if seg is None:
            return
        if seg["kind"] == "proto":
            dur = max(seg["vis_ready"], seg["line_end"] + PC["tail_s"] if seg["line_end"] else 0) + extra_hold
            seg["dur"] = round(dur, 3)
        segs.append(seg); seg = None

    def new_proto(si):
        nonlocal seg
        close_seg()
        proto_count[0] += 1
        seg = dict(name=f"P{proto_count[0]}", kind="proto", hash="#" + scenes[si]["id"], replay=False, driven=True,
                   presses=[], steps=[], cues=[], scenes=[[scenes[si]["id"], 0.0]], cur=(si, 0), t_cur=0.0,
                   vis_ready=visual(si, 0), line_end=0.0, hold=0.0)

    def step_to(si, b):
        """Advance the open proto segment to stop (si, b), one stop at a time."""
        while seg["cur"] != (si, b):
            csi, cb = seg["cur"]
            nb = (csi, cb + 1) if cb + 1 < len(scenes[csi]["beats"]) else (csi + 1, 0)
            if nb[0] > si or (nb[0] == si and nb[1] > b):
                raise SystemExit(f"can't step back to {scenes[si]['id']} {b}")
            gap = PC["tail_s"] if nb[1] == 0 else 0.1           # a breath before a new scene; none inside one
            t = max(seg["t_cur"] + PC["min_stop_s"], seg["vis_ready"] + after(*nb),
                    seg["line_end"] + gap + seg["hold"] if seg["line_end"] else 0)
            seg["hold"] = 0.0
            seg["steps"].append(round(t, 3))
            if nb[1] == 0:
                seg["scenes"].append([scenes[nb[0]]["id"], round(t, 3)])
            seg["cur"] = nb; seg["t_cur"] = t; seg["vis_ready"] = t + visual(*nb)

    def place_lines(lines, lead):
        t0 = seg["t_cur"] + lead
        for k in lines:
            cid = ids[k]
            at = max(t0, seg["line_end"] + PC["line_gap_s"] + seg["hold"] if seg["line_end"] else t0)
            seg["hold"] = 0.0
            seg["cues"].append((cid, round(at, 3)))
            seg["line_end"] = at + P.D[cid]; t0 = 0

    def gfx_seg(kind, args, lines):
        nonlocal seg
        close_seg()
        gfx_count[0] += 1
        t = 0.9 if kind == "night" else 1.2 if kind == "morning" else 0.6
        cues = []; starts = []; ends = []
        for k in lines:
            cid = ids[k]
            cues.append((cid, round(t, 3))); starts.append(t); ends.append(t + P.D[cid])
            t = t + P.D[cid] + (0.4 if kind != "morning" else 0.45)
        last = ends[-1] if ends else 0.0
        S = lambda i: starts[min(i, len(starts)) - 1] if starts else 0.0
        E = lambda i: ends[min(i, len(ends)) - 1] if ends else 0.0
        n = len(lines); has_sim = os.path.exists(cfg["graphics"]["simdata"])
        if kind == "night":
            p = {}
            if has_sim and n >= 2:
                p["tSim"] = max(4.4, E(1) + 0.3); p["tA0"] = p["tSim"] + 1.0
                p["tH"] = max(p["tA0"] + 1.5, S(2) + 1.2); p["tA1"] = p["tH"] + 0.4
                p["tS"] = max(p["tH"] + 2.0, S(3) - 0.05) if n >= 3 else p["tH"] + 2.5
                p["tI0"] = p["tS"] + 2.5; p["tI1"] = p["tI0"] + 4.0
                p["end"] = max(p["tI1"] + 1.6, last + 1.0)
            else:
                p["end"] = max(4.0, last + 1.0)
        elif kind == "morning":
            p = dict(tSw=2.8, tLT=3.6, tQ=S(1) + 3.4, end=max(6.0, last + 0.9))
        else:
            p = dict(tT=0.5, tL=1.4, end=max(4.0, last + 1.0))
        env = dict(s=S, e=E, **p)
        for kv in args:
            k, _, expr = kv.partition("=")
            p[k] = float(eval(expr, {"__builtins__": {}, "max": max, "min": min}, env)); env[k] = p[k]
        segs.append(dict(name=f"G{gfx_count[0]}", kind="gfx", seg=kind, params={k: round(v, 3) for k, v in p.items()},
                         dur=round(p["end"], 3), cues=cues))

    for d, lines in dirs:
        w = d.split()
        if not w:
            continue
        if w[0] == "gfx":
            if len(w) < 2 or w[1] not in GFX:
                raise SystemExit(f"'@ {d}': graphics are {', '.join(GFX)}")
            gfx_seg(w[1], w[2:], lines); continue
        if w[0] == "hold":
            if seg is None or seg["kind"] != "proto":
                raise SystemExit("'@ hold' goes after a prototype scene")
            seg["hold"] += float(w[1]); continue
        if w[0] not in index:
            raise SystemExit(f"'@ {d}': no scene '{w[0]}' in the prototype (scenes: {', '.join(index)})")
        si = index[w[0]]
        last_b = len(scenes[si]["beats"]) - 1
        b = last_b if len(w) > 1 and w[1] == "end" else int(w[1]) if len(w) > 1 else 0
        if not 0 <= b <= last_b:
            raise SystemExit(f"'@ {d}': scene {w[0]} has stops 0-{last_b}")
        if seg is None or seg["kind"] != "proto" or si < seg["cur"][0] or si > seg["cur"][0] + 1 \
                or (si == seg["cur"][0] and b < seg["cur"][1]):
            new_proto(si)
            step_to(si, b)
            lead = PC["scene_lead_s"] if b == 0 else PC["lead_s"]
        else:
            new_scene = si != seg["cur"][0]
            step_to(si, b)
            lead = PC["scene_lead_s"] if new_scene and b == 0 else PC["lead_s"]
        place_lines(lines, lead)
        if not lines and si == len(scenes) - 1 and d == dirs[-1][0]:
            seg["vis_ready"] = max(seg["vis_ready"], seg["t_cur"] + PC["end_hold_s"])
    close_seg()

    for s in segs:
        for k in ("cur", "t_cur", "vis_ready", "line_end", "hold"):
            s.pop(k, None)
    P.segs = segs
    if a.dry:
        print(json.dumps(segs, indent=1)); return
    P.write()
    for s in segs:
        if s["kind"] == "proto":
            print(f"  {s['name']} {s['hash']}: steps at " + ", ".join(f"{t:.1f}" for t in s["steps"]))


if __name__ == "__main__":
    main()
