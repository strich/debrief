---
title: "BYO keys vs per-seat SaaS"
status: researching
---

Two ways to buy AI coding tooling. Pay a vendor per developer per month and use
whatever they have wired up, or bring your own API keys and pay for what you
actually consume.

For a small studio the difference is larger than it looks, and it is not simply
about which is cheaper.

## Why per-seat pricing fits badly here

Per-seat assumes usage is roughly uniform across the team. On a studio where
part of the code team is actively sceptical of the tooling, which is the
situation described in
[adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/),
it is not. A handful of people use it constantly and others not at all.

That produces a bad dynamic. Seats for people who do not want them are waste,
and the natural response is to buy fewer seats and ration them, which turns an
optional tool into a scarce resource people have to justify asking for. That is
the fastest way to kill adoption of something whose whole advantage was being
optional.

Per-seat also caps the thing I most want to do. An
[automated loop](/handbook/ai-assisted-development/quota-gated-agent-loops/) is
not a person and does not map onto a seat at all.

## What BYO keys changes

You pay for consumption, so the sceptics cost nothing and the loop is just
another consumer. Routing decisions become yours, which is what makes
[model routing](/handbook/ai-cost-discipline/model-routing/) possible at all.
Attribution becomes possible, which is what
[cost per merged PR](/handbook/ai-cost-discipline/cost-per-merged-pr/) depends
on.

The costs are real too. You are now operating something. Key management, spend
limits, rate limits, and someone on the hook when a loop misbehaves at three in
the morning. A vendor absorbs that and there is a genuine argument that a small
team should let them.

Aggregators sit in the middle, offering one key across many providers. The ones
worth considering are those that do not mark up token pricing and make their
money elsewhere. That is the part I want to verify against real invoices rather
than take from a pricing page.

## What I am waiting on

Enough billing history to compare honestly. The comparison is only meaningful
once there is a real usage profile to price both ways, including the loop, and
that profile is still changing month to month.

My current position is that BYO keys is right for us, mostly because the
automated work does not fit a seat model at all. I want to see that hold for a
few months before writing it down as advice.
