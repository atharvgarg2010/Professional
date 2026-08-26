'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const contacts = [
  { id: 'email', title: 'EMAIL', value: 'gargatharv2010@gmail.com', link: 'mailto:gargatharv2010@gmail.com', bg: '#0a0a0a', fg: '#ffffff', accent: '#78ffb4' },
  { id: 'github', title: 'GITHUB', value: 'atharvgarg2010', link: 'https://github.com/atharvgarg2010', bg: '#f2f2f2', fg: '#0a0a0a', accent: '#ff5a2b' },
  { id: 'instagram', title: 'INSTAGRAM', value: '@atharv.garg10', link: 'https://instagram.com/atharv.garg10', bg: '#1a0503', fg: '#ffffff', accent: '#a678ff' },
  { id: 'phone', title: 'PHONE', value: '+91 9310239359', link: 'tel:+919310239359', bg: '#0b1f14', fg: '#ffffff', accent: '#7ab8ff' },
];

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Card 0 (Email)
  const y0 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['0vh', '-5vh', '-10vh', '-15vh']);
  const s0 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 0.95, 0.9, 0.85]);

  // Card 1 (GitHub)
  const y1 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['100vh', '0vh', '-5vh', '-10vh']);
  const s1 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 1, 0.95, 0.9]);

  // Card 2 (Instagram)
  const y2 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['100vh', '100vh', '0vh', '-5vh']);
  const s2 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 1, 1, 0.95]);

  // Card 3 (Phone)
  const y3 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], ['100vh', '100vh', '100vh', '0vh']);
  const s3 = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [1, 1, 1, 1]);

  const cards = [
    { y: y0, s: s0, data: contacts[0] },
    { y: y1, s: s1, data: contacts[1] },
    { y: y2, s: s2, data: contacts[2] },
    { y: y3, s: s3, data: contacts[3] },
  ];

  return (
    <div ref={containerRef} style={{ height: '400vh', position: 'relative', backgroundColor: 'var(--bg)' }}>
      {/* Sticky container that stays fixed while you scroll through the 400vh */}
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
          padding: '2rem'
        }}
      >
        
        {/* Background typographic noise */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.02,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(15rem, 30vw, 40rem)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            zIndex: 0
          }}
        >
          CONTACT
        </div>

        {cards.map((card, i) => (
          <motion.a
            href={card.data.link}
            target="_blank"
            rel="noopener noreferrer"
            key={card.data.id}
            style={{
              y: card.y,
              scale: card.s,
              position: 'absolute',
              top: '20vh',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: '100%',
              maxWidth: '900px',
              height: '60vh',
              backgroundColor: card.data.bg,
              color: card.data.fg,
              borderRadius: '2rem',
              padding: 'clamp(2rem, 5vw, 4rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transformOrigin: 'top center',
              boxShadow: '0 -20px 50px rgba(0,0,0,0.5)',
              border: `1px solid ${card.data.fg}20`,
              textDecoration: 'none',
              zIndex: i + 1
            }}
            className="group"
            whileHover={{ scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          >
            {/* Header: Title and Index */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-label" style={{ opacity: 0.9, letterSpacing: '0.05em' }}>
                0{i + 1} // {card.data.title}
              </span>
              
              {/* Animated Arrow */}
              <div 
                style={{ 
                  width: '3rem', 
                  height: '3rem', 
                  borderRadius: '50%', 
                  border: `1px solid ${card.data.fg}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div 
                  className="transition-transform duration-500 ease-out group-hover:translate-x-full group-hover:-translate-y-full absolute"
                  style={{ color: card.data.accent }}
                >
                  ↗
                </div>
                <div 
                  className="transition-transform duration-500 ease-out -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 absolute"
                  style={{ color: card.data.accent }}
                >
                  ↗
                </div>
              </div>
            </div>

            {/* Huge Value Text */}
            <div 
              style={{
                fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                fontSize: 'clamp(1.5rem, 4.5vw, 4rem)',
                fontWeight: 500,
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                wordBreak: 'break-word',
                transition: 'color 0.4s ease'
              }}
              className="group-hover:text-opacity-80"
            >
              {card.data.value}
            </div>

            {/* Footer detail */}
            <div className="mono-label" style={{ opacity: 0.8, letterSpacing: '0.05em' }}>
              CLICK TO OPEN LINK
            </div>
          </motion.a>
        ))}

      </div>
    </div>
  );
}
