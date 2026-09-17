---
title: "Build farm shape"
status: researching
---

Ours is midway through being rebuilt, so anything confident written here would
be wrong within a month. This page covers the constraints that are driving the
design, which are stable even though the answer is not.

## The constraints

**A Unity build needs a real machine.** Not a container that starts in a second.
An editor install, an activated licence, and in many cases an actual graphics
device, for the reasons in
[headless builds and batchmode](/handbook/unity-toolchain/headless-builds-and-batchmode/).
That rules out most of what makes modern CI cheap.

**The `Library` folder is the whole game.** A clean agent has to reimport the
entire project before building anything, which takes long enough that a build
farm of pristine ephemeral machines is unusable. Agents have to be durable and
keep their state, which is the opposite of current practice everywhere else.

**One editor per project directory.** Unity locks the project, so concurrency on
a single agent comes from multiple checkouts rather than multiple processes, and
each checkout carries its own `Library` cost.

**Platform pins you down.** Console and Apple targets need specific hardware and
specific operating systems. Some of the farm cannot be virtualised, cannot move,
and has to be maintained as physical machines.

## What that adds up to

A small number of durable, specialised machines rather than a large elastic
pool. Closer to a rack of workstations than to a modern CI service, which is an
uncomfortable conclusion in the current climate and appears to be the correct
one for this workload.

The interesting question is which parts genuinely need that treatment. Not
everything in CI is a Unity build. Tests, static analysis, and the
[review tooling](/handbook/ai-assisted-development/ai-code-review-unity/) have
none of these constraints and can run on ordinary cheap infrastructure. Keeping
those two classes separate, rather than running everything on expensive agents
because some of it has to be, looks like most of the available win.

## What I will write here later

The actual layout once it is running, what it costs, and which of the above
turned out to be a real constraint rather than an inherited assumption. The one
I most want to test is whether the graphics device requirement is as broad as we
have been treating it.
