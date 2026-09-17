// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Canonical host: bare https, no www. See docs/REDIRECTS.md for why —
// the old WordPress site self-referenced http://www.strichnet.com.
const SITE = 'https://strichnet.com';

export default defineConfig({
  site: SITE,
  integrations: [
    starlight({
      title: 'Debrief',
      description:
        'Practical AI infrastructure and game-repo engineering notes from Scott Richmond — what breaks when you run coding agents against a real Unity codebase, what it costs, and how a small studio adopts it without a mandate.',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/strich' }],
      editLink: {
        baseUrl: 'https://github.com/strich/debrief/edit/master/',
      },
      lastUpdated: true,
      pagination: true,
      // Starlight ships its own /404 rendered in the docs layout. The site
      // has one at src/pages/404.astro instead, which uses the shared shell
      // and points a lost reader at the blog archive as well as the
      // handbook — most 404s here will be stale links to the 17 old
      // WordPress post URLs, not to handbook pages. Two routes claiming
      // /404 is currently an Astro warning and a hard error in a future
      // version, so Starlight's is switched off rather than left to race.
      disable404Route: true,
      // Everforest: a green-toned pair that matches the site's own
      // accent color, applies to code blocks in the blog too (Expressive
      // Code, bundled with Starlight, hooks into Astro's markdown
      // pipeline site-wide, not just the docs collection).
      expressiveCode: {
        themes: ['everforest-light', 'everforest-dark'],
      },
      // The handbook lives one level deep at src/content/docs/handbook/,
      // which is what makes it serve at /handbook/... without touching
      // Astro's `base` option (that option is project-wide and would also
      // push the blog under /handbook/blog).
      sidebar: [
        {
          label: 'Start here',
          items: [{ autogenerate: { directory: 'handbook/start-here' } }],
        },
        {
          label: '1 · Version control at game-repo scale',
          items: [{ autogenerate: { directory: 'handbook/version-control' } }],
        },
        {
          label: '2 · The Unity toolchain',
          items: [{ autogenerate: { directory: 'handbook/unity-toolchain' } }],
        },
        {
          label: '3 · AI-assisted development',
          items: [{ autogenerate: { directory: 'handbook/ai-assisted-development' } }],
        },
        {
          label: '4 · AI cost discipline',
          items: [{ autogenerate: { directory: 'handbook/ai-cost-discipline' } }],
        },
        {
          label: '5 · CI and build infrastructure',
          items: [{ autogenerate: { directory: 'handbook/ci-build-infrastructure' } }],
        },
        {
          label: '6 · People and practice',
          items: [{ autogenerate: { directory: 'handbook/people-and-practice' } }],
        },
      ],
      customCss: ['./src/styles/starlight.css'],
      // Three low-level component overrides, which is all it takes to make
      // the handbook read as part of the same site:
      //   SiteTitle — the wordmark, matched to src/components/SiteHeader
      //   PageTitle — adds the stub/working/settled maturity badge
      //   Footer    — keeps Starlight's edit link, last-updated and
      //               pagination, then appends the shared site footer
      // Starlight's own docs warn against overriding the high-level layout
      // components (PageFrame, TwoColumnContent) and we deliberately don't:
      // the handbook's three-column layout, sidebar and search are all stock.
      components: {
        SiteTitle: './src/components/starlight/SiteTitle.astro',
        PageTitle: './src/components/starlight/PageTitle.astro',
        Footer: './src/components/starlight/Footer.astro',
      },
    }),
    mdx(),
    sitemap(),
  ],
});
