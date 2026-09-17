---
title: "Quota-gated agent loops"
status: working
---

An agent loop that picks up a ticket, works it, and opens a pull request is not
difficult to build. The interesting engineering is not the agent. It is knowing
when not to start one.

The loop described here runs a CLI coding harness against a project tracker's
ticket queue. It is written up as a project at
[Autonomous ticket loop](/projects/autonomous-ticket-loop).

## The problem a quota gate solves

Subscription-based coding tools bill against a rolling window rather than a
monthly reset. You have some allowance over some period, and when it runs out
everything stops.

A naive loop will happily consume the entire window in an afternoon on low-value
tickets, and then be unavailable at the moment someone actually needs it. That
is the failure mode worth designing against, and it is a scheduling problem
rather than a technical limit.

## What the gate does

Before starting a run, it asks whether there is enough of the window left to
finish one, and whether this ticket is worth spending it on. If the answer to
either is no, the loop waits.

The important design decision is that the check happens before the run rather
than during it. An agent halted midway through has consumed the budget and
produced nothing, which is the worst of both outcomes. Better to not start.

Estimating cost before a run is imprecise, so the gate is deliberately
conservative. Leaving some of the window unused is cheap. Running out at four in
the afternoon is not.

## Escalation is the other half

A loop that only knows how to succeed is not useful unattended. Most of the
value is in recognising that a run should stop and a person should look.

The cases that matter are when the agent cannot reproduce the issue, when the
change would cross into territory that needs judgement, and when it has tried
the same thing twice and got the same result. That last one is the most
valuable signal in the system and the easiest to miss, because from the inside a
loop always looks like progress.

Escalation means leaving the work in a state a person can pick up. The branch,
what was tried, and why it stopped. A ticket that says the agent failed is not
worth the tokens it cost.

## Why sequential rather than parallel

The loop runs one task at a time on purpose. Partly because parallel working
copies are expensive on a Unity repository, for the reasons in
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).
Mostly because the output of a single loop already saturates the available
review attention. Running four would not produce four times the throughput, it
would produce four times the queue.
