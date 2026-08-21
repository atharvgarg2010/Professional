# Atharv Portfolio — Master Prompt

You are building a personal portfolio website for Atharv, a 16-year-old developer/designer based in Delhi. Read this entire prompt before writing any code. Two reference files are attached alongside this prompt — read them first, in this order:

1. `build-brief.md` — the full design system: exact color tokens per category, typography, layout rules, component architecture, animation spec, and explicit guardrails on what NOT to build.
2. `staged-build-plan.md` — the stage-by-stage build order and the real content inventory (project names, asset counts, what's ready vs. pending).
3. `portfolio-prototype.html` — a working proof-of-concept of the core interaction mechanic (hover-based theme preview on the homepage). Open it in a browser first. Your job is to extend this mechanic into a persistent, route-based theme system — not to redesign the mechanic from scratch.

---

## The core concept — understand this before anything else

This is not five separate portfolio pages sharing a navbar. It is one shell that visually re-skins itself depending on which category of work you're looking at:

- Development & AI → terminal-green theme
- Design → poster/orange theme
- Photography → mono/grayscale theme, minimal chrome
- Motion Graphics → violet/motion-blur theme
- Marketing Thesis → blue/ledger theme, the one category allowed numbered sections because the content is genuinely sequential

The re-skinning is the site's signature. Everything else about the build should be disciplined and quiet so that this one moment — the shell changing color/texture/personality as you move between categories — reads clearly. If you find yourself adding extra decorative flourishes elsewhere (gradients, drop shadows, rounded cards, extra animations competing for attention), cut them. Spend the boldness in one place.

The theme must persist across navigation, not reset on every page load. Landing directly on `/dev` via a shared link should render the green terminal skin immediately, server-side, with zero flash of the wrong theme.

---

## What to build, in order

Follow the stage order in `staged-build-plan.md` exactly:

**Stage 1:** Shell and theme engine only. Get the persistent, server-side, zero-flicker theme switching working across all five routes before writing a single line of real content. Use the CSS variable token sets and the technical architecture (Next.js App Router, `data-theme` attribute, per-segment theme resolution) specified in `build-brief.md` section 2.

**Stage 2:** Build out each category page's content architecture, in this order, using the exact per-category component specs in `build-brief.md` section 3:

1. `/dev` — Atlas (finance trading AI analyser), a JEE multi-user tracking app, plus 2 more projects (content pending from Atharv — use clearly-marked placeholder blocks, do not invent fake project descriptions)
2. `/marketing` — Protein Pantry case study ("The Chaap Report Card" / "Ghar Ka Chaap"), framed explicitly as strategic ideation, not executed agency work
3. `/photography` — full-bleed grid for up to 20 images (placeholder grid until real images are supplied)
4. `/design` — 8-12 pieces, poster-style, at least one type-over-photo collision layout
5. `/motion` — 3-4 video cards with poster-frame fallbacks for any not yet export-ready

**Stage 3:** Animation and interaction pass, per `build-brief.md` section 4 — orchestrated hero load sequence, staggered scroll reveals, the theme crossfade transition, optional cursor-follow label on desktop. Respect `prefers-reduced-motion` throughout.

**Stage 4:** QA against the checklist in `build-brief.md` section 6 — theme-flicker check, keyboard focus visibility, mobile responsiveness, lazy-loading, cross-browser check on the CSS variable theme mechanism.

**Stage 5:** Production build, ready for Vercel deployment.

---

## Non-negotiable guardrails

Do not default to these, even if they feel like the natural or efficient choice:

- A single shared `ProjectCard` component reused across all five categories with just a color swap. Each category needs its own namespaced component (`dev/ProjectCard`, `design/PosterGrid`, etc. — see `build-brief.md` 2.2) because each category's content genuinely has a different shape. This is the main thing standing between "distinctive site" and "template with a palette swap."
- Rounded corners above 4px, drop shadows, or gradient-accent heroes. This is a hard-edged, hairline-border, high-contrast design. That is a deliberate choice, not a placeholder aesthetic to be softened later.
- Numbered `/01 /02 /03` markers on the homepage category grid. Five parallel categories are not a sequence — only `/marketing` earns numbering.
- Inventing content. Where real project descriptions, images, or video files are not yet supplied, build the structure and use clearly labeled placeholders. Do not generate fake metrics, fake client names, or fake case study outcomes to fill space.
- Overstating the marketing work. It is ideation-level strategic thinking, not executed campaigns — the page copy must say so plainly.

---

## When you're done with a stage

Stop and summarize what you built against the relevant checklist section before moving to the next stage, rather than proceeding straight through all five stages unprompted. Flag anywhere you deviated from `build-brief.md` and why.
