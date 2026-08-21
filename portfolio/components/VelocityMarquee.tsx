'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from 'framer-motion';

interface VelocityMarqueeProps {
  text: string;
  baseVelocity?: number;
}

export default function VelocityMarquee({ text, baseVelocity = 0.008 }: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  // Barely noticeable scroll multiplier
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 0.02], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 16);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex m-0 hairline-b" style={{ padding: '3rem 0', backgroundColor: 'color-mix(in srgb, var(--fg) 2%, transparent)' }}>
      <motion.div style={{ x, display: 'flex', gap: '3rem' }}>
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="block" 
            style={{ 
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: 'var(--bg)',
              WebkitTextStroke: '1px var(--dim)',
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
