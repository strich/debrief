---
title: "Build farm shape"
status: researching
---

Ours is halfway through a rebuild, so anything confident I wrote here would be
wrong within a month. This page is about the constraints driving the design,
which are stable even if the answer isn't yet.

## The constraints

**A Unity build needs a real machine.** A container that starts in a second
won't cut it. It needs an editor install, an activated licence, and often an
actual graphics device, for the reasons in
[headless builds and batchmode](/handbook/unity-toolchain/headless-builds-and-batchmode/).
That rules out most of what makes modern CI cheap.

**The `Library` folder is everything.** A clean agent has to reimport the whole
project before it can build, which takes long enough that a farm of fresh
throwaway machines is unusable. Agents have to be long-lived and keep their
state, which is the opposite of how CI works pretty much everywhere else.

**One editor per project directory.** Unity locks the project, so concurrency on
one agent comes from multiple checkouts rather than multiple processes, and
every checkout brings its own `Library` cost.

**Platforms pin you down.** Console and Apple targets need specific hardware and
operating systems. Some of the farm can't be virtualised or moved, and has to be
looked after as physical machines.

## Where that leads

A small number of long-lived specialised machines instead of a big elastic pool.
It's closer to a rack of workstations than a modern CI service. That's an
uncomfortable conclusion right now, but I think it's the right one for this
workload.

The interesting question is which parts really need that treatment. Not
everything in CI is a Unity build. Tests, static analysis and the
[review tooling](/handbook/ai-assisted-development/ai-code-review-unity/) have
none of these constraints and can run on ordinary cheap infrastructure. Keeping
those two apart, instead of running everything on expensive agents because some
of it has to be, looks like most of the available win.

## What I'll write here later

The actual layout once it's running, what it costs, and which of the
constraints above turned out to be real and which were just inherited
assumptions. The one I most want to test is whether the graphics device
requirement is as broad as we've been treating it.
