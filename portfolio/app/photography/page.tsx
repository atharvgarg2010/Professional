import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AsciiCamera from '@/components/photography/AsciiCamera';
import PhotographyClient from '@/components/photography/PhotographyClient';

export const metadata: Metadata = {
  title: 'Photography — Atharv',
  description: 'Photography by Atharv, shot in Delhi and beyond.',
};

export default function PhotographyPage() {
  return (
    <PageShell>
      {/*
        ══════════════════════════════════════════════════════════════════════
        SECTION 1 — HERO
        Two-zone layout: left 55% title + description / right 45% ASCII camera.
        Desktop: side by side. Mobile: stacked (title first, camera below).
        Min height ~85vh — generous breathing room matching other category heroes.
        Outer gutter: 32px desktop, 16px mobile (build-brief.md 1.4).
        ══════════════════════════════════════════════════════════════════════
      */}
      {/*
        ══════════════════════════════════════════════════════════════════════
        SECTION 1 — HERO
        Redesigned to match SPADE aesthetic: centered large text, central 3D 
        camera graphic, floating data cards, and bottom description.
        ══════════════════════════════════════════════════════════════════════
      */}
      <section aria-labelledby="photography-title" className="photo-hero-wrapper">
        <style>{`
          .photo-hero-wrapper {
            padding: 1rem;
            background-color: var(--bg);
            position: relative;
          }
          
          /* Container styling matching the Spade reference */
          .photo-hero-container {
            background-color: var(--hero-bg, #f2f7ef);
            border-radius: 24px;
            min-height: 85vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            padding: 6rem 2rem 4rem;
            /* Optional border to separate from background */
            border: 1px solid var(--border);
          }
          
          /* Dark mode adaptation if the site uses it */
          @media (prefers-color-scheme: dark) {
            .photo-hero-container {
               --hero-bg: #1a1c19;
               --hero-fg: #eee;
            }
          }
          
          /* Subtle architectural grid to fill the emptiness */
          .photo-hero-container::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, var(--fg) 1px, transparent 1px),
              linear-gradient(to bottom, var(--fg) 1px, transparent 1px);
            background-size: 48px 48px;
            background-position: center center;
            opacity: 0.04; /* Very faint */
            /* Radial mask to fade out the grid at the edges */
            mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
            -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 80%);
            pointer-events: none;
            z-index: 0;
          }
          
          /* Soft glow behind the camera */
          .photo-hero-container::after {
            content: '';
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, var(--fg) 0%, transparent 70%);
            opacity: 0.03; /* Barely visible spotlight */
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;
          }
          
          /* Mobile Responsiveness */
          @media (max-width: 768px) {
            .photo-hero-wrapper {
              padding: 0.5rem;
            }
            .photo-hero-container {
              padding: 4rem 1rem 3rem;
              border-radius: 16px;
            }
          }
          
          /* Side tick marks from the reference */
          .photo-hero-wrapper::before,
          .photo-hero-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 12px;
            background-image: repeating-linear-gradient(to bottom, var(--border) 0, var(--border) 1px, transparent 1px, transparent 40px);
            opacity: 0.5;
            pointer-events: none;
          }
          @media (max-width: 768px) {
            .photo-hero-wrapper::before, .photo-hero-wrapper::after {
              display: none; /* Hide tick marks on small screens to save space */
            }
          }
          .photo-hero-wrapper::before { left: 0; }
          .photo-hero-wrapper::after { right: 0; }
          
          /* ─── Animations ─── */
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .photo-hero-title {
            font-family: "Helvetica Neue", Inter, Arial, sans-serif;
            font-size: clamp(2.5rem, 10vw, 6.5rem);
            line-height: 1.05;
            font-weight: 600;
            text-align: center;
            color: var(--hero-fg, var(--fg));
            max-width: 1000px;
            margin: 0 auto;
            letter-spacing: -0.05em;
            z-index: 10;
            opacity: 0;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .photo-hero-graphic-area {
            position: relative;
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            height: clamp(350px, 45vw, 600px);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: -2rem; /* Overlap title slightly */
            z-index: 1;
          }

          .photo-hero-object {
            width: 100%;
            height: 100%;
            max-width: 600px;
            pointer-events: none;
            /* Give AsciiCamera context to use the hero foreground color */
            --fg: var(--hero-fg, #111);
            opacity: 0;
            animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
          }

          /* Floating Cards */
          .floating-card {
            position: absolute;
            background-color: var(--bg);
            color: var(--fg);
            border: 1px solid var(--border);
            box-shadow: 0 8px 32px rgba(0,0,0,0.06);
            z-index: 10;
            opacity: 0;
          }
          
          .card-left {
            left: 5%;
            top: 45%;
            padding: 1.25rem;
            font-family: var(--font-mono, "JetBrains Mono", monospace);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            line-height: 1.6;
            min-width: 220px;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
          }
          
          .card-right {
            right: 5%;
            top: 35%;
            padding: 1.25rem 1.5rem;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            min-width: 220px;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
          }
          
          @media (max-width: 1024px) {
            .card-left, .card-right {
              display: none; /* Hide floating cards on smaller screens for cleaner layout */
            }
            .photo-hero-graphic-area {
              margin-top: 1rem;
            }
          }

          .photo-hero-desc {
            max-width: 480px;
            text-align: center;
            margin: 1rem auto 0;
            color: var(--dim);
            font-size: 1.1rem;
            line-height: 1.5;
            z-index: 10;
            opacity: 0;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
          }
          
          .photo-hero-button {
            margin-top: 2rem;
            padding: 0.75rem 1.5rem;
            background-color: var(--hero-fg, #111);
            color: var(--hero-bg, #f2f7ef);
            border: none;
            border-radius: 6px;
            font-family: var(--font-mono, "JetBrains Mono", monospace);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: opacity 0.2s, transform 0.2s;
            z-index: 10;
            opacity: 0;
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards;
          }
          .photo-hero-button:hover {
            opacity: 0.8;
            transform: translateY(-2px);
          }
        `}</style>

        <div className="photo-hero-container">
          
          {/* Centered large title */}
          <h1 id="photography-title" className="photo-hero-title">
            The light & shadows for modern vision
          </h1>

          {/* Central graphic area with floating cards */}
          <div className="photo-hero-graphic-area">
            
            {/* Left Floating Card */}
            <div className="floating-card card-left">
              <div style={{ color: 'var(--dim)', marginBottom: '0.75rem', fontSize: '0.65rem' }}>
                ▸ CAMERA SETUP
              </div>
              <div style={{ marginBottom: '0.25rem' }}>NIKON D5100</div>
              <div style={{ marginTop: '1rem', color: 'var(--dim)', fontSize: '0.65rem' }}>
                ▸ LOCATION
              </div>
              <div style={{ marginTop: '0.25rem' }}>DELHI</div>
            </div>

            {/* The ASCII Camera */}
            <div className="photo-hero-object" aria-hidden="true">
              <AsciiCamera />
            </div>

            {/* Right Floating Card */}
            <div className="floating-card card-right">
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                 <div style={{ 
                   width: '32px', 
                   height: '32px', 
                   backgroundColor: 'var(--hero-fg, #111)', 
                   borderRadius: '6px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   color: 'var(--hero-bg, #f2f7ef)'
                 }}>
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <circle cx="12" cy="12" r="10"/>
                     <circle cx="12" cy="12" r="4"/>
                   </svg>
                 </div>
                 <div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--dim)', fontFamily: 'var(--font-sans, system-ui)' }}>Exposure</div>
                   <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--dim)' }}>EXIF DATA</div>
                 </div>
               </div>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: 'var(--font-mono)' }}>
                 <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1/1000s</span>
               </div>
               <div style={{ fontSize: '0.85rem', color: 'var(--dim)', fontFamily: 'var(--font-mono)', marginTop: '0.25rem' }}>
                 f/2.8 &nbsp;•&nbsp; ISO 160
               </div>
            </div>
          </div>

          {/* Bottom description and button */}
          <p className="photo-hero-desc">
            Atharv takes messy light and turns it into structured, verified records — with an eye that helps you see it everywhere it matters.
          </p>
          
          <a href="#photography-grid" className="photo-hero-button" style={{ textDecoration: 'none', display: 'inline-block' }}>
            View Gallery
          </a>
          
        </div>
      </section>

      {/*
        ══════════════════════════════════════════════════════════════════════
        SECTION 2 — MASONRY GRID + DETAIL VIEW
        PhotographyClient owns the open/close state and renders both.
        Section padding matches section-rhythm from build-brief.md.
        ══════════════════════════════════════════════════════════════════════
      */}
      <section
        id="photography-grid"
        aria-label="Photography grid"
        style={{ flex: 1, paddingTop: '4rem' }}
      >
        <style>{`
          @media (max-width: 767px) {
            section[aria-label="Photography grid"] {
              padding-top: 2.5rem !important;
            }
          }
        `}</style>
        <PhotographyClient />
      </section>

    </PageShell>
  );
}
