---
title: "Sentry to ticket to PR triage"
status: researching
---

Crash reporting produces more signal than a small team can process. Most of it
is duplicates, most of the rest is environmental, and the few that genuinely
matter are buried in the volume. The obvious thing to want is a path from a
crash report to a triaged ticket to a candidate fix, with a person involved only
where judgement is needed.

I am partway into building that. This page is the current state of it rather
than a finished account.

## Why it looks tractable

The path has unusually good properties for automation compared with general
feature work.

A crash report is concrete. There is a stack trace, a version, a platform, and a
frequency. No requirements gathering and no ambiguity about what is being asked.

Success is checkable. If there is a reliable repro, a candidate fix either stops
it or does not, and that is a much cleaner signal than "is this code good".

Grouping and prioritising is exactly the kind of judgement that is tedious for a
person and well suited to a model. Deciding that fifty reports are one bug
happens constantly and nobody enjoys it.

## Where I expect the difficulty

Getting from a stack trace to the right part of the codebase, which is the
context problem in
[Context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
with extra steps, because a release stack trace on a shipped build is not
especially close to source.

Reproduction. Many game crashes depend on state that is difficult to reconstruct
outside the session that produced it, and without a repro the checkability
advantage above disappears entirely.

Grouping confidently enough to act on. Merging two bugs that are actually
distinct hides one of them, possibly for a long time, and that is a worse outcome
than not grouping at all.

## What I am doing first

Triage only, with no fix attempt. Ingest, group, prioritise, and open a
well-formed ticket for a person to pick up. That is the part I am most confident
is a genuine improvement, and it is useful on its own whether or not the rest
follows.

Whether the step from ticket to candidate pull request is worth taking is
exactly what I want the first stage to tell me. If triage alone removes most of
the tedium, the remaining work is the part that needed a person anyway.
