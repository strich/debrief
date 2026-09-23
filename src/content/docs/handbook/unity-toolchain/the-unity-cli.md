---
title: "The Unity CLI"
status: working
---

Driving the Unity editor from outside has always been possible with
[batchmode](/handbook/unity-toolchain/headless-builds-and-batchmode/), but
batchmode is pretty blunt. It starts an editor, runs one method and exits. For a
build that's exactly right. For a tool that wants to ask the editor a question
and do something with the answer, it's the wrong shape.

A proper command line interface to a running editor fixes that, and it's the
piece that's been missing for agent work. This page sat at researching for a
while as I tried it against a real project. It's at working now because the
question I cared about most has an answer, and it's a better answer than I
expected.

## It closes the loop

An agent can start the editor. It can run tests or enter play mode. And it can
read what came out in the console. Any one of those is a nice convenience. Put
together, the agent can make a change, see what actually happened, and fix its
own mistakes without me in the middle.

That's the big one. Before this, an agent on a Unity project was writing code it
couldn't run, so every check was a human check. Now it launches, tests, reads
the console and goes again, and I review the end result instead of every
attempt.

The real limit on this kind of work has been how much agent output a person can
read, which is the argument in
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/).
Self-correction helps with that directly, because the attempts that used to end
up with me get sorted out before I see anything.

## It changed how I pick a model

With the editor in the loop, most of a session is round trips. Ask, act, read
the console, adjust. So model speed suddenly matters a lot, because it decides
how many goes you get in an afternoon. That ended up being the biggest change
to how I choose a model, and it's in
[running a long agent session](/handbook/ai-assisted-development/running-a-long-agent-session/).

## The bigger surprise

I expected the value to be builds and tests. The thing that's turned out way
more valuable is that a model with a live editor is really good at poking around
prefabs and the running scene hierarchy. Source-level tooling can't reach that
half of a Unity project at all, and it's got its own page:
[Agents in the scene hierarchy](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/).

## Window focus

Our game waits for focus on the game window when it loads a scene. So an
unattended run can just sit there waiting for a click that's never coming,
without reporting anything wrong. It's about the most annoying kind of failure
there is, because it looks exactly like a slow step.

The fix is an instruction telling the agent to bring the game window forward. I
don't want to change the game for this. The focus behaviour is there for reasons
that have nothing to do with tooling, and bending the product to suit the
harness is backwards.

More generally, the default Unity skills and instructions that ship for agent
work assume a project that doesn't do anything unusual. Every real project does
something unusual. Expect to write your own project-specific instructions, and
expect to find out what goes in them by watching runs stall.

## Still open

**Per-call latency at real repo scale.** Sample projects prove nothing. What
matters is what a call costs against a project with a fully populated
`Library`, and I haven't measured that properly yet.

**Domain reloads.** Recompiling scripts tears down and rebuilds the managed
domain. How well that's handled decides whether a long session is viable or
every script change means starting over.

**How failures get reported.** Structured errors an agent can act on, or log
output it has to parse? So far it's more parsing than I'd like.
