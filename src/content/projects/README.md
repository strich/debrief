Project entries for /projects. One `.md` per project; `README.md` is skipped by
the loader (see `src/content.config.ts`).

Frontmatter:

```yaml
title: Short name              # required, <=75 chars
description: One-line summary  # required, <=200 chars — used on cards and OG
selected: true                 # surfaces it on the home page
fromDate: 2026-03              # required
toDate: 2026-08                # omit while it's ongoing
status: active                 # active | shipped | paused | archived
types: [tool, infrastructure]  # tool | infrastructure | integration | experiment | open-source
stack: [Python, Unity]         # free text, shown as chips
code: https://github.com/...   # optional
url: https://...               # optional
handbookPages:                 # optional, renders a "written up in" block
  - /handbook/ai-assisted-development/ai-code-review-unity/
```
