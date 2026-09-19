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

The thing that has changed most since it started is what a run can verify about
itself. When the loop began, a run could write code and open a pull request but
could not tell whether the game still started, so every result was a claim
waiting for a person. With
[the editor reachable from the command line](/handbook/unity-toolchain/the-unity-cli/)
a run can launch, exercise the change, read the console and act on what it
finds, which moves a whole class of failure to before the pull request exists
rather than after.

That also sharpened what blocks unattended running, and it is rarely the
interesting part. Our game waits for focus on the game window when a scene
loads, which for an attended session is a minor irritation and for an unattended
one is a run that stalls silently and looks slow rather than stuck. Most of the
work of making this thing run on its own has been finding that class of problem,
not improving the agent.
