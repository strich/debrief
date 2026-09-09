#!/usr/bin/env python3
"""
One-time cleanup: the migration script's HTML->Markdown conversion
produced bare ``` fences with no language hint (WordPress's old code
plugin didn't record one). Expressive Code / Shiki need a language tag
to actually highlight anything - without one every block falls back to
"plaintext". This assigns the right language per block, by hand, based
on reading each post's code.
"""
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BLOG = REPO / "src" / "content" / "blog"

LANGS = {
    "tuning-git-for-large-binary-repositories.md": ["ini", "text"],
    "migrating-your-project-to-git-lfs.md": ["bash", "powershell", "bash", "bash"],
    "installing-mono3-on-ubuntu-12-04.md": ["bash"] * 10,
    "using-git-sync-to-automate-common-git-commands.md": ["bash", "bash"],
    "creating-a-cutout-shader-for-doors-and-windows.md": [
        "hlsl", "hlsl", "hlsl", "hlsl", "hlsl", "csharp",
    ],
    "half-life-1-custom-map-chaocity3-by-sulsa.md": ["text"],
    "migrating-to-google-shared-team-drive.md": ["javascript"],
    "using-git-with-3d-games.md": ["ini"],
}

for filename, langs in LANGS.items():
    path = BLOG / filename
    lines = path.read_text(encoding="utf-8").split("\n")
    block_index = 0
    in_block = False
    for i, line in enumerate(lines):
        if line.strip() == "```":
            if not in_block:
                lines[i] = f"```{langs[block_index]}"
                block_index += 1
                in_block = True
            else:
                in_block = False
    assert block_index == len(langs), f"{filename}: expected {len(langs)} blocks, tagged {block_index}"
    path.write_text("\n".join(lines), encoding="utf-8")
    print(f"{filename}: tagged {block_index} block(s)")

mono_path = BLOG / "installing-mono3-on-ubuntu-12-04.md"
text = mono_path.read_text(encoding="utf-8")
if "&nbsp;" in text:
    text = text.replace("&nbsp;", " ")
    mono_path.write_text(text, encoding="utf-8")
    print("installing-mono3-on-ubuntu-12-04.md: cleaned up a leftover &nbsp;")
