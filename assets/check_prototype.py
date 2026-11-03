"""Step through a prototype like a presenter, screenshot every stop, and flag common problems.

    python check_prototype.py working/<name>/prototype.html     # or the packed dist/<name>.html
    python check_prototype.py working/<name>/prototype.html --scene orders   # recheck one scene after an edit
    python check_prototype.py working/<name>/prototype.html --motion [--scene orders]   # smoothness only, ~10 s a scene
    python check_prototype.py working/<name>/prototype.html --outline [file.json]   # outline.json for a driving tool

Writes renders/NN-<scene>-bB.png next to the HTML, plus renders/sheet-N.png contact sheets (12 screenshots each, in
beat order) so the whole flow can be reviewed in a few images.  Delete the folder when you're done.
One screenshot per stop: the scene's opening state and each point where the presenter has to press or click.
Automatic beats (data-auto) play straight through, so B is the beat the scene stopped on.  A scene whose beat 1
types itself, beat 2 is a click and beats 3-7 follow on their own gives two screenshots: b1 and b7.
--motion plays the scenes at presenter speed instead (no screenshots) and reports anything that jumps more than
12 px in a single frame rather than gliding: content that snaps into place when a beat appears, hides or finishes.
--outline writes the prototype's outline (scenes, beats, the text each adds, how each starts, notes) as JSON, for a
tool that drives the demo (references/engine.md, "Driving it from another tool"); no checks run.
Needs Python Playwright and Microsoft Edge or Chromium (`pip install playwright`, then `playwright install chromium`
if Edge isn't installed).  Without them it runs check_prototype.mjs with Node Playwright instead (same checks, read
from this file).  If neither runs, say so to the user: the screenshots and layout checks did not happen.

What it flags: script errors (for a packed file, also when played inside the sandbox OneDrive and SharePoint use
to preview a shared file, on a full pass), network requests, text clipped or spilling out of its box, text smaller than 11 px,
text on a Tredence frame photo without enough contrast (WCAG 4.5:1, or 3:1 for large text: 24 px, or 18.66 px bold),
the concept label missing, placeholder or AI-tell wording (including the Tredence voice's banned words), emoji, and notes for still scenes.
In the agent app (.cpa): an agent reply without its message header (.cp-who) at the start of the chat or after the person's message,
and the Microsoft Copilot logo or name used as the custom app's own identity.
Tredence frame scenes (.scene.frame): a colour outside the Tredence palette, a tint used as a text colour, text not in
Poppins, a gradient (other than .td-shade) or a shadow, Bright Orange or white-on-orange text under 24 px, white text
on Teal or Highlight Orange, Grey text under 28 px, and "TREDENCE" written in capitals in running text.
On a full pass, any double-bracket placeholder left from the starter or shells.html, anywhere in the source.
Power BI visuals: no title or number format, categories and values that don't line up, a "0%" format given fractions, a chart that drew nothing or
shows NaN, and a chart in an agent answer that doesn't cite its Power BI source.
Look at every screenshot yourself as well.  The script can't tell whether a scene is convincing.
"""
import base64
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def run_node(reason):
    import shutil
    import subprocess
    if not shutil.which("node"):
        sys.exit(f"Can't check: {reason}, and Node isn't installed.  The screenshots and layout checks did not run; "
                 "tell the user, and review the scenes in a browser if you can.")
    print(f"{reason}; using the Node checker.", flush=True)
    sys.exit(subprocess.call(["node", str(HERE / "check_prototype.mjs")] + sys.argv[1:]))


try:
    from playwright.sync_api import sync_playwright
except ImportError:
    sync_playwright = None

TELLS = [r"\blorem\b", r"\bipsum\b", r"\bacme\b", r"\bjohn doe\b", r"\bjane doe\b", r"\bfoo\b", r"\bplaceholder\b",
         r"\bTODO\b", r"\bunlock\w*\b", r"\bleverag\w+\b", r"\bseamless\w*\b", r"\bsupercharg\w+\b", r"\brevolutioni\w+\b",
         r"\bgame[- ]chang\w+\b", r"\bdelve\b", r"\bsynerg\w+\b", r"\bempower\w*\b", r"\bcutting[- ]edge\b",
         r"\bnext[- ]gen\w*\b", r"\b(?:Microsoft|M) ?365 Copilot\b", r"\bharness\w*\b", r"\bjourney\b", r"\bin today's\b", r"\bmagic\w*\b", r"\b99\.9+%",
         r"\bwhat you(?: just)? saw\b", r"\b(?:all )?in one place\b", r"\bsingle pane of glass\b", r"\bone[- ]stop[- ]shop\b",
         r"\bflywheel\w*\b", r"\bunleash\w*\b", r"\butili[sz]\w+\b", r"\bideat\w+\b", r"\boperationali[sz]\w+\b",
         r"\bbest[- ]in[- ]class\b", r"\bworld[- ]class\b", r"\bexcited to\b", r"\bTredence (?:Inc|Analytics)\b"]
