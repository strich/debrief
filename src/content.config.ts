import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { glob } from 'astro/loaders';

export const collections = {
  // Starlight's own docs collection — this is the handbook, nested at
  // src/content/docs/handbook/ so it serves at /handbook/...
  // Extended with a `status` field per the plan's "timely rather than
  // polished" model (Oxide RFD-inspired): stub / working / settled.
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        status: z.enum(['stub', 'working', 'settled']).default('stub'),
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
      // "/tuning-git-for-large-binary-repositories/"), kept for
      // provenance and to sanity-check the redirect map — every one of
      // these should equal the post's live `slug` once migrated.
      originalPath: z.string().optional(),
      // Handbook page(s) this post feeds — rendered as a callout.
      feedsHandbookPage: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
  }),
};
