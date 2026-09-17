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
stops. The interesting parts are not the agent. They are the quota gate that
decides whether there is enough of the rolling subscription window left to start
another run, and the escalation path for when a run needs a person.

The gate matters because subscription tooling bills against a rolling window
rather than a monthly reset. A loop with no gate will spend the entire window in
an afternoon on low-value tickets and then be unavailable when someone actually
needs it. The check happens before a run rather than during one, because an
agent halted midway has consumed the budget and produced nothing.

Escalation is the other half, and it is most of what makes the thing usable
unattended. The signal I care about most is a run that has tried the same thing
twice and got the same result, because from the inside a loop always looks like
progress. When it stops, it leaves the branch and an account of what it tried,
so a person can pick it up rather than start over.

It runs one task at a time on purpose. Parallel working copies are expensive on
a Unity repo, and the output of a single loop already saturates the review
attention available.
