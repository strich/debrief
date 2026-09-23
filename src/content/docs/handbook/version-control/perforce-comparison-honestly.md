---
title: "Perforce comparison, honestly"
status: researching
---

Every conversation about game version control ends up in the same place. Git
wasn't built for this, Perforce was, so why are you still on Git?

It's a fair question and I don't have a settled answer, which is why this page
is marked researching. This is where my thinking is at, not a conclusion.

## What I actually know

I've run big Unity projects on Git for over a decade, through everything in
[Git for game projects](/handbook/version-control/git-for-game-projects-what-breaks/)
and the LFS migration after it. That experience is real, and it's also
completely one sided. I've used Perforce but I've never run a studio on it, and
I'm pretty wary of comparisons written by people in exactly my position.

The received wisdom goes roughly like this. Perforce handles big binary
histories natively instead of bolting LFS on. File locking is built in properly,
where in Git it's an add-on nobody remembers to use. Artists generally find it
easier. On the other side, Git is free, the tooling around it is enormous, and
every engineer you hire already knows it.

## What I'm actually trying to work out

The question I care about now is narrower than the general comparison. It's
about agents more than artists.

Everything in
[Autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/)
runs into the cost of a working copy. Git worktrees are the obvious way to run
several agents in parallel, and they're ruinous when the working tree is tens of
gigabytes. A Perforce workspace with a configurable view is a really different
shape, and on paper it fits "give this agent only the bit of the tree it needs"
much better.

Whether that holds up for real, and whether it's worth migrating an established
project for, is what I want to find out. I'd rather write this page after
testing it.

## What would change my mind

A measured comparison on our actual repo of what it costs to stand up several
isolated working copies. If Perforce makes parallel agent work cheap and Git
can't, that's a stronger argument than anything in the usual comparison, and
it's the one I'd actually act on.
