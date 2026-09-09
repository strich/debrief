// One-time scaffolding script — seeds the handbook skeleton from the
// Debrief Relaunch plan's "six sections, eight pages to write now"
// table. Safe to delete after the initial commit; it's not part of the
// build.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = join(import.meta.dirname, '..', 'src', 'content', 'docs', 'handbook');

const pages = [
  {
    dir: 'start-here',
    slug: 'what-this-is',
    title: 'What this is',
    priority: 'write-now',
    note: "The handbook's front door: what it covers (game-repo infrastructure and AI, together), what it deliberately leaves out, and the one-line test for what belongs here versus in a post (\"if editing it later would be a lie, it's a post; if not editing it later would be a lie, it's a handbook page\").",
  },
  {
    dir: 'start-here',
    slug: 'how-this-handbook-is-maintained',
    title: 'How this handbook is maintained',
    priority: 'write-now',
    note: 'The status-badge model (stub / working / settled, borrowed from Oxide\'s RFD states), the lastUpdated signal, and the rule that only things actively practised get a page — staleness is the #1 documented killer of this format.',
  },
  {
    dir: 'version-control',
    slug: 'git-for-game-projects-what-breaks',
    title: 'Git for game projects: what breaks',
    priority: 'write-now',
    note: 'Port from the 2013–2018 back catalogue ("Using Git with 3D Games", "Tuning Git for large binary repositories") once the WordPress export lands — this is the direct ancestor of the parallel-agents-and-worktrees problem.',
  },
  {
    dir: 'version-control',
    slug: 'git-lfs-in-practice',
    title: 'Git LFS in practice',
    priority: 'write-now',
    note: 'Port from "Migrating your project to Git LFS" (2017) once migrated.',
  },
  {
    dir: 'version-control',
    slug: 'unity-serialization',
    title: 'Unity serialization: .meta, GUIDs, YAML and merge',
    priority: 'write-now',
    note: 'New material. Explains why diff-scoped code review breaks on Unity YAML and .meta GUIDs — this is the reasoning behind the flagship AI-code-review handbook page.',
  },
  {
    dir: 'version-control',
    slug: 'repo-hygiene-and-layout',
    title: 'Repo hygiene and layout',
    priority: 'stub',
  },
  {
    dir: 'version-control',
    slug: 'perforce-comparison-honestly',
    title: 'Perforce comparison, honestly',
    priority: 'stub',
  },
  {
    dir: 'unity-toolchain',
    slug: 'the-unity-cli',
    title: 'The Unity CLI',
    priority: 'write-now',
    note: 'Time-sensitive — shipped 20 July 2026 and is still under-documented. Field notes on domain-reload token invalidation, focus requirements, modal dialogs, and per-call latency at real-repo scale.',
  },
  {
    dir: 'unity-toolchain',
    slug: 'headless-builds-and-batchmode',
    title: 'Headless builds and batchmode',
    priority: 'stub',
  },
  {
    dir: 'unity-toolchain',
    slug: 'project-and-package-layout',
    title: 'Project and package layout',
    priority: 'stub',
  },
  {
    dir: 'ai-assisted-development',
    slug: 'ai-code-review-unity',
    title: 'AI code review: what works and what fails on Unity',
    priority: 'write-now',
    note: "The flagship page — diff-scoped review failing on Unity YAML and .meta GUIDs. Concrete, verifiable, currently undocumented anywhere else. Strip attribution to anyone else's specific tooling comparisons before publishing.",
  },
  {
    dir: 'ai-assisted-development',
    slug: 'autonomous-agents-large-unity-codebase',
    title: 'Autonomous agents on a large Unity codebase',
    priority: 'write-now',
    note: 'Why worktrees fail when game assets live in the repo (copying tens of GB of LFS assets kills them), what the Unity CLI changes, and the practical ceiling being attention rather than compute.',
  },
  {
    dir: 'ai-assisted-development',
    slug: 'quota-gated-agent-loops',
    title: 'Quota-gated agent loops',
    priority: 'write-now',
    note: 'The OpenCode/Linear loop as a worked example of gating iterations on remaining quota in a rolling subscription window.',
  },
  {
    dir: 'ai-assisted-development',
    slug: 'context-for-a-unity-repo',
    title: 'Context for a Unity repo',
    priority: 'stub',
  },
  {
    dir: 'ai-assisted-development',
    slug: 'sentry-ticket-pr-triage',
    title: 'Sentry → ticket → PR triage',
    priority: 'stub',
  },
  {
    dir: 'ai-cost-discipline',
    slug: 'byo-keys-vs-per-seat-saas',
    title: 'BYO keys vs per-seat SaaS',
    priority: 'write-now',
    note: 'The concrete argument for bring-your-own-key routing (e.g. OpenRouter\'s no-markup, high BYOK allowance) against per-seat SaaS pricing, grounded in real quotes rather than vendor claims.',
  },
  {
    dir: 'ai-cost-discipline',
    slug: 'prompt-cache-economics',
    title: 'Prompt cache economics',
    priority: 'stub',
    note: 'Anchor on the instrumented finding that cache reads can dominate spend (47% in one documented 24-hour session) — re-reading context costs more than generating code.',
  },
  {
    dir: 'ai-cost-discipline',
    slug: 'model-routing',
    title: 'Model routing',
    priority: 'stub',
  },
  {
    dir: 'ai-cost-discipline',
    slug: 'cost-per-merged-pr',
    title: 'Cost per merged PR',
    priority: 'stub',
  },
  {
    dir: 'ci-build-infrastructure',
    slug: 'build-farm-shape',
    title: 'Build farm shape',
    priority: 'stub',
    note: 'Leave stubbed until this is actually being rebuilt — otherwise it goes stale before launch.',
  },
  {
    dir: 'ci-build-infrastructure',
    slug: 'caching-that-helps',
    title: 'Caching that helps',
    priority: 'stub',
  },
  {
    dir: 'ci-build-infrastructure',
    slug: 'artifacts-and-distribution',
    title: 'Artifacts and distribution',
    priority: 'stub',
  },
  {
    dir: 'people-and-practice',
    slug: 'adopting-ai-tooling-with-sceptical-engineers',
    title: 'Adopting AI tooling with sceptical engineers',
    priority: 'write-now',
    note: 'The differentiator — how a small studio adopts AI tooling when much of the code team is against it and there is no ML team to hide behind. Code review as a deliberate first step because it is optional; the authorship trap. Write from your own stated position only, no attributed quotes from colleagues.',
  },
  {
    dir: 'people-and-practice',
    slug: 'code-ownership-when-agents-write-code',
    title: 'Code ownership when agents write code',
    priority: 'write-now',
    note: 'The junior-developer slippery-slope argument: not that AI writes bad code, but that a junior stops reading it, can\'t explain it when asked, and loses their colleagues\' respect.',
  },
  {
    dir: 'people-and-practice',
    slug: 'review-culture',
    title: 'Review culture',
    priority: 'stub',
  },
];

function frontmatter(title, note) {
  const lines = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    'status: stub',
    '---',
    '',
  ];
  if (note) {
    lines.push(
      `:::note[Scaffolding note — remove once this page has real content]`,
      note,
      ':::',
      ''
    );
  }
  lines.push('_Nothing written here yet._');
  return lines.join('\n') + '\n';
}

for (const page of pages) {
  const dir = join(root, page.dir);
  await mkdir(dir, { recursive: true });
  const file = join(dir, `${page.slug}.md`);
  await writeFile(file, frontmatter(page.title, page.note), 'utf8');
}

// Handbook landing page (serves /handbook/).
await mkdir(root, { recursive: true });
await writeFile(
  join(root, 'index.md'),
  frontmatter(
    'The Debrief Handbook',
    'Short landing page: what the handbook is, the six sections below, and a pointer to "What this is" for the full framing. See the "Start here" section for the actual introduction.'
  ),
  'utf8'
);

console.log(`Seeded ${pages.length + 1} handbook pages.`);
