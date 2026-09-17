---
title: "Cost per merged PR"
status: researching
---

Most reporting on AI tooling spend measures the wrong thing. Tokens consumed,
spend per developer per month, requests served. All easy to collect and none of
them answer the only question a studio actually has, which is whether this is
worth what it costs.

The measure I am building toward is cost per merged pull request. Not per
attempt, per merge. Work that was abandoned, reverted or rewritten by a person
still consumed budget, and a metric that ignores that will make a tool look good
precisely when it is performing worst.

## Why this framing

It is comparable to something. A merged pull request is a unit the team already
understands and already produces without AI involvement, so the number can be
argued about honestly rather than admired in isolation.

It punishes the failure modes that matter. An agent that produces plausible work
requiring heavy rework looks efficient by token count and terrible by this
measure, which is the correct ranking.

It forces attribution. Deciding whether a given merge counts as agent work means
deciding what counts as assistance, and that turns out to be the genuinely hard
part.

## The problems I have not solved

**Attribution.** A pull request an agent opened and a person substantially
rewrote is not clean. Neither is one a person wrote after an agent found the
cause. Any rule here is somewhat arbitrary and the number is sensitive to which
one you pick.

**Review time is a real cost and is not billed.** The argument in
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/)
is that human attention is the binding constraint. If that is true then a metric
counting only API spend is measuring the cheaper half of the problem. Costing
review time properly is what I most want to get right and least know how to.

**Selection bias.** Agents get pointed at tractable work, because that is
rational. Comparing cost per merge against team-wide averages therefore compares
easy tickets to all tickets, and flatters the tooling.

## Where I am

Instrumented enough to attribute spend to a session and a session to a ticket,
which is the foundation. The attribution rules are still moving and I do not
want to publish a number that a later definition change would invalidate.

When there is a figure I trust it will go here, with the definition it was
measured under stated plainly enough to disagree with.
