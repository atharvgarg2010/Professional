'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LateNightToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Determine if it's late night.
    const hour = new Date().getHours();
    
    // For testing: 13 to 17 (1 PM to 5 PM). Change to (hour >= 2 && hour < 5) later.
    if (hour >= 13 && hour < 17) {
      // Delay the popup so it doesn't instantly jump scare them on load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 9999, // Super high so it stays above everything
            backgroundColor: 'var(--fg)',
            color: 'var(--bg)',
            padding: '1.25rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            maxWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', opacity: 0.7 }}>SYSTEM.TIME</span>
            <button 
              onClick={() => setIsVisible(false)}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--bg)',
                cursor: 'pointer',
                opacity: 0.5,
                padding: 0,
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              ✕
            </button>
          </div>
          
          <h3 style={{ 
            fontFamily: '"Helvetica Neue", Inter, sans-serif',
            fontSize: '1.1rem',
            fontWeight: 600,
            margin: '0.25rem 0 0 0',
            lineHeight: 1.2
          }}>
            Shouldn't you be asleep?
          </h3>
          
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            margin: 0,
            opacity: 0.8,
            lineHeight: 1.5
          }}>
            ...it's ok, continue scrolling now.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
