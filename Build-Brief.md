# Portfolio Build Brief — Atharv

Full design + technical spec for Antigravity. Read this before touching `staged-build-plan.md`. Reference file: `portfolio-prototype.html` — the theme-switch mechanic in that file is the working proof-of-concept; extend it, don't rebuild it from scratch.

---

## 0. The one-sentence brief

A single shared shell that re-skins per category — Dev/AI, Design, Photography, Motion, Marketing Thesis each get a genuinely different visual treatment, not a recolored card. The re-skinning itself is the site's signature move, not a decoration on top of a normal portfolio.

---

## 1. Design tokens

### 1.1 Color — base (index / neutral state)

```
--bg:      #0b0b0c
--fg:      #ededea
--dim:     #6e6e6e
--line:    rgba(237,237,234,0.14)
--accent:  #0b0b0c   (equals bg at rest — becomes visible per-category)
```

### 1.2 Color — per-category skins

Each category defines its own `--bg / --fg / --dim / --line / --accent` set. These are not tints of one accent — they are five distinct small palettes so each room feels different, not just recolored.

**Dev & AI — terminal**

```
--bg:  #0b1f14
--fg:  #78ffb4
--dim: #78ffb4aa
--line: #78ffb433
--accent: #78ffb4
```

Texture: 3px repeating horizontal scanlines at 5% opacity in `--fg`.

**Design — poster**

```
--bg:  #1a0a06
--fg:  #ff5a2b
--dim: #ff5a2baa
--line: #ff5a2b33
--accent: #ff5a2b
```

Texture: 45° diagonal hatch, 14px repeat, 6% opacity.

**Photography — mono/grain**

```
--bg:  #0a0a0a
--fg:  #f2f2f2
--dim: #f2f2f2aa
--line: #f2f2f233
--accent: #f2f2f2
```

Texture: radial-dot film grain, 4px grid, 10% opacity. This page should carry the *least* chrome of the five — the texture and near-white-on-black is the whole personality, don't add color here.

**Motion — blur/gradient**

```
--bg:  #140a1f
--fg:  #a678ff
--dim: #a678ffaa
--line: #a678ff33
--accent: #a678ff
```

Texture: soft diagonal light-streak gradient, 100° angle, no hard edges.

**Marketing Thesis — ledger**

```
--bg:  #0a0f1a
--fg:  #7ab8ff
--dim: #7ab8ffaa
--line: #7ab8ff33
--accent: #7ab8ff
```

Texture: 24px grid lines at 8% opacity — the one category allowed to look like a spreadsheet/ledger, because the content (strategy, numbers, sequencing) earns it.

### 1.3 Typography

| Role | Typeface | Where it's used | Notes |
| --- | --- | --- | --- |
| Display | Archivo Black | Hero name, category H1s, big numerals | Uppercase, tight tracking (-0.02em), never below 24px |
| Body / UI | Space Grotesk | Paragraphs, nav, card copy | Weights 400/500/700 only |
| Utility / mono | JetBrains Mono | Metadata bar, labels, tags, captions | Always uppercase for labels, sentence case for real data (timestamps, locations) |
| Accent serif | Instrument Serif (italic) | ONE pull-quote/thesis line per page, max | If it appears twice on one page, cut one instance |

Type scale (rem, 16px base):

```
Display XL   9.5rem  (clamp to 4rem on mobile)
Display L    3.5rem
Display M    2.2rem
Body         0.95rem
Caption/mono 0.7rem
```

### 1.4 Layout

- 12-column grid, 32px outer gutter desktop / 16px mobile
- Hairline borders only (1px, `--line` color) — zero border-radius above 4px anywhere, including buttons and tags
- No drop shadows. No gradients except the Motion category's signature texture.
- Section rhythm: metadata top bar → hero → section label → content grid → footer, repeated per route

### 1.5 Signature element

The theme-transition itself. When a visitor moves from `/` to `/dev`, the shell doesn't cut to green — it crossfades bg/fg/accent over 400-600ms (`cubic-bezier(.16,.84,.32,1)`, already scaffolded in the prototype's CSS transitions). This is the one moment of visual flourish the whole site is allowed; keep everything else disciplined so this doesn't get lost in competing motion.

---

## 2. Technical architecture

### 2.1 Stack

- Next.js 14+, App Router
- Theme state: set `data-theme="dev"` etc. on `<html>` **server-side** per route (via route segment config or a layout-level lookup), so there is zero flash-of-wrong-theme on load. Do not do this as a client-side `useEffect` — that causes a visible flicker on first paint.
- CSS custom properties defined per `[data-theme]` selector in a single global stylesheet — theme swap is one attribute change, not a re-render of styled components.
- Tailwind for spacing/layout utilities only. Colors come from the CSS variables above, referenced as `bg-[var(--bg)]` etc. — do not hardcode Tailwind palette colors anywhere.
- Animation: Framer Motion for component-level reveals, GSAP ScrollTrigger if scroll-scrubbed effects are needed (Motion category especially).

### 2.2 File/route structure

```
/app
  /layout.tsx           — shell: topbar, footer, theme resolution
  /page.tsx             — homepage, category grid, hover-preview (neutral shell)
  /dev/page.tsx
  /design/page.tsx
  /photography/page.tsx
  /motion/page.tsx
  /marketing/page.tsx
/components
  /Topbar.tsx
  /Footer.tsx
  /CategoryGrid.tsx      — homepage only
  /dev/ProjectCard.tsx    — dev-specific, terminal-styled
  /design/PosterGrid.tsx  — design-specific
  /photography/PhotoGrid.tsx
  /motion/VideoCard.tsx
  /marketing/CaseStudySection.tsx
/lib
  /theme.ts               — theme token map, one object per category
/public
  /photography/           — 20 exported images
  /motion/                — video files + poster frames
  /design/                — design assets
```

