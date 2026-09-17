---
title: "Perforce comparison, honestly"
status: researching
---

Every conversation about game version control arrives at the same place. Git
was not built for this, Perforce was, so why are you still on Git.

It is a fair question and I do not have a settled answer, which is why this page
is marked researching rather than dressed up as a recommendation. What follows
is the state of my thinking rather than a conclusion.

## What I actually know

I have run a large Unity project on Git for over a decade, through the failure
modes in
[Git for game projects](/handbook/version-control/git-for-game-projects-what-breaks/)
and the LFS migration that followed. That experience is real and it is one
sided. I have used Perforce, but I have not run a studio on it, and I am wary of
the genre of comparison written by people in exactly my position.

The honest summary of the received wisdom is that Perforce handles large binary
histories natively rather than by bolting on LFS, that file locking is a
first-class concept rather than an add-on nobody remembers to use, and that
artists tend to find it easier. Against that, Git is free, the tooling ecosystem
around it is enormous, and every engineer you hire already knows it.

## What I am actually trying to work out

The question that matters to me now is narrower than the general comparison, and
it is about agents rather than artists.

Everything in
[Autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/)
runs into the cost of a working copy. Git worktrees are the obvious mechanism
for running several agents in parallel and they are ruinous when the working
tree is tens of gigabytes. Perforce's model of a workspace with a configurable
view is a genuinely different shape, and on paper it maps better onto "give this
agent only the part of the tree it needs".

Whether that holds up in practice, and whether it is worth a migration on an
established project, is what I want to find out. I would rather write that page
after testing it than before.

## What would change my mind

A measured comparison on our actual repository of what it costs to stand up
several isolated working copies. If the answer is that the Perforce model makes
parallel agent work cheap and Git cannot, that is a stronger argument than
anything in the usual comparison, and it is the one I would act on.
