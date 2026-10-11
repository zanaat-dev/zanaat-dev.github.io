---
name: Zanaat
description: A small workshop of open-source developer tools; one machined block turns under a single beam on pure black.
colors:
  ground: "#050506"
  ink: "#f2f2f0"
  ink-2: "#b4b3ae"
  quiet: "#9b9b9d"
  muted: "#8a8a87"
  line: "#242527"
  panel-ground: "#0b0b0d"
  tile-ground: "#070708"
  button-white: "#f4f4f2"
  button-ink: "#0a0a0b"
  pill-ground: "#1a1a1c"
  reading: "#d3d2cd"
  lonca-ink: "#46aee0"
  baron: "#e8a13a"
  code-ground: "#141517"
  code-chip: "#1a1b1d"
typography:
  display:
    fontFamily: "'Merriweather Variable', Georgia, 'Times New Roman', serif"
    fontSize: "calc(50 * var(--u))"
    fontWeight: 360
    lineHeight: "calc(60 * var(--u))"
    letterSpacing: "0"
    fontVariation: "'opsz' 72"
  headline:
    fontFamily: "'Merriweather Variable', Georgia, 'Times New Roman', serif"
    fontSize: "calc(36 * var(--u))"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.012em"
    fontVariation: "'opsz' 144"
  title:
    fontFamily: "'Merriweather Variable', Georgia, 'Times New Roman', serif"
    fontSize: "calc(30 * var(--u))"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 144"
  row-title:
    fontFamily: "'Geist Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "calc(19 * var(--u))"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  body:
    fontFamily: "'Geist Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "calc(15 * var(--u))"
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: "'Geist Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(17px, calc(15 * var(--u)), 20px)"
    fontWeight: 400
    lineHeight: 1.68
  label:
    fontFamily: "'Geist Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "calc(14 * var(--u))"
    fontWeight: 450
    lineHeight: 1
  data:
    fontFamily: "'DM Mono', ui-monospace, 'Cascadia Mono', Consolas, monospace"
    fontSize: "calc(12.5 * var(--u))"
    fontWeight: 400
    lineHeight: 1.4
    fontFeature: "'tnum'"
rounded:
  code-chip: "4px"
  code-block: "8px"
  thumb: "calc(8 * var(--u))"
  card: "calc(12 * var(--u))"
  tile: "calc(14 * var(--u))"
  panel: "calc(20 * var(--u))"
  pill: "999px"
spacing:
  gutter: "calc(57 * var(--u))"
  panel-pad: "calc(32 * var(--u))"
  panel-gap: "calc(14 * var(--u))"
  row-pad: "calc(22 * var(--u))"
  section: "calc(96 * var(--u))"
  mobile-gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.button-white}"
    textColor: "{colors.button-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 calc(15 * var(--u))"
    height: "calc(39 * var(--u))"
  button-primary-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.button-ink}"
  nav-pill:
    backgroundColor: "{colors.pill-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 calc(14 * var(--u))"
    height: "calc(31 * var(--u))"
  badge:
    backgroundColor: "rgba(28, 28, 30, 0.72)"
    textColor: "#b9b9bb"
    rounded: "{rounded.pill}"
    padding: "0 calc(9 * var(--u)) 0 calc(11 * var(--u))"
    height: "calc(22 * var(--u))"
  package-pill:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "#c4c4c6"
    typography: "{typography.data}"
    rounded: "{rounded.pill}"
    padding: "0 calc(11 * var(--u))"
    height: "calc(26 * var(--u))"
  project-panel:
    backgroundColor: "{colors.panel-ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  mark-tile:
    backgroundColor: "{colors.tile-ground}"
    rounded: "{rounded.tile}"
  corner-card:
    backgroundColor: "rgba(14, 14, 15, 0.86)"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "calc(6 * var(--u))"
---

# Design System: Zanaat

## Overview

**Creative North Star: "One Object Under One Beam"**

Zanaat is a black room with one light in it. Under the beam floats a single machined object: a 4x4x4 block of brushed, perforated and near-matte metal cubes with two silver pieces, which the visitor can turn. Everything else on the site stays quiet around it: a white-to-grey serif headline, grotesk text in greys, dark panels edged with hairlines, and small pills. The finish level is the developer-tool canon (the Resend and Raycast bar), played straight. The craft shows in the object, the type and the small details, not in decoration.