Component naming intentionally namespaced per category (`dev/ProjectCard` vs `design/PosterGrid`) rather than one shared `ProjectCard` — this is the enforcement mechanism against the "one card, five colors" failure mode.

### 2.3 Theme resolution logic

```ts
// lib/theme.ts
export const themes = {
  neutral: { bg: '#0b0b0c', fg: '#ededea', dim: '#6e6e6e', line: 'rgba(237,237,234,0.14)', accent: '#0b0b0c' },
  dev:      { bg: '#0b1f14', fg: '#78ffb4', dim: '#78ffb4aa', line: '#78ffb433', accent: '#78ffb4' },
  design:   { bg: '#1a0a06', fg: '#ff5a2b', dim: '#ff5a2baa', line: '#ff5a2b33', accent: '#ff5a2b' },
  photography: { bg: '#0a0a0a', fg: '#f2f2f2', dim: '#f2f2f2aa', line: '#f2f2f233', accent: '#f2f2f2' },
  motion:   { bg: '#140a1f', fg: '#a678ff', dim: '#a678ffaa', line: '#a678ff33', accent: '#a678ff' },
  marketing:{ bg: '#0a0f1a', fg: '#7ab8ff', dim: '#7ab8ffaa', line: '#7ab8ff33', accent: '#7ab8ff' },
};
```

Each `layout.tsx` at the route-segment level reads its segment name, looks up the theme, and injects `data-theme` on a wrapping element server-side.

---

## 3. Per-category page specs

### 3.1 `/dev` — Development & AI

- Layout: single column, terminal-log feel. Each project renders like command output: `$ atlas --status` followed by the description block.
- 4 project cards: Atlas (finance trading AI analyser), JEE multi-user tracker, + 2 more (pending from Atharv).
- Each card: title, one-paragraph description (Atharv-written, not generated), stack tags (mono, bordered pills), one real metric where available, screenshot/terminal-output image.
- Micro-interaction: blinking cursor character after the last line of the page, CSS-only, respects `prefers-reduced-motion`.

### 3.2 `/design` — Design

- Layout: asymmetric full-bleed image grid, 8-12 pieces max, ranked by Atharv not chronology.
- At least one full-width type-over-photo collision moment (the Weeknd-reference move belongs here specifically).
- Minimal caption per piece: title + one line of context, mono, small.

### 3.3 `/photography` — Photography

- Layout: full-bleed grid or vertical scroll of 20 images, near-zero chrome.
- Caption: location + year only, appears on hover/focus, not persistent overlay.
- No color anywhere on this page except the images themselves — this is intentional restraint, not a missing feature.

### 3.4 `/motion` — Motion Graphics

- Layout: 3-4 video cards, autoplay muted on hover/inview, static poster-frame otherwise.
- Lazy-load videos; never autoplay all simultaneously on page load (performance + it looks chaotic).
- If any of the 3-4 videos isn't export-ready, ship the poster frame with a visible "in progress" mono label rather than a broken player.

### 3.5 `/marketing` — Marketing Thesis

- Layout: long-form, sequential, numbered (`01 / 02 / 03`) — the one category where numbering is earned because the content is genuinely a sequence (insight → strategy → execution).
- Opens with an explicit framing line: these are strategic case-study exercises, not executed agency campaigns. State it directly, don't imply otherwise.
- Flagship: Protein Pantry — "The Chaap Report Card" / "Ghar Ka Chaap," framed as "Get Noticed" / "Get Loved" paired territories.

---

## 4. Animation spec (build as its own pass, Stage 3 — see staged-build-plan.md)

- Homepage hero: one orchestrated load sequence (name mark settles in, thesis line fades up after, ~150ms stagger). Not five separate fade-ins firing independently.
- Scroll reveals: stagger children by ~60-80ms, trigger at 20% viewport entry, translate-y 12px → 0, opacity 0 → 1. Nothing more elaborate than that — this is a place to be quiet.
- Theme crossfade: 400-600ms, `cubic-bezier(.16,.84,.32,1)`, applies to `--bg`, `--fg`, `--accent`, `--line` simultaneously.
- Cursor-follow label (desktop only, optional): small mono tag near the pointer reading "View project" on hoverable cards. Build it, look at it, cut it if it reads as gimmicky rather than premium.
- Respect `prefers-reduced-motion: reduce` globally — reveals become instant opacity swaps, no translate.

---

## 5. Guardrails — what NOT to let Antigravity default to

- No rounded cards, no soft drop-shadows, no gradient-accent hero — that's the generic AI-portfolio template look.
- No single shared `ProjectCard` component reused with a color prop across all five categories — namespace components per category (see 2.2).
- No `/01 /02 /03` numbering on the homepage grid — five parallel categories are not a sequence.
- No more than one Instrument Serif line per page.
- No overstated claims on `/marketing` — ideation-level work must read as ideation-level work.
- No autoplaying all `/motion` videos at once on page load.

---

## 6. QA checklist before calling any stage done

- [ ] Zero flash-of-wrong-theme on hard refresh of any category route
- [ ] Keyboard focus visible on every interactive element
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile: grid collapses cleanly, video cards don't autoplay on mobile (data cost)
- [ ] Lighthouse: images lazy-loaded, videos lazy-loaded with poster frames
- [ ] Cross-browser check specifically on the `data-theme` CSS variable mechanism (Safari has historically been the flaky one for CSS custom property transitions)
