---
title: "Review culture"
status: researching
---

Code review on a small game team is a different activity from code review at a
large company, and most published advice is written for the large company.

With five people, review is not a quality gate staffed by people with slack in
their week. It is a colleague interrupting their own work to look at yours, and
it competes directly against shipping. The temptation to skip it when a milestone
is close is enormous and entirely rational in the moment.

Adding an automated reviewer to that changes the dynamics in ways I am still
working out, which is why this page is marked researching.

## What I think is true so far

**The bottleneck is attention, not correctness.** This is the same conclusion as
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/),
arrived at from a different direction. Anything that increases the volume of
things needing review makes the constraint worse, whoever produced them.

**Automated review is at its best on the boring half.** Style, obvious mistakes,
things a person would catch but resents having to. Clearing that means the human
reviewer arrives at the parts that need judgement, which is a better use of the
scarcest resource on the team.

**It must not become a gate.** The moment a bot can block a merge it becomes
something to argue with rather than something to read, and it inherits all the
resentment that any mandatory process accumulates. Keeping it advisory is what
preserves the property that made it adoptable in the first place.

## What I do not know

Whether the human review standard drifts. If a machine has already looked at a
change, does the person look less carefully. I would expect some effect and I
have no way to measure it, and it is the question I would most like an answer to.

How to review agent-authored changes well. They tend to be plausible, which is
the specific quality that makes review hard. A change that is obviously wrong is
easy. A change that looks right and is subtly not is the expensive case, and
agent output skews toward it.

Whether any of this holds outside a five person team. I suspect several of these
conclusions are artefacts of the size and would invert on a larger group.
