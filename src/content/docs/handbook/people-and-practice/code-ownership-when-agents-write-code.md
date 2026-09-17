---
title: "Code ownership when agents write code"
status: working
---

The usual worry about AI-generated code is that it will be bad. That worry is
manageable, because bad code is a problem the industry already knows how to
handle. We have review, tests, and a great deal of experience catching it.

The risk I actually care about is different and much quieter. It is not that the
code is wrong. It is what happens to the person whose name is on it.

## The slippery slope, stated precisely

A junior developer is given a tool that produces working code. Not perfect, but
working. Early on they read every line, because they are careful and because
they do not yet trust it.

It keeps being right. So they read a little less closely. Then they skim. Then
they check that it compiles and the tests pass, which is a reasonable thing to
do and takes a fraction of the time.

Some months later somebody asks them in a review why they took this approach,
and they cannot answer. Not because they are dishonest, but because there is no
answer to give. They did not take an approach. They accepted one.

That moment is genuinely damaging, and it is worth being precise about the
damage. They have lost standing with colleagues whose respect they need. They
have lost the chance to learn the thing that question was probing. And they have
learned that the safe move is to avoid situations where they might be asked,
which is the opposite of how anyone becomes good at this.

None of that shows up in code quality metrics. The code was fine.

## Why this is the studio's problem, not theirs

It would be easy to frame this as a discipline failure. It is not. Every
incentive in the loop points toward reading less. It is faster, it is usually
fine, and nobody notices until the moment described above.

If you hand someone a tool whose correct use requires resisting its most
convenient mode, and you do not build anything around that, the predictable
outcome is the predictable outcome. That is a decision made by whoever
introduced the tool.

## What follows in practice

Attribute honestly. If an agent opened the pull request, the pull request says
so and comes from the agent's identity. Nobody's name goes on work they did not
do, which is the same principle as the authorship trap in
[adopting AI tooling with sceptical engineers](/handbook/people-and-practice/adopting-ai-tooling-with-sceptical-engineers/).

Review the code, not the author. An agent's pull request should get the same
scrutiny as anyone else's and none of the social softening, because there is no
one there to offend.

Ask the explaining question early and often, of everyone. Not as a trap. If
being asked why you did it this way is normal and constant, then nobody can
drift far without noticing, and the question stops being an accusation.

Be careful what you point it at. Work that someone needs to understand deeply in
order to grow is not work to hand to an agent, even when it is exactly the sort
of work an agent does well. Especially then.
