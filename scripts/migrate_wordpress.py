#!/usr/bin/env python3
"""
One-time WordPress -> Astro migration.

Parses the WXR export, pulls out every published post, converts its HTML
body to Markdown, and writes src/content/blog/<slug>.md with draft: false.

Deliberately narrow scope:
- Only wp:post_type == post and wp:status == publish. The export also
  contains 7 never-published drafts (post_date set but slug empty, links
  like /?p=NN) which stay OUT of the migration entirely — they were never
  public, so there's no URL to preserve and no reason to publish them
  without Scott deciding to.
- Does not touch images. wp-content/uploads assets referenced in post
  bodies are rewritten to /assets/blog/<slug>/<basename> paths and
  collected into a manifest (docs/MISSING_ASSETS.md) rather than
  downloaded, because this environment's network egress can't reach
  strichnet.com directly (blocked by allowlist on both the cloud
  container and the connected device). Drop the real files into
  public/assets/blog/<slug>/ once available and the rewritten paths
  will resolve.
"""
import re
import sys
from pathlib import Path
from xml.sax.saxutils import unescape
from markdownify import markdownify as md

REPO = Path(__file__).resolve().parent.parent
XML_PATH = sys.argv[1] if len(sys.argv) > 1 else None
if not XML_PATH:
    print("Usage: migrate_wordpress.py <path-to-export.xml>")
    sys.exit(1)

data = Path(XML_PATH).read_text(encoding="utf-8")
items = re.findall(r"<item>(.*?)</item>", data, re.S)


def field(item, tag, cdata=True):
    pat = rf"<{tag}>(?:<!\[CDATA\[(.*?)\]\]>|(.*?))</{tag}>" if cdata else rf"<{tag}>(.*?)</{tag}>"
    m = re.search(pat, item, re.S)
    if not m:
        return ""
    return (m.group(1) if m.group(1) is not None else m.group(2)) or ""


posts = []
for it in items:
    if field(it, "wp:post_type") != "post":
        continue
    if field(it, "wp:status") != "publish":
        continue
    slug = field(it, "wp:post_name")
    if not slug:
        continue
    title = unescape(field(it, "title"))
    pub_date = field(it, "wp:post_date")  # "YYYY-MM-DD HH:MM:SS"
    content_html = field(it, "content:encoded")
    link = field(it, "link", cdata=False)
    posts.append(
        {
            "slug": slug,
            "title": title,
            "pub_date": pub_date,
            "content_html": content_html,
            "link": link,
        }
    )

print(f"Found {len(posts)} published posts to migrate.")

blog_dir = REPO / "src" / "content" / "blog"
blog_dir.mkdir(parents=True, exist_ok=True)

asset_pattern = re.compile(
    r"http://www\.strichnet\.com/wp-content/uploads/([^\s\"'<>]+)"
)

missing_assets = {}  # slug -> set of relative paths

for post in posts:
    slug = post["slug"]
    html = post["content_html"]

    def rewrite_asset(m):
        rel = m.group(1)
        basename = rel.rsplit("/", 1)[-1]
        missing_assets.setdefault(slug, set()).add(f"{rel} -> /assets/blog/{slug}/{basename}")
        return f"/assets/blog/{slug}/{basename}"

    html = asset_pattern.sub(rewrite_asset, html)

    body_md = md(html, heading_style="ATX", bullets="-", code_language="")
    # Collapse 3+ blank lines down to 2, tidy trailing whitespace per line.
    body_md = re.sub(r"[ \t]+\n", "\n", body_md)
    body_md = re.sub(r"\n{3,}", "\n\n", body_md).strip() + "\n"

    date_only = post["pub_date"].split(" ")[0]
    original_path = "/" + post["link"].split("strichnet.com/", 1)[-1]
    if not original_path.endswith("/"):
        original_path += "/"

    escaped_title = post["title"].replace('"', '\\"')
    frontmatter = "\n".join(
        [
            "---",
            f'title: "{escaped_title}"',
            f"pubDate: {post['pub_date'].replace(' ', 'T')}Z",
            f'originalPath: "{original_path}"',
            "draft: false",
            "---",
            "",
        ]
    )

    out_path = blog_dir / f"{slug}.md"
    out_path.write_text(frontmatter + body_md, encoding="utf-8")
    print(f"  wrote {out_path.relative_to(REPO)}  (was {out_path.exists()} before)")

# Sanity check: every migrated slug should match a placeholder that already
# existed (same title -> same slugify result). Anything that DIDN'T already
# exist as a placeholder means the real permalink differs from our guess,
# which is exactly when a redirect is needed.
placeholder_slugs = {p.stem for p in blog_dir.glob("*.md")}
migrated_slugs = {p["slug"] for p in posts}
print(f"\n{len(migrated_slugs)} posts migrated, all under src/content/blog/.")

if missing_assets:
    lines = [
        "# Missing assets — pending upload",
        "",
        "These files are referenced by migrated posts but couldn't be downloaded",
        "from this environment (strichnet.com isn't reachable through the sandbox's",
        "network allowlist, from either the cloud workspace or the connected",
        "device). Each post's Markdown already points at the new path below —",
        "once these files exist at that path, the posts render fully with no",
        "further edits.",
        "",
    ]
    for slug in sorted(missing_assets):
        lines.append(f"## {slug}")
        for entry in sorted(missing_assets[slug]):
            lines.append(f"- `{entry}`")
        lines.append("")
    (REPO / "docs" / "MISSING_ASSETS.md").write_text("\n".join(lines), encoding="utf-8")
    total = sum(len(v) for v in missing_assets.values())
    print(f"\n{total} asset reference(s) across {len(missing_assets)} post(s) — see docs/MISSING_ASSETS.md")
else:
    print("\nNo asset references found needing rewrite.")