EMOJI = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U0001F000-\U0001F2FF]")

# Leftover [[placeholders]] from the starter or shells.html, read from the source (they can hide in attributes).
PLACEHOLDERS = r"""(src) => {
  // Scripts are skipped: inlined engine code (a packed file) has [[a, b]] arrays that aren't placeholders.
  src = src.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const ph = [...new Set(src.match(/\[\[[^\]\n]{1,80}\]\]/g) || [])];
  return ph.length ? ['placeholder left in: ' + ph.slice(0, 6).join(', ') + (ph.length > 6 ? ` and ${ph.length - 6} more` : '')] : [];
}"""

AUDIT = r"""() => {
  const scene = document.querySelector('.scene.on'), out = {clipped: [], tiny: [], label: false, text: ''};
  const st = document.querySelector('.stage').getBoundingClientRect(), k = st.width / 1920;
  const b = document.querySelector('.concept');
  if (b) { const r = b.getBoundingClientRect(), cs = getComputedStyle(b);
    out.label = r.width > 40 && cs.visibility !== 'hidden' && +cs.opacity > 0.5 && r.right <= st.right + 1 && r.bottom <= st.bottom + 1; }
  const vis = el => { for (let e = el; e && e !== scene; e = e.parentElement) {
      const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.05) return false; }
    return true; };
  scene.querySelectorAll('*').forEach(el => {
    if (el.closest('.notes') || el.closest('svg') || el.closest('.avatar')) return;
    const own = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.nodeValue.trim());
    if (!own || !vis(el)) return;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect(), name = (el.textContent || '').trim().slice(0, 60);
    if (parseFloat(cs.fontSize) < 11) out.tiny.push(name + ' (' + cs.fontSize + ')');
    const clip = cs.textOverflow === 'ellipsis';
    if (!clip && (el.scrollWidth > el.clientWidth + 2 && cs.overflowX !== 'visible' || el.scrollHeight > el.clientHeight + 4 && cs.overflowY !== 'visible'))
      out.clipped.push(name);
    if (r.width && (r.right > st.right + 2 || r.bottom > st.bottom + 2 || r.left < st.left - 2)) out.clipped.push(name + ' (off stage)');
  });
  out.text = scene.innerText;
  scene.querySelectorAll('.td-ch').forEach(c => { out.text = out.text.replace(c.innerText, ''); });
  out.clickable = scene.querySelectorAll('[data-go]').length;
  out.frame = scene.classList.contains('frame');
  out.findings = [];
  if (out.frame) {
    // Tredence frame: the closed palette, Poppins only, flat colour, and the brand's contrast rules.
    const PAL = {'fe5000': 'Bright Orange', '6dcdb8': 'Teal', '004e42': 'Deep Green', '8a1f04': 'Deep Orange',
      'f48120': 'Highlight Orange', '404041': 'Charcoal', '929497': 'Grey', 'e6e7e8': 'Off White', 'ffffff': 'White', '000000': 'Black'};
    const TINT = {'ffede5': 'Orange Tint', 'e2f5f1': 'Teal Tint'};
    const hex = c => { const m = (c || '').match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] === 0)) return null;
      return m.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join(''); };
    const bgOf = el => { for (let e = el; e && e !== scene.parentElement; e = e.parentElement) { const h = hex(getComputedStyle(e).backgroundColor); if (h) return h; } return 'ffffff'; };
    const nm = el => (el.textContent || el.className || el.tagName).toString().trim().replace(/\s+/g, ' ').slice(0, 50);
    const seen = new Set(), flag = msg => { if (!seen.has(msg)) { seen.add(msg); out.findings.push(msg); } };
    scene.querySelectorAll('*').forEach(el => {
      if (el.closest('.notes') || el.closest('.td-ch') || !vis(el) || el.closest('svg') && el.tagName.toLowerCase() !== 'svg') return;
      const cs = getComputedStyle(el), own = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.nodeValue.trim());
      const bg = hex(cs.backgroundColor), shade = el.classList.contains('td-shade');
      if (bg && !PAL[bg] && !TINT[bg])
        flag('frame colour outside the Tredence palette: background #' + bg + ' on ' + nm(el));
      ['Top', 'Right', 'Bottom', 'Left'].forEach(sd => {
        const b = hex(cs['border' + sd + 'Color']);
        if (parseFloat(cs['border' + sd + 'Width']) > 0 && b && !PAL[b]) flag('frame colour outside the Tredence palette: border #' + b + ' on ' + nm(el));
      });
      if (/gradient/.test(cs.backgroundImage) && !shade) flag('gradient on a Tredence frame scene (flat colour only; .td-shade is the one exception): ' + nm(el));
      if (cs.boxShadow && cs.boxShadow !== 'none') flag('shadow on a Tredence frame scene (flat colour only): ' + nm(el));
      if (!own && el.tagName.toLowerCase() !== 'svg') return;
      const fg = hex(cs.color), size = parseFloat(cs.fontSize), back = bgOf(el);
      if (own && !/^\s*"?Poppins/i.test(cs.fontFamily)) flag('frame text not in Poppins: ' + nm(el));
      if (fg && TINT[fg]) flag(TINT[fg] + ' is for backgrounds only, not text: ' + nm(el));
      else if (fg && !PAL[fg]) flag('frame colour outside the Tredence palette: text #' + fg + ' on ' + nm(el));
      if (!own) return;
      if (size < 18) flag('frame text under 18 px (the template floor): ' + nm(el));
      if (fg === 'fe5000' && size < 24) flag('Bright Orange text under 24 px (too light to read; use Deep Orange or Black): ' + nm(el));
      if (fg === 'ffffff' && back === 'fe5000' && size < 24) flag('white text on Bright Orange under 24 px: ' + nm(el));
      if (fg === 'ffffff' && (back === '6dcdb8' || back === 'f48120')) flag('white text on ' + PAL[back] + ' (use Black): ' + nm(el));
      if (fg === '929497' && size < 28) flag('Grey text under 28 px (use Charcoal): ' + nm(el));
      if (/\bTREDENCE\b/.test(Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue).join(' ')))
        flag('write "Tredence", never "TREDENCE", in text (the capitals are the logo): ' + nm(el));
    });
  }
  if (scene.querySelector('.m365 .cp, .tm .cp, .lob .cp, .cp.pane, .mc'))
    out.findings.push('agent pane inside an app or the old full-screen shell: start in the agent app (.cpa), see shells.html');
  // The agent app is the customer's own custom-built app: never Microsoft Copilot's logo or name as its identity.
  scene.querySelectorAll('.cpa .oi.copilot, .cpa .cpa-brand .wm, .cpa .cp-who').forEach(el => {
    if (!vis(el)) return;
    const own = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue).join(' ').trim();
    if (el.matches('.oi.copilot') || /^(Microsoft )?Copilot$/i.test(own))
      out.findings.push('Microsoft Copilot identity in the custom agent app: use the app\'s own name and the agent\'s sparkle mark (.cp-mark) and name');
  });
  // In the agent app, each agent reply opens under its message header (.cp-who), at the start of
  // the chat and after each message from the person.
  scene.querySelectorAll('.cpa-chat').forEach(chat => {
    let open = true;
    for (const el of chat.children) {
      if (!vis(el)) continue;
      if (el.matches('.cp-user,.cp-time,.cp-file')) { open = true; continue; }
      if (open && el.matches('.work-box,.cp-turn,.cp-status,.acard'))
        out.findings.push('agent reply without its message header (.cp-who: the sparkle mark, the agent\'s name, the time) above it: ' + (el.textContent || '').trim().slice(0, 50));
      open = false;
    }
  });
  scene.querySelectorAll('.ai-touched').forEach(el => {
    if (!vis(el)) return;
    const cs = getComputedStyle(el), w = ['Top', 'Right', 'Bottom', 'Left'].map(s => parseFloat(cs['border' + s + 'Width']));
    if (Math.min(...w) < 1.5 || Math.max(...w) - Math.min(...w) > 0.5 || parseFloat(cs.paddingLeft) < 6 || parseFloat(cs.paddingRight) < 6)
      out.findings.push('agent highlight (.ai-touched) has a missing edge or content touching its frame: ' + (el.textContent || '').trim().slice(0, 50));
    // A container that clips (overflow other than visible) must hold the whole highlight; corners are matched by the engine.
    if (el.closest('.cpa-doc .page')) out.findings.push('agent highlight (.ai-touched) inside a document: Word draws none, and the whole draft is the agent\'s; take it out: ' + (el.textContent || '').trim().slice(0, 50));
    for (let a = el.parentElement; a && a !== scene; a = a.parentElement) {
      const ca = getComputedStyle(a);
      if (ca.overflowX === 'visible' && ca.overflowY === 'visible') continue;
      const ra = a.getBoundingClientRect(), r = el.getBoundingClientRect(), t = 1.5 * k;
      if (r.top < ra.top - t || r.left < ra.left - t || r.right > ra.right + t || r.bottom > ra.bottom + t)
        out.findings.push('agent highlight (.ai-touched) cut off by a container that clips: ' + (el.textContent || '').trim().slice(0, 50));
      break;
    }
  });
  // Figures outside Power BI: red and green fills used as bad and good (traffic lights).
  const hue = c => { const m = (c || '').match(/\d+(\.\d+)?/g); if (!m || m.length < 3 || (m[3] !== undefined && +m[3] < 0.5)) return null;
    const [r, g, bl] = m.slice(0, 3).map(v => v / 255), mx = Math.max(r, g, bl), mn = Math.min(r, g, bl), l = (mx + mn) / 2, d = mx - mn;
    if (d < 0.25 || l < 0.15 || l > 0.7 || d / (1 - Math.abs(2 * l - 1)) < 0.45) return null;
    let h = mx === r ? ((g - bl) / d) % 6 : mx === g ? (bl - r) / d + 2 : (r - g) / d + 4; h *= 60; return h < 0 ? h + 360 : h; };
  let red = 0, green = 0;
  scene.querySelectorAll('div,span,i,b,rect,path').forEach(el => {
    if (el.closest('.pbi,.ic,.oi,.fav,.avatar,.badge,.tag,.chip,.mode,.cp-mark,.plug,.notes') || !vis(el)) return;
    const r = el.getBoundingClientRect(); if (r.width < 24 * k || r.height < 4 * k) return;
    const svg = el instanceof SVGElement; if (!svg && (el.textContent || '').trim()) return;
    const h = hue(svg ? getComputedStyle(el).fill : getComputedStyle(el).backgroundColor);
    if (h === null) return;
    if (h < 15 || h > 340) red++; else if (h > 85 && h < 160) green++;
  });
  if (!out.frame && red && green) out.findings.push('red and green fills in one view (traffic lights): use the product palette, one accent for the value that matters and grey for the rest (look-and-feel.md, "Data colours")');
  scene.querySelectorAll('figure.pbi[data-chart]').forEach(f => {
    if (!vis(f)) return;
    const t = ((f.querySelector('.pbi-head > b') || {}).textContent || '').trim(), name = t.slice(0, 50) || f.dataset.chart + ' chart';
    if (!t) out.findings.push('Power BI visual without a title (.pbi-head > b): ' + name);
    if (!f.dataset.fmt) out.findings.push('Power BI visual without data-fmt, so its numbers have no units: ' + name);
    const n = (f.dataset.x || '').split(',').length;
    const nums = (f.dataset.series || '').split(';').flatMap(s => s.slice(s.indexOf(':') + 1).split(',')).map(v => +v).filter(v => !isNaN(v));
    if (/%\s*$/.test(f.dataset.fmt || '') && nums.length && nums.every(v => Math.abs(v) <= 1) && nums.some(v => v % 1))
      out.findings.push('Power BI visual "' + name + '": data-fmt "' + f.dataset.fmt + '" expects whole percents (75 for 75%), but the values look like fractions');
    (f.dataset.series || '').split(';').filter(s => s.trim()).forEach(s => {
      const m = s.slice(s.indexOf(':') + 1).split(',').length;
      if (m !== n) out.findings.push('Power BI visual "' + name + '" has ' + n + ' categories but ' + m + ' values in "' + s.split(':')[0].trim() + '"');
    });
    const plot = f.querySelector('.pbi-plot'), svg = plot && plot.querySelector(':scope > svg');
    if (!svg || !svg.querySelector('rect.grow, path.ln, circle')) out.findings.push('Power BI visual drew nothing (check data-x and data-series): ' + name);
    else if (/NaN|undefined|Infinity/.test(svg.innerHTML + plot.textContent)) out.findings.push('Power BI visual shows a bad number (NaN): ' + name);
    const turn = f.closest('.cp-turn');
    if (turn && !turn.querySelector('.ref .oi.bi, .ref .oi.powerbi')) out.findings.push('chart in an agent answer without its Power BI source (a .ref with .oi.powerbi): ' + name);
  });
  return out;
}"""

