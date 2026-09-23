---
title: "BYO keys vs per-seat SaaS"
status: researching
---

There are two ways to buy AI coding tools. Pay a vendor per developer per month
and use whatever they've wired up, or bring your own API keys and pay for what
you actually use.

For a small studio the difference is bigger than it looks, and price is only
part of it.

## Why per-seat fits badly here

Per-seat pricing assumes everyone uses it about the same amount. On a team where
part of the code team is openly sceptical of the tooling (see
[adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/))
that's just not true. A few people use it constantly and others not at all.

That creates a bad dynamic. Seats for people who don't want them are waste, so
the natural move is to buy fewer and ration them. Now an optional tool is a
scarce resource people have to justify asking for, and that's the fastest way I
can think of to kill adoption of something whose whole advantage was being
optional.

Per-seat also caps the thing I most want to do. An
[automated loop](/handbook/ai-assisted-development/quota-gated-agent-loops/)
isn't a person and doesn't map to a seat at all.

## What bringing your own keys changes

You pay for what's used, so the sceptics cost nothing and the loop is just
another consumer. Routing decisions become yours, which is what makes
[model routing](/handbook/ai-cost-discipline/model-routing/) possible. And you
can attribute spend, which
[cost per merged PR](/handbook/ai-cost-discipline/cost-per-merged-pr/) depends
on.

The downsides are real too. You're now running something. Key management, spend
limits, rate limits, and someone on the hook when a loop misbehaves at three in
the morning. A vendor soaks all that up, and there's a decent argument that a
small team should let them.

Aggregators sit in the middle and give you one key across lots of providers. The
ones worth a look are the ones that don't mark up token pricing and make their
money some other way. I want to check that against real invoices instead of
trusting a pricing page.

## What I'm waiting on

Enough billing history to compare properly. It only means something once there's
a real usage profile to price both ways, including the loop, and that profile is
still changing month to month.

Right now I think bringing our own keys is right for us, mostly because the
automated work doesn't fit a seat model at all. I want to see that hold for a
few months before I write it down as advice.
