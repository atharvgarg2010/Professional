/**
 * DetailView — full-screen photo detail lightbox.
 *
 * - Image dominant (60-70% desktop), info panel beside / below on mobile
 * - Title, description, details block — only rendered if data is supplied
 * - URL hash updates per photo: /photography#photo-01
 * - Back-button closes via popstate
 * - Escape key closes
 * - Left/Right arrow keys navigate prev/next
 * - Visible close control (×) — not click-outside alone
 * - Near-black scrim, no border-radius, no card border, no shadows
 * - Transition: quick crossfade ~300ms
 */
'use client';

import { useEffect, useCallback } from 'react';
import type { Photo } from '@/lib/photography-data';

interface DetailViewProps {
  photos:     Photo[];
  current:    number;           // index into photos array
  onClose:    () => void;
  onNavigate: (index: number) => void;
}

export default function DetailView({ photos, current, onClose, onNavigate }: DetailViewProps) {
  const photo = photos[current];
  const hasPrev = current > 0;
  const hasNext = current < photos.length - 1;

  // ── URL hash management ──────────────────────────────────────────────────
  useEffect(() => {
    const hash = `#photo-${photo.id}`;
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
    return () => {
      // On unmount, clear hash if it still matches this photo
      if (window.location.hash === hash) {
        window.history.pushState(null, '', window.location.pathname);
      }
    };
  }, [photo.id]);

  // ── Back-button closes ────────────────────────────────────────────────────
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, [onClose]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')      { onClose(); }
    if (e.key === 'ArrowRight' && hasNext) { onNavigate(current + 1); }
    if (e.key === 'ArrowLeft'  && hasPrev) { onNavigate(current - 1); }
  }, [onClose, onNavigate, current, hasPrev, hasNext]);

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  // ── Body scroll lock ──────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <style>{`
        .detail-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: rgba(8,8,8,0.96);
          display: flex;
          flex-direction: column;
          animation: detail-fade-in 300ms cubic-bezier(.16,.84,.32,1) both;
        }
        @keyframes detail-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .detail-inner {
          flex: 1;
          display: flex;
          align-items: center;
          overflow: hidden;
          gap: 0;
        }
        .detail-image-zone {
          flex: 0 0 65%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 56px 24px 24px 32px;
        }
        .detail-image-zone img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          display: block;
          /* No border-radius, no shadow */
        }
        .detail-info-zone {
          flex: 0 0 35%;
          height: 100%;
          overflow-y: auto;
          padding: 72px 32px 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border-left: 1px solid var(--line);
        }
        .detail-topbar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          border-bottom: 1px solid var(--line);
          z-index: 10;
        }
        .detail-close-btn {
          background: none;
          border: none;
          color: var(--fg);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 0.4rem 0.8rem;
          opacity: 0.7;
          transition: opacity 150ms;
          border: 1px solid var(--line);
        }
        .detail-close-btn:hover { opacity: 1; }
        .detail-nav-btn {
          background: none;
          border: none;
          color: var(--fg);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          cursor: pointer;
          padding: 0.4rem 0.8rem;
          opacity: 0.5;
          transition: opacity 150ms;
          border: 1px solid transparent;
        }
        .detail-nav-btn:not(:disabled):hover { opacity: 1; border-color: var(--line); }
        .detail-nav-btn:disabled { opacity: 0.18; cursor: default; }
        .detail-counter {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--dim);
        }
        .detail-scrim {
          position: absolute;
          inset: 0;
          z-index: -1;
        }

        /* Mobile stacking */
        @media (max-width: 767px) {
          .detail-inner {
            flex-direction: column;
            overflow-y: auto;
          }
          .detail-image-zone {
            flex: 0 0 auto;
            height: auto;
            width: 100%;
            padding: 56px 16px 0;
          }
          .detail-image-zone img {
            width: 100%;
            height: auto;
            max-height: 55vh;
          }
          .detail-info-zone {
            flex: 1 0 auto;
            height: auto;
            width: 100%;
            border-left: none;
            border-top: 1px solid var(--line);
            padding: 24px 16px 40px;
          }
          .detail-topbar {
            padding: 0 16px;
          }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="detail-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title || `Photo ${photo.id}`}
      >
        {/* Invisible scrim — click closes */}
        <div
          className="detail-scrim"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Top bar */}
        <div className="detail-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className="detail-nav-btn"
              onClick={() => hasPrev && onNavigate(current - 1)}
              disabled={!hasPrev}
              aria-label="Previous photo"
            >
              ← PREV
            </button>
            <span className="detail-counter">
              {current + 1} / {photos.length}
            </span>
            <button
              className="detail-nav-btn"
              onClick={() => hasNext && onNavigate(current + 1)}
              disabled={!hasNext}
              aria-label="Next photo"
            >
              NEXT →
            </button>
          </div>

          <button
            className="detail-close-btn"
            onClick={onClose}
            aria-label="Close photo detail"
            id="detail-close-btn"
            autoFocus
          >
            × CLOSE
          </button>
        </div>

        {/* Main content */}
        <div className="detail-inner">
          {/* Image */}
          <div className="detail-image-zone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.title || `Photograph by Atharv`}
              loading="eager"
            />
          </div>

          {/* Info panel */}
          <div className="detail-info-zone">
            {/* Title — only if supplied */}
            {photo.title && (
              <div>
                <h2
                  style={{
                    fontFamily:     'var(--font-display, "Archivo Black", sans-serif)',
                    fontSize:       'clamp(1.2rem, 2.5vw, 1.8rem)',
                    textTransform:  'uppercase',
                    letterSpacing:  '-0.02em',
                    color:          'var(--fg)',
                    lineHeight:     1.1,
                    marginBottom:   '0',
                  }}
                >
                  {photo.title}
                </h2>
              </div>
            )}

            {/* Description — only if supplied */}
            {photo.description && (
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body, "Space Grotesk", sans-serif)',
                    fontSize:   '0.92rem',
                    lineHeight: 1.65,
                    color:      'var(--fg)',
                    maxWidth:   '48ch',
                  }}
                >
                  {photo.description}
                </p>
              </div>
            )}

            {/* Placeholder label if neither title nor description */}
            {!photo.title && !photo.description && (
              <p
                style={{
                  fontFamily:   'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize:     '0.65rem',
                  textTransform:'uppercase',
                  letterSpacing:'0.08em',
                  color:        'var(--dim)',
                }}
              >
                [ TITLE + DESCRIPTION PENDING — SUPPLY IN lib/photography-data.ts ]
              </p>
            )}

            {/* Location / Year / EXIF details block */}
            <dl
              style={{
                display:      'grid',
                gridTemplateColumns: 'auto 1fr',
                gap:          '0.35rem 1.5rem',
                alignItems:   'baseline',
              }}
            >
              {photo.location && (
                <>
                  <dt style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dim)', whiteSpace: 'nowrap' }}>Location</dt>
                  <dd style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.7rem', color: 'var(--fg)', margin: 0 }}>{photo.location}</dd>
                </>
              )}
              {photo.year && (
                <>
                  <dt style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dim)' }}>Year</dt>
                  <dd style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.7rem', color: 'var(--fg)', margin: 0 }}>{photo.year}</dd>
                </>
              )}
              {photo.details?.camera && (
                <>
                  <dt style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dim)' }}>Camera</dt>
                  <dd style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.7rem', color: 'var(--fg)', margin: 0 }}>{photo.details.camera}</dd>
                </>
              )}
              {photo.details?.lens && (
                <>
                  <dt style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dim)' }}>Lens</dt>
                  <dd style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.7rem', color: 'var(--fg)', margin: 0 }}>{photo.details.lens}</dd>
                </>
              )}
              {photo.details?.settings && (
                <>
                  <dt style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--dim)' }}>Settings</dt>
                  <dd style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: '0.7rem', color: 'var(--fg)', margin: 0 }}>{photo.details.settings}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
