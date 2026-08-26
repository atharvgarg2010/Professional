'use client';

import { useState } from 'react';
import DesignParallaxHero from './DesignParallaxHero';
import DesignMasonryGrid from './DesignMasonryGrid';
import Image from 'next/image';

const designs = [
  { id: 1, title: 'Ladakh (Portrait)', subtitle: 'Editorial Design', image: '/design/ladakh-1.jpg' },
  { id: 2, title: 'Ladakh (Statue)', subtitle: 'Visual System', image: '/design/ladakh-2.jpg' },
  { id: 3, title: 'The Weeknd', subtitle: 'Concert Poster', image: '/design/weeknd.jpg' },
  { id: 4, title: 'Dil Chahta Hai', subtitle: 'Movie Poster', image: '/design/dch.jpg' },
  { id: 5, title: 'Metronexus', subtitle: 'Imaginative Art', image: '/design/metronexus.jpg' },
  { id: 6, title: 'Zytraxen', subtitle: 'Apparel Design', image: '/zytraxen.png' },
];

export default function DesignClient() {
  const [selectedDesign, setSelectedDesign] = useState<any | null>(null);

  // Close detail view when pressing escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedDesign(null);
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none' }}>
      
      {/* 1. The 300vh Scroll Parallax Hero */}
      <DesignParallaxHero />

      {/* Premium Header */}
      <div style={{ maxWidth: '1536px', margin: '0 auto', padding: '12rem 2rem 6rem' }}>
        <h1 
          style={{ 
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 600,
            color: 'var(--fg)',
            margin: 0,
            letterSpacing: '-0.03em'
          }}
        >
          Selected Works
        </h1>
        <p className="mono-label" style={{ color: 'var(--dim)', marginTop: '1.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
          A CURATED SELECTION OF EDITORIAL DESIGN, VISUAL SYSTEMS, AND DIGITAL ARTWORK.
        </p>
      </div>

      {/* Masonry Grid Gallery */}
      <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
        <DesignMasonryGrid 
          designs={designs}
          onDesignClick={(design) => {
            setSelectedDesign(design);
            // Lock body scroll when modal opens
            document.body.style.overflow = 'hidden';
          }} 
        />
      </div>

      {/* 3. Detail View Overlay (Fullscreen Modal) */}
      {selectedDesign && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Topbar of the modal */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '2rem',
              alignItems: 'center',
              borderBottom: '1px solid var(--border)'
            }}
          >
            <div style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontWeight: 600, color: 'var(--fg)' }}>
              {selectedDesign.title}
            </div>
            <button
              onClick={() => {
                setSelectedDesign(null);
                document.body.style.overflow = '';
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              [ CLOSE ]
            </button>
          </div>

          {/* Main content of the modal */}
          <div 
            style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '2rem',
              overflowY: 'auto'
            }}
          >
            {/* The full size design (placeholder) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
              <div 
                style={{
                  width: '100%',
                  height: '75vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {selectedDesign?.image ? (
                  <Image
                    src={selectedDesign.image}
                    alt={selectedDesign.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{ opacity: 0.1, fontSize: '10rem', fontFamily: 'var(--font-mono)' }}>
                    [IMAGE]
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem', textAlign: 'center' }}>
                <div style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontSize: '2rem', color: 'var(--fg)' }}>
                  {selectedDesign.title}
                </div>
                <div style={{ color: 'var(--dim)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
                  {selectedDesign.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
