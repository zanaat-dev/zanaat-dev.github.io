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

## Brand

The marks in `public/brand/` are the real ones and stay single-colour: `zanaat.svg` (the Zanaat
logo), `lonca-*.svg` (copied from `zanaat-dev/lonca/brand`, colour fixed for the dark page) and
`baron.svg` (Baron's mark). The wordmarks are hand-drawn; no typeface stands in for them.

## Deploy

Pushes to `main` build and publish through `.github/workflows/deploy.yml` (GitHub Pages, source:
GitHub Actions).
