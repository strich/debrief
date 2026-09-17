---
title: "Prompt cache economics"
status: working
---

The thing that surprises people about the bill is which part of it is large.
The intuition is that you pay for the code the model writes. In practice, on a
long agent session against a big repository, output is often a small share of
the total and the dominant cost is re-reading context you already sent.

## How the mechanism works

Every step of an agent loop resends the conversation so far. The system prompt,
the tool definitions, the files already read, the output of every previous
command. Step twenty carries everything from steps one through nineteen.

Prompt caching exists because of this. Send the same prefix again and the
provider can reuse its computed form rather than processing it fresh, at a
substantially reduced rate. There is usually a write cost the first time and a
much cheaper read cost afterwards, with the cached entry expiring after some
idle period.

The economics that follow are not obvious.

**Cache reads are cheap per token and enormous in aggregate.** A discounted rate
applied to a large context on every one of fifty steps still adds up to real
money, and it accumulates quietly because no individual step looks expensive.

**A stable prefix is worth more than a short one.** Anything that changes early
in the context invalidates everything after it. A timestamp near the top of a
system prompt can cost more than several thousand tokens placed further down,
because it destroys the cache on every single call.

**Ordering is a cost decision.** Stable content first, volatile content last. If
the files an agent has read are appended after the parts that change each turn,
you pay full price to re-read them every step.

**Idle time is billable indirectly.** A loop that pauses long enough for the
cache to expire pays the write cost again when it resumes. Which means a
scheduling decision, like the one in
[quota-gated agent loops](/handbook/ai-assisted-development/quota-gated-agent-loops/),
is also a caching decision.

## What this changes in practice

The instinct when a bill is high is to move to a cheaper model. Often the better
move is to look at what is being resent and how often, because a badly ordered
context on a cheap model can cost more than a well ordered one on an expensive
model.

It also reframes context selection. The work in
[context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
is usually discussed as a quality problem. It is equally a cost problem. Every
file handed to an agent is paid for on every subsequent step of that session,
not once.

## What is not here yet

Our own numbers. I have the instrumentation running and I would rather publish a
measured breakdown from this codebase than repeat general figures. When there is
a clean sample I will put the split here, alongside
[cost per merged PR](/handbook/ai-cost-discipline/cost-per-merged-pr/).
