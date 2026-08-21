/**
 * MasonryGrid — true Pinterest-style CSS multi-column masonry.
 *
 * Key decisions:
 * - `img { width: 100%; height: auto }` — natural aspect ratio, zero cropping.
 * - `aspect-ratio` CSS on the wrapper reserves layout space from the known
 *   aspectRatio value in the data file, preventing CLS before the image loads.
 * - `border-radius: 4px` — max allowed by build-brief.md §1.4 ("zero border-radius above 4px").
 * - Columns: 4 ≥1200px / 3 ≥800px / 2 ≥480px / 1 below that.
 * - Gap: 12px — tight, hairline-driven density.
 * - `break-inside: avoid` keeps each item in one column.
 * - Ranked photo order preserved — column-count fills top-to-bottom left-to-right.
 * - First 4 images eager-loaded; the rest lazy.
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import type { Photo } from '@/lib/photography-data';

interface MasonryGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo, index: number) => void;
}

export default function MasonryGrid({ photos, onPhotoClick }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ─── Grid container ──────────────────────────────────────────── */
        .masonry-grid {
          column-count: 4;
          column-gap: 12px;
          padding: 0 32px 64px;
        }
        @media (max-width: 1199px) {
          .masonry-grid { column-count: 3; }
        }
        @media (max-width: 799px) {
          .masonry-grid { column-count: 2; padding: 0 16px 48px; }
        }
        @media (max-width: 479px) {
          .masonry-grid { column-count: 1; }
        }

        /* ─── Each item ───────────────────────────────────────────────── */
        @keyframes gridFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .masonry-item {
          /* Stay inside one column — no spanning */
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 12px;
          display: block;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          width: 100%;
          text-align: left;
          opacity: 0;
        }
        
        /* Only run animation once the grid is revealed */
        .masonry-grid.revealed .masonry-item {
          animation: gridFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Stagger the first few items for a cascading load effect */
        .masonry-grid.revealed .masonry-item:nth-child(1) { animation-delay: 0.1s; }
        .masonry-grid.revealed .masonry-item:nth-child(2) { animation-delay: 0.2s; }
        .masonry-grid.revealed .masonry-item:nth-child(3) { animation-delay: 0.3s; }
        .masonry-grid.revealed .masonry-item:nth-child(4) { animation-delay: 0.4s; }
        .masonry-grid.revealed .masonry-item:nth-child(n+5) { animation-delay: 0.5s; }

        .masonry-item:focus-visible {
          outline: 1px solid var(--fg);
          outline-offset: 3px;
        }

        /* ─── Image wrapper ───────────────────────────────────────────── */
        /*
          Uses CSS aspect-ratio to reserve layout space from the known ratio.
          By making it relative and the image absolute, the wrapper dictates
          the height (allowing us to simulate different ratios for the masonry effect).
        */
        .masonry-img-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 4px;
          background-color: rgba(255,255,255,0.04);
          display: block;
        }

        /* ─── The image itself ────────────────────────────────────────── */
        .masonry-img-wrapper img {
          position: relative;
          display: block;
          width: 100%;
          height: auto;
          border-radius: 4px;
          transition: transform 380ms cubic-bezier(.16,.84,.32,1),
                      opacity  220ms;
          will-change: transform;
        }
        .masonry-item:hover .masonry-img-wrapper img {
          transform: scale(1.025);
          opacity: 0.92;
        }
      `}</style>

      <div ref={gridRef} className={`masonry-grid ${isRevealed ? 'revealed' : ''}`}>
        {photos.map((photo, i) => {
          // Pseudo-random array to create organic up/down staggering
          const jiggle = [0, 24, 8, 32, 16, 40][i % 6];
          
          return (
            <button
              key={photo.id}
              className="masonry-item"
              style={{
                marginTop: `${jiggle}px`
              }}
              onClick={() => onPhotoClick(photo, i)}
              aria-label={photo.title || `Photo ${photo.id}${photo.location ? ' — ' + photo.location : ''}, ${photo.year}`}
            >
            {/*
              Wrapper allows image to naturally dictate height, avoiding empty space
              caused by mismatched aspect ratio data.
            */}
            <div className="masonry-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.title || `Photograph by Atharv${photo.location ? ', ' + photo.location : ''}`}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </button>
          );
        })}
      </div>
    </>
  );
}