# Frame scenes put text on a photo.  Collect every line of text that isn't on a solid surface, hide all text,
# screenshot the bare background, then measure contrast against the brightest (or darkest) part behind each line.
FRAME_TEXT = r"""() => {
  const scene = document.querySelector('.scene.on'); if (!scene.classList.contains('frame')) return null;
  const st = document.querySelector('.stage').getBoundingClientRect(), k = st.width / 1920, lines = [];
  const solid = el => { for (let e = el; e && e !== scene; e = e.parentElement) {
      const s = getComputedStyle(e), c = s.backgroundColor.match(/[\d.]+/g);
      if (c && (c[3] === undefined || +c[3] > 0.6) || /gradient/.test(s.backgroundImage) && s.backgroundClip !== 'text') return true; }
    return false; };
  const lum = c => { const v = c.match(/[\d.]+/g).slice(0, 3).map(x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); });
    return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]; };
  const walk = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
  for (let n; (n = walk.nextNode());) {
    const el = n.parentElement; if (!n.nodeValue.trim() || el.closest('.notes') || el.closest('.concept') || el.closest('.td-ch') || el.closest('.td-cover-tag')) continue;
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || !el.getClientRects().length || solid(el)) continue;
    if (cs.backgroundClip === 'text') continue;
    const rg = document.createRange(); rg.selectNodeContents(n);
    for (const r of rg.getClientRects()) if (r.width > 4 && r.height > 4)
      lines.push({x: r.left - st.left, y: r.top - st.top, w: r.width, h: r.height, size: parseFloat(cs.fontSize) / k,
                  bold: parseInt(cs.fontWeight) >= 700, fg: lum(cs.color), text: n.nodeValue.trim().slice(0, 50)});
  }
  scene.classList.add('pf-notext');
  return lines;
}"""

