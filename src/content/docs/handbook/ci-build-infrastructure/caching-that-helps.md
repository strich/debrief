---
title: "Caching that helps"
status: researching
---

On a Unity project the gap between a cold build and a warm one is not a
percentage. It is the difference between minutes and most of an hour, and
nearly all of it comes down to one folder.

## The Library folder

`Library` holds the imported form of every asset in the project. Textures
converted to platform formats, meshes processed, scripts compiled, and an
artifact database tying it together.

It is derived data, so it correctly stays out of version control. It is also
expensive enough to regenerate that treating a build agent as disposable is not
viable. This is the single most important fact about Unity CI and it drives the
conclusions in [build farm shape](/handbook/ci-build-infrastructure/build-farm-shape/).

Preserving it between builds is the highest-value optimisation available. A
persistent agent that keeps its checkout warm avoids the problem entirely, which
is why durable agents beat ephemeral ones here.

## The other caches worth having

**LFS objects.** Fetching tens of gigabytes of assets on every build is slow and
metered. A local object cache shared between checkouts on the same machine is
straightforward and pays for itself immediately.

**Package resolution.** Less dramatic than the others, but a network round trip
on every build for content that rarely changes is free to eliminate.

**The accelerator.** Unity offers a shared import cache so one machine's import
work can serve others. On paper it addresses exactly the cold `Library` problem.
How well it performs on a repository this size, and whether it beats simply
keeping agents warm, is the main thing I want to measure.

## Why this is marked researching

The principles above are settled and I am confident in them. The numbers are
not, and the specific configuration is entangled with the farm rebuild.

The question I actually want answered is whether a shared import cache makes
ephemeral agents viable again. If it does, most of the awkward conclusions about
durable specialised machines get easier. If it does not, then keeping a small
number of warm agents is the answer and the accelerator is not worth operating.
I would rather measure that than guess at it.
