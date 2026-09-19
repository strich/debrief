---
title: "Running a long agent session"
status: working
---

Most advice about agent coding is about the prompt. In practice, once you are
working a real problem over hours rather than minutes, almost none of the
difficulty is in the prompt. It is in managing the session, which is a
different skill and a much less discussed one.

These are the four habits that have made the largest difference here.

## Speed became a capability

Once
[the editor is in the loop](/handbook/unity-toolchain/the-unity-cli/), a session
is mostly round trips. Ask, act, read the console, adjust. Reasoning is a small
fraction of the wall clock and waiting is most of it.

In that regime how fast a model answers stops being a comfort preference and
becomes a real property of the tool, because it sets how many correction cycles
fit into a working session. A model that is somewhat less capable per step but
several times faster can out-perform the smarter one over an afternoon, simply
by getting more attempts against a system that tells it the truth every time.

DeepSeek 4.1 is what I have been using for this, and it is the first time I
have picked a model on latency rather than on capability and not regretted it.
That only holds because the feedback is real. Fast iteration against a
verifying loop converges. Fast iteration against nothing just produces wrong
answers sooner.

This cuts against the usual framing in
[model routing](/handbook/ai-cost-discipline/model-routing/), which treats the
cheap model as the compromise you accept on easy steps. With a verification
loop attached, the fast model is not a compromise, it is the correct default
for the execution phase.

## Plan and review with a second model

The execution model should not also be the model that decided what to do.

Putting a deliberate planning step in front, and a review step behind, run by a
different model or by a frontier one, catches a specific failure that is very
hard to catch from inside a session. An agent in the middle of a task has
committed to an approach, and everything it produces afterwards is coherent
with that approach whether or not the approach was right. A second model
reading the plan cold has no such commitment.

It does not need to be elaborate. Draft the plan, have something else read it
and say where it is wrong, then hand the agreed plan to the fast model to
execute. Most of the value shows up as work not started.

## Write the session out to a file

The plan and the review get kept as markdown in the repository, and that file
is what seeds the next session.

This solves the thing that otherwise makes long sessions fragile, which is that
everything the model worked out is trapped in a transcript nobody will ever
re-read. A short document that says what we are doing, what has been tried, and
what turned out to be a dead end is worth more at the start of a new chat than
any amount of context stuffing, because it is the conclusions rather than the
path to them.

It also composes with
[the repository's own architecture notes](/handbook/ai-assisted-development/context-for-a-unity-repo/).
Same principle, different lifetime. One describes the project, the other
describes the current piece of work.

## Long context is real, and history still needs pruning

I have run sessions out past 800k tokens of context without the quality
noticeably falling over. That is an impression rather than a measurement and I
would not publish it as a number, but it is enough that I have stopped
budgeting the window carefully and started treating it as roomy.

What has not gone away is that old history is not neutral. It is
[paid for on every turn](/handbook/ai-cost-discipline/prompt-cache-economics/),
and worse, it is still being read. A long argument about a bug you fixed two
hours ago is now a large block of text describing a problem that no longer
exists, and the model has no strong reason to know that.

So the habit that matters is rewinding. OpenCode lets you fork back to an
earlier point in the conversation and continue from there, and I use it
constantly, in two situations.

When a line of enquiry turns out to be pointless, fork back to before it
started. The dead end is not a lesson the model needs to carry, and leaving it
in mostly buys you a model that keeps glancing at it.

When a fix has actually landed, fork back to before the debugging that found
it. This one is less obvious and more useful. The fix is in the code now, and
the code is the source of truth. The transcript of arriving at it is pure
weight, and keeping it around invites the session to re-litigate something
already settled.

What you are maintaining across a long session is a clean statement of the
current problem against a repository that already contains every answer you
have found. The transcript is a working surface, not a record. Anything worth
keeping goes in the file.
