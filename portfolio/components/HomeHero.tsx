'use client';

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { MouseEvent } from 'react';

export default function HomeHero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 70, damping: 20 }
    },
  };

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section 
      onMouseMove={handleMouseMove}
      style={{ 
        position: 'relative', 
        padding: '12rem 2rem 8rem', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '80vh'
      }}
      className="group"
    >
      {/* ── Interactive Cursor Spotlight ── */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              color-mix(in srgb, var(--fg) 8%, transparent),
              transparent 80%
            )
          `,
          zIndex: 1
        }}
      />

      {/* Ambient Breathing Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vw',
          maxWidth: '1000px',
          maxHeight: '1000px',
          background: 'radial-gradient(circle, color-mix(in srgb, var(--fg) 20%, transparent) 0%, transparent 60%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={{ maxWidth: '1536px', margin: '0 auto', position: 'relative', zIndex: 10 }}
      >
        {/* ── Massive Background Portrait Layer ── */}
        {/* This is positioned behind the text, waiting for your 'hero-portrait.png' */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            x: '-50%',
            y: yParallax,
            width: '100%',
            height: '120%',
            maxWidth: '800px',
            zIndex: 0,
            pointerEvents: 'none',
            // Linear gradient fades the bottom of the image into the background
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          }}
        >
          <div 
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/hero-portrait.png")', // <--- Name your PNG this and drop it in public!
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'grayscale(50%) contrast(1.1)', // Makes it blend cooler with the theme
            }}
          />
        </motion.div>

        {/* Status / Location Pill */}
        <motion.div 
          variants={item}
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'color-mix(in srgb, var(--fg) 3%, transparent)',
            border: '1px solid color-mix(in srgb, var(--fg) 10%, transparent)',
            borderRadius: '999px',
            marginBottom: '3rem',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <span className="mono-label" style={{ color: 'var(--fg)' }}>DELHI, IN</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--dim)' }} />
          <span className="mono-label" style={{ color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2ecc71', boxShadow: '0 0 10px #2ecc71' }} />
            AVAILABLE
          </span>
        </motion.div>

        {/* Massive Name */}
        <motion.h1
          variants={item}
          style={{ 
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontWeight: 700,
            color: 'var(--fg)', 
            marginBottom: '2rem',
            letterSpacing: '-0.06em',
            lineHeight: 0.9,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
          }}
        >
          ATHARV
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={item}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: 'var(--dim)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 4rem',
            position: 'relative',
            zIndex: 10
          }}
        >
          Sixteen, building things that <span style={{ color: 'var(--fg)' }}>deserve to exist.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}
