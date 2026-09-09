#!/usr/bin/env node
/*
 * Build guard: every legacy post permalink must still redirect.
 *
 * Posts moved from the site root (/post-name/) to /blog/<slug> during the
 * theme upgrade. Twelve years of inbound links point at the old paths, and a
 * missing redirect is invisible — the new page builds fine, the old URL just
 * 404s for anyone arriving from Google or an old forum thread.
 *
 * So this asserts, for every non-draft post carrying an `originalPath`:
 *   - public/_redirects has a rule for that exact path
 *   - the rule's destination is that post's real /blog/<slug> URL
 *   - the status code is 301, not 302 (a temporary redirect doesn't pass
 *     ranking signals on and invites the old URL to stay canonical)
 *
 * Wired into `npm run build`, so this fails before Astro even starts rather
 * than after a deploy. Run it on its own with `npm run check:redirects`.
 */
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = join(root, 'src/content/blog');
const REDIRECTS = join(root, 'public/_redirects');

/*
 * A deliberately minimal frontmatter read: only three scalar fields are
 * needed and pulling in a YAML dependency for them isn't worth it. If the
 * frontmatter ever grows nested structures this should switch to a parser
 * rather than grow more regexes.
 */
function frontmatterField(source, field) {
  const block = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return undefined;
  const line = block[1].match(new RegExp(`^${field}:\\s*(.+)$`, 'm'));
  return line?.[1].trim().replace(/^["']|["']$/g, '');
}

const files = (await readdir(BLOG_DIR)).filter((f) => /\.mdx?$/.test(f));

const posts = await Promise.all(
  files.map(async (file) => {
    const source = await readFile(join(BLOG_DIR, file), 'utf8');
    return {
      slug: file.replace(/\.mdx?$/, ''),
      originalPath: frontmatterField(source, 'originalPath'),
      draft: frontmatterField(source, 'draft') === 'true',
    };
  })
);

const redirectsFile = await readFile(REDIRECTS, 'utf8');

/** from → { to, status } for every non-comment, non-blank rule. */
const rules = new Map(
  redirectsFile
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split(/\s+/))
    .filter((parts) => parts.length >= 2)
    .map(([from, to, status]) => [from, { to, status: status ?? '302' }])
);

const problems = [];
let checked = 0;

for (const post of posts) {
  if (post.draft || !post.originalPath) continue;
  checked++;

  const expected = `/blog/${post.slug}`;
  const rule = rules.get(post.originalPath);

  if (!rule) {
    problems.push(
      `${post.originalPath} → ${expected}  (no rule in public/_redirects)`
    );
    continue;
  }
  if (rule.to.replace(/\/$/, '') !== expected) {
    problems.push(
      `${post.originalPath} points at ${rule.to}, expected ${expected}`
    );
  }
  if (rule.status !== '301') {
    problems.push(
      `${post.originalPath} uses ${rule.status}; legacy permalinks must be 301`
    );
  }
}

if (problems.length > 0) {
  console.error('\n✗ Legacy permalink redirects are incomplete:\n');
  for (const problem of problems) console.error(`  ${problem}`);
  console.error(
    `\n${problems.length} problem(s). Add the missing rules to public/_redirects.\n`
  );
  process.exit(1);
}

console.log(`✓ ${checked} legacy permalinks redirect to their /blog/ URLs (301).`);
