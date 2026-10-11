import rss from '@astrojs/rss';
import type { Lang } from './i18n';
import { type Post, postPath, publishedPosts, SITE, tagsOf } from './posts';

const titles: Record<Lang, string> = { en: 'Zanaat: writing', tr: 'Zanaat: yazılar' };
const descriptions: Record<Lang, string> = {
  en: 'Notes from a small workshop of open-source developer tools: Lonca, Baron and what comes next.',
  tr: 'Küçük bir açık kaynak geliştirici araçları atölyesinden notlar: Lonca, Baron ve sonrası.',
};

async function postsFor(tag?: string): Promise<Post[]> {
  const posts = await publishedPosts();
  return tag ? posts.filter((p) => tagsOf(p).includes(tag)) : posts;
}

export async function rssFeed(lang: Lang, tag?: string) {
  const posts = await postsFor(tag);
  return rss({
    title: tag ? `${titles[lang]} · ${tag}` : titles[lang],
    description: descriptions[lang],
    // The channel links to the page that lists the same posts.
    site: `${SITE}${lang === 'en' ? '/blog/' : '/tr/blog/'}${tag ? `tags/${tag}/` : ''}`,
    customData: `<language>${lang === 'en' ? 'en' : 'tr'}</language>`,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postPath(p),
      categories: tagsOf(p),
      author: p.data.author,
      customData: `<dc:language>${p.data.lang}</dc:language>`,
    })),
    xmlns: { dc: 'http://purl.org/dc/elements/1.1/' },
  });
}

/** JSON Feed 1.1, the same items as the RSS feed beside it. */
export async function jsonFeed(lang: Lang, tag?: string): Promise<Response> {
  const posts = await postsFor(tag);
  const base = lang === 'en' ? '/blog/' : '/tr/blog/';
  const feedPath = tag ? `${base}tags/${tag}/feed.json` : `${base}feed.json`;
  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: tag ? `${titles[lang]} · ${tag}` : titles[lang],
    description: descriptions[lang],
    home_page_url: `${SITE}${tag ? `${base}tags/${tag}/` : base}`,
    feed_url: `${SITE}${feedPath}`,
    language: lang,
    items: posts.map((p) => ({
      id: `${SITE}${postPath(p)}`,
      url: `${SITE}${postPath(p)}`,
      title: p.data.title,
      summary: p.data.description,
      date_published: p.data.date.toISOString(),
      date_modified: (p.data.updated ?? p.data.date).toISOString(),
      language: p.data.lang,
      tags: tagsOf(p),
      authors: [{ name: p.data.author }],
    })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/feed+json; charset=utf-8' } });
}