CONTRAST = r"""async ([png, lines]) => {
  document.querySelector('.scene.on').classList.remove('pf-notext');
  const img = new Image(); img.src = 'data:image/png;base64,' + png; await img.decode();
  const cv = document.createElement('canvas'); cv.width = img.width; cv.height = img.height;
  const cx = cv.getContext('2d', {willReadFrequently: true}); cx.drawImage(img, 0, 0);
  const lin = x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); };
  const st = document.querySelector('.stage').getBoundingClientRect(), bad = [];
  for (const l of lines) {
    const d = cx.getImageData(Math.max(0, l.x + st.left), Math.max(0, l.y + st.top), Math.max(1, l.w), Math.max(1, l.h)).data, ls = [];
    for (let i = 0; i < d.length; i += 4) ls.push(.2126 * lin(d[i]) + .7152 * lin(d[i + 1]) + .0722 * lin(d[i + 2]));
    ls.sort((a, b) => a - b);
    const light = l.fg > ls[Math.floor(ls.length / 2)], bg = light ? ls[Math.floor(ls.length * .8)] : ls[Math.floor(ls.length * .2)];
    const ratio = light ? (l.fg + .05) / (bg + .05) : (bg + .05) / (l.fg + .05), need = l.size >= 24 || l.size >= 18.66 && l.bold ? 3 : 4.5;
    if (ratio < need) bad.push(l.text + ' (' + ratio.toFixed(1) + ':1, needs ' + need + ':1)');
  }
  return bad;
}"""
SHEET = r"""(cells) => {
  document.body.style.cssText = 'margin:0;background:#1b1a19;font:600 15px Segoe UI,sans-serif;color:#fff';
  document.body.innerHTML = '<div style="display:grid;grid-template-columns:repeat(3,624px);gap:12px;padding:12px">' +
    cells.map(c => '<figure style="margin:0"><img style="width:624px;height:351px;display:block" src="data:image/png;base64,' +
      c[1] + '"><figcaption style="padding:4px 2px">' + c[0] + '</figcaption></figure>').join('') + '</div>';
  return Promise.all(Array.from(document.images).map(i => i.decode()));
}"""

