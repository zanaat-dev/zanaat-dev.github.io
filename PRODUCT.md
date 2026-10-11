# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, static output, deployed to GitHub Pages from this repository (`zanaat-dev/zanaat-dev.github.io`,
custom domain `zanaat.dev`, DNS on Cloudflare). Replaces today's single hand-written `index.html`.
Confirmed with the user on 2026-10-11 as part of the plan to move the site to Astro.

## Users

Three audiences, none ranked above the others (user, 2026-10-11: all three):

- **Readers** who arrive from a post (search, Medium/dev.to syndication, a share). Job: read the
  post, then find the project it is about, and stay in touch (RSS, per-project feeds).
- **Developers looking for tools.** Job: understand what Zanaat makes and get to a project's own
  site, repository or package.
- **Contributors and community.** Job: see how the workshop works and find where to contribute
  (GitHub, each project's contributing guide).

## Product Purpose

zanaat.dev is the home of Zanaat, the umbrella organization over a set of open-source developer
tools. It does two things: it presents the projects, and it hosts one blog for all of them. Posts
are published here first and syndicated afterwards (Medium, dev.to, Hashnode) with a canonical link
back, so search authority and audience accumulate on one domain and each project's reach lifts the
others. Success: posts rank and are read here, readers move from a post to the project it covers,
and the projects are discovered through each other.

## Positioning

A small workshop, not a company page: several focused tools from the same hands, each with its
own site, sharing one place where the work is explained in writing.

## Operating Context

- Projects today: **Lonca** (type-safe TypeScript SDKs for Turkish e-commerce marketplaces:
  Trendyol, Hepsiburada, n11 on the way; docs at lonca.zanaat.dev; npm scope `@lonca`) and
  **Baron** (work orchestration for AI coding agents across Azure DevOps, GitHub, Jira and Linear;
  site at baron.zanaat.dev; npm scope `@zanaat`). More projects may follow.
- Each project keeps its own subdomain site; zanaat.dev links to them and does not duplicate
  their docs.
- Project sites list their own posts from zanaat.dev through per-tag feeds. Promised URLs:
  `https://zanaat.dev/blog/tags/<tag>/rss.xml` plus a JSON feed beside it (lonca.zanaat.dev will
  consume the `lonca` feed).
- A Turkish Lonca article ("Trendyol API'sini TypeScript ile 30 dakikada") is planned for the week
  of 2026-10-20.
- Contact: hello@zanaat.dev. Code: github.com/zanaat-dev.

## Capabilities and Constraints

- **Fully bilingual site**: interface and pages in English and Turkish (Turkish under `/tr/`).
  Each post is written in one language and carries a `lang` field; a post may later gain a
  translation, which links to its counterpart.
- Blog: posts tagged per project, per-tag RSS and JSON feeds, canonical URLs, Open Graph images
  per post, an `llms.txt` index for agents, a sitemap.
- Static only: no server, no third-party runtime requests, no tracking scripts unless the user
  decides otherwise.
- **Signature interaction (user, 2026-10-11, replacing the "Build the mark" game the same day):
  one crafted object the visitor can turn.** The hero holds a single 3D object made from the marks'
  module grammar (the Zanaat Z built from cube modules of mixed dark materials, lit by one beam);
  the visitor drags to rotate it. No game, no move counter. Content (headline, projects, posts)
  never waits on it: it renders first, readable without it, and the 3D scene loads after first
  paint, with a static image fallback for reduced motion, no WebGL or weak devices.
- Undecided: a newsletter (none exists; do not show a signup until one does), comments (none).

## Brand Commitments

- Name: **Zanaat** (Turkish for craft). Voice: a small workshop speaking as "we"; posts are signed
  by their author. Plain, specific, developer to developer.
- Existing lines: "A small workshop of open-source developer tools." / "Açık kaynak geliştirici
  araçları atölyesi."
- Zanaat needs its own identity. It must not reuse Lonca's brand (the assets in
  `zanaat-dev/.github/brand/` belong to Lonca) and must not reuse Baron's landing world (dark warm
  grey, amber, Funnel Sans / Geist Mono), though it may sit comfortably beside both.
- **The marks are real and binding** (user, 2026-10-11): Zanaat's logo is the user's file
  (`.impeccable/brand/zanaat.svg`, from `Downloads/zanaat.svg`: a modular "Z" plus the lowercase
  wordmark "zanaat"); Lonca's is in `zanaat-dev/lonca/brand` (icon, wordmark, logomark). Never draw
  or generate a substitute.
- The wordmarks "zanaat" and "lonca" are hand-drawn, not set in a font (user, 2026-10-11): they
  ship only as the SVG files, and no typeface claims to be "the wordmark font".
- **One mark grammar**: square modules on a grid, a halving cascade at two opposite corners (a
  half-module square, then a quarter-module "registration pixel"), Zanaat's Z adding a 45° diagonal.
  Marks are flat and single-colour: no shadows, glows or borders (Lonca's brand rule).
- **Baron's mark** did not exist; the user chose candidate A on 2026-10-11, drawn in the same grammar
  (a square modular "B" whose top-right corner is chamfered at 45° like the Z):
  `.impeccable/brand/baron-a.svg`. It is new and also belongs on baron.zanaat.dev, its README and
  package pages (follow-up in the Baron repo).
- **Colour**: marks stay single-colour; each project carries its own accent where it appears
  (Lonca `#0a87b9` from its docs site, Baron `#e8a13a` from its landing); Zanaat itself is
  black and white.
- Zanaat brand assets go under `zanaat-dev/.github/brand/zanaat/`; coordinate with the Lonca
  maintainer session before restructuring `brand/`.
- The user's own employer and its products are not named (carried over from the Baron brief).
- **Standing preference (user, 2026-10-11): the developer-tool canon, played straight.** The whole
  site (home and blog) follows the way resend.com is designed: deep black, one lit 3D object, an
  elegant serif display headline, quiet grotesk text, refined pills, buttons and micro-details.
  Quality bar: Resend and Raycast (finish level, not composition). Chosen over the bespoke
  directions on purpose; execute it without irony or smuggled quirk.

## Evidence on Hand

- Published packages: Lonca on npm (`@lonca/*`, e.g. core 1.1.0, trendyol 1.2.2, hepsiburada
  1.2.1); Baron on npm (`@zanaat/baron-*`) and in the official MCP Registry
  (`io.github.zanaat-dev/baron`).
- Live sites: lonca.zanaat.dev, baron.zanaat.dev.
- Open-source repositories under github.com/zanaat-dev.
- Absent, never to be fabricated: customers, logos, testimonials, download or star counts, team
  photos, press.

## Product Principles

1. Writing is the front door: a post is a complete experience and always leads to the project it
   covers.
2. Every project keeps its own site; zanaat.dev connects them and never competes with them.
3. Two languages are equal citizens, not a translation layer bolted on.
4. Show real work only: real code, real packages, real posts.

## Accessibility & Inclusion

WCAG 2.2 AA: text contrast 4.5:1 or better, full keyboard use, reduced motion respected, correct
`lang` attributes per page and per post.
