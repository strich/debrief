/*
 * One place for the site's identity, navigation and footer.
 *
 * Borrowed from Myscholar's `site.config.ts` convention: text that appears in
 * more than one place lives here rather than being retyped into each layout.
 * Starlight's own title/description still come from astro.config.mjs (the
 * integration needs them at config time), so the two are deliberately kept in
 * agreement — if you change the tagline, change it in both.
 */

export interface NavLink {
  href: string;
  label: string;
}

export const SITE = {
  title: 'Debrief',
  /** Used as the <title> suffix and the default meta description source. */
  tagline: 'Abstractions and notes on AI infrastructure for small game studios.',
  description:
    'Practical AI infrastructure and game-repo engineering notes from Scott Richmond — what breaks when you run coding agents against a real Unity codebase, what it costs, and how a small studio adopts it without a mandate.',
  href: 'https://strichnet.com',
  author: 'Scott Richmond',
  locale: 'en-AU',
  /** Posts per page on the /blog index. */
  postsPerPage: 10,
  /** Home page section sizes. Set any to 0 to hide that section. */
  home: {
    recentPostCount: 4,
    updateCount: 3,
    projectCount: 3,
  },
} as const;

export const PROFILE = {
  name: 'Scott Richmond',
  role: 'Game developer · studio infrastructure',
  /**
   * The framing rule for everything public-facing: a developer using AI to
   * improve process, tooling and velocity — not "AI is making this game".
   */
  bio: "I build and run the infrastructure a small game studio needs to use AI seriously — coding agents against a real Unity codebase, the CI and version control underneath them, and what it all costs. I write up what actually broke.",
  location: 'Australia',
  links: {
    github: 'https://github.com/strich',
    website: 'https://strichnet.com',
  },
} as const;

/*
 * The handbook is still scaffolding — 26 pages, every one of them `status:
 * stub` — so it is deliberately not linked or indexed anywhere public yet.
 * The routes still build and /handbook/ still resolves, so nothing 404s and
 * any link already shared keeps working; it just isn't discoverable.
 *
 * Flip this to `true` to bring it back. It gates the nav entry below and the
 * "written up in the handbook" callouts on project and post pages. Three
 * things are NOT driven by this flag and have to be undone by hand:
 *   - the home page's handbook section (src/pages/index.astro) — deleted
 *     rather than gated, because it also carried the page's framing copy
 *   - the sitemap filter in astro.config.mjs
 *   - `pagefind: false` in the frontmatter of src/content/docs/handbook/**
 * `git revert` of the commit that added this comment restores all of it.
 */
export const HANDBOOK_VISIBLE = false;

export const NAV_LINKS: NavLink[] = [
  ...(HANDBOOK_VISIBLE ? [{ href: '/handbook/', label: 'Handbook' }] : []),
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/uses', label: 'Uses' },
  { href: '/now', label: 'Now' },
];

export const FOOTER = {
  sourceCode: 'https://github.com/strich/debrief',
  license: {
    label: 'CC BY 4.0',
    href: 'https://creativecommons.org/licenses/by/4.0/',
  },
  /**
   * Myscholar is Apache-2.0. The design system in src/styles is derived from
   * it, so the attribution is kept in the footer as well as in NOTICE.
   */
  themeCredit: {
    label: 'My Scholar',
    href: 'https://github.com/mychiffonn/myscholar',
  },
} as const;
