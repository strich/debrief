---
title: "A generalised QA agent"
description: "Early notes on using Jev and other LLMs as a sort of general QA agent for a game. I haven't got very far yet."
pubDate: 2026-09-19T09:00:00Z
tags: [ai, tooling, unity]
stage: seedling
draft: false
---

This is a seedling in the most literal sense. I started a side project to look
into it, haven't got very far, and I'm mostly writing it down so it stops
rattling around in my head.

The idea is a generalised QA agent for a game. We've already got test suites,
and they only ever check the things someone thought to write down. I mean
something that plays or watches the game and forms its own view on whether what
it's seeing is right.

## Why now?

A lot of game QA is just applied common sense. Does this look wrong? Did that
animation just do something no animation should ever do? Is this number sane
for this point in the game? All trivial for a person, and historically
impossible to automate, because the judgement *is* the task. There's nothing to
assert against.

Two things have changed that I think make it worth another look.

The first is that a model hooked up to the editor can now read the live scene
hierarchy. So there's real state to look at instead of pixels to guess from.
That's been
[the most valuable thing I've found this year](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/)
and a QA agent is an obvious thing to point it at.

The second is typed judgement models like TypeSafe's Jev. You give it a natural
language question plus some application state, and it hands back something
structured with a probability attached instead of a paragraph. That matters a
lot here. A paragraph isn't a test result. A typed judgement with a confidence
is something normal code can threshold and combine, and then decide whether to
raise.

So roughly: a general LLM to drive and observe, Jev to turn what it sees into
something code can act on, and the editor underneath providing the actual
state.

## Why I haven't built it

Honestly I think the failure mode is false positives, and lots of them. A QA
agent that reports fifty plausible-sounding concerns per run gets switched off
within a week. Same way
[a code reviewer that comments on everything](/handbook/ai-assisted-development/ai-code-review-unity/)
does.

That's cheap to find out though. Point it at a build with bugs we already know
about and see whether they show up anywhere near the top of what it reports. If
they don't, nothing else matters.

So that's the next thing to actually try. If you've had a go at something like
this I'd love to hear how it went.
