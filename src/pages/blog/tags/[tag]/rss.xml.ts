import type { APIRoute } from 'astro';
import { rssFeed } from '../../../../lib/feeds';
import { allTags } from '../../../../lib/posts';

export async function getStaticPaths() {
  return (await allTags()).map((tag) => ({ params: { tag } }));
}

export const GET: APIRoute = ({ params }) => rssFeed('en', params.tag);
