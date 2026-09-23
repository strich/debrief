---
title: "Prompt cache economics"
status: working
---

What surprises people about the bill is which part of it is big. You'd think you
pay for the code the model writes. On a long agent session against a big repo,
output is often a small slice and the main cost is re-reading context you
already sent.

## How it works

Every step of an agent loop resends the conversation so far. The system prompt,
the tool definitions, every file already read, the output of every previous
command. Step twenty carries everything from steps one to nineteen.

Prompt caching exists because of this. Send the same prefix again and the
provider can reuse the work it already did on it instead of processing it fresh,
at a much lower rate. There's usually a write cost the first time and a much
cheaper read cost after that, and the cached entry expires once it's been idle
for a while.

What follows from that isn't obvious.

**Cache reads are cheap per token and huge in total.** A discounted rate on a
large context, every one of fifty steps, still adds up to real money. It builds
up quietly because no single step looks expensive.

**A stable prefix beats a short one.** Anything that changes early in the context
invalidates everything after it. A timestamp near the top of a system prompt can
cost more than thousands of tokens further down, because it wipes the cache on
every call.

**Order is a cost decision.** Stable stuff first, changing stuff last. If the
files an agent has read get appended after the bits that change each turn, you
pay full price to re-read them every step.

**Idle time costs you indirectly.** A loop that pauses long enough for the cache
to expire pays the write cost again when it starts back up. So a scheduling
decision like the one in
[quota-gated agent loops](/handbook/ai-assisted-development/quota-gated-agent-loops/)
is also a caching decision.

## What this changes

When the bill's high the instinct is to switch to a cheaper model. Often the
better move is to look at what's being resent and how often. A badly ordered
context on a cheap model can cost more than a well ordered one on an expensive
model.

It also changes how I think about context selection. The stuff in
[context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
usually gets talked about as a quality problem. It's just as much a cost
problem, because every file you hand an agent gets paid for on every later step
of that session.

It's part of why I prune long sessions by forking back past finished work (see
[running a long agent session](/handbook/ai-assisted-development/running-a-long-agent-session/)).
Partly that keeps the model focused, and partly it stops me paying to re-read a
solved problem on every turn.

## What's not here yet

Our own numbers. The instrumentation's running and I'd rather publish a measured
breakdown from our codebase than repeat general figures. When there's a clean
sample I'll put the split here next to
[cost per merged PR](/handbook/ai-cost-discipline/cost-per-merged-pr/).
