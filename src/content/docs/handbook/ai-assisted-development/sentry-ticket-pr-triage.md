---
title: "Sentry to ticket to PR triage"
status: researching
---

Crash reporting produces more than a small team can get through. Most of it's
duplicates, most of the rest is environmental, and the few reports that really
matter are buried in there somewhere. What I want is a path from a crash report
to a triaged ticket to a candidate fix, with a person only involved where
judgement's needed.

I'm partway into building it. This is where it's at, not a finished account.

## Why it looks doable

This path suits automation unusually well compared with general feature work.

A crash report is concrete. Stack trace, version, platform, frequency. No
requirements gathering and no ambiguity about what's being asked.

Success is checkable. If there's a reliable repro, a candidate fix either stops
it or it doesn't. That's a much cleaner signal than "is this code good".

And grouping and prioritising is exactly the kind of judgement that's tedious
for a person and suits a model well. Deciding that fifty reports are the same
bug happens all the time and nobody enjoys it.

## Where I expect it to get hard

Getting from a stack trace to the right part of the codebase. That's the
problem in
[Context for a Unity repo](/handbook/ai-assisted-development/context-for-a-unity-repo/)
with extra steps, because a stack trace from a shipped release build isn't all
that close to the source.

Reproduction. Plenty of game crashes depend on state that's really hard to
rebuild outside the session that produced it, and without a repro the
checkability advantage disappears completely.

Grouping confidently enough to act on. Merging two bugs that are actually
different hides one of them, maybe for a long time, and that's worse than not
grouping at all.

## What I'm doing first

Triage only, no fix attempts. Ingest, group, prioritise, and open a decent
ticket for a person to pick up. That's the part I'm most confident is a real
improvement, and it's useful on its own whether or not the rest happens.

Whether it's worth going from ticket to candidate pull request is exactly what
the first stage should tell me. If triage alone takes out most of the tedium,
maybe what's left is the part that needed a person anyway.