# --motion: play one scene in normal (animated) mode and sample every visible block each frame.  A snap is a move
# of more than 12 px in a single frame with no movement in the frames either side: something jumped instead of
# gliding.  Frames while a layout animation runs (the pane drawer) are skipped, since text rewraps there by design.
MOTION = r"""async (i) => {
  const frame = () => new Promise(r => requestAnimationFrame(r));
  const stage = document.querySelector('.stage'), k = stage.getBoundingClientRect().width / 1920;
  const inline = new WeakMap(), trace = new Map(), snaps = [];
  const layoutAnim = a => { try { return a.playState === 'running' && a.effect.getKeyframes().some(f =>
    Object.keys(f).some(p => /^(width|height|margin|padding|flex|top|left|right|bottom|inset)/.test(p))); } catch (e) { return false; } };
  const name = el => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className.trim() ?
    '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' "' + (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40) + '"';
  const sample = () => {
    const scene = document.querySelector('.scene.on'), sr = stage.getBoundingClientRect(), out = new Map();
    const w = document.createTreeWalker(scene, NodeFilter.SHOW_ELEMENT, { acceptNode(n) {
      if (!(n instanceof HTMLElement) || n.matches('.proto-ghost,.tw,.notes') || !n.offsetParent) return NodeFilter.FILTER_REJECT;
      let inl = inline.get(n);
      if (inl === undefined) { inl = getComputedStyle(n).display.startsWith('inline'); inline.set(n, inl); }
      return inl ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; } });
    for (let n; (n = w.nextNode());) { const r = n.getBoundingClientRect(); if (r.width || r.height) out.set(n, [(r.left - sr.left) / k, (r.top - sr.top) / k]); }
    return out;
  };
  let f = 0, frames = 0;
  const settle = async () => {
    const t0 = performance.now();
    for (let quiet = 0; performance.now() - t0 < 20000;) {
      await frame(); f++; frames++;
      const layout = document.getAnimations().some(layoutAnim), beat = proto.state().beat, hit = [];
      let moved = false;
      sample().forEach((p, el) => {
        const t = trace.get(el);
        if (!t || t.seen !== f - 1) { trace.set(el, { p, d: 0, seen: f, cand: null }); return; }
        const d = Math.hypot(p[0] - t.p[0], p[1] - t.p[1]);
        if (d > .3) moved = true;
        if (t.cand && d < 2) hit.push(t.cand);
        t.cand = !layout && d > 12 && t.d < 2 ? { el, beat, px: Math.round(d) } : null;
        Object.assign(t, { p, d, seen: f });
      });
      // Report the outermost element that jumped, not every descendant that jumped with it; siblings that jumped
      // the same distance together are one finding.
      const top = hit.filter(h => !hit.some(o => o !== h && o.el.contains(h.el))), byPx = new Map();
      top.forEach(h => { const g = byPx.get(h.px); g ? g.n++ : byPx.set(h.px, { h, n: 0 }); });
      byPx.forEach(({ h, n }) => snaps.push({ beat: h.beat, px: h.px, el: name(h.el) + (n ? ` and ${n} more` : '') }));
      quiet = moved || layout ? 0 : quiet + 1;
      if (quiet >= 20 && !proto.state().busy) return;
    }
  };
  proto.go(i);
  await settle();
  for (let st = proto.state(); st.scene === i && st.beat < st.max; st = proto.state()) { proto.next(); await settle(); }
  return { snaps, frames };
}"""

