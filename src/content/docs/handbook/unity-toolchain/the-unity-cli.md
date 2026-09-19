---
title: "The Unity CLI"
status: working
---

Driving the editor from outside has always been possible through
[batchmode](/handbook/unity-toolchain/headless-builds-and-batchmode/), but
batchmode is a blunt instrument. It starts an editor, runs one method, and
exits. For a build that is exactly right. For a tool that wants to ask the
editor a question and act on the answer, it is the wrong shape entirely.

A first-class command line interface to a running editor changes that, and it
is the piece that has been missing for agent work. This page sat at researching
for a while because I was partway through evaluating it. It is now working,
because the question I most wanted answered has an answer, and the answer is
better than I expected.

## The loop closes

What matters is not any single capability. It is that three of them compose.

An agent can start the editor. It can run a test or enter play mode. It can
read what the console produced. Each of those alone is a convenience. Together
they are a closed loop, which means an agent can make a change, observe the
actual consequence of that change, and correct itself with nobody in the
middle.

That is the entire difference. Before this, an agent working on a Unity project
was writing code it could not run, which reduces it to a very well read
colleague who has never seen the game start. Every verification step was a
human step. With the loop closed the agent fixes its own mistakes, and a person
reviews the result instead of each attempt.

It also moves the bottleneck. The constraint on this work was never compute, it
was how much agent output a person can actually read, which is the argument in
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).
Self-correction attacks that directly, because the attempts that used to land
on a reviewer now get resolved before the reviewer sees anything.

## What it changed about model choice

Once the editor is in the loop, a session is dominated by round trips rather
than by reasoning. Ask, act, read the console, adjust. In that regime the
response latency of the model stops being a comfort preference and becomes a
capability, because it sets how many corrections fit in a working session. That
turned out to be the single biggest practical change to how I pick a model, and
it is written up in
[running a long agent session](/handbook/ai-assisted-development/running-a-long-agent-session/).

## The bigger surprise

I expected the value here to be builds and tests. The more valuable thing has
been that a model with a live editor to talk to is genuinely good at inspecting
prefabs and the running scene hierarchy, which is the half of a Unity project
that source-level tooling cannot reach. That has its own page in
[agents in the scene hierarchy](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/).

## The gap I have hit

Window focus. Our game waits for focus on the game window when it loads a
scene, so an unattended run can sit there waiting for a click that is never
coming, having reported nothing wrong. It is the most annoying class of failure
available, because it looks exactly like a slow step.

The fix is an instruction to the agent to bring the game window forward, not a
change to the game. The focus behaviour is there for a reason that has nothing
to do with tooling, and bending the product to suit the harness is the wrong
way round.

The general lesson is worth more than the specific fix. The default skills and
instructions shipped for Unity agent work assume a project that does nothing
unusual, and every real project does something unusual. Expect to write
project-specific instructions covering whatever yours does, and expect to find
out what those are by watching a run stall.

## Still open

**Per-call latency at real repository scale.** Small sample projects prove
nothing here. The number that matters is what a call costs against a project
with a fully populated `Library`, and I have not measured it in a way I would
publish.

**Behaviour across a domain reload.** Recompiling scripts tears down and
recreates the managed domain, and how gracefully that is handled decides
whether a long session is viable or whether every script change means starting
over.

**How failure is reported.** Structured errors an agent can branch on, or log
output it has to parse. So far it is more parsing than I would like.
