'use client';

import { motion } from 'framer-motion';

export default function MarketingHero() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    },
  };

  return (
    <section style={{ padding: '8rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background animated gradient / glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 0.5 }}
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, var(--fg) 0%, transparent 60%)',
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
        <motion.p 
          variants={item}
          className="mono-label" 
          style={{ 
            color: 'var(--dim)', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <motion.span 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ display: 'inline-block', fontSize: '1.2rem', color: 'var(--fg)' }}
          >
            ✺
          </motion.span>
          MARKETING THESIS
        </motion.p>
        
        <motion.h1
          variants={item}
          style={{ 
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 700,
            color: 'var(--fg)', 
            marginBottom: '2rem',
            letterSpacing: '-0.04em',
            lineHeight: 0.9
          }}
        >
          <span style={{ display: 'block', color: 'color-mix(in srgb, var(--fg) 40%, transparent)' }}>STRATEGIC</span>
          <span>THINKING</span>
        </motion.h1>

        {/* Framing disclaimer */}
        <motion.div
          variants={item}
          whileHover={{ x: 10, backgroundColor: 'color-mix(in srgb, var(--fg) 5%, transparent)' }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            padding: '1.5rem 2rem',
            maxWidth: '62ch',
            backgroundColor: 'color-mix(in srgb, var(--fg) 2%, transparent)',
            borderLeft: '4px solid var(--accent, var(--dim))',
            borderRadius: '0 12px 12px 0',
            cursor: 'default',
            backdropFilter: 'blur(10px)'
          }}
        >
          <p style={{ color: 'var(--dim)', fontSize: '1.1rem', lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Important framing:</strong> The work on this page consists of{' '}
            <em style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--fg)' }}>strategic case study exercises</em> — independent ideation and strategic
            thinking produced without a client brief or budget. The value is in the thinking, not the execution.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
