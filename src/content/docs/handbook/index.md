---
title: "The Debrief Handbook"
status: working
---

What I know about running the infrastructure a small game studio needs, and
about putting AI to work inside it without breaking the things that already
work.

The blog is where I write up a specific thing that happened on a specific day.
This is where the parts that turned out to be generally true end up. A post is
finished the moment it is published. A handbook page is never quite finished,
because the ground keeps moving.

Everything here is written from a real production Unity codebase and a real
team. Where I have measured something, I say so. Where I am still working it
out, the page says that too, and says what I am trying to find out.

## The six sections

**[Version control at game-repo scale](/handbook/version-control/git-for-game-projects-what-breaks/)**
covers what happens to Git when most of your repository is binary art assets
and your history runs to tens of gigabytes.

**[The Unity toolchain](/handbook/unity-toolchain/the-unity-cli/)** is the
command-line half of Unity. Headless builds, batchmode, and how a project is
laid out so automation can get at it.

**[AI-assisted development](/handbook/ai-assisted-development/context-for-a-unity-repo/)**
is coding agents pointed at a large Unity repository, and the review and triage
loops around them.

**[AI cost discipline](/handbook/ai-cost-discipline/cost-per-merged-pr/)** is
what any of this actually costs, and how to keep it from quietly becoming the
largest line item in a small studio's tooling budget.

**[CI and build infrastructure](/handbook/ci-build-infrastructure/build-farm-shape/)**
is the build farm underneath all of it.

**[People and practice](/handbook/people-and-practice/review-culture/)** is the
part that has nothing to do with tools. Adoption without a mandate, and who
owns code that an agent wrote.

New here, start with [What this is](/handbook/start-here/what-this-is/).
