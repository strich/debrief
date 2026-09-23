---
title: "What I stopped understanding"
description: "A stuck project moved a huge amount with DeepSeek doing most of the debugging, and I came out of it understanding the problem less than I would have. Plus an idea for fixing that."
pubDate: 2026-09-19T11:00:00Z
tags: [ai, studio]
stage: seedling
feedsHandbookPage:
  - /handbook/people-and-practice/code-ownership-when-agents-write-code/
draft: false
---

A project here had been stuck for a while. Over the last few weeks it moved a
huge amount, and most of the actual work was done by DeepSeek running the loop
I've described in the handbook. Plan with a second model, run fast against a
live editor, read the console, fix, repeat. It worked. The thing that was stuck
isn't stuck anymore.

I'm really happy with how it turned out. I'm also a bit uneasy about
something, and I want to write it down while it's fresh enough to be honest
about.

## I couldn't explain it now

If someone sat me down and asked me to walk them through why that system
behaves the way it does, I'd do a noticeably worse job than if I'd done the
work by hand. I know what changed. I reviewed it. I could find it again. But the
feel for the problem, the stuff you only get from being stuck in it yourself
for two days, just isn't there. I skipped that part. Skipping it was kind of the
point.

There's a handbook page on
[what happens to a junior who stops reading closely](/handbook/people-and-practice/code-ownership-when-agents-write-code/),
and the uncomfortable bit is that I wrote it about someone else. Turns out
being senior doesn't protect you at all. The tool is good and every incentive
points the same way. Every time I could have gone deeper I could also have
skipped it, and skipping was always the right call in the moment.

I'm less sure it was the right call across the whole project. I can't judge
that yet, because not understanding something costs you nothing until the day
you need to understand it.

## What I actually want

A rule won't do it. "Read everything carefully" doesn't survive a system that's
producing correct work faster than I can read it. I'd just break my own rule
and feel bad about it.

What I want is narration. I'd love to be able to sidecar a second LLM into my
OpenCode sessions whose whole job is to talk to me about what's going on. It
wouldn't review the work or step in. It'd just tell me, out loud, that the agent
has decided the problem is in the spawn code rather than the pooling code, and
here's why, do I want to dig into that?

Voice ideally, because the reason I'm not following closely is usually that my
eyes are on something else. A running commentary I can half listen to, and
lean into when something sounds interesting, is really different from a
transcript I *could* scroll back through and won't.

And it has to be on demand. The whole value of the loop is that it doesn't need
me. A narrator that demands my attention gives all of that back. I want the
option to get involved when it's something I care about knowing deeply, and to
ignore it the rest of the time without feeling guilty.

## Why I think it might work

It pulls apart two things that have always been stuck together, doing the work
and understanding the work. The old assumption was that the only way to get the
second was to do the first. I'm not sure that was ever entirely true, and it
definitely isn't now. Plenty of what I do understand about that project came
from the model telling me things.

If understanding can come separately from doing, then the interesting design
question is what that understanding channel looks like. Right now there
basically isn't one.

I haven't built it. The obvious first version is a second session subscribed to
the first one's output, told to summarise decisions rather than actions, piped
into something that talks. If I do build it I'll write up whether it survives a
week of real use, which is usually where ideas like this quietly die.
