'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface DesignItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

interface DesignMasonryGridProps {
  designs: DesignItem[];
  onDesignClick: (design: DesignItem, index: number) => void;
}

export default function DesignMasonryGrid({ designs, onDesignClick }: DesignMasonryGridProps) {
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
        .design-masonry {
          column-count: 3;
          column-gap: 24px;
          padding: 0 2rem 6rem;
          width: 100%;
        }
        @media (max-width: 1024px) {
          .design-masonry { column-count: 2; padding: 0 2rem 4rem; }
        }
        @media (max-width: 640px) {
          .design-masonry { column-count: 1; padding: 0 1.5rem 4rem; }
        }

        /* ─── Each item ───────────────────────────────────────────────── */
        @keyframes fadeUpDesign {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .design-item {
          break-inside: avoid;
          -webkit-column-break-inside: avoid;
          margin-bottom: 32px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          width: 100%;
          text-align: left;
          opacity: 0;
          outline: none;
        }
        
        /* Only run animation once the grid is revealed */
        .design-masonry.revealed .design-item {
          animation: fadeUpDesign 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Stagger the first few items for a cascading load effect */
        .design-masonry.revealed .design-item:nth-child(1) { animation-delay: 0.1s; }
        .design-masonry.revealed .design-item:nth-child(2) { animation-delay: 0.2s; }
        .design-masonry.revealed .design-item:nth-child(3) { animation-delay: 0.3s; }
        .design-masonry.revealed .design-item:nth-child(4) { animation-delay: 0.4s; }
        .design-masonry.revealed .design-item:nth-child(n+5) { animation-delay: 0.5s; }

        .design-item:focus-visible .design-img-wrapper {
          outline: 2px solid var(--fg);
          outline-offset: 4px;
        }

        /* ─── Image wrapper ───────────────────────────────────────────── */
        .design-img-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 8px;
          background-color: var(--border);
          display: block;
          /* Remove aspect-ratio trick to let image define height naturally */
        }

        /* ─── The image itself ────────────────────────────────────────── */
        .design-img-wrapper img {
          display: block;
          width: 100%;
          height: auto;
          transition: transform 0.5s cubic-bezier(.16,.84,.32,1), filter 0.5s;
          will-change: transform;
        }
        
        .design-item:hover .design-img-wrapper img {
          transform: scale(1.03);
          filter: brightness(0.9);
        }

        /* ─── Text metadata ───────────────────────────────────────────── */
        .design-meta {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
      `}</style>

      <div ref={gridRef} className={`design-masonry ${isRevealed ? 'revealed' : ''}`}>
        {designs.map((design, i) => (
          <button
            key={design.id}
            className="design-item"
            onClick={() => onDesignClick(design, i)}
            aria-label={design.title}
          >
            <div className="design-img-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={design.image}
                alt={design.title}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
            <div className="design-meta">
              <h3 style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontSize: '1.25rem', fontWeight: 500, color: 'var(--fg)', margin: 0 }}>
                {design.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--dim)', margin: 0 }}>
                {design.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