# Runs inside the OneDrive/SharePoint-style sandbox: plays every beat of every scene at normal speed settings.
PREVIEW = r"""async () => {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; i < proto.scenes.length; i++) {
    proto.go(i); await wait(60);
    for (let b = 0; b < proto.scenes[i].beats; b++) { proto.next(); await wait(60); }
  }
  proto.prev(); await wait(400);
  return proto.scenes.length;
}"""


def preview_host(src):
    """The file wrapped the way OneDrive and SharePoint preview it: a sandboxed srcdoc frame with no origin."""
    import html
    return ('<!doctype html><meta charset="utf-8"><body style="margin:0"><iframe sandbox="allow-scripts" '
            'style="border:0;width:1920px;height:1080px" srcdoc="' + html.escape(src.read_text(encoding="utf-8")) +
            '"></iframe>')


def preview_check(browser, src):
    """Play a packed file inside the preview sandbox and report the script errors it raises there only.
    Source files are skipped: the sandbox can't load their kit/ files, and the packed file is what gets shared."""
    if re.search(r"<script[^>]*\ssrc=(?![\"']?data:)", src.read_text(encoding="utf-8"), re.I):
        return []
    host = src.parent / f".pf-preview-{os.getpid()}.html"
    host.write_text(preview_host(src), encoding="utf-8")
    page, errors = browser.new_page(viewport={"width": 1920, "height": 1080}), []
    page.on("pageerror", lambda e: errors.append(str(e)))
    try:
        page.goto(host.as_uri())
        frame = page.main_frame.child_frames[0]
        frame.wait_for_function("window.proto", timeout=10000)
        frame.evaluate(PREVIEW)
    except Exception as e:
        if not errors:
            errors.append(f"stopped: {str(e).splitlines()[0]}")
    finally:
        page.close()
        host.unlink(missing_ok=True)
    return [f"OneDrive/SharePoint preview: {e}" for e in dict.fromkeys(errors)]


