"""Text for the ear: the pronunciation list (lexicon) and the number/abbreviation normaliser used before voicing.

Mispronounced words come from the voice guessing: "$1.17M" read as "dollar one point one seven M", "D365" as
"D three hundred sixty-five", "ERP" as "urp".  So nothing is left to guess:

1. normalise(): money, times, multipliers, "24/7", "e.g." and friends are rewritten the way a presenter says them.
2. The lexicon replaces whole words or phrases, case-sensitively: "say" entries with a respelling ("ERP" -> "E R P"),
   "ipa" entries with exact phonemes for Kokoro ("Tredence" -> "tɹˈɛdəns").  Three lists are merged, later wins:
     <skill>/film/lexicon/tredence.json      shared Tredence and Microsoft names (ships with the skill)
     <home>/lexicon.json                     yours, kept across films (<home> = film.json "home", ~/.tredence)
     <build>/lexicon.json                    this film's people, companies and products
3. suspects(): words still worth a listen (all-caps acronyms, mixed letters and digits, unusual names) that no list
   covers.  voice.py prints them; add each to the film's lexicon.json once you've heard it.

Run on its own to see how a script will be spoken:  python speech.py [narration.txt]
"""
import json
import os
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent

ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen " \
       "seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def words2(n):
    """0-99 in words."""
    if n < 20:
        return ONES[n]
    t, o = divmod(n, 10)
    return TENS[t] + ("-" + ONES[o] if o else "")


def clock(h, m, ampm=""):
    h = int(h); m = int(m)
    hw = words2(h)
    if m == 0:
        s = hw + ("" if ampm else " o'clock")
    elif m < 10:
        s = f"{hw} oh {ONES[m]}"
    else:
        s = f"{hw} {words2(m)}"
    if ampm:
        s += " " + {"am": "A M", "pm": "P M"}[ampm.lower().replace(".", "")]
    return s


SCALE = {"k": "thousand", "K": "thousand", "m": "million", "M": "million", "mn": "million", "MM": "million",
         "b": "billion", "B": "billion", "bn": "billion", "BN": "billion", "t": "trillion", "T": "trillion"}
CUR = {"$": "dollars", "€": "euros", "£": "pounds", "₹": "rupees", "¥": "yen"}
ABBR = [(r"\be\.g\.", "for example"), (r"\bi\.e\.", "that is"), (r"\bvs\.?(?=\s)", "versus"), (r"\betc\.", "and so on"),
        (r"\bapprox\.", "about"), (r"~(?=\d)", "about "), (r"\b24/7\b", "twenty-four seven"),
        (r"\b(\d+(?:\.\d+)?)x\b", r"\1 times"), (r"(\d)\s*[-–]\s*(\d)(?=\s*(?:%|percent|days|weeks|months|years|hours|minutes|seconds|s\b))", r"\1 to \2"),
        (r"\s*&\s*", " and "), (r"(?<=\d)\s*%", " percent"), (r"\bw/\s*", "with "), (r"\bQ([1-4])\b", r"Q \1"),
        (r"\bFY\s?'?(\d\d)\b", lambda m: "F Y " + words2(int(m.group(1))))]


def normalise(text):
    t = text
    # $1.17M, $450K, €2.5bn  ->  1.17 million dollars
    t = re.sub(r"([$€£₹¥])\s?(\d[\d,]*(?:\.\d+)?)\s?(mn|MM|bn|BN|[kKmMbBtT])\b",
               lambda m: f"{m.group(2)} {SCALE[m.group(3)]} {CUR[m.group(1)]}", t)
    # $1,200 / $3.50  ->  1,200 dollars
    t = re.sub(r"([$€£₹¥])\s?(\d[\d,]*(?:\.\d+)?)(\s?(?:million|billion|thousand|trillion))?",
               lambda m: f"{m.group(2)}{m.group(3) or ''} {CUR[m.group(1)]}", t)
    # 7:30, 11:30 AM, 2:15 a.m.
    t = re.sub(r"\b([01]?\d|2[0-3]):([0-5]\d)(?:\s?([AaPp]\.?[Mm]\.?))?(?![\d:])",
               lambda m: clock(m.group(1), m.group(2), m.group(3) or ""), t)
    for pat, rep in ABBR:
        t = re.sub(pat, rep, t)
    return re.sub(r"\s{2,}", " ", t).strip()


