---
title: "Artifacts and distribution"
status: researching
---

A game build is a huge opaque binary that lots of people need and nobody wants
to wait for. Getting it from the farm to the people who need it is a separate
problem from producing it, and it scales differently.

## Why it's awkward

**Size.** Builds are gigabytes and a team makes them constantly. Storage costs
real money, egress often costs more, and both grow with the team rather than the
project.

**Retention is a judgement call.** Most builds get looked at once and never
again. A few need keeping forever, usually the ones that shipped or ones a bug
report points at. You can't reliably tell which is which when the build is made,
so you either keep too much or bin something you later need.

**It's not just engineers.** QA, design, audio and external partners all need
builds, and none of them should have to understand the CI system to get one.
Distribution has to work for people who don't have accounts on the build
infrastructure.

**Every platform is different.** Each console and store has its own submission
path, signing requirements and tooling, and none of it's interchangeable.

## What I'm working toward

Separating the build log from the build output. Diagnosing a failure needs the
log and nothing else, and nobody should have to download gigabytes to read a
stack trace.

A retention policy that's automatic and a bit generous, with explicit pinning
for builds that matter. Relying on people to tidy up doesn't work. Relying on
them to mark something as important before they know it's important works even
worse.

One way to get internal builds regardless of platform, so "get me yesterday's
build" is the same request no matter who's asking.

## Why it's not written up yet

It's downstream of the
[farm rebuild](/handbook/ci-build-infrastructure/build-farm-shape/), and the
decisions there constrain the answers here. Writing it up now would mostly be
documenting a system I'm about to replace.
