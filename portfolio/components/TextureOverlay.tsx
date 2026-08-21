'use client';

import { usePathname } from 'next/navigation';

// The texture layer is a pseudo-element driven by data-theme on the parent.
// This component injects a div with class "texture" that the CSS targets.
export default function TextureOverlay() {
  return (
    <div
      className="texture"
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }}
    />
  );
}
