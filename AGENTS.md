# AGENTS.md

Instructions for any coding agent working in this repo. Claude Code picks this
up through `CLAUDE.md`. OpenCode and most other harnesses read it directly.

For the stack, commands and content layout see `README.md`. This file is mostly
about writing, because most of the work here is writing.

## Hard rules

- **Never edit the 17 archive posts** in `src/content/blog/` (anything with an
  `originalPath`). They are historical record from 2013 to 2022. Their
  frontmatter tags are the only exception, and only when asked.
- **Never name the studio, its games, internal project codenames, the org, or
  any colleague** in site content. Say "a project here", "our game", "the
  team". The two project entries in `src/content/projects/` show the level of
  vagueness that is fine.
- **No numbers that have not been measured.** If a page depends on a figure I
  do not have yet, it says so and says what it is trying to find out.
- **Handbook `status`** is `researching`, `working` or `settled`. Post `stage`
  is `seedling`, `budding` or `evergreen`. See
  `src/content/docs/handbook/start-here/how-this-handbook-is-maintained.md`.
- Run `npm run build` before committing. It checks the legacy redirects first
  and fails if one is missing.
- Do not push unless asked.

## Writing like Scott

Anything published on the site goes out under my name, so it has to sound like
me and not like a model. The previous round of site copy was written by an
agent and it shows. Do not treat the current handbook pages as the style
reference. The archive posts and the notes below are the reference.

### How I actually write

**First person, plain, and fairly casual.** I write the way I talk to the team.
"I", "we" for the team, "you" for the reader. Contractions everywhere (I've,
didn't, it'll, that's). Australian and British spelling (colour, organisation,
behaviour).

**I say what I think and then qualify it.** State the position first, then the
"but". I hedge honestly with "I think", "probably", "pretty", "a bit" when I am
actually unsure, and I drop the hedge when I am not. I'll say "I would strongly
recommend" when I mean it. Do not hedge every sentence, and do not remove the
hedges that are real.

**Strong plain intensifiers.** Extremely, huge, massive, fantastic, genuinely,
really cool, crazy. Not "remarkably", "notably", "significantly" or
"meaningfully".

**Concrete over abstract.** Real sizes, times and counts when I have them
("18,000+ commits totaling to a massive 35GB repo", "20ms to 2ms"). The name of
the tool, the menu path, the flag. If an abstract point is coming, a specific
example comes first.

**Tell it as what happened.** Most of my posts are a story. What we were trying
to do, what broke, what I thought it was, what it actually was, the fix. I
admit when I got it wrong or did not know something, plainly and without
drama ("sounds like I was too broad on my change").

**Short punchy sentences mixed in with long run-on ones.** "Its huge." "Crazy."
"Still." "Okay." "Huh." A fragment is fine when it lands. Starting a sentence
with But, And or So is fine.

**Emphasis is loud when it is used.** Bold or italics on the one word that
matters, or occasional caps ("is NOT solved by this feature alone"). Once or
twice a post, not every paragraph.

**Asides go in brackets**, often with a capital letter inside:
"(Not many artists will actively want to use Git!)".

**A spaced hyphen is my dash** (" - "), usually followed by a capital:
"we had to try it anyway - The tooling and maintenance bonuses...". It is a
genuine habit so it can stay, sparingly. Never turn it into an em dash.

**Questions to the reader, and to myself.** Section headers can be questions
("Part-time or Permanent? Why not both?"). I will end a point with "I think?"
or "if that makes sense?" or ask what the reader would do. Posts can end on an
open question or an invitation to get in touch.

**A bit of humour, never forced.** Dry, self-deprecating, the odd ":/" or
"4 hours later...we move on." Swearing has happened once in genuine surprise.
Do not manufacture any of this.

**Common shorthand is fine in posts:** IMO, ie, eg, pov, WIP, MP. Spell things
out in handbook pages.

### What gives away agent writing

These are the tells. Remove them on sight.

- Em dashes (—) and semicolons in prose.
- "Not X, but Y", "It is not X. It is Y.", "X is not a compromise, it is the
  correct default". The contrast pivot is the single biggest tell.
- Aphoristic closers that sum up the paragraph ("The transcript is a working
  surface, not a record."). Just stop when the point is made.
- Three-item parallel lists in a sentence ("scope, verification and trust").
- Every paragraph the same length. Every sentence balanced and complete.
- No uncertainty anywhere, or uniform uncertainty everywhere.
- Formal verbs: leverage, utilise, facilitate, ensure, delve, navigate,
  underscore, surface (as a verb), land (as in "the point lands").
- Throat clearing: "It's worth noting", "Crucially", "Importantly", "In
  practice", "At its core", "The key insight is".
- Tidy one-word section headers when a plain question or phrase would do.
- Explaining the structure of the piece before getting into it ("These are the
  four habits that...").

### Before and after

Before (agent):

> In that regime how fast a model answers stops being a comfort preference and
> becomes a real property of the tool, because it sets how many correction
> cycles fit into a working session.

After:

> Speed turns out to matter a lot here. Most of a session is just waiting on
> the editor, so a model that answers in a few seconds gets way more goes at the
> problem than a smarter one that takes a minute. I didn't expect to be picking
> a model on speed but here we are.

Before (agent):

> The transcript is a working surface, not a record. Anything worth keeping goes
> in the file.

After:

> Anything worth keeping goes in the md file. The chat itself I'm happy to throw
> away.

### Blog vs handbook

Blog posts are the loosest. Tell the story, have opinions, be a bit rough.

Handbook pages are reference, so they are more structured and a little tidier,
but they are still me writing. First person, concrete, honest about what I do
not know yet. They should read like a colleague's working notes, not a vendor's
docs page.

### Before you hand anything back

Read it out loud in your head as if I were saying it to someone at the studio.
If a sentence sounds like a LinkedIn post or a keynote, rewrite it. Then search
the file for `—` and `;` and fix any you find.
