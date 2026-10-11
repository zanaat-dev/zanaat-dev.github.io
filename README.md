# zanaat.dev

Source of [zanaat.dev](https://zanaat.dev), the home of the [zanaat-dev](https://github.com/zanaat-dev)
organization: the projects, and (soon) one blog for all of them.

Each project keeps its own site on a subdomain, for example [lonca.zanaat.dev](https://lonca.zanaat.dev)
and [baron.zanaat.dev](https://baron.zanaat.dev). The subdomain is set as that repository's Pages custom
domain, with a `CNAME <project> → zanaat-dev.github.io` record on Cloudflare.

## Develop

Astro, static output, pnpm. Node 22.12 or newer.

```
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # dist/
```

English lives at `/`, Turkish at `/tr/`; both render `src/components/Home.astro` with the strings in
`src/lib/i18n.ts`. The board at the top is a small three.js game (`src/scripts/playfield.ts`): every
mark is drawn on one module grid (`src/lib/marks.ts`), and building a project's mark opens it. The
page reads fine without it: the game loads after first paint, and reduced motion or a browser without
WebGL gets the static marks instead.

## Writing

Posts live in `src/content/posts/` as Markdown, one file per post, in English or Turkish:

```yaml
---
title: Why your coding agent shouldn’t know what ‘Active’ means
description: One sentence for lists, feeds and share cards.
date: 2026-10-14
lang: en            # en | tr
project: baron      # lonca | baron | zanaat
tags: [agents]
status: published   # soon lists it without a page
translation: other-slug   # optional: the same post in the other language
---
```

The file name is the URL: `/blog/<file-name>/`. Each post gets a share image at `/og/<file-name>.png`.
Feeds: `/blog/rss.xml` and `/blog/feed.json`, and per project or tag `/blog/tags/<tag>/rss.xml` and
`/blog/tags/<tag>/feed.json` (Turkish interface under `/tr/blog/`). `/llms.txt` lists the projects
and every published post for agents. Publish here first; syndicate to Medium or dev.to afterwards with
this page as the canonical URL.

## Brand

The marks in `public/brand/` are the real ones and stay single-colour: `zanaat.svg` (the Zanaat
logo), `lonca-*.svg` (copied from `zanaat-dev/lonca/brand`, colour fixed for the dark page) and
`baron.svg` (Baron's mark). The wordmarks are hand-drawn; no typeface stands in for them.

## Deploy

Pushes to `main` build and publish through `.github/workflows/deploy.yml` (GitHub Pages, source:
GitHub Actions).
