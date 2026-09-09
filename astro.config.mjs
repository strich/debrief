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
        baseUrl: 'https://github.com/strich/debrief/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
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
      customCss: ['./src/styles/custom.css'],
    }),
    mdx(),
    sitemap(),
  ],
});
