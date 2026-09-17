---
title: "Artifacts and distribution"
status: researching
---

A game build is a large opaque binary that a lot of people need and nobody wants
to wait for. Getting a build from the farm to the person who needs it is a
distinct problem from producing it, and it scales differently.

## What makes this awkward

**Size.** Builds are measured in gigabytes and a team produces them constantly.
Storage cost is real, egress cost is often larger, and both grow with the team
rather than with the project.

**Retention is a judgement call.** Most builds are looked at once and never
again. A few need to be kept indefinitely, usually the ones that shipped or the
ones a bug report references. Deciding which is which at the time of building is
not reliably possible, so you either keep too much or discard something you
later need.

**The audience is not only engineers.** QA, design, audio and external
partners all need builds, and none of them should have to understand the CI
system to get one. The distribution path has to be usable by people who do not
have accounts on the build infrastructure.

**Platforms disagree.** Each console and store has its own submission path,
signing requirements and tooling, and none of it is interchangeable.

## What I am working toward

Separating the build log from the build output. Diagnosing a failure needs the
log and nothing else, and it should not require downloading gigabytes to read a
stack trace.

A retention policy that is automatic and slightly generous, with explicit
pinning for builds that matter. Relying on people to tidy up does not work, and
relying on them to mark things as important before they know they are important
works even less well.

One route for internal distribution regardless of platform, so that "get me
yesterday's build" is the same request whoever is asking.

## Why it is not written yet

This is downstream of the
[farm rebuild](/handbook/ci-build-infrastructure/build-farm-shape/) and the
decisions there constrain the answers here. Writing it up now would mostly
document a system I am about to replace.
