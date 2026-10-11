import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One collection for every project's writing. A post is written in one language; a translation is
// its own entry that names the other through `translation`. `soon` lists a post before it exists,
// without a page, so the home and the index can announce it honestly.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    lang: z.enum(['en', 'tr']),
    project: z.enum(['lonca', 'baron', 'zanaat']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Zanaat'),
    status: z.enum(['published', 'soon']).default('published'),
    translation: z.string().optional(),
  }),
});

export const collections = { posts };
