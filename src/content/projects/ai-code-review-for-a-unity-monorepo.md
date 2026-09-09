---
title: AI code review for a Unity monorepo
description: A forked open-source PR review bot, made to work against a large Unity repo with org-restricted token permissions.
selected: true
fromDate: 2026-08
status: active
types:
  - tool
  - open-source
  - integration
stack:
  - Python
  - GitHub Actions
  - Unity
  - LLM APIs
handbookPages:
  - /handbook/ai-assisted-development/ai-code-review-unity/
---

Off-the-shelf AI review tools assume a repository that fits comfortably in a
context window and a token that can read whatever it likes. A production Unity
repo is neither: it is large by design, most of its diff by volume is
serialised asset data rather than code, and on an organisation repo the
personal access token is scoped down deliberately.

This is a fork of an existing open-source reviewer with the changes needed to
survive those three facts.

:::note[Placeholder]
Written as a starting point during the theme upgrade — replace with your own
account of what you changed and what it caught. The frontmatter is complete
and the page renders; only this prose is provisional.
:::
