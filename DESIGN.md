---
name: Zanaat
description: A small workshop of open-source developer tools, where one module grid makes every mark.
colors:
  ground: "#0e0f11"
  panel: "#17181a"
  well: "#222326"
  line: "#242527"
  grid-line: "#1c2025"
  turn-line: "#2a2b2e"
  pressed-line: "#6a6b6e"
  ink: "#ecebe7"
  selection-ink: "#fff"
  reading: "#d3d2cd"
  ink-2: "#b4b3ae"
  ink-soft: "#b2b2b0"
  quiet: "#9a9a97"
  muted: "#8a8a87"
  cube-paper: "#e9e6df"
  code-chip: "#1a1b1d"
  code-ink: "#e2e1dc"
  code-ground: "#141517"
  code-fg: "#d8d6d0"
  code-function: "#f0efea"
  code-parameter: "#e3e1db"
  code-constant: "#e6d7b8"
  code-string: "#c5d1b2"
  code-keyword: "#b9c3d6"
  code-punctuation: "#9a9994"
  code-comment: "#8e8d88"
  lonca: "#0a87b9"
  lonca-ink: "#46aee0"
  baron: "#e8a13a"
typography:
  display:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(47.5 * var(--u))"
    fontWeight: 600
    lineHeight: "calc(47 * var(--u))"
    letterSpacing: "0"
  index-title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(56 * var(--u))"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.012em"
  post-headline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(34px, calc(40 * var(--u)), 58px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.012em"
  headline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(40 * var(--u))"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(32 * var(--u))"
    fontWeight: 600
    letterSpacing: "-0.01em"
  post-title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(25.5 * var(--u))"
    fontWeight: 500
    lineHeight: "calc(27 * var(--u))"
    letterSpacing: "0.01em"
  subhead:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(24 * var(--u))"
    fontWeight: 400
  reading:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(17px, calc(15 * var(--u)), 20px)"
    fontWeight: 400
    lineHeight: 1.68
  body:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "calc(16 * var(--u))"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "DM Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "calc(15 * var(--u))"
    fontWeight: 400
  data:
    fontFamily: "DM Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "calc(13.5 * var(--u))"
    fontWeight: 400
  code:
    fontFamily: "DM Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "clamp(13.5px, calc(12 * var(--u)), 15.5px)"
    fontWeight: 400
    lineHeight: 1.6
  readout:
    fontFamily: "DM Mono, ui-monospace, Cascadia Mono, Consolas, monospace"
    fontSize: "calc(15.5 * var(--u))"
    fontWeight: 500
    letterSpacing: "0.01em"
rounded:
  focus: "3px"
  code-inline: "4px"
  control: "calc(7 * var(--u))"
  panel: "calc(8 * var(--u))"
  card: "calc(10 * var(--u))"
  fixed-panel: "8px"
  fixed-card: "10px"
spacing:
  gutter-stage: "calc(50 * var(--u))"
  gutter-section: "calc(57 * var(--u))"
  gutter-mobile: "20px"
  section-gap: "calc(110 * var(--u))"
  row-pad: "calc(36 * var(--u))"
  column-lead: "calc(465 * var(--u))"
  read-top: "calc(70 * var(--u))"
  read-bottom: "calc(120 * var(--u))"
  reading-measure: "68ch"
  aside: "calc(220 * var(--u))"
  aside-gap: "calc(80 * var(--u))"
  index-row-pad: "calc(28 * var(--u))"
  index-side-column: "calc(170 * var(--u))"
components:
  project-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "calc(17 * var(--u)) calc(18 * var(--u))"
    width: "calc(207 * var(--u))"
  card-link-lonca:
    textColor: "{colors.lonca-ink}"
    typography: "{typography.data}"
  card-link-baron:
    textColor: "{colors.baron}"
    typography: "{typography.data}"
  card-link-zanaat:
    textColor: "{colors.ink-2}"
    typography: "{typography.data}"
  game-bar:
    textColor: "{colors.muted}"
    typography: "{typography.readout}"
    rounded: "{rounded.control}"
    height: "calc(50 * var(--u))"
    padding: "0 calc(13 * var(--u))"
  game-bar-phone:
    rounded: "{rounded.fixed-panel}"
    padding: "12px"
  target-button:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.control}"
    width: "calc(37 * var(--u))"
    height: "calc(36 * var(--u))"
  target-button-phone:
    rounded: "{rounded.fixed-panel}"
    width: "40px"
    height: "40px"
  target-button-pressed:
    backgroundColor: "{colors.well}"
  turn-panel:
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "calc(14 * var(--u)) calc(15 * var(--u))"
    width: "calc(204 * var(--u))"
  turn-panel-phone:
    rounded: "{rounded.fixed-panel}"
    padding: "14px 16px"
  project-card-phone:
    rounded: "{rounded.fixed-card}"
    padding: "18px"
  nav-link:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  nav-link-hover:
    textColor: "{colors.ink}"
  footer-link:
    textColor: "{colors.muted}"
    typography: "{typography.data}"
  footer-link-hover:
    textColor: "{colors.ink}"
  prose:
    textColor: "{colors.reading}"
    typography: "{typography.reading}"
    width: "{spacing.reading-measure}"
  inline-code:
    backgroundColor: "{colors.code-chip}"
    textColor: "{colors.code-ink}"
    rounded: "{rounded.code-inline}"
    padding: "0.12em 0.36em"
  code-block:
    backgroundColor: "{colors.code-ground}"
    textColor: "{colors.code-fg}"
    typography: "{typography.code}"
    rounded: "{rounded.fixed-panel}"
    padding: "1.1em 1.25em"
  about-aside:
    textColor: "{colors.ink}"
    width: "{spacing.aside}"
  blog-filter:
    textColor: "{colors.muted}"
  blog-filter-current:
    textColor: "{colors.ink}"
  blog-feed-link:
    textColor: "{colors.ink-2}"
  blog-row:
    textColor: "{colors.ink}"
    padding: "calc(28 * var(--u)) 0"
  blog-row-project:
    textColor: "{colors.ink-2}"
    typography: "{typography.data}"
