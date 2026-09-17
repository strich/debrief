---
title: "AI code review: what works and what fails on Unity"
status: working
---

Automated code review is the best first use of AI tooling in a studio, for a
reason that has nothing to do with quality. It is optional. A reviewer that
leaves comments on a pull request changes nothing about how anyone works, and
can be ignored without consequence. That makes it the one intervention you can
introduce to a sceptical team without asking permission, which is the argument
in
[Adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/).

It is also where off-the-shelf tools fail hardest on a Unity project, and the
failure is structural rather than a matter of model quality.

## The assumption that breaks

Nearly every review tool works on the diff. It takes the changed lines, sends
them for review, and posts what comes back. On a normal codebase that is a sound
assumption. On a Unity repository it fails three ways, all of which trace back
to [Unity serialization](/handbook/version-control/unity-serialization/).

The diff is mostly not code. A change touching twenty lines of C# can drag
thousands of lines of scene and prefab YAML with it. Any tool that selects by
size, or truncates to fit a context budget, discards the C# and reviews the
asset churn.

The important change is often invisible. A reference moving between objects is a
GUID changing. Nothing in the diff explains what that GUID points at, and the
reviewer will either say nothing useful or invent something.

Generated and imported files look like source. Without explicit classification a
reviewer will spend its budget reviewing files no human has ever read.

## What actually works

Classify before reviewing. The single highest-value change is deciding what is
reviewable source and what is data, and never sending the second category. On
our repository this alone moved the reviewer from noisy to useful.

Review C# properly rather than everything shallowly. Once the data is filtered
out, what remains is ordinary code review, and it works about as well as it does
on any other codebase.

Let it be quiet. A reviewer that comments on everything gets muted within a
week. One that usually says nothing and occasionally catches something real
keeps its credibility.

## The permissions problem

The other thing nobody warns you about. On an organisation repository the token
a workflow runs under is scoped down deliberately, and most review tooling is
written assuming a token that can read whatever it likes and post wherever it
wants.

Reconciling those two positions was a larger share of the work than anything
about models or prompts, and it is most of why running a fork rather than a
hosted product was the right call here. The project is written up at
[AI code review for a Unity monorepo](/projects/ai-code-review-for-a-unity-monorepo).
