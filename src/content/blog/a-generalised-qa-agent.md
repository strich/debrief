---
title: "A generalised QA agent"
description: "Early notes on whether typed judgement models plus an LLM could act as a QA layer over a game, written before the idea is anything."
pubDate: 2026-09-19T09:00:00Z
tags: [ai, tooling, unity]
stage: seedling
draft: false
---

This is a seedling in the literal sense. I started a project to look into it,
have not gone far, and am writing it down mostly so that the idea stops
circling.

The question is whether you can build a generalised QA agent for a game. Not a
test suite, which we already have and which only ever checks the things someone
thought to write down. Something that plays or observes the game and forms a
view on whether what it is seeing is right.

## Why it feels newly plausible

Game QA is, in large part, applied common sense. Does this look wrong. Did that
animation just do something no animation should do. Is this number plausible
for this point in the game. Every one of those is trivial for a person and has
historically been impossible to automate, because the judgement is the whole
task and there is nothing to assert against.

Two things have shifted.

The first is that a model with an editor to talk to can now read the live scene
hierarchy, which means there is real state to look at rather than pixels to
guess from. That turned out to be
[the most valuable capability I have found this year](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/),
and a QA agent is an obvious thing to point it at.

The second is typed judgement. Models like TypeSafe's Jev take a natural
language question and some application state and return something structured
and probabilistic, rather than a paragraph. That matters because a paragraph is
not a test result. If the output is a typed judgement with a confidence
attached, ordinary code can combine it, threshold it and decide whether to
raise something. A QA layer needs an answer it can act on, and "here is my
assessment of the situation" is not one.

So the shape is roughly: a general model to drive and observe, a typed
judgement layer to turn observations into things code can branch on, and the
editor underneath providing actual state.

## Why I have not built it

Because I do not yet know what the failure mode is, and I suspect it is false
positives at a volume that makes the whole thing worse than nothing. A QA layer
that reports fifty plausible-sounding concerns per run is a QA layer that gets
switched off in a week, which is the same failure as
[a code reviewer that comments on everything](/handbook/ai-assisted-development/ai-code-review-unity/).

That is the thing to find out first, and it is findable cheaply. Point it at a
build with known bugs in it and see whether the known bugs are anywhere near
the top of what it reports. If they are not, none of the rest matters.

Writing this down as the next thing to actually try.