---

# Design System: Zanaat

<!-- Provenance: recorded 2026-10-11 from the shipped home page (src/components/Home.astro,
src/styles/global.css, src/scripts/playfield.ts, src/lib/marks.ts, public/brand/*.svg) and the
review captures in .impeccable/review/. Direction: challenger "Parametric Family" (seed 511273a7),
re-grounded on the real marks. The approved comp .impeccable/mocks/comp-2.png is a reference only
(user decision, 2026-10-11). The build's hero gate stays open on record in
.impeccable/build/state.json: the user accepted the first viewport and later made the comp a
reference, but --force refused the Turkish quote of that decision, so the gate was not closed.
Where the build and the direction brief differ, the build is recorded here.

Extended 2026-10-11 with the Read surfaces, from the shipped code: src/pages/blog/[slug].astro,
src/components/BlogIndex.astro, src/components/Nav.astro, src/components/Footer.astro,
src/layouts/Base.astro, src/lib/og.ts, and the Shiki palette and page unit now in
src/styles/global.css. The blog is an extension of this world, not a new one.

Drift, recorded and not canonized (near-duplicates of a token, not system values):
#b9b9b7 (game bar move count) and #d2d2d0 (Solve/Reset) sit between ink-2 and ink;
#8b8b8b (nav link colour in Nav.astro) duplicates muted #8a8a87; #1f2021 (nav rule) duplicates
line #242527; #a9a9a6 (turn panel body, post lede) sits between quiet and ink-soft, and the
blog index lede uses quiet #9a9a97 for the same role; #3a3b3e (blockquote rule) is a one-off
next to #3a3c40 (next-card border) and #3a3f45 (target hover). -->

## Overview

**Creative North Star: "One Grid Makes Every Mark"**

Zanaat is a workshop seen from above: a near-black bench, matte off-white modules, one warm lamp overhead. Every mark the workshop owns (Zanaat's Z, Lonca's icon, Baron's B) is drawn on the same square module grid, and the home page turns that grammar into its first viewport: a board of cubes the visitor rearranges into a mark, which then opens that project's card. Everything around the board is quiet so the board can be the one loud thing.

The page is dark, neutral and typographic. Text is set in Archivo; every readout, link host, package name, nav item and game control is set in DM Mono, so "data" and "prose" never blur. Colour is withheld: Zanaat itself is black and white, and the only hues on the page belong to projects, appearing on their links and text. Density is calm; the desktop stage is laid out on a fixed 1024-unit frame that scales with the page, so proportions stay exactly as measured from 1024px up to the 1600px cap.

The brief first asked for "a squared display face with small chamfers echoing the wordmarks". The comp's lettering governed instead: a straightforward grotesque (Archivo) for all text, with the squared, chamfered character carried only by the real hand-drawn marks.

The Read surfaces (the blog index, per-tag pages and posts) are the same workshop with the board put away: the same nav and footer, the same hairlines and grid tile, and one project's ink lent to each post. Reading text is the one place the page loosens its measured scale, so prose stays legible at every width.

**Key Characteristics:**
- One module grid: the marks, the 3D board and the project mark tiles all share it.
- Real marks only, single-colour (#ecebe7 in the SVGs), never redrawn or substituted by a font.
- Archivo for text, DM Mono for data and code; no third face.
- Neutral near-black ground; project accents only on that project's links and text.
- One soft overhead light, contact shadows, no glow, in the 3D field.
- A fixed-proportion desktop stage that stacks into a single column at 860px.
- Posts read in a warm off-white column of 68ch, with code in an accent-free tinted grey palette.

## Colors

A neutral, very slightly cool near-black with warm off-white ink, and two project accents that never leave their project.

### Primary
- **Workshop Ink** (ink): headline, titles, active nav and language, primary hover target, prose headings and strong text, the current blog filter and its underline. Also the colour every SVG mark is filled with, and Zanaat's post accent.
- **Cube Paper** (cube-paper): the matte off-white of the 3D modules and their motion trails; slightly warmer than ink so the cubes read as material, not as type.

### Secondary
- **Lonca Blue** (lonca): Lonca's brand accent, from its docs site. Used as a value of record; for text on the dark ground use Lonca Readable.
- **Lonca Readable** (lonca-ink): Lonca's links and hosts (card link, project links, and the accent of a Lonca post), and nothing else.

### Tertiary
- **Baron Amber** (baron): Baron's links and hosts only, from Baron's landing, and the accent of a Baron post.

### Neutral
- **Bench Black** (ground): page ground, html background, theme-color, and the ground of every share image.
- **Panel** (panel): raised surfaces: target buttons, the card face (as a #1b1c1e to #161718 gradient at rest, #202224 when it waits as the next card).
- **Well** (well): the sunken neutral: the pressed target's fill and the 1px edge of a code block.
- **Rule** (line): hairline section rules (1px) between project rows, between blog rows, above the footer, above a post's tags, under table rows and on prose horizontal rules.
- **Grid Line** (grid-line): the module grid drawn on every project mark tile (home catalogue and the post's about aside): the tile's 1px border and its 1px grid lines.
- **Turn Line** (turn-line): the turn panel's 1px border.
- **Pressed Line** (pressed-line): the pressed target's border; the grey that says "chosen" without a hue.
- **Focus and selection** (no hue): the focus ring is a 2px ink outline (offset 3px, radius 3px); text selection is ink at 24% (rgba(236, 235, 231, 0.24)) with Selection Ink (selection-ink) text.
- **Reading Ink** (reading): post body text. A step below ink so long reading is calm, a step above ink-2 so it never looks disabled.
- **Second Ink** (ink-2): Zanaat's own link colour (the Zanaat card link), the turn panel's "Got it", the project link in post meta and blog rows, RSS/JSON links, blockquote text, the title of a post that is still "Coming soon".
- **Soft Ink** (ink-soft): card and section body copy, package lists.
- **Quiet** (quiet): ledes and long descriptions (blog lede and row descriptions, the about aside's description), the footer line, share-image descriptions.
- **Muted** (muted): the lowest text tier: nav links at rest, the inactive language label, section labels ("Writing"), post meta and dates, blog filters at rest, tags, table heads, list markers, link labels (dt), footer links. It is the contrast floor (5.5:1 on ground); nothing readable goes lighter-on-dark than this.

### Code
Code is a family of near-whites and greys with faint casts, set on its own slightly lifted ground. Values live in global.css as the Shiki css-variables theme (`--astro-code-*`).
- **Code Chip** (code-chip) with **Code Ink** (code-ink): inline code in prose.
- **Code Ground** (code-ground) with **Code Foreground** (code-fg): code blocks; links in code use the foreground.
- **Function** (code-function), **Parameter** (code-parameter): the brightest tokens, near ink.
- **Constant** (code-constant): a faint warm cast. **String** (code-string, also string expressions): a faint green cast. **Keyword** (code-keyword): a faint blue cast.
- **Punctuation** (code-punctuation) and **Comment** (code-comment): the grey floor of code, at the muted tier.

### Named Rules
**The Black-and-White Workshop Rule.** Zanaat has no colour of its own. Its chrome, its marks and its own links are ink on black; a hue on the page always means a specific project.

**The Accent Stays Home Rule.** A project's accent appears only on that project's links and text (Lonca's hosts in Lonca Readable, Baron's in Baron Amber). Accents never fill a surface, never tint a mark, never colour a cube.

**The One Fill Rule.** Marks are single-colour. The SVGs ship filled with ink; they are never multicoloured, outlined, shadowed or glowed.

**The Borrowed Ink Rule.** A post sits in one project's ink: Lonca Readable, Baron Amber, or Workshop Ink for Zanaat. That accent touches only the post's prose links, its translation link and the about aside's host link; nothing else on the page takes the colour.

**The Neutral Code Rule.** Syntax colour is accent-free: tinted greys and near-whites only, so a code block sits under any project's post without competing with its accent.

## Typography

**Display Font:** Archivo 600 (with Segoe UI, system-ui)
**Body Font:** Archivo 400/500
**Label/Mono Font:** DM Mono 400/500 (with ui-monospace, Cascadia Mono, Consolas)

**Character:** A plain, slightly wide grotesque that lets the hand-drawn marks own all the squareness, paired with a soft monospace that marks everything machine-readable: hosts, package names, counts, controls, code.

### Hierarchy
- **Display** (600, 47.5u on 47u, tracking 0): the two-line hero headline only, one line per span on desktop. Below 860px: clamp(32px, 8.4vw, 44px), 1.04, -0.01em, lines run together.
- **Index Title** (600, 56u, 1.02, -0.012em): the blog index and per-tag page title. Below 860px: clamp(38px, 10vw, 48px).
- **Post Headline** (600, clamp(34px, 40u, 58px), 1.06, -0.012em, balanced): a post's title. Below 860px: clamp(32px, 8.6vw, 40px).
- **Headline** (600, 40u, 1.05, -0.01em): section titles ("Projects", "Open by default"); 32px on mobile.
- **Title** (600, 32u, -0.01em): project names in the catalogue; the Baron card lockup uses 30u; the about aside's project name uses 22u (20px on mobile).
- **Post Title** (500, 25.5u on 27u, +0.01em): post titles under Writing on the home page. Blog rows set titles at 500, clamp(22px, 22u, 32px), 1.2, -0.005em (23px on mobile).
- **Subhead** (400, 24u): the hero's second line, in a mid grey (#868684).
- **Reading** (400, clamp(17px, 15u, 20px), 1.68, max 68ch): post body. Below 860px: 17.5px, 1.65. Prose headings are relative: h2 at 1.45em (600, 1.2, -0.008em), h3 at 1.15em (600, 1.3), both ink.
- **Body** (400, 15.5 to 19u, 1.35 to 1.55): card descriptions (15.5u), project ledes (19u, ink), longer copy (16u, 1.55, max 60ch). Ledes on Read surfaces: index clamp(17px, 15u, 21px) on 1.5, max 58ch; post clamp(18px, 17u, 23px) on 1.45, max 60ch.
- **Label** (DM Mono 400, 15u): nav links and section labels such as "Writing" (16u); blog filters and feed links at 14u.
- **Data** (DM Mono 400, 12.5 to 14.5u): hosts, package names, link labels, post meta and dates, tags, footer.
- **Code** (DM Mono 400, clamp(13.5px, 12u, 15.5px), 1.6): code blocks. Inline code is DM Mono at 0.86em of the reading size.
- **Readout** (DM Mono 500, 15.5u, uppercase, +0.01em): the game bar's caption ("BUILD THE BARON MARK"); moves/Solve/Reset at 14.5u regular.

### Named Rules
**The Two Voices Rule.** Prose is Archivo, data is DM Mono. If it is a URL, a package, a count, a key, a date, code or a control in the game, it is mono; if it is a sentence, it is Archivo. No third family.

**The Hand-Drawn Wordmark Rule.** "zanaat" and "lonca" are hand-drawn SVG files, not type. No font is ever named or used as "the wordmark font". Baron has a mark but no wordmark; its card sets "Baron" in Archivo 600 beside the mark, which is an open decision, not a precedent for drawing wordmarks in type.

**The Readable Measure Rule.** Reading text escapes the page scale: its size is clamped (17 to 20px) and its measure held at 68ch, so the page unit never shrinks or stretches prose past legibility.

## Layout

The desktop page is a measured stage. Every size is written in a unit u = 1/1024 of the page box width (container query width, not viewport), on a page capped at 1600px and centred; a scrollbar never shifts the layout. The unit is set once in global.css on every child of the page box, so the home page, the blog and the shared chrome all scale from the same frame. The hero is a fixed 600u-tall stage with absolutely positioned layers: nav (61u tall, hairline below), headline at 50u from the left, the board spanning full width from 196u to 532u, the card stack at the right edge (from 798u), the game bar along the bottom (52u in, 920u wide, at 523u).

Below the hero, sections use a 57u side gutter and a two-column rhythm whose first column is 465u: Writing's two posts, the Projects head (title left, lede right), and Open by default all align on it. Projects are rows separated by hairlines: a 150u mark tile, a 470u body column, then a definition list of links. Sections are separated by large open space (100 to 110u) rather than rules or panels.

The Read surfaces share the 57u gutter and open 70u below the nav, closing 120u above the footer. The blog index is a hairline-ruled list: each row is three columns (170u date or "Coming soon", a flexible title and description column, 170u right-aligned project mark and language), 28u gaps and 28u vertical padding. A post is two columns: the article and a 220u about aside, 80u apart; the aside is sticky 40u from the top. Inside the article the header is capped at 760u, the prose and its footer at 68ch.

At 860px and below, u becomes 1px and the stage dissolves into one column: nav wraps, the hero stacks (headline, subhead, board at 16:11 bleeding to the screen edges, card, turn panel, bar), only the open card shows, every two-column block becomes one column, and the gutter is 20px. On the Read surfaces blog rows stack (date, title, meta), the about aside drops below the article under a hairline, and code blocks bleed to the screen edges.

## Elevation & Depth

The page is flat; depth lives in the board. Interface surfaces separate by tone and 1px borders, with one exception: the project card floats over the board with a soft ambient drop shadow, so it reads as a card set down on the bench.

The 3D board has its own consistent light: one warm directional light from overhead and slightly back-left (#fff1e0, intensity 2.6) and a cool hemisphere fill (#dfe6ee over #0b0d10, 0.55), ACES filmic tone mapping, soft PCF shadows (radius 6). Cubes cast and receive contact shadows onto dark matte tiles. Nothing emits light.

### Shadow Vocabulary
- **Card on the bench** (`box-shadow: 0 calc(18 * var(--u)) calc(40 * var(--u)) rgba(0, 0, 0, 0.45)`): the project card only.
- **Contact shadow** (three.js PCFSoftShadowMap, 2048 map, radius 6): cubes and lock details onto tiles.

### Named Rules
**The One Lamp Rule.** The board is lit by one soft overhead light plus a fill. No rim lights, no coloured lights, no bloom, no glow.

**The Flat Chrome Rule.** Nav, footer, bar, buttons, turn panel, project rows, blog rows, the about aside and code blocks carry no shadow; they separate by tone and hairlines.

## Shapes

Square modules are the whole grammar. A mark is whole modules on a grid, plus a halving cascade at two opposite corners (a half-module square, then a quarter-module "registration pixel") and, for Z and B, a 45° diagonal or chamfer. The marks themselves are hard-edged and flat.

Interface corners are small and calm: 7u on bar and target buttons, 8u on the turn panel, 10u on the card, 3px on the focus ring; the language-toggle dots are circles. At phone width these become fixed pixels: 8px on the bar, the 40px target buttons and the turn panel, 10px on the card. Read surfaces use fixed radii too: 4px on inline code, 8px on code blocks and prose images (code blocks go square when they bleed to the screen edges on phones). In 3D, everything is softly rounded so it reads as a made object: cubes are 0.88 of a module with a 0.13 radius, tiles 0.94 with 0.05, the base 0.08; half squares and pixels scale the radius with them (0.07, 0.035). Baron's chamfered module is the one hard cut: an extruded right triangle whose hypotenuse is the 45° cut.

The project mark tile draws the grid itself: a square with a 1px grid-line border and a grid of 1px grid-line lines behind the mark. In the home catalogue the grid is 24u and the mark sits at 60% width; in a post's about aside the mark is 72u inside 14u of padding on a 25u grid (56px, 12px and 20px on phones).

## Components

### Navigation
Quiet and typographic, and shared by every page. Zanaat logo (the real SVG, 116u wide) at the left; at the right, DM Mono 15u links in muted grey, brightening to ink on hover (0.3s), then an EN / TR toggle where the current language is ink and the other is muted. A 1px hairline closes the nav. On the home page it floats over the hero's stage; elsewhere it sits in the flow. On mobile it wraps with 16px gaps and the logo drops to 104px.

### Footer
Shared by every page. A 1px rule above, then the Zanaat logo (92u), the footer line in Archivo 14.5u quiet, and at the right a DM Mono 13u list in muted: GitHub, RSS (the blog feed for the page's language), the email address, and the other language. Links brighten to ink on hover. On mobile the list wraps onto its own line.

### Project Card
A card set down on the board. 207u wide, 10u radius, 1px #26282b border, a top-to-bottom #1b1c1e to #161718 gradient, the shadow above. Contents: the project's real logo (or, for Baron, the mark plus "Baron" in Archivo 600), a 15.5u description in soft ink, and at the foot a DM Mono host link in the project's accent (Zanaat's in second ink) with a small stroked arrow, underlined on hover. Three cards stack: the open one, the next one peeking 210u to the right on #202224 with a lighter #3a3c40 border, and the rest hidden 240u out; changing state slides them (0.7s) and fades (0.5s) on the house ease. Mobile shows only the open card.

### Game Bar
A slim instrument strip along the board's foot: 50u high, 7u radius, translucent near-black (rgba(16,17,19,0.88)) with a 1px #26272a border, all DM Mono. Left, the uppercase caption names the mark being built. Centre, three target buttons. Right, "moves N", Solve and Reset as bare text buttons (brightening to white on hover) separated by 4u dots.

### Target Buttons
Small square tiles (37u by 36u, 7u radius) on panel with a #25282c border, each holding a real mark at 19u. Hover lifts the border to #3a3f45. The pressed target is neutral: a pressed-line border on a well fill, with no hue. Mobile: 40px squares, 8px radius.

### Turn Panel
Explains the game once. A 204u panel at the board's left, 8u radius, near-opaque rgba(18,19,21,0.92) with a turn-line border; a 16u Archivo 600 title ("Your turn: build Baron's mark."), 13.5u body at 1.45, and a DM Mono "Got it" text button. It rises in once (0.7s, 6px), never animates under reduced motion, closes on "Got it", the first tap on the board, or the first target built, and stays closed via localStorage.

### Project Row
A catalogue entry: grid-tile mark, Archivo name and description, a mono package list, and a definition list of labelled links (Docs/Site, GitHub, npm) in the project's accent, underlined on hover. Rows are divided by 1px hairlines.

### Blog Index
The index and the per-tag pages share one layout. An Index Title, a quiet lede, then a DM Mono bar: project filters at the left (All, Lonca, Baron, Zanaat) in muted, brightening to ink on hover; the current filter is ink with a 1px ink underline 3px below, never a hue. At the right, "Feeds" in muted with RSS and JSON links in second ink. The list is hairline-ruled rows: the date (or "Coming soon") in muted mono; the title in Archivo 500 linking to the post, underlined on hover (1px, 5px offset), with a quiet description beneath (max 62ch); and at the right the project (its real mark at 15u plus its name, second ink, ink on hover, linking to the project's tag) and the language code in muted. A post that is not yet published shows "Coming soon" and its title in second ink, without a link.

### Post
A header (Post Headline, a lede, and a mono meta row of project mark and name, date and, when there is one, a translation link in the post's accent), then the prose, then a mono footer under a hairline with the tags (muted, ink on hover) and a back link.
- **Prose:** Reading Ink at the Reading size and measure; 1.1em between blocks; links in the post's accent with a 1px underline 3px below; strong text in ink 600; list markers muted.
- **Inline code:** code-ink on a code-chip at 0.86em, 4px radius, padding 0.12em 0.36em.
- **Code blocks:** Shiki's css-variables theme on code ground, 1px well edge, 8px radius, padding 1.1em 1.25em, scrolling sideways rather than wrapping; on phones they bleed to the screen edges, square, with only top and bottom edges.
- **Blockquote:** no box; a 1px left rule (#3a3b3e), 1.1em indent, text in second ink.
- **Table:** full width, collapsed, tabular numerals at 0.9em; cells ruled underneath with a line hairline; heads in DM Mono 400 muted.
- **Horizontal rule and images:** a line hairline with 2.4em around it; images at most the column's width with an 8px radius.

### About Aside
"About the project" beside a post: the project's real mark on a grid tile, the project name in Archivo 600 (22u), its one-line description in quiet at 15u/1.45, and its host as a DM Mono link in the post's accent with the small stroked arrow, underlined on hover. Sticky on desktop; on phones it follows the article under a hairline.

### Share Image
Every post and page gets a 1200x630 image drawn at build time from the same materials: the ground, padding 64px by 72px; at the top the project's real mark (56px) beside a DM Mono 26px label in second ink; the title in Archivo 600 (66px, 58px past 60 characters, 1.06, -0.01em) in ink over a quiet 28px description; at the foot the Zanaat logo (36px) and "zanaat.dev" in DM Mono 24px muted. No raster assets, no accent.

### Signature: "Build the mark" Board
A 10 by 7 board of dark tiles (#1b1e21, roughness 0.88) on a darker rounded base (#0e1013), rotated -0.72 rad and seen from the front-left a little above (22.5° lens on wide stages, widened on narrow ones). Cubes are matte cube paper (roughness 0.78). The target mark is drawn faintly on the tiles: a 6% fill and a 34% outline per module, so the game explains itself; it disappears once the target is built. Play is in whole modules: tap a tile to drop a cube in (340ms ease-out from 2.4 above), tap a cube to sink it (260ms). On lock, the finer grammar pops in (420ms): half squares and registration pixels at the two cascade corners and, for Baron, the chamfered module. Solve moves every cube to its nearest goal cell on an arc (760ms ease-in-out, 45ms stagger, a slight 0.35 rad yaw), drawing a thin cube-paper arc trail (42% opacity) that fades out over 900ms after landing; spare cubes sink, missing ones drop in. Turn order: the page opens on Zanaat's mark; after 700ms Lonca builds itself as the opening move; Baron is then the visitor's target, then Zanaat. The board loads after first paint, fades in over 0.8s, and falls back to the three flat SVG marks without WebGL; under reduced motion every tween completes instantly.

## Do's and Don'ts

### Do:
- **Do** draw every mark from the real SVG files in public/brand, single-colour, and build any new mark on the same module grid with the cascade at two opposite corners.
- **Do** set prose in Archivo (400/500/600) and every URL, package, count, label, date, code and game control in DM Mono.
- **Do** keep Zanaat's own surfaces black and white; give a project's accent only to that project's links and text, using Lonca Readable (not Lonca Blue) for Lonca text on dark.
- **Do** light any 3D scene with one soft overhead warm light plus a cool fill, contact shadows and matte materials, with rounded modules (radius 0.13 of a 0.88 cube).
- **Do** size desktop layouts in the 1/1024 page unit and collapse to one column at 860px with a 20px gutter.
- **Do** set reading text in Reading Ink (#d3d2cd) at clamp(17px, 15u, 20px) on 1.68, at most 68ch wide.
- **Do** use the house ease (cubic-bezier(0.16, 1, 0.3, 1)) for interface transitions and honour prefers-reduced-motion everywhere.
- **Do** keep readable text at Muted (#8a8a87) or brighter on the ground.
- **Do** keep focus, selection, pressed and current states neutral (ink outline, ink-tinted selection, grey pressed border, ink underline on the current filter), so interaction never borrows a project's hue.
- **Do** draw share images at build time from the real marks, Archivo and DM Mono on the ground.

### Don't:
- **Don't** redraw, retrace or approximate a mark, or set "zanaat" or "lonca" in a font.
- **Don't** colour, outline, shadow or glow a flat mark. (The cubes on the board are the one place the grammar becomes material and casts contact shadows; that is the board, not the mark.)
- **Don't** add a third typeface or a chamfered display face; the comp's lettering governed.
- **Don't** use emissive materials, bloom, glow or coloured lights on the board.
- **Don't** put a project accent on Zanaat chrome, on a surface fill, or on a cube.
- **Don't** give syntax highlighting a project hue or a saturated colour; code stays in the neutral code palette.
- **Don't** show proof the workshop doesn't have: counts, customer logos, testimonials.
