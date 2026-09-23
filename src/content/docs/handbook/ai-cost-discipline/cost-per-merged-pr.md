---
title: "Cost per merged PR"
status: researching
---

Most reporting on AI tooling spend measures the wrong thing. Tokens used, spend
per developer per month, requests served. They're all easy to collect and none
of them answer the question a studio actually has, which is whether it's worth
the money.

The measure I'm working toward is cost per merged pull request. Per merge, not
per attempt. Work that got abandoned, reverted or rewritten by a person still
used up budget, and a metric that ignores that makes a tool look good exactly
when it's doing worst.

## Why this measure

It compares to something. A merged pull request is a unit the team already
understands and already produces without AI, so the number can be argued about
properly instead of just admired.

It punishes the failures that matter. An agent that turns out plausible work
needing heavy rework looks efficient by token count and terrible by this
measure, which I think is the right way round.

And it forces the attribution question. Deciding whether a merge counts as agent
work means deciding what counts as help, and that turns out to be the hard part.

## What I haven't solved

**Attribution.** A pull request an agent opened and a person then substantially
rewrote isn't clean. Neither is one a person wrote after an agent found the
cause. Any rule here is a bit arbitrary, and the number moves a lot depending on
which rule you pick.

**Review time costs money and nobody bills it.** The argument in
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/)
is that human attention is the real constraint. If that's true, a metric that
only counts API spend is measuring the cheaper half of the problem. Costing
review time properly is what I most want to get right and least know how to do.

**Selection bias.** Agents get pointed at the tractable work, because that's the
sensible thing to do. So comparing cost per merge against team averages compares
easy tickets with all tickets, and flatters the tooling.

## Where I'm at

Instrumented enough to tie spend to a session and a session to a ticket, which
is the foundation. The attribution rules are still moving, and I don't want to
publish a number that a later change in definition would make meaningless.

When there's a figure I trust it'll go here, with the definition it was measured
under spelled out clearly enough that you can disagree with it.
