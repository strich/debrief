---
title: "Adopting AI tooling with sceptical engineers"
status: working
---

Most writing about adopting AI tooling assumes the team wants it. In a game
studio that is frequently not the case, and the objections are not ignorance.
They come from people who have watched the industry enthusiastically adopt
things that made their working lives worse, and who have specific professional
reasons to be wary of this one.

There is also no ML team to hide behind. It is me, a codebase, and colleagues
who will tell me directly if this is a waste of everyone's time.

## Why a mandate does not work

You could require it. It would appear to work for about a month.

What actually happens is that people do the minimum to satisfy the requirement
and route around it everywhere else, and you lose the ability to find out
whether the tooling is any good, because the feedback you get is now about the
mandate rather than about the tool. The sceptics stop giving you real
information, which is exactly the information you needed most.

The deeper problem is that the objections are often correct and a mandate
prevents you hearing them. Someone saying this produces code nobody understands
is describing a real risk, covered in
[code ownership when agents write code](/handbook/people-and-practice/code-ownership-when-agents-write-code/).
That is a person doing their job well, and the right response is to take it
seriously rather than to override it.

## Start with something optional

[Code review](/handbook/ai-assisted-development/ai-code-review-unity/) was the
first thing here, and the reason is that it changes nothing about how anyone
works. It leaves comments on a pull request. You can read them or ignore them,
and ignoring them has no consequence.

That property does most of the work. Nobody has to adopt anything, so nobody has
to take a position. Over a few weeks people form their own view from evidence
rather than from a policy, and the view they form is their own, which means it
sticks.

It is also honest about quality in a way that is hard to fake. A reviewer that
produces noise gets ignored and deserves to be. If it stays useful, that is
because it kept being useful, and there is no better argument available.

## The thing to avoid

The failure I most want to avoid is the authorship trap. Tooling that puts
someone's name on work they did not do and cannot explain damages that person,
and it is entirely the fault of whoever introduced it.

This is why review came first and generation came later, and why the
[ticket loop](/handbook/ai-assisted-development/quota-gated-agent-loops/) opens
pull requests from its own identity rather than from a person's. If an agent
wrote it, the pull request should say so. Anyone reviewing it is then reviewing
code, not quietly assessing a colleague.

## Where I have got to

Slower than a mandate and considerably more durable. Some of the team use it
daily, some do not use it at all, and the ones who do not have reasons I can
state back to them accurately. That last part is the measure I actually care
about. If I could not, I would not be getting honest feedback.
