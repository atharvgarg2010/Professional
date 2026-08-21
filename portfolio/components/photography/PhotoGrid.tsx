// Photography-specific grid — full-bleed, near-zero chrome.
// Captions appear on hover ONLY, not persistent.
// Zero color on this page except the images themselves.
// Mobile: collapses to single column.

interface Photo {
  src:      string;
  alt:      string;
  caption:  string;  // location + year only
  width?:   'full' | 'half' | 'third';
}

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  return (
    <>
      {/* Global style for responsive grid — inlined to avoid Tailwind conflicts */}
      <style>{`
        .photo-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1px;
          background-color: var(--line);
        }
        .photo-cell-full  { grid-column: 1 / -1; }
        .photo-cell-half  { grid-column: span 6; }
        .photo-cell-third { grid-column: span 4; }

        @media (max-width: 768px) {
          .photo-cell-full,
          .photo-cell-half,
          .photo-cell-third {
            grid-column: 1 / -1;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .photo-cell-third { grid-column: span 6; }
        }

        .photo-figure {
          position: relative;
          overflow: hidden;
          background-color: var(--bg);
          display: block;
        }
        .photo-figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 700ms cubic-bezier(.16,.84,.32,1);
        }
        .photo-figure:hover img {
          transform: scale(1.02);
        }
        .photo-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem 1rem;
          background-color: rgba(10,10,10,0.8);
          opacity: 0;
          transition: opacity 250ms;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--dim);
        }
        .photo-figure:hover .photo-caption,
        .photo-figure:focus-within .photo-caption {
          opacity: 1;
        }
      `}</style>

      <div className="photo-grid">
        {photos.map((photo, i) => {
          let cellClass = 'photo-cell-half';
          if (photo.width === 'full')  cellClass = 'photo-cell-full';
          if (photo.width === 'third') cellClass = 'photo-cell-third';
          if (photo.width === 'half')  cellClass = 'photo-cell-half';

          const aspectRatio = photo.width === 'full' ? '21/9' : photo.width === 'third' ? '3/4' : '4/5';

          return (
            <figure
              key={photo.src + i}
              className={`photo-figure ${cellClass}`}
              style={{ aspectRatio }}
              tabIndex={0}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
              />
              <figcaption className="photo-caption">
                {photo.caption}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </>
  );
}
