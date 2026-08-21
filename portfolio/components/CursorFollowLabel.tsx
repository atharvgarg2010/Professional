'use client';

import { useEffect, useRef, useState } from 'react';

// Desktop-only cursor-following label that appears near hoverable cards.
// Build it, look at it, cut it if it reads as gimmicky rather than premium.
// Respects prefers-reduced-motion — simply doesn't mount.

export default function CursorFollowLabel() {
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    // Don't mount if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Don't mount on mobile / touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (labelRef.current) {
          labelRef.current.style.transform = `translate(${pos.current.x + 16}px, ${pos.current.y + 16}px)`;
        }
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-label]')) {
        setVisible(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor-label]')) {
        setVisible(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={labelRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--bg)',
        backgroundColor: 'var(--accent)',
        padding: '0.2rem 0.5rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 150ms',
        borderRadius: 0,
        whiteSpace: 'nowrap',
      }}
    >
      View project
    </div>
  );
}
