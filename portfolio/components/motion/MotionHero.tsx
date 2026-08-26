'use client';

import { motion } from 'framer-motion';

export default function MotionHero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: '120%', filter: 'blur(10px)' },
    show: {
      y: '0%',
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 60, damping: 20 },
    },
  };

  return (
    <section className="hairline-b relative overflow-hidden" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8rem 2rem 4rem' }}>
      
      {/* Abstract Background Elements */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.05), transparent)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1536px', margin: '0 auto', width: '100%', zIndex: 1 }}>
        <p className="mono-label" style={{ color: 'var(--accent)', marginBottom: '3rem', letterSpacing: '0.1em' }}>
          MOTION & COMPOSITION
        </p>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h1
            style={{ 
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              fontWeight: 800,
              color: 'var(--fg)',
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
              <motion.span variants={item} style={{ display: 'inline-block', transformOrigin: 'left' }}>FRAME RATE</motion.span>
            </div>
            <div style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
              <motion.span variants={item} style={{ display: 'inline-block', color: 'var(--dim)', transformOrigin: 'left' }}>AS MEDIUM.</motion.span>
            </div>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-body"
          style={{ color: 'var(--dim)', maxWidth: '52ch', marginTop: '4rem', fontSize: '1.25rem', lineHeight: 1.6 }}
        >
          A curated selection of high-energy motion graphics, teaser compositions, and visual narratives. Hover any card below to play.
        </motion.p>
      </div>
    </section>
  );
}
