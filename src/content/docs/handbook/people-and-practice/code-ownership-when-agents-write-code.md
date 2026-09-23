---
title: "Code ownership when agents write code"
status: working
---

The usual worry about AI-generated code is that it'll be bad. That one's
manageable, because the industry already knows how to deal with bad code. We've
got review, tests, and a lot of experience catching it.

The risk I actually care about is quieter, and it's about the person whose name
is on the code.

## How it happens

A junior developer gets a tool that produces working code. Not perfect, but
working. Early on they read every line, because they're careful and they don't
trust it yet.

It keeps being right. So they read a little less closely. Then they skim. Then
they check it compiles and the tests pass, which is a reasonable thing to do and
takes a fraction of the time.

A few months later someone asks them in a review why they took this approach,
and they can't answer. They're not being dishonest. There just isn't an answer
to give, because they never took an approach. They accepted one.

That moment really hurts them. They've lost standing with colleagues whose
respect they need. They've missed the chance to learn whatever that question was
getting at. And they've learned that the safe move is to avoid being asked,
which is the opposite of how anyone gets good at this.

None of that shows up in code quality metrics. The code was fine.

It's not just juniors either. I've caught myself doing a version of it, and
that's written up in
[What I stopped understanding](/blog/what-i-stopped-understanding).

## Why it's the studio's problem

It'd be easy to call this a discipline failure. I don't think it is. Every
incentive in the loop points toward reading less. It's faster, it's usually
fine, and nobody notices until the moment above.

If you hand someone a tool whose correct use means resisting its most convenient
mode, and you don't build anything around that, you get the obvious outcome.
That's a decision made by whoever introduced the tool.

## What we do about it

**Attribute honestly.** If an agent opened the pull request, the pull request
says so and comes from the agent's account. Nobody's name goes on work they
didn't do. Same principle as in
[adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/).

**Review the code, not the author.** An agent's pull request gets the same
scrutiny as anyone else's and none of the social softening, because there's
nobody there to offend.

**Ask "why this way?" early and often, of everyone.** Not as a trap. If being
asked is normal and constant, nobody drifts far without noticing, and the
question stops feeling like an accusation.

**Be careful what you point it at.** If someone needs to understand a piece of
work deeply to grow, don't hand it to an agent, even when it's exactly the kind
of work an agent does well. Especially then.
