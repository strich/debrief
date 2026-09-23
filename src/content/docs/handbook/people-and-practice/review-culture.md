---
title: "Review culture"
status: researching
---

Code review on a small game team is a different thing from code review at a big
company, and most of the advice out there is written for the big company.

With five people, review isn't a quality gate staffed by people with spare time.
It's a colleague stopping their own work to look at yours, and it competes
directly with shipping. The temptation to skip it near a milestone is huge, and
completely rational in the moment.

Adding an automated reviewer changes that in ways I'm still working out, which
is why this page is marked researching.

## What I think is true so far

**Attention is the bottleneck.** Same conclusion as
[autonomous agents on a large Unity codebase](/handbook/ai-assisted-development/autonomous-agents-large-unity-codebase/),
from a different direction. Anything that increases the amount of stuff needing
review makes it worse, no matter who or what produced it.

**Automated review is best at the boring half.** Style, obvious mistakes, the
things a person would catch but resents having to. Clearing those means the
human reviewer gets to the parts that need judgement, which is a much better use
of the scarcest thing on the team.

**It can't become a gate.** The moment a bot can block a merge it becomes
something to argue with instead of something to read, and it picks up all the
resentment any mandatory process builds up. Keeping it advisory is what made it
adoptable in the first place.

## What I don't know

Whether the human review standard drifts. If a machine's already looked at a
change, does the person look less carefully? I'd expect some effect, I've got no
way to measure it, and it's the question I'd most like answered.

How to review agent-written changes well. They tend to be plausible, and that's
exactly what makes review hard. A change that's obviously wrong is easy. One that
looks right and is subtly wrong is the expensive case, and agent output leans
that way.

Whether any of this holds outside a five-person team. I suspect a few of these
conclusions only hold because we're small, and would flip on a bigger team.
