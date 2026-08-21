'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // When 100% is reached, trigger the exit animation
        setTimeout(() => {
          controls.start({
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }).then(() => {
            setIsLoading(false);
          });
        }, 500);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(interval);
  }, [controls]);

  if (!isLoading) return null;

  return (
    <motion.div
      animate={controls}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--bg)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--fg)'
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
            fontSize: 'clamp(5rem, 15vw, 15rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em'
          }}
        >
          {progress}%
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mono-label"
        style={{ color: 'var(--dim)', marginTop: '2rem' }}
      >
        ATHARV GARG — PORTFOLIO
      </motion.div>
    </motion.div>
  );
}
