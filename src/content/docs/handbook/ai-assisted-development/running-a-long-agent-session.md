---
title: "Running a long agent session"
status: working
---

Most agent coding advice is about the prompt. I've found that once you're
working a real problem for hours, the hard part is managing the session, and
there's not much written about that.

## Speed turns out to matter a lot

With [the editor in the loop](/handbook/unity-toolchain/the-unity-cli/), most of
a session is round trips. Ask, act, read the console, adjust. The model thinking
is a small slice of the time and waiting is most of it.

So a model that answers in a few seconds gets way more goes at the problem than
a smarter one that takes a minute. Over an afternoon the faster one can come out
ahead, just by getting more attempts against a system that tells it the truth
every time.

I've been using DeepSeek 4.1 for this and it's fantastic. First time I've picked
a model on speed and not regretted it. That only works because the feedback is
real though. Fast iteration against a loop that checks the work gets somewhere.
Fast iteration against nothing just gets you wrong answers sooner.

This goes against how I framed things in
[model routing](/handbook/ai-cost-discipline/model-routing/), where the cheap
fast model is the compromise you accept on easy steps. With a verification loop
behind it, I think the fast model is actually the right default for doing the
work.

## Plan and review with a second model

I don't want the model doing the work to also be the one that decided what to
do.

A planning step up front and a review step at the end, done by a different
model or a frontier one, catches something that's really hard to catch from
inside a session. An agent halfway through a task has committed to an approach,
and everything it writes after that is consistent with the approach whether or
not the approach was any good. A second model reading the plan cold hasn't
committed to anything.

It doesn't need to be elaborate. Write the plan, get something else to read it
and say where it's wrong, then hand the agreed plan to the fast model. Most of
the value shows up as work that never gets started.

## Keep the plan in a file

The plan and the review get saved as markdown in the repo, and that file is what
I use to seed the next chat.

Otherwise everything the model worked out is trapped in a transcript nobody's
ever going to re-read. A short doc that says what we're doing, what's been tried
and what turned out to be a dead end is worth way more at the start of a new
chat than a pile of pasted context, because it's the conclusions without the
journey.

It's the same idea as keeping
[architecture notes in the repo](/handbook/ai-assisted-development/context-for-a-unity-repo/),
just with a shorter life. One describes the project and the other describes the
job I'm in the middle of.

## Long context works, but prune it anyway

I've let DeepSeek sessions go past 800k tokens of context and it seems okay with
that. That's an impression, not a measurement, but it's enough that I've
stopped carefully budgeting the window.

Old history still isn't free though. You
[pay for it on every turn](/handbook/ai-cost-discipline/prompt-cache-economics/),
and worse, the model's still reading it. A long argument about a bug you fixed
two hours ago is now a big block of text about a problem that doesn't exist
anymore, and the model has no particular reason to know that.

So I rewind a lot. OpenCode lets you fork back to an earlier point in the chat
and carry on from there, and I use it in two situations.

**When I've gone down a pointless rabbit hole**, I fork back to before it
started. The model doesn't need to carry that around, and leaving it in mostly
gets you a model that keeps glancing back at it.

**When a fix has actually gone in**, I fork back to before the debugging that
found it. This one's less obvious and more useful. The fix is in the code now,
and the code is the source of truth. The chat about getting there is just
weight, and keeping it around invites the model to re-argue something that's
already done.

Anything worth keeping goes in the md file. The chat itself I'm happy to throw
away.
