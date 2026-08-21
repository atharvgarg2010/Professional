'use client';

import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Photo } from '@/lib/photography-data';

interface HorizontalScrollerProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo, index: number) => void;
}

export default function HorizontalScroller({ photos, onPhotoClick }: HorizontalScrollerProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // The scroll target is the outer wrapper that has height: 300vh
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setScrollRange(entry.target.scrollWidth - window.innerWidth);
      }
    });

    observer.observe(carouselRef.current);
    
    return () => observer.disconnect();
  }, [photos]);

  // Map scroll progress to exact pixel movement to avoid calc() interpolation errors in Framer Motion
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  // Track total distance dragged to distinguish between a click and a drag
  const dragDistance = useRef(0);

  const handleMouseDown = (e: ReactMouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const deltaX = startX - e.pageX;
    dragDistance.current += Math.abs(deltaX);
    // Force 'instant' behavior to override any global smooth scrolling CSS which causes severe friction
    window.scrollBy({ top: deltaX * 3.5, behavior: 'instant' }); 
    setStartX(e.pageX);
  };

  return (
    <div ref={targetRef} style={{ height: '400vh', position: 'relative' }}>
      <div 
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          overflow: 'hidden',
          backgroundColor: 'var(--bg)',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <motion.div 
          ref={carouselRef}
          style={{ x, display: 'flex', gap: '4rem', padding: '0 4rem' }}
          className="items-center"
        >
          {/* Intro block */}
          <div style={{ flex: '0 0 auto', width: '300px', marginRight: '4rem' }}>
            <h2 style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontSize: '3rem', fontWeight: 600, color: 'var(--fg)', lineHeight: 1 }}>
              SELECTED<br/>ARCHIVE
            </h2>
            <p className="mono-label" style={{ color: 'var(--dim)', marginTop: '1rem' }}>
              SCROLL TO EXPLORE →
            </p>
          </div>

          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              onClick={(e) => {
                if (dragDistance.current > 10) {
                  e.preventDefault();
                  return;
                }
                onPhotoClick(photo, i);
              }}
              whileHover={{ scale: 0.98 }}
              style={{
                flex: '0 0 auto',
                height: '60vh', // Fixed height so all images align perfectly
                width: 'auto',  // Let the image dictate its natural width
                position: 'relative',
                border: 'none',
                background: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
              }}
            >
              <div style={{ 
                height: '100%', 
                width: 'auto', // The div matches the image width
                position: 'relative', 
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title || 'Photograph'}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  draggable={false}
                  style={{ height: '100%', width: 'auto', display: 'block' }} // Image defines width based on 60vh height
                />
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%' }}>
                <div style={{ fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif', fontSize: '1.25rem', fontWeight: 600, color: 'var(--fg)' }}>
                  {photo.title || `Photograph ${String(i + 1).padStart(2, '0')}`}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--dim)', marginTop: '0.5rem' }}>
                  {photo.location} — {photo.year}
                </div>
              </div>
            </motion.button>
          ))}
          
          {/* Outro block so it doesn't just cut off */}
          <div style={{ flex: '0 0 10vw' }} />
        </motion.div>
      </div>
    </div>
  );
}
