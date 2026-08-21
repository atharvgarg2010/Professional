'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function DesignParallaxHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through this 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Main rotation for the circle of cards
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  
  // Scale the whole group up as you scroll down
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 2.5, 4]);
  
  // Fade out the hero towards the end of the scroll so the next section is visible
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Updated user designs for the revolving cards
  const cards = [
    { id: 1, title: 'Ladakh (Portrait)', image: '/design/ladakh-1.jpg', angle: 0 },
    { id: 2, title: 'Ladakh (Statue)', image: '/design/ladakh-2.jpg', angle: 72 },
    { id: 3, title: 'The Weeknd', image: '/design/weeknd.jpg', angle: 144 },
    { id: 4, title: 'Dil Chahta Hai', image: '/design/dch.jpg', angle: 216 },
    { id: 5, title: 'Metronexus', image: '/design/metronexus.jpg', angle: 288 },
  ];

  return (
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg)'
        }}
      >
        {/* The Text Content */}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p className="mono-label" style={{ color: 'var(--dim)', marginBottom: '1.5rem' }}>
            DESIGN
          </p>
          <h1
            style={{ 
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontSize: 'clamp(3rem, 12vw, 10rem)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--fg)',
              margin: '0',
            }}
          >
            WORK
          </h1>
          <p className="mono-label" style={{ color: 'var(--dim)', marginTop: '2rem' }}>
            SCROLL TO EXPLORE
          </p>
        </div>

        {/* The Revolving Cards */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            rotate,
            scale,
            opacity,
            pointerEvents: 'none', // let clicks pass through to text if needed
          }}
        >
          {cards.map((card, i) => {
            // Distance from center
            const radius = '40vh'; 
            return (
              <motion.div
                key={card.id}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '380px',
                  backgroundColor: 'var(--bg)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--fg)',
                  fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  padding: '2rem',
                  overflow: 'hidden',
                  // Position in a circle
                  transform: `rotate(${card.angle}deg) translateY(-${radius}) rotate(-${card.angle}deg)`,
                }}
              >
                {/* Background Image */}
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover', zIndex: 0 }}
                    sizes="300px"
                  />
                )}
                
                {/* Dark overlay for low exposure */}
                {card.image && (
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      zIndex: 1
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