The world is monochrome. Colour exists only as project ink: Lonca blue and Baron amber, and each appears only where that project is the subject (its link rows, its post). Depth comes from light, not from stacked shadows: inset 1px hairlines, a faint cool glow from above, and the beam itself. The object is the only authored motion; the rest of the page moves only in 0.25s state transitions.

Confirmed rejections: the corporate company site, the agency portfolio, the OSS org page of a headline over a row of project cards, and the retired "Build the mark" game world (Archivo, per-cube colours, a playfield).

**Key Characteristics:**
- Pure black ground, near-white ink, and every other surface a step of grey.
- Merriweather serif for headings, Geist for all text, DM Mono only for data.
- Inset hairline borders instead of drop shadows; pills for small things, rounded panels for large ones.
- A 1024-unit composition that scales with the page box and stops at a 1200px cap.
- One signature object, rendered live in WebGL, with a still image of the same scene underneath.

## Colors

A near-black monochrome with two project inks that never share a surface.

### Primary
- **Bench Ink** (ink): the white of the world. Headings, the current nav state, the focus ring, pill text, and the hover state of text links. Pure white (#fff) is reserved for selection text, the primary button's hover, and the hero headline's lit edge.
- **Lamp White** (button-white): the only filled light surface on the page, the primary pill button, with near-black text (button-ink).

### Secondary
- **Lonca Ink** (lonca-ink): Lonca's links in its project panel and the accent of Lonca posts (links, the translation link, the about link). Never used outside Lonca's own context.
- **Baron Amber** (baron): the same role for Baron.

### Neutral
- **Black Room** (ground): the page ground, the html ground, the scrollbar track, and the 3D room.
- **Panel Black** (panel-ground): project panels, under a faint cool radial light from above.
- **Tile Black** (tile-ground): the module-grid tiles that marks sit on.
- **Pill Graphite** (pill-ground): the nav's GitHub pill.
- **Worn Steel** (ink-2): secondary ink: the blog's project links, feed links, quote text, and upcoming post titles.
- **Quiet Grey** (quiet): ledes, section intros, project prose, and the closing section's body.
- **Shop Grey** (muted): data and metadata: dates, dt labels, filters at rest, footer text, and list markers.
- **Hairline** (line): every 1px rule: list borders, link-row borders, and the footer's full-bleed top rule.
- **Reading Grey** (reading): long-form post prose, kept one step below ink so headings and strong text stand out.
- **Code Ground / Code Chip**: code blocks and inline code. The Shiki theme in global.css has no accent, so code sits under either project.

### Named Rules
**The Project Ink Rule.** Lonca blue and Baron amber appear only where that project is the subject, and a post page takes exactly one accent (`--accent`) from its project. No project colour ever decorates the shell, the hero or a generic component.

**The Monochrome Room Rule.** Every colour that is not project ink is a grey between #050506 and #ffffff. A new section adds no hue.

## Typography

**Display Font:** Merriweather Variable (with Georgia, Times New Roman)
**Body Font:** Geist Variable (with Segoe UI, system-ui)
**Label/Mono Font:** DM Mono 400/500 (with ui-monospace, Cascadia Mono, Consolas)

**Character:** a high-contrast optical-size serif, set light and large, over a quiet grotesk. The mono is the workshop's label printer, not a voice.

### Hierarchy
- **Display** (Merriweather 360, opsz 72, 50u on 60u): the hero headline only, one line on desktop. On phones it is clamp(34px, 10vw, 44px) with balanced wrapping.
- **Headline** (Merriweather 400, opsz 144, 36u, 1.15, -0.012em): section heads (Writing, Projects, Open by default). The blog index h1 uses the same face at 52u; the post h1 is clamp(32px, 40u, 54px).
- **Title** (Merriweather 400, opsz 144, 30u): project names. The post's about-name uses 22u; prose h2 uses 1.4em.
- **Row title** (Geist 500, 19u, 1.3): post titles in lists (22u on the blog index), with balanced wrapping.
- **Body** (Geist 400, 15 to 17u, 1.4 to 1.6): ledes and prose in quiet grey, held to 44 to 62ch.
- **Prose** (Geist 400, clamp(17px, 15u, 20px), 1.68, 68ch): post reading text keeps a readable size whatever the page scale does.
- **Label** (Geist 450 to 500, 14u): buttons, nav links and pills.
- **Data** (DM Mono 400, 12 to 13.5u, tabular figures): dates, package names, URLs, link-row labels, language tags, the "drag to turn" hint, and code.

### Named Rules
**The Three Voices Rule.** Serif for headings and names, Geist for anything read as sentences or pressed as a control, and mono only for data a machine also reads (dates, package names, URLs, hints, code). Never set a heading, a lede or a button in mono.

**The Lit Headline Rule.** Only the hero h1 carries a left-to-right gradient fill (#ffffff to #f2f2f0 at 52% to #9c9c9e at 92%), because the approved comp lights it from the beam's side. Every other heading is solid ink.

## Layout

The composition is drawn on a 1024-unit board. Inside `.page` (container-type inline-size, max-width 1200px, centred), every child gets `--u = 100cqw / 1024`, and every desktop measurement is written as `calc(n * var(--u))`. The page therefore scales as one piece with the page box rather than the viewport, so a scrollbar never shifts it. At 1200px the box stops growing and the same composition sits centred on wider screens. Full-bleed rules (the footer line) run past the box, and the hero stage fades out at its edges with a horizontal mask (transparent, black 14%, black 86%, transparent). Below 860px `--u` becomes 1px and components switch to explicit pixel values with a 20px gutter.

On desktop the hero is a measured stage, 572u tall, with absolutely placed children, matching the approved comp (1024x572). Below 860px it stacks into a centred column: the stage is nearly square (aspect 1/1.05), and the copy rises over its lower third, which holds only the floor reflection. The corner cards are hidden on phones.

Below the hero: a 57u side gutter, 96 to 112u of space before each section, a section head with a serif title and a right-aligned link or intro, hairline-ruled lists, and 14u between panels.

**The Board Unit Rule.** Desktop sizes are multiples of `--u`, never raw px or vw. Reading text is the only exception: it clamps to a legible size range.

**The 1200 Cap Rule.** The page box never exceeds 1200px. The user chose this deliberately over scaling to wider screens: on 2K and 4K screens the composition sits centred instead of zooming.

## Elevation & Depth

Depth comes from light and hairlines, not from stacked shadows. Surfaces are dark planes outlined by an inset 1px white line at 6 to 9% opacity, which brightens to 12 to 16% on hover. Large panels add a second inset line along the top edge and a faint cool radial glow from above, as if the beam spilled onto them. The only outer shadow belongs to the white primary button, as a soft ambient lift. The beam and its haze are the deepest layer, and the closing section repeats the beam faintly as a radial glow behind its heading.

### Shadow Vocabulary
- **Hairline** (`box-shadow: inset 0 0 0 1px rgba(255,255,255,0.07)`): panels, tiles, cards and pills (0.06 to 0.09 depending on the surface).
- **Hairline hover** (`box-shadow: inset 0 0 0 1px rgba(255,255,255,0.16)`): the badge and corner cards on hover.
- **Top light** (`inset 0 1px 0 rgba(255,255,255,0.06)` with `radial-gradient(120% 90% at 50% -30%, rgba(160,178,196,0.07), transparent 60%)`): project panels.
- **Button lift** (`0 calc(6u) calc(18u) rgba(0,0,0,0.35), inset 0 -1px 0 rgba(0,0,0,0.12)`): the primary pill only.
- **Beam glow** (`radial-gradient(50% 70% at 50% 0%, rgba(150,170,188,0.12), transparent 70%)`): the closing section.

### Named Rules
**The Inset Line Rule.** Borders are inset box-shadows or 1px `--line` rules. No visible outer borders on dark surfaces, and no hard or offset shadows.

## Shapes

There are two shape families. Full pills (999px) are for every small, single-line element: the primary button, the nav's GitHub pill, the new-post badge, and package names. Softly rounded rectangles are for containers, with radius scaled to size: thumbnails 8u, corner cards and the post's mark tile 12u, project mark tiles 14u, and project panels 20u (18px on phones). Code uses 4px chips and 8px blocks. The module grid (1px lines at 5% white, 22u cells) is the recurring surface pattern under every project mark. The focus ring is a 2px ink outline with a 3px offset and 3px radius. The object's canvas uses an inset 1px ring at 50% ink with a 20px radius.

## Components

### Buttons
Calm and lit, never loud.
- **Shape:** full pill (999px).
- **Primary:** Lamp White fill with a near-black Geist 450 label, 39u tall (44px on phones), with the button lift. Used once per region: the hero's "See the projects" and the closing section's GitHub link.
- **Hover / Focus:** the fill goes to pure white, and pressing nudges it 1px down, over 0.25s on `--ease`. It uses the global focus ring.
- **Text link with arrow:** "Writing" and "All writing" are plain near-white Geist with an inline SVG arrow that slides 3px on hover.

### Chips
- **New-post badge:** a 22u pill in translucent graphite with an inset hairline, a bold ink lead word, a grey title truncated with an ellipsis, and an SVG chevron that slides 2px on hover.
- **Package pill:** a 26u pill in DM Mono 12u, with a 3% white fill and an inset hairline. It holds data only and is never a link styled as a button.

### Cards / Containers
- **Project panel:** 20u radius, Panel Black with top light, 32u padding, and three columns (132u mark tile, text, 230u link rows). One column on phones.
- **Mark tile:** Tile Black with the module grid, 14u radius, and the mark at 52% width.
- **Corner card:** 128x64u with a 12u radius, translucent black with a hairline, holding a 52u thumbnail of the block rendered in the same studio and the project name in Geist.
- **Link rows:** a definition list ruled by 1px `--line`, with a mono dt label in Shop Grey and a mono URL in the project's ink, underlined on hover.

### Lists
- **Writing rows:** hairline-ruled, with the title on the left (Geist 500) and mono meta on the right (mark, project, language, date). Upcoming posts drop to grey and are not links. The blog index widens this to a 170u date column, a title-and-description column, and a project column.

### Navigation
- The Zanaat logo on the left, three Geist links at 14u in #8e8e8f that turn ink on hover, an EN / TR switch with the current language in ink, and the graphite GitHub pill. On the home page the nav floats over the hero stage. On phones it wraps, with the links on their own row.

### The Object (signature)
A machined 4x4x4 block, drawn live in three.js over a still of the same scene (`public/hero-still.webp`). The still holds the stage before WebGL loads, when WebGL is unavailable, and under reduced motion. The canvas fades in over 1.2s on `--ease`.
- **Pose:** a corner toward the viewer, the left face slightly wider (y = -45deg + 0.02 rad). It holds this pose for a moment before it starts its idle turn. The block is half-turn symmetric, so the comp's view returns twice per turn.
- **Materials:** brushed metal, fine perforated metal and near-matte dark cubes in graded tones 1 to 5. The near-corner column alternates missing / silver / missing / silver, and silver is mirror-bright with its own stronger studio reflection. The layout is fixed and deterministic, so every visitor sees the same block. Hairline seams look into a black core.
- **Light:** a ring of gradient softboxes, one hot strip high on the front left, a spot for the beam's highlight, and a front light fixed to the camera so the face turned to the viewer is always readable.
- **Two-pass render:** first a floor eye draws the pool of light, the soft square contact shadow (it turns with the block and tightens and loosens with its float), the beam's floor reflection, and screen-space smoke drifting through the cone. Then a far, low eye with a shifted lens draws the block, with verticals upright and a sliver of the underside showing.
- **Interaction:** dragging or the keyboard turns it with inertia, then it settles back into a slow idle turn. Reduced motion shows the still pose. On narrow stages both eyes zoom together so the floor stays under the block.
- **Thumbnails:** the project corner cards render the same block in the same metal and studio.

## Do's and Don'ts

### Do:
- **Do** write every desktop measurement as `calc(n * var(--u))` on the 1024-unit board, and keep the page box capped at 1200px.
- **Do** draw edges with inset 1px hairlines (6 to 9% white at rest, up to 16% on hover) and 1px `--line` rules.
- **Do** use pills (999px) for small single-line elements, and 8u / 12u / 14u / 20u radii for containers according to size.
- **Do** set headings in Merriweather (400, opsz 144), text in Geist, and only data in DM Mono.
- **Do** give a project's page or panel exactly one accent: its own ink.
- **Do** run every state transition at 0.25s on `--ease` (cubic-bezier(0.16, 1, 0.3, 1)).
- **Do** keep the object always lit from the front, its shadow soft and turning with it, and its floor reflection faded in across the floor line.
- **Do** keep content independent of WebGL: the still renders first, and three.js loads after paint.

### Don't:
- **Don't** let the object go dark when turned, give it a hard shadow, or show a seam where the beam's reflection meets the floor.
- **Don't** put gradient text anywhere except the hero h1.
- **Don't** add a second authored motion moment. The object is the only one; everything else is a state transition.
- **Don't** use project colours on the shell, the hero or generic components, and don't add any other hue.
- **Don't** build a corporate company site or an agency portfolio: no customer logos, counts or testimonials.
- **Don't** return to the retired "Build the mark" world: no Archivo, no per-cube colours, no game or playfield.
- **Don't** use hard or offset shadows, outer borders on dark panels, or kicker labels above headings.
