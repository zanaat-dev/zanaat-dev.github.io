import { type CollectionEntry, getCollection } from 'astro:content';
import type { Lang } from './i18n';

export type Post = CollectionEntry<'posts'>;
export type ProjectId = Post['data']['project'];

export const SITE = 'https://zanaat.dev';

export const PROJECTS: Record<ProjectId, { name: string; mark: string; href: string }> = {
  lonca: { name: 'Lonca', mark: '/brand/lonca-icon.svg', href: 'https://lonca.zanaat.dev/' },
  baron: { name: 'Baron', mark: '/brand/baron.svg', href: 'https://baron.zanaat.dev/' },
  zanaat: { name: 'Zanaat', mark: '/brand/zanaat-mark.svg', href: 'https://github.com/zanaat-dev' },
};

const newestFirst = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

/** Every entry, announced ones included, newest first. */
export async function allPosts(): Promise<Post[]> {
  return (await getCollection('posts')).sort(newestFirst);
}

/** Only the posts that have a page. */
export async function publishedPosts(): Promise<Post[]> {
  return (await allPosts()).filter((p) => p.data.status === 'published');
}

export const isPublished = (p: Post) => p.data.status === 'published';
export const postPath = (p: Post) => `/blog/${p.id}/`;

/** A post is filed under its project and its own tags; project names double as tags. */
export const tagsOf = (p: Post): string[] => [...new Set([p.data.project, ...p.data.tags])];

export async function allTags(): Promise<string[]> {
  const tags = new Set<string>(Object.keys(PROJECTS));
  for (const p of await allPosts()) for (const t of tagsOf(p)) tags.add(t);
  return [...tags].sort();
}

export const blogHome = (lang: Lang) => (lang === 'en' ? '/blog/' : '/tr/blog/');
export const tagPath = (lang: Lang, tag: string) => `${blogHome(lang)}tags/${tag}/`;

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