def _load(p):
    try:
        with open(p, encoding="utf-8") as f:
            d = json.load(f)
    except FileNotFoundError:
        return {}, {}
    return d.get("say", {}), d.get("ipa", {})


def lexicon_paths(home=None, build="."):
    home = home or os.environ.get("TREDENCE_HOME") or str(Path.home() / ".tredence")
    shared = HERE.parent / "lexicon" / "tredence.json"          # in the skill: film/lexicon
    if not shared.exists():
        shared = HERE / "lexicon" / "tredence.json"               # in a build folder: copied next to the scripts
    return [shared, Path(home) / "lexicon.json", Path(build) / "lexicon.json"]


def load_lexicon(home=None, build="."):
    say, ipa = {}, {}
    for p in lexicon_paths(home, build):
        s, i = _load(p)
        say.update(s); ipa.update(i)
    return say, ipa


def _rx(keys):
    keys = sorted(keys, key=len, reverse=True)
    return re.compile(r"(?<![\w-])(" + "|".join(re.escape(k) for k in keys) + r")(?![\w-])") if keys else None


def apply_say(text, say):
    rx = _rx(say)
    return rx.sub(lambda m: say[m.group(1)], text) if rx else text


def spoken(text, say, ipa=None):
    """The text as it will be voiced (respellings applied, numbers normalised); ipa words are marked /word/."""
    t = apply_say(normalise(apply_say(text, say)), say)
    rx = _rx(ipa or {})
    return rx.sub(lambda m: f"/{m.group(1)}/", t) if rx else t


def split_ipa(text, ipa):
    """[(is_ipa, chunk)] so a G2P can phonemize the plain chunks and drop in the exact phonemes."""
    rx = _rx(ipa)
    if not rx:
        return [(False, text)]
    out, pos = [], 0
    for m in rx.finditer(text):
        if m.start() > pos:
            out.append((False, text[pos:m.start()]))
        out.append((True, ipa[m.group(1)])); pos = m.end()
    if pos < len(text):
        out.append((False, text[pos:]))
    return out


COMMON_CAPS = {"I", "A", "OK", "TV", "US", "UK", "EU", "CEO", "CFO", "COO", "CIO", "CTO", "IT", "HR", "AI", "PDF",
               "FAQ", "USA", "UN", "ID", "PM", "AM", "VP", "B", "M", "K"}


def suspects(text, say, ipa):
    """Words the voice may get wrong that no lexicon covers."""
    covered = set(say) | set(ipa)
    t = normalise(text)
    out = []
    for w in re.findall(r"[A-Za-z][A-Za-z0-9'’.-]*[A-Za-z0-9]|[A-Z]", t):
        w = w.rstrip(".")
        if w in covered or any(w in k.split() for k in covered):
            continue
        caps = w.isupper() and len(w) >= 2 and w not in COMMON_CAPS
        mixed = bool(re.search(r"[A-Za-z]\d|\d[A-Za-z]", w))
        inner = bool(re.search(r"[a-z][A-Z]", w))              # CamelCase product names
        if caps or mixed or inner:
            out.append(w)
    return sorted(set(out))


def read_script(path, prefix="Host: "):
    pre = prefix.strip()
    return [s[len(pre):].strip() for s in (r.strip() for r in open(path, encoding="utf-8")) if s.startswith(pre)]


if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else "narration.txt"
    home = None
    if os.path.exists("film.json"):
        home = json.load(open("film.json", encoding="utf-8")).get("home")
    say, ipa = load_lexicon(home)
    for line in read_script(src):
        sp = spoken(line, say, ipa)
        print(("  " if sp == line else "~ ") + sp)
        sus = suspects(line, say, ipa)
        if sus:
            print("    check:", ", ".join(sus))