def contact_sheets(browser, out, names):
    """Lay the screenshots out 12 to a sheet (3 x 4), in beat order, so the flow can be reviewed in a few images."""
    page, n = browser.new_page(viewport={"width": 1920, "height": 1000}), 0
    for n, start in enumerate(range(0, len(names), 12), 1):
        cells = [[f[:-4], base64.b64encode((out / f).read_bytes()).decode()] for f in names[start:start + 12]]
        page.set_content("<body></body>")
        page.evaluate(SHEET, cells)
        page.screenshot(path=str(out / f"sheet-{n}.png"), full_page=True)
    page.close()
    return n


def motion_check(browser, src, only):
    """--motion: play each scene at presenter speed and report anything that jumps instead of gliding."""
    import time
    page = browser.new_page(viewport={"width": 1920, "height": 1080})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.goto(src.as_uri())
    page.wait_for_function("window.proto")
    page.wait_for_timeout(300)
    scenes = page.evaluate("proto.scenes")
    if only and only not in [s["id"] for s in scenes]:
        sys.exit(f"No scene with id {only!r}.  Scenes: {', '.join(s['id'] for s in scenes)}")
    issues, t0, played = [], time.time(), 0
    for i, s in enumerate(scenes):
        if only and s["id"] != only:
            continue
        r = page.evaluate(MOTION, i)
        played += 1
        for x in r["snaps"]:
            issues.append(f"{i + 1:02d} {s['id']} beat {x['beat']}: jumped {x['px']} px in one frame: {x['el']}")
    issues += [f"console: {e}" for e in dict.fromkeys(errors)]
    print(f"Motion: played {played} scene(s) in {time.time() - t0:.0f} s")
    print("\n".join(f"  - {x}" for x in issues) if issues else
          "  Nothing jumped.  Still watch it once at full screen: the check can't judge pacing or taste.")
    return issues


