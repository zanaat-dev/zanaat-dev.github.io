# zanaat.dev

Source of [zanaat.dev](https://zanaat.dev), the landing page of the
[zanaat-dev](https://github.com/zanaat-dev) organization.

This repository is the organization's GitHub Pages site and holds the
`zanaat.dev` custom domain. Each project publishes its own site on a subdomain,
for example [lonca.zanaat.dev](https://lonca.zanaat.dev) (and later
`baron.zanaat.dev`). The subdomain is set as that repository's Pages custom
domain, with a `CNAME <project> → zanaat-dev.github.io` record on Cloudflare.

Plain static HTML with no build step. Edit `index.html` and push to `main`.
