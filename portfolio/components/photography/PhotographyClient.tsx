/**
 * PhotographyClient — client wrapper managing grid + detail view state.
 * Handles: which photo is open, URL hash on mount (deep-link support).
 */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { photos } from '@/lib/photography-data';
import type { Photo } from '@/lib/photography-data';
import HorizontalScroller from '@/components/photography/HorizontalScroller';
import DetailView from '@/components/photography/DetailView';

export default function PhotographyClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ── Deep-link: open detail if URL hash matches a photo on mount ───────────
  useEffect(() => {
    const hash = window.location.hash; // e.g. "#photo-03"
    if (hash.startsWith('#photo-')) {
      const id = hash.replace('#photo-', '');
      const idx = photos.findIndex((p) => p.id === id);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, []);

  const openPhoto = useCallback((_photo: Photo, index: number) => {
    setActiveIndex(index);
  }, []);

  const closeDetail = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const navigate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      <HorizontalScroller photos={photos} onPhotoClick={openPhoto} />

      {activeIndex !== null && (
        <DetailView
          photos={photos}
          current={activeIndex}
          onClose={closeDetail}
          onNavigate={navigate}
        />
      )}
    </>
  );
}
