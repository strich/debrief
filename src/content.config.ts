import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { file, glob } from 'astro/loaders';

export const collections = {
  // Starlight's own docs collection — this is the handbook, nested at
  // src/content/docs/handbook/ so it serves at /handbook/...
  // Extended with a `status` field per the plan's "timely rather than
  // polished" model (Oxide RFD-inspired): researching / working / settled.
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        status: z.enum(['researching', 'working', 'settled']).default('researching'),
        // Optional link forward to the handbook page a post fed into,
        // or back to the post a page grew out of — bidirectional
        // provenance links per the plan.
        relatedPosts: z.array(z.string()).optional(),
      }),
    }),
  }),

  // The blog. Narrative field reports — time-bound by nature, never
  // edited after publication (per the plan's one-line test).
  blog: defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      // Exact original WordPress permalink path (e.g.
      // "/tuning-git-for-large-binary-repositories/"). Now load-bearing
      // rather than just provenance: posts moved to /blog/<slug>, and
      // scripts/check-redirects.mjs asserts that every one of these paths
      // has a 301 in public/_redirects.
      originalPath: z.string().optional(),
      // Handbook page(s) this post feeds — rendered as a callout.
      feedsHandbookPage: z.array(z.string()).optional(),
      // Maturity, shown as a badge. Shares one visual scale with the
      // handbook's `status` (see src/types.ts) so "evergreen" and
      // "settled" read as the same signal. Optional: the 2013-2022
      // archive posts are dated field reports, not living documents.
      stage: z.enum(['seedling', 'budding', 'evergreen']).optional(),
      draft: z.boolean().default(false),
    }),
  }),

  // Tooling and infrastructure work, in place of the theme's academic
  // "projects". Cards on /projects, detail pages at /projects/<id>.
  projects: defineCollection({
    loader: glob({ pattern: '**/!(README).md', base: './src/content/projects' }),
    schema: z
      .object({
        title: z.string().max(75),
        description: z.string().max(200),
        // Shown first on /projects and on the home page.
        selected: z.boolean().default(false),
        // YYYY-MM is enough; nothing here needs a day.
        fromDate: z.coerce.date(),
        toDate: z.coerce.date().optional(),
        status: z.enum(['active', 'shipped', 'paused', 'archived']).default('active'),
        // Filter facets. `types` is the shape of the thing, `stack` is what
        // it's built with — kept separate so the two chip rows stay
        // semantically independent.
        types: z
          .array(z.enum(['tool', 'infrastructure', 'integration', 'experiment', 'open-source']))
          .default([]),
        stack: z.array(z.string()).default([]),
        code: z.string().url().optional(),
        url: z.string().url().optional(),
        // Handbook page(s) this work is written up in.
        handbookPages: z.array(z.string()).optional(),
      })
      .refine((data) => !data.toDate || data.toDate >= data.fromDate, {
        message: 'toDate must be on or after fromDate',
      }),
  }),

  // Short dated entries: the /now page and the home page's timeline.
  updates: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
    schema: z.object({
      date: z.coerce.date(),
      // One line, shown inline in the timeline. The body carries any detail.
      summary: z.string().max(160),
      link: z.string().optional(),
      linkLabel: z.string().optional(),
    }),
  }),

  // The /uses page. A single JSON file rather than a page full of hard-coded
  // markup (which is how the theme does it) so the stack can be updated
  // without touching a component.
  uses: defineCollection({
    loader: file('./src/content/uses.json', { parser: (text) => JSON.parse(text).groups }),
    schema: z.object({
      id: z.string(),
      name: z.string(),
      note: z.string().optional(),
      items: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          href: z.string().url().optional(),
          tags: z
            .array(z.enum(['free', 'paid', 'open-source', 'self-hosted', 'favourite']))
            .default([]),
        })
      ),
    }),
  }),
};