def main():
    args = sys.argv[1:]
    only = args[args.index("--scene") + 1] if "--scene" in args and args.index("--scene") + 1 < len(args) else None
    oi = args.index("--outline") if "--outline" in args else -1
    outline_to = args[oi + 1] if oi >= 0 and oi + 1 < len(args) and args[oi + 1].lower().endswith(".json") else None
    files = [a for i, a in enumerate(args) if not a.startswith("--") and (i == 0 or args[i - 1] != "--scene")
             and not (outline_to and i == oi + 1)]
    if not files:
        sys.exit(__doc__)
    if sync_playwright is None:
        run_node("Python Playwright isn't installed")
    src = Path(files[0]).resolve()
    if oi >= 0:
        import json
        with sync_playwright() as p:
            browser = None
            for opts in ({"channel": "msedge"}, {}):
                try:
                    browser = p.chromium.launch(**opts)
                    break
                except Exception:
                    pass
            if browser is None:
                run_node("No browser for Python Playwright")
            page = browser.new_page(viewport={"width": 1920, "height": 1080})
            page.goto(src.as_uri() + "?driven")
            page.wait_for_function("window.proto && window.proto.outline")
            o = page.evaluate("proto.outline()")
            browser.close()
        dest = Path(outline_to).resolve() if outline_to else src.parent / "outline.json"
        dest.write_text(json.dumps(o, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"Outline: {len(o['scenes'])} scenes, {sum(len(s['beats']) for s in o['scenes'])} stops -> {dest}")
        sys.exit(0)
    if "--motion" in args:
        with sync_playwright() as p:
            browser = None
            for opts in ({"channel": "msedge"}, {}):
                try:
                    browser = p.chromium.launch(**opts)
                    break
                except Exception:
                    pass
            if browser is None:
                run_node("No browser for Python Playwright")
            issues = motion_check(browser, src, only)
            browser.close()
        sys.exit(1 if issues else 0)
    out = src.parent / "renders"
    out.mkdir(exist_ok=True)
    for f in out.glob("*.png"):
        if not only or f"-{only}-b" in f.name or f.name.startswith("sheet-"):
            f.unlink()
    issues, shots, taken, notes = [], 0, [], []
    with sync_playwright() as p:
        browser = None
        for opts in ({"channel": "msedge"}, {}):
            try:
                browser = p.chromium.launch(**opts)
                break
            except Exception:
                pass
        if browser is None:
            run_node("No browser for Python Playwright")
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        errors, requests = [], []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type in ("error", "warning") else None)
        page.on("request", lambda r: requests.append(r.url) if not r.url.startswith(("file:", "data:", "blob:")) else None)
        page.goto(src.as_uri() + "?check")
        page.wait_for_function("window.proto")
        page.add_style_tag(content=".pf-notext *{color:transparent!important;-webkit-text-fill-color:transparent!important;"
                                   "text-shadow:none!important;fill:transparent!important}")
        page.wait_for_timeout(300)
        scenes = page.evaluate("proto.scenes")
        if only and only not in [s["id"] for s in scenes]:
            sys.exit(f"No scene with id {only!r}.  Scenes: {', '.join(s['id'] for s in scenes)}")
        for i, s in enumerate(scenes):
            if only and s["id"] != only:
                continue
            page.evaluate(f"void proto.go({i})")
            page.wait_for_timeout(150)
            seen = set()
            for b in range(s["beats"] + 1):
                st = page.evaluate("proto.state()")
                if st["scene"] != i:
                    break
                if st["beat"] not in seen:
                    seen.add(st["beat"])
                    page.wait_for_timeout(120)
                    name = f"{i + 1:02d}-{s['id']}-b{st['beat']}.png"
                    page.screenshot(path=str(out / name))
                    taken.append(name)
                    shots += 1
                    a = page.evaluate(AUDIT)
                    tag = f"{i + 1:02d} {s['id']} beat {st['beat']}"
                    if not a["label"]:
                        issues.append(f"{tag}: concept label not visible")
                    for c in dict.fromkeys(a["clipped"]):
                        issues.append(f"{tag}: clipped or overflowing text: {c!r}")
                    for t in dict.fromkeys(a["tiny"]):
                        issues.append(f"{tag}: text under 11 px: {t!r}")
                    lines = page.evaluate(FRAME_TEXT)
                    if lines is not None:
                        bare = base64.b64encode(page.screenshot()).decode()
                        for t in dict.fromkeys(page.evaluate(CONTRAST, [bare, lines])):
                            issues.append(f"{tag}: hard to read against what's behind it (raise the .td-shade on a photo, or use a darker palette colour): {t!r}")
                    if st["beat"] == st["max"]:
                        for pat in TELLS:
                            for m in set(re.findall(pat, a["text"], re.I)):
                                issues.append(f"{tag}: wording to replace: {m!r}")
                        for m in set(EMOJI.findall(a["text"])):
                            issues.append(f"{tag}: emoji {m!r} (use a Fluent icon)")
                        for f in a["findings"]:
                            issues.append(f"{tag}: {f}")
                        if not s["id"] in ("cover", "close") and not a["clickable"] and st["max"] == 0:
                            notes.append(f"{tag}: a still scene (no beats, no click).  Fine if that's the point; otherwise give the room something to see happen")
                if st["beat"] >= st["max"]:
                    break
                page.evaluate("proto.next()")
                page.wait_for_timeout(100)
        sheets = contact_sheets(browser, out, taken)
        if not only:
            issues += page.evaluate(PLACEHOLDERS, src.read_text(encoding="utf-8"))
            issues += preview_check(browser, src)
        browser.close()
    for e in dict.fromkeys(errors):
        issues.append(f"console: {e}")
    for r in dict.fromkeys(requests):
        issues.append(f"network request (must be offline): {r}")
    print(f"{len(scenes)} scenes, {shots} screenshots and {sheets} contact sheet(s) in {out}")
    print("\n".join(f"  - {x}" for x in issues) if issues else
          "  No automatic findings.  Now review the contact sheets, and open single screenshots where something looks off.")
    if notes:
        print("  Notes (not findings):\n" + "\n".join(f"  - {x}" for x in notes))
    print("  This check sees layout, not story.  Before you show it, read the story back: is it the fullest version?")
    sys.exit(1 if issues else 0)


if __name__ == "__main__":
    main()
