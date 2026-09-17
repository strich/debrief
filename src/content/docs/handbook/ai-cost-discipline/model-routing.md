---
title: "Model routing"
status: researching
---

Using one model for everything is the expensive default. Most of what an agent
loop does is not hard. Reading a file, summarising a diff, deciding which of
four tools to call next, reformatting output. Paying a frontier rate for those
steps is where a lot of budget quietly goes.

Routing means matching the step to a model that can do it, and this page is
where I will write up what the split actually looks like here once I trust it.

## The shape of the argument

Agent work is not uniform. A session mixes a small number of genuinely difficult
reasoning steps with a large number of mechanical ones, and the price difference
between tiers is large enough that the mix matters more than the peak.

The obvious split is by task class. Planning, architectural judgement and
anything touching unfamiliar code gets the capable model. Mechanical
transformation, classification and routine summarisation get a cheaper one.

The less obvious consideration is that switching models mid-session interacts
badly with caching. A different model means a different cache, so the saving on
a cheap step can be undone by the write cost of re-establishing context. That
mechanism is described in
[prompt cache economics](/handbook/ai-cost-discipline/prompt-cache-economics/),
and it is the main reason I have not simply implemented the obvious split and
declared victory.

## What I am trying to establish

Whether the routing saving survives the cache penalty on realistic sessions, or
whether it is better to pick one model per session and route at that level
instead.

Where the quality cliff actually is. A cheaper model that gets a classification
wrong can send an entire run down the wrong path, and the cost of that is not
the token saving, it is the whole session.

Whether any of it is stable enough to be worth maintaining. Model lineups change
every few months, and a carefully tuned routing table is a maintenance burden
that has to justify itself against simply using one good model and watching the
bill.

## The related question

Whether to route through your own keys or pay per seat is a different decision
that interacts with this one, and it is covered in
[BYO keys vs per-seat SaaS](/handbook/ai-cost-discipline/byo-keys-vs-per-seat-saas/).
