"""Pack a prototype into one self-contained HTML file that opens anywhere (double-click, email, OneDrive, Teams).

    python pack_prototype.py working/<name>/prototype.html            # -> working/<name>/dist/<name>.html
    python pack_prototype.py working/<name>/prototype.html out.html   # explicit output path

Inlines <link rel="stylesheet">, <script src>, and every local image referenced by src=, url(...) or data-bg=.
Stops if the prototype would load anything from the network or has lost its concept label, because a demo that
breaks on hotel Wi-Fi, or that could pass for a real product, is worse than no demo.
"""
import base64
import mimetypes
import os
import re
import sys

MAX_MB = 15
mimetypes.add_type("font/ttf", ".ttf")
mimetypes.add_type("image/svg+xml", ".svg")


def data_uri(path):
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    with open(path, "rb") as fh:
        return f"data:{mime};base64,{base64.b64encode(fh.read()).decode()}"


def local(base, ref):
    ref = ref.strip().strip("'\"")
    if re.match(r"^(data:|#|[a-z]+:)", ref, re.I):
        return None
    path = os.path.normpath(os.path.join(base, ref.split("?")[0].split("#")[0]))
    if not os.path.isfile(path):
        sys.exit(f"Missing file: {ref} (looked for {path})")
    return path


def inline_urls(text, base):
    def url(m):
        p = local(base, m.group(2))
        return m.group(0) if not p else f"url({data_uri(p)})"
    return re.sub(r"url\((['\"]?)([^)'\"]+)\1\)", url, text)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = os.path.abspath(sys.argv[1])
    base = os.path.dirname(src)
    name = os.path.basename(base) if os.path.basename(src) == "prototype.html" else os.path.splitext(os.path.basename(src))[0]
    out = os.path.abspath(sys.argv[2]) if len(sys.argv) > 2 else os.path.join(base, "dist", f"{name}.html")
    html = open(src, encoding="utf-8").read()

    def css(m):
        p = local(base, m.group(1))
        if not p:
            sys.exit(f"External stylesheet: {m.group(1)}.  Prototypes must work offline; copy what you need into kit/.")
        return "<style>\n" + inline_urls(open(p, encoding="utf-8").read(), os.path.dirname(p)) + "\n</style>"
    html = re.sub(r'<link\s+rel="stylesheet"\s+href="([^"]+)"\s*/?>', css, html)

    def js(m):
        p = local(base, m.group(1))
        if not p:
            sys.exit(f"External script: {m.group(1)}.  Prototypes must work offline; copy what you need into kit/.")
        code = open(p, encoding="utf-8").read().replace("</script", "<\\/script")
        return "<script>\n" + code + "\n</script>"
    html = re.sub(r'<script\s+src="([^"]+)"\s*>\s*</script>', js, html)

    def attr(m):
        p = local(base, m.group(2))
        return m.group(0) if not p else f'{m.group(1)}="{data_uri(p)}"'
    html = re.sub(r'\b(src|data-bg|poster)="([^"]+)"', attr, html)
    html = inline_urls(html, base)

    problems = []
    for m in re.finditer(r'(?:src|href)="(https?:)?//[^"]+"|url\((["\']?)(https?:)?//', html):
        problems.append(m.group(0)[:100])
    if problems:
        sys.exit("The prototype still loads from the network (not allowed; it must run offline):\n  " + "\n  ".join(problems))
    concept = re.search(r'<body[^>]*data-concept="([^"]+)"', html)
    if not concept or not re.search(r"concept|illustrative|fictitious|prototype", concept.group(1), re.I):
        sys.exit('The <body> needs data-concept="Concept demo · Fictitious data" (or similar wording that says it is a '
                 "concept with made-up data).")

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(html)
    mb = os.path.getsize(out) / 1e6
    print(f"{out}\n  {mb:.2f} MB, single file, no network dependencies, label: {concept.group(1)}")
    if mb > MAX_MB:
        print(f"  Warning: over {MAX_MB} MB.  Use fewer or smaller images (JPG, 1920 px wide at most).")


if __name__ == "__main__":
    main()
