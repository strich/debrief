---
title: "What I stopped understanding"
description: "A project moved a long way with a model doing most of the debugging, and I came out the other side knowing less about it than I would have. Plus one idea for fixing that."
pubDate: 2026-09-19T11:00:00Z
tags: [ai, studio]
stage: seedling
feedsHandbookPage:
  - /handbook/people-and-practice/code-ownership-when-agents-write-code/
draft: false
---

A project here had been stuck for a while. Over the last few weeks it moved a
very long way, and most of the actual work was done by a model running the loop
I have described elsewhere. Plan, execute fast against a live editor, read the
console, correct, repeat. It worked. The thing that was stuck is not stuck.

I am pleased about the outcome and uneasy about something else, and the uneasy
part is worth writing down while it is still fresh enough to be honest about.

## I could not now explain it

If someone sat me down and asked me to walk through why that system behaves the
way it does, I would do a noticeably worse job than if I had done the work by
hand. I know what was changed. I reviewed it. I could find it again. But the
shape of the problem space, the thing you only get from being stuck in it
yourself for two days, is not there. I skipped that part, and skipping it was
the point.

There is a page in the handbook about
[what happens to a junior developer who stops reading closely](/handbook/people-and-practice/code-ownership-when-agents-write-code/),
and the uncomfortable thing is that I wrote it about someone else. The
mechanism does not care about seniority. It is a straightforward consequence of
the tool being good and the incentive pointing one way. Every step where I
could have gone deeper was a step I could also have skipped, and skipping it
was always correct in the moment.

I am not sure it was correct across the whole project. That is the part I
cannot yet evaluate, because the cost of not understanding something does not
arrive until you need to understand it.

## The thing I actually want

Not a policy. I do not think "read everything carefully" survives contact with
a system that is producing correct work faster than you can read it, and
pretending otherwise just means I would break my own rule and feel bad about
it.

What I want is narration. Specifically, I want to be able to sidecar a second
model into the session whose entire job is to talk to me about what is going
on. Not to review the work and not to intervene. To say, out loud, that the
agent has just decided the problem is in the spawn path rather than the pooling
code and here is why, and would I like it to go further into that.

Voice, ideally, because the reason I am not following closely is that I am
doing something else with my eyes. A running commentary I can half listen to
and then lean into when something sounds interesting is a completely different
proposition from a transcript I could scroll back through and will not.

And it should be on demand. The value of the loop is that it does not need me.
A narrator that requires my attention has given the whole thing back. What I
want is the option to be involved, taken up when the topic is one I care about
knowing deeply, and declined the rest of the time without guilt.

## Why this might be the right shape

Because it separates two things that have been fused together, which is doing
the work and understanding the work. The old assumption was that the only way
to get the second was to do the first. That assumption was always a bit
convenient, and it is now clearly not true, because plenty of the understanding
came from being told things by the model rather than from deriving them.

If understanding can be delivered separately from execution, then the
interesting design question is not whether to let an agent do the work. It is
what the understanding channel should look like, and at the moment there is not
much of one.

I have not built this. It is an idea with an obvious first version, which is a
second session subscribed to the first one's output with instructions to
summarise decisions rather than actions, piped into something that speaks. If I
build it I will write up whether it survives a week of actual use, which is the
part where most ideas of this kind quietly stop.
