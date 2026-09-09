---
title: Autonomous ticket loop
description: A quota-aware loop that runs a CLI coding harness against a project tracker's ticket queue, and escalates to a human when it should.
selected: true
fromDate: 2026-07
status: active
types:
  - tool
  - experiment
stack:
  - Python
  - Windows
  - OpenCode
  - Linear
handbookPages:
  - /handbook/ai-assisted-development/quota-gated-agent-loops/
  - /handbook/ai-cost-discipline/prompt-cache-economics/
---

An agent loop that picks up tickets, runs a coding harness against them, and
stops. The interesting parts are not the agent: they are the quota gate that
decides whether there is enough of the rolling subscription window left to
start another run, and the escalation path for when a run needs a person.

:::note[Placeholder]
Written as a starting point during the theme upgrade — replace with your own
write-up. Frontmatter is complete; only this prose is provisional.
:::
