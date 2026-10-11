import { PROJECTS, postPath, publishedPosts, SITE } from '../lib/posts';

// An index for agents (llmstxt.org): what Zanaat is, where each project lives, and the writing.
export async function GET() {
  const posts = await publishedPosts();
  const lines = [
    '# Zanaat',
    '',
    '> A small workshop of open-source developer tools. Each tool keeps its own site; this site presents them and holds one blog for all of them, in English and Turkish.',
    '',
    '## Projects',
    '',
    `- [Lonca](${PROJECTS.lonca.href}): type-safe TypeScript SDKs for Turkish e-commerce marketplaces (Trendyol, Hepsiburada; n11 on the way).`,
    `- [Baron](${PROJECTS.baron.href}): work orchestration for AI coding agents across Azure DevOps, GitHub, Jira and Linear, as a CLI, an MCP server and a Claude Code plugin. Docs index for agents: https://baron.zanaat.dev/llms.txt`,
    '- [Source](https://github.com/zanaat-dev): every repository',
    '',
    '## Writing',
    '',
    ...(posts.length
      ? posts.map((p) => `- [${p.data.title}](${SITE}${postPath(p)}) (${p.data.lang}, ${p.data.project}): ${p.data.description}`)
      : ['- No posts published yet.']),
    '',
    '## Feeds',
    '',
    `- [All posts, RSS](${SITE}/blog/rss.xml) · [JSON Feed](${SITE}/blog/feed.json)`,
    `- Per project: ${SITE}/blog/tags/<project>/rss.xml and /feed.json (for example ${SITE}/blog/tags/lonca/rss.xml)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
