---
title: "The Debrief Handbook"
status: working
---

This is what I know about running the tech side of a small game studio, and
about getting AI to be actually useful inside it without breaking everything
that already works.

The blog is where I write up a specific thing that happened. This is where the
stuff that turned out to be generally true ends up. A post is done the day I
publish it. A handbook page never really is, because the ground keeps moving
(especially on the AI side, which seems to change every few months).

All of it comes from a real production Unity codebase and a real team. If I've
measured something I say so. If I'm still working it out, the page says that
too, and says what I'm trying to find out.

## The six sections

**[Version control at game-repo scale](/handbook/version-control/git-for-game-projects-what-breaks/)**
is what happens to Git when most of your repo is binary art and the history
runs to tens of gigabytes.

**[The Unity toolchain](/handbook/unity-toolchain/the-unity-cli/)** is the
command line half of Unity. Headless builds, batchmode, the Unity CLI, and
laying a project out so automation can get at it.

**[AI-assisted development](/handbook/ai-assisted-development/context-for-a-unity-repo/)**
is coding agents pointed at a big Unity repo, plus the review and triage loops
around them.

**[AI cost discipline](/handbook/ai-cost-discipline/cost-per-merged-pr/)** is
what all of this actually costs, and how to stop it quietly becoming the biggest
line in a small studio's tooling budget.

**[CI and build infrastructure](/handbook/ci-build-infrastructure/build-farm-shape/)**
is the build farm underneath everything.

**[People and practice](/handbook/people-and-practice/review-culture/)** is the
part that has nothing to do with tools. Getting a team to adopt this without
forcing it on them, and who owns code an agent wrote.

If you're new here, start with [What this is](/handbook/start-here/what-this-is/).
