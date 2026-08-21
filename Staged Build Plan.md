# Staged Build Plan — Atharv Portfolio

Reference files to hand Antigravity alongside this: `portfolio-prototype.html` (theme-switch mechanic), `build-brief.md` (design system rules — still valid, read first).

Reference site (mood only, not layout): aaravjuneja.in — dark #11110f base. Confirms the direction, don't copy the structure.

---

## STAGE 0 — Asset prep (you do this before Antigravity touches anything)

Nothing below can be built properly on placeholder content. Antigravity will invent filler copy if you don't supply real copy, and filler is what makes a portfolio look templated.

**Photography** — 20 images, ready to hand over:

- Export as WebP, longest edge ~2400px, no crop decisions left to the developer
- Rank them 1–20 in the order you want them to appear — don't leave sequencing to Antigravity
- One-line caption each: location + year minimum

**Dev & AI** — 4 projects, need for each:

- Atlas (finance trading AI analyser): one-paragraph description, tech stack, 1 real metric if you have one (accuracy %, backtest result), screenshot or terminal output
- JEE tracking multi-user app: description, stack, 2-3 screenshots, what "multi-user" actually means functionally (roles? shared dashboards?)
- Project 3 + 4: same shape — description, stack, visual proof
- Do NOT let Antigravity write these descriptions from a project name alone — you write the paragraph, it formats it

**Design** — pull your strongest 8-12 pieces, not everything. A design page with 40 loosely-related pieces reads as a dump, not a portfolio. Rank by what you're proudest of, not chronology.

**Marketing Thesis** — this section needs honest framing. It's ideation-level, not agency work — say that directly on the page instead of implying it's client-executed. Something like "strategic case study exercises" in the section intro, not "campaigns I ran." Undersell the claim, oversell the thinking. Bring the Protein Pantry deck content (Chaap Report Card / Ghar Ka Chaap) as the flagship — it's your strongest strategic work.

**Motion Graphics** — 3-4 video files:

- Export web-optimized (H.264 mp4, under ~15MB each ideally, or host on a CDN/Vimeo and embed)
- Static poster-frame for each, for the loop-preview cards before they autoplay

---

## STAGE 1 — Shell & theme engine (no content yet, just the skeleton)

- Next.js App Router, 5 route folders + shared layout
- CSS variable theme system, per-route skin, zero flash-of-wrong-theme on load (server-set `data-theme` on `<html>`, not client-side flicker)
- Nav, footer, top metadata bar (live clock already prototyped)
- Ship this stage with dummy text still — confirm the mechanic works before content goes in

## STAGE 2 — Content architecture, category by category

Build in this order (most-ready content first):

1. `/dev` — Atlas + JEE tracker + 2 others, terminal-coded template from the brief
2. `/marketing` — Protein Pantry case study, long-form sequential layout (numbered steps earned here)
3. `/photography` — 20-image full-bleed grid, minimal chrome
4. `/design` — 8-12 pieces, poster-style, type-photo collision
5. `/motion` — video cards, blocked until Stage 0 exports are ready

## STAGE 3 — Animation & interaction layer

This is where "modern tech feel" actually gets built — don't let it happen ambiently during Stage 2, treat it as its own pass so it's consistent site-wide rather than five different developers' worth of motion ideas:

- Page-load sequence on the homepage hero (one orchestrated moment, not scattered fades)
- Scroll-triggered reveals for project cards (stagger, not everything firing at once) — Framer Motion or GSAP ScrollTrigger
- Theme transition itself should be the signature animation — when you land on `/dev`, don't just cut to green, let the shell visibly re-skin (200-400ms color/texture crossfade, already scaffolded in the prototype's CSS transitions — extend it, don't replace it)
- Cursor-following accent element on desktop only (a small dot/label that reads "view project" near cards) — nice-to-have, cut it if it feels gimmicky once built
- Respect `prefers-reduced-motion` — kill non-essential motion for anyone with it set

## STAGE 4 — Polish & QA pass

- Mobile responsiveness, especially the 5-cell grid and the video cards
- Keyboard focus states visible (you'll get dinged for this in any real critique)
- Image lazy-loading, video lazy-load with poster frames so `/motion` doesn't tank load time
- Cross-browser check on the theme-variable mechanic specifically — this is the piece most likely to break

## STAGE 5 — Deploy

- Vercel is the path of least resistance for Next.js
- Point your domain, confirm SSL, done

---

## Hard rule for Antigravity across every stage

If it starts building one reusable "ProjectCard" component and reskinning it five times with a color swap, stop and reread `build-brief.md`. Dev, Design, Photography, Motion, and Marketing need structurally different templates, not the same card in five colors. That's the whole thesis of this site — don't let the build undercut it for the sake of a smaller component tree.
