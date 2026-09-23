---
title: "Adopting AI tooling with sceptical engineers"
status: working
---

Most writing about adopting AI tools assumes the team wants them. In a game
studio that's often not the case, and the objections come from experience. These
are people who've watched the industry get excited about plenty of things that
made their working lives worse, and who have specific professional reasons to
be wary of this one.

There's no ML team to hide behind either. It's me, a codebase, and colleagues
who'll tell me straight if this is a waste of everyone's time.

## Why forcing it doesn't work

You could make it mandatory. It'd look like it was working for about a month.

What actually happens is people do the minimum to tick the box and route around
it everywhere else. And you lose the ability to find out whether the tooling is
any good, because the feedback you get is now about the mandate instead of the
tool. The sceptics stop giving you real information, which is exactly the
information you needed most.

The deeper problem is that the objections are often right, and a mandate stops
you hearing them. Someone saying "this produces code nobody understands" is
describing a real risk (see
[code ownership when agents write code](/handbook/people-and-practice/code-ownership-when-agents-write-code/)).
That's a person doing their job well, and the right response is to take it
seriously.

## Start with something optional

[Code review](/handbook/ai-assisted-development/ai-code-review-unity/) was the
first thing here, because it changes nothing about how anyone works. It leaves
comments on a pull request. Read them or ignore them, there's no consequence
either way.

That does most of the work. Nobody has to adopt anything, so nobody has to take
a position. Over a few weeks people form their own view from what they've
actually seen, and because it's their own view it sticks.

It's also honest about quality in a way that's hard to fake. A reviewer that
produces noise gets ignored and deserves to be. If it stays useful, it's because
it kept being useful, and I can't think of a better argument than that.

## The trap I most want to avoid

Putting someone's name on work they didn't do and can't explain. That damages
the person, and it's entirely the fault of whoever brought the tool in.

That's why review came first and generation came later, and why the
[ticket loop](/handbook/ai-assisted-development/quota-gated-agent-loops/) opens
pull requests from its own account instead of a person's. If an agent wrote it,
the pull request should say so. Then anyone reviewing it is reviewing code and
isn't quietly judging a colleague.

## Where I've got to

It's slower than a mandate and a lot more durable. Some of the team use it every
day, some don't use it at all, and the ones who don't have reasons I can repeat
back to them accurately. That's the thing I actually measure myself against. If
I couldn't do that, I wouldn't be getting honest feedback.
