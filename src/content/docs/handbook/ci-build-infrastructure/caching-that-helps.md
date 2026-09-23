---
title: "Caching that helps"
status: researching
---

On a Unity project the gap between a cold build and a warm one is massive.
Minutes versus most of an hour, and nearly all of it comes down to one folder.

## The Library folder

`Library` holds the imported form of every asset in the project. Textures
converted to platform formats, meshes processed, scripts compiled, and an
artifact database tying it all together.

It's derived data, so it rightly stays out of version control. It's also
expensive enough to regenerate that treating a build agent as disposable just
doesn't work. This is the single most important fact about Unity CI, and it's
behind most of [build farm shape](/handbook/ci-build-infrastructure/build-farm-shape/).

Keeping it between builds is the biggest optimisation available. A persistent
agent that keeps its checkout warm avoids the problem completely, which is why
long-lived agents beat throwaway ones here.

## Other caches worth having

**LFS objects.** Fetching tens of gigabytes of assets every build is slow and
metered. A local object cache shared between checkouts on the same machine is
easy and pays for itself straight away.

**Package resolution.** Less dramatic, but a network round trip every build for
stuff that rarely changes is free to get rid of.

**The Unity Accelerator.** Unity has a shared import cache so one machine's
import work can serve the others. On paper it's aimed squarely at the cold
`Library` problem. How well it does on a repo our size, and whether it beats
just keeping agents warm, is the main thing I want to measure.

## Why this is still researching

I'm confident in the principles above. The numbers aren't there yet, and the
specific setup is tangled up with the farm rebuild.

The question I actually want answered is whether a shared import cache makes
throwaway agents viable again. If it does, most of the awkward conclusions about
long-lived specialised machines get a lot easier. If it doesn't, a few warm
agents is the answer and the Accelerator isn't worth running. I'd rather measure
that than guess.
