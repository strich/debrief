---
title: "Model routing"
status: researching
---

Using one model for everything is the expensive default. Most of what an agent
loop does isn't hard. Reading a file, summarising a diff, picking which of four
tools to call next, reformatting output. Paying frontier prices for those steps
is where a lot of budget quietly goes.

Routing means matching each step to a model that can do it. I'll write up what
the split actually looks like here once I trust it.

## The argument for it

Agent work isn't uniform. A session is a small number of genuinely hard
reasoning steps mixed in with a lot of mechanical ones, and the price gap between
tiers is big enough that the mix matters more than the peak.

The obvious split is by task. Planning, architectural calls and anything
touching unfamiliar code get the capable model. Mechanical changes,
classification and routine summarising get a cheaper one.

The less obvious thing is that switching models mid-session plays badly with
caching. A different model means a different cache, so the saving on a cheap
step can get eaten by the cost of re-establishing context. That's explained in
[prompt cache economics](/handbook/ai-cost-discipline/prompt-cache-economics/),
and it's the main reason I haven't just implemented the obvious split and called
it done.

## Speed changed the picture a bit

Since the editor's been in the loop I've ended up using a fast model as the
default for doing the work, with a stronger one for planning and review. That's
in
[running a long agent session](/handbook/ai-assisted-development/running-a-long-agent-session/).
It's routing, sort of, but by phase instead of by step, and I picked the fast
model for its latency more than its price. I'm not sure yet how that squares with
the cost side.

## What I'm trying to work out

Whether routing savings survive the cache penalty on real sessions, or whether
it's better to pick one model per session and route at that level. (The phase
split above is basically a vote for that.)

Where the quality cliff actually is. A cheaper model that gets one
classification wrong can send a whole run off in the wrong direction, and at
that point you've lost the whole session to save a few tokens.

Whether it's stable enough to be worth maintaining. Model lineups change every
few months, and a carefully tuned routing table is a maintenance burden that has
to justify itself against just using one good model and watching the bill.

## Related

Whether to use your own keys or pay per seat is a separate decision that
interacts with this one. That's in
[BYO keys vs per-seat SaaS](/handbook/ai-cost-discipline/byo-keys-vs-per-seat-saas/).
