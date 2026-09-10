'use client'; 

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const year = new Date().getFullYear();
  const [isLateNight, setIsLateNight] = useState(false);

  useEffect(() => {
    // Easter Egg 1: Developer Handshake
    console.log(
      "%c🚀 Built by Atharv Garg\n%cHey there, fellow developer! If you're reading this, you probably know your way around the web. Have a great day!",
      "font-size: 20px; font-weight: bold; color: #fff; background: #000; padding: 8px 12px; border-radius: 4px; line-height: 1.5;",
      "font-size: 14px; color: #888; display: block; margin-top: 8px;"
    );

    // Easter Egg 4: The Late-Night Owl (Testing: 1 PM - 5 PM)
    const hour = new Date().getHours();
    if (hour >= 13 && hour < 17) {
      setIsLateNight(true);
    }
  }, []);

  return (
    <footer
      className="hairline-t mt-auto"
      style={{
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--fg)',
        transition: 'background-color var(--theme-duration) var(--theme-ease)',
      }}
    >
      <div className="max-w-screen-2xl mx-auto" style={{ padding: '8rem 2rem 4rem', position: 'relative', zIndex: 10 }}>
        
        {/* Top Section: Massive CTA */}
        <div 
          className="hairline-b"
          style={{ paddingBottom: '6rem', marginBottom: '4rem' }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}
          >
            <div>
              <p className="mono-label" style={{ color: 'var(--dim)', marginBottom: '1rem' }}>
                HAVE AN IDEA?
              </p>
              <h2 style={{
                fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                fontWeight: 700,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                margin: '0',
                wordBreak: 'break-word'
              }}>
                LET'S BUILD <br />
                <span style={{ color: 'color-mix(in srgb, var(--fg) 40%, transparent)' }}>SOMETHING.</span>
              </h2>
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="mailto:gargatharv2010@gmail.com" style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', wordBreak: 'break-all', textDecoration: 'none', borderBottom: '1px solid var(--fg)', paddingBottom: '4px', transition: 'opacity 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.5'} onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}>gargatharv2010@gmail.com</a>
              <span className="mono-label" style={{ color: 'var(--dim)', fontSize: '0.85rem' }}>DELHI, IN</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Metadata & Socials */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <span className="mono-label" style={{ color: 'var(--dim)', transition: 'color 0.3s' }}>
            © {year} ATHARV. {isLateNight ? "SHOULDN'T YOU BE ASLEEP?" : "ALL RIGHTS RESERVED."}
          </span>

          <div className="flex items-center gap-6">
            {[
              { label: 'EMAIL', href: 'mailto:gargatharv2010@gmail.com' },
              { label: 'GITHUB', href: 'https://github.com/atharvgarg2010' },
              { label: 'LINKEDIN', href: 'https://linkedin.com/' } // Provide placeholder
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={`Visit my ${label}`}
                target={href.startsWith('http') ? "_blank" : undefined}
                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--dim)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--fg)';
                  (e.target as HTMLElement).style.borderBottom = '1px solid var(--fg)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--dim)';
                  (e.target as HTMLElement).style.borderBottom = 'none';
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Massive Background Typography */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          userSelect: 'none'
        }}
      >
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.03 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(5rem, 20vw, 30rem)',
            fontWeight: 800,
            color: 'var(--fg)',
            lineHeight: 0.7,
            letterSpacing: '-0.05em',
            margin: 0,
            whiteSpace: 'nowrap'
          }}
        >
          ATHARV GARG
        </motion.h1>
      </div>
    </footer>
  );
}
