---
title: "Quota-gated agent loops"
status: working
---

An agent loop that picks up a ticket, works it and opens a pull request isn't
hard to build. The interesting part is knowing when *not* to start one.

The loop here runs a CLI coding harness against a project tracker's ticket
queue. The project write-up is
[Autonomous ticket loop](/projects/autonomous-ticket-loop).

## What the quota gate is for

Subscription coding tools bill against a rolling window instead of a monthly
reset. You get some allowance over some period, and when it's gone everything
stops.

A naive loop will happily burn the whole window in an afternoon on low-value
tickets, and then be unavailable right when someone actually needs it. That's
the failure I'm designing against, and it's really a scheduling problem.

## What the gate does

Before starting a run it checks whether there's enough of the window left to
finish one, and whether this ticket is worth spending it on. If either answer is
no, the loop waits.

The important decision is that the check happens before the run and not during
it. An agent stopped halfway has used the budget and produced nothing, which is
the worst of both. Better not to start.

Estimating cost up front is rough, so the gate is deliberately conservative.
Leaving some of the window unused is cheap. Running out at four in the afternoon
isn't.

## Knowing when to stop and ask

A loop that only knows how to succeed isn't much use unattended. Most of the
value is in recognising that a run should stop and a person should look.

The cases that matter are when the agent can't reproduce the issue, when the
change would cross into territory that needs judgement, and when it's tried the
same thing twice and got the same result. That last one is the most valuable
signal in the whole system and the easiest to miss, because from the inside a
loop always looks like progress.

Escalating means leaving the work somewhere a person can pick it up. The branch,
what was tried, and why it stopped. A ticket that just says "the agent failed"
isn't worth the tokens it cost.

## Why one at a time

It runs one task at a time on purpose. Partly because parallel working copies
are expensive on a Unity repo (see
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/)).
Mostly because one loop's output already uses up all the review attention we've
got. Running four wouldn't give four times the throughput. It'd give four times
the queue.
