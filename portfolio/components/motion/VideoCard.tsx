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

  return (
    <article
      className="hairline-b"
      style={{ padding: '8rem 0' }}
      aria-label={`Motion project: ${title}`}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: isReel ? '480px' : '1280px', 
          margin: '0 auto' 
        }}
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
            src={videoSrc}
            poster={posterSrc}
            muted={isMuted}
            onClick={toggleMute}
            loop
            playsInline
            preload="none"
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
              bottom: '1.5rem',
              right: '1.5rem',
              pointerEvents: 'none',
              padding: '0.5rem 0.75rem',
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '4px',
            }}
          >
            <span className="mono-label" style={{ color: 'var(--fg)', fontSize: '0.75rem' }}>
              {isMuted ? '[ CLICK FOR SOUND ]' : '[ PLAYING WITH SOUND ]'}
            </span>
          </div>
        )}
      </div>
      </div>
    </article>
  );
}
