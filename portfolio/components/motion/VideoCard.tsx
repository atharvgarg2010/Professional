'use client';

import { useRef, useState } from 'react';

// Motion-specific video card. NOT shared with other categories.
// Autoplay on hover/inview (NOT on page load), static poster otherwise.

interface VideoCardProps {
  title:        string;
  year:         string;
  description:  string;
  videoSrc?:    string;   // mp4 URL
  posterSrc?:   string;   // static frame
  vimeoUrl?:    string;   // link to external if hosted there
  inProgress?:  boolean;  // ship "in progress" label, not a broken player
  isReel?:      boolean;  // true if it's a portrait video (9:16)
  isGridItem?:  boolean;  // true if rendered inside a grid (removes outer padding/border)
}

export default function VideoCard({
  title,
  year,
  description,
  videoSrc,
  posterSrc,
  vimeoUrl,
  inProgress = false,
  isReel = false,
  isGridItem = false,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleMouseEnter = () => {
    if (!videoRef.current || inProgress) return;
    videoRef.current.play()
      .then(() => setPlaying(true))
      .catch((e) => {
        console.error("Video play error on hover:", e);
      });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setPlaying(false);
    setIsMuted(true); // Always reset to muted when leaving
  };

  const content = (
    <div 
      style={{ 
        width: '100%', 
        maxWidth: isReel && !isGridItem ? '480px' : '100%', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}
      aria-label={isGridItem ? `Motion project: ${title}` : undefined}
    >
        {/* Header */}
        <div className="flex items-baseline gap-4 mb-4">
          <h2 className="text-display-m" style={{ color: 'var(--fg)' }}>{title}</h2>
          <span className="mono-label" style={{ color: 'var(--dim)' }}>{year}</span>
          {inProgress && (
            <span className="mono-label" style={{ color: 'var(--dim)' }}>IN PROGRESS</span>
          )}
        </div>

        <p className="text-body" style={{ color: 'var(--dim)', maxWidth: '56ch', marginBottom: '3rem' }}>
          {description}
        </p>

        {/* Video / poster area */}
        <div
          className="relative overflow-hidden hairline"
          style={{ 
            aspectRatio: isReel ? '9/16' : '16/9', 
            cursor: inProgress ? 'default' : 'pointer', 
            backgroundColor: 'var(--bg)',
            margin: isReel ? '0 auto' : '0'
          }}
          onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id={`video-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {inProgress ? (
          /* In-progress state — poster frame + mono label, no broken player */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              gap: '0.75rem',
            }}
          >
            {posterSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterSrc}
                alt={`${title} poster frame`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.35,
                }}
                loading="lazy"
              />
            )}
            <span
              className="mono-label"
              style={{ color: 'var(--accent)', zIndex: 1, position: 'relative' }}
            >
              {title}
            </span>
          </div>
        ) : videoSrc ? (
          <video
            ref={videoRef}
            src={`${videoSrc}#t=0.001`}
            poster={posterSrc}
            muted={isMuted}
            onClick={toggleMute}
            loop
            playsInline
            preload="metadata"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            aria-label={`${title} — click to toggle sound`}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          >
            {vimeoUrl ? (
              <a
                href={vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label"
                style={{ color: 'var(--accent)' }}
              >
                VIEW ON VIMEO →
              </a>
            ) : (
              <span className="mono-label" style={{ color: 'var(--dim)' }}>
                {/* Pending message removed per user request */}
              </span>
            )}
          </div>
        )}

        {/* Play indicator */}
        {!inProgress && !playing && videoSrc && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <span className="mono-label" style={{ color: 'var(--accent)', opacity: 0.7 }}>
              HOVER TO PLAY
            </span>
          </div>
        )}

        {/* Audio indicator */}
        {!inProgress && playing && videoSrc && (
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              pointerEvents: 'none',
              padding: '0.5rem',
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
            }}
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isGridItem) {
    return content;
  }

  return (
    <article
      className="hairline-b"
      style={{ padding: '8rem 0' }}
      aria-label={`Motion project: ${title}`}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {content}
      </div>
    </article>
  );
}
