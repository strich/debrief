---
title: "AI code review: what works and what fails on Unity"
status: working
---

I think automated code review is the best first use of AI tooling in a studio,
and the reason has nothing to do with quality. It's optional. A reviewer leaving
comments on a pull request doesn't change how anyone works, and you can ignore
it with zero consequences. That makes it the one thing you can bring to a
sceptical team without asking permission, which is the argument in
[Adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/).

It's also where off-the-shelf tools fall over hardest on a Unity project, and a
better model won't fix it.

## Where the diff assumption breaks

Nearly every review tool works on the diff. Take the changed lines, send them
off for review, post what comes back. On a normal codebase that's fine. On a
Unity repo it goes wrong in a few ways, all of which come back to
[Unity serialization](/handbook/version-control/unity-serialization/).

**The diff is mostly not code.** Twenty lines of C# can drag thousands of lines
of scene and prefab YAML along with them. Any tool that picks by size, or
truncates to fit a context budget, throws away the C# and reviews the asset
churn.

**The important change is often invisible.** A reference moving between objects
is a GUID changing. Nothing in the diff says what that GUID points at, so the
reviewer either says nothing useful or makes something up.

**Generated and imported files look like source.** Without explicit
classification the reviewer will burn its budget on files no human has ever
read.

## What actually works

**Classify before you review.** The single most valuable change is deciding
what's reviewable source and what's data, and never sending the data. On our
repo that alone took the reviewer from noisy to useful.

**Review the C# properly.** Once the data's filtered out, what's left is
ordinary code review, and it works about as well as it does anywhere.

**Let it be quiet.** A reviewer that comments on everything gets muted within a
week. One that usually says nothing and occasionally catches something real
keeps its credibility.

## Permissions

The other thing nobody warns you about. On an organisation repo the token a
workflow runs under is scoped down on purpose, and most review tooling assumes a
token that can read whatever it likes and post wherever it wants.

Sorting that out took longer than anything to do with models or prompts, and
it's most of why running our own fork made more sense than a hosted product. The
project is at
[AI code review for a Unity monorepo](/projects/ai-code-review-for-a-unity-monorepo).

Because it only sees the C# by design, the wiring bugs in scenes and prefabs are
exactly what it can't catch. That's a job for
[the editor](/handbook/ai-assisted-development/agents-in-the-scene-hierarchy/).
