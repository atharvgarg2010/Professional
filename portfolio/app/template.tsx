'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Premium Swipe Overlay Transition */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen z-[100] bg-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'bottom', pointerEvents: 'none' }}
      />
      
      {/* Content Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="flex-1"
      >
        {children}
      </motion.div>
    </>
  );
}
