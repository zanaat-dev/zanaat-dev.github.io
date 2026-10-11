import type { APIRoute } from 'astro';
import { ogImage } from '../../lib/og';
import { type Post, PROJECTS, publishedPosts } from '../../lib/posts';

export async function getStaticPaths() {
  return (await publishedPosts()).map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Post };
  const project = PROJECTS[post.data.project];
  return ogImage({ title: post.data.title, description: post.data.description, mark: project.mark, label: project.name });
};
