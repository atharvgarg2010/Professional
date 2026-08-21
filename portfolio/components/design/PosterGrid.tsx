// Design-specific poster grid component.
// NOT a shared ProjectCard. Asymmetric full-bleed image-first layout.

interface PosterItem {
  title:       string;
  context:     string;
  imageSrc?:   string;
  imageAlt?:   string;
  span?:       'full' | 'half';
  placeholder?: boolean;
}

interface PosterGridProps {
  items: PosterItem[];
}

export default function PosterGrid({ items }: PosterGridProps) {
  return (
    <>
      <style>{`
        .poster-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1px;
          background-color: var(--line);
          border-top: 1px solid var(--line);
        }
        .poster-cell-full { grid-column: 1 / -1; }
        .poster-cell-large { grid-column: span 7; }
        .poster-cell-small { grid-column: span 5; }

        @media (max-width: 768px) {
          .poster-cell-full,
          .poster-cell-large,
          .poster-cell-small {
            grid-column: 1 / -1;
          }
        }

        .poster-figure {
          position: relative;
          overflow: hidden;
          background-color: var(--bg);
          display: block;
        }
        .poster-figure img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 600ms cubic-bezier(.16,.84,.32,1);
        }
        .poster-figure:hover img,
        .poster-figure:focus-within img {
          transform: scale(1.03);
        }
        .poster-overlay-full {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          background: linear-gradient(to top, rgba(26,10,6,0.9) 0%, transparent 60%);
        }
        .poster-hover-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background-color: rgba(26,10,6,0.85);
          opacity: 0;
          transition: opacity 300ms;
        }
        .poster-figure:hover .poster-hover-caption,
        .poster-figure:focus-within .poster-hover-caption {
          opacity: 1;
        }
      `}</style>

      <div className="poster-grid">
        {items.map((item, i) => {
          const isFullWidth = item.span === 'full';
          let cellClass = 'poster-cell-small';
          if (isFullWidth) cellClass = 'poster-cell-full';
          else if (i % 3 === 0) cellClass = 'poster-cell-large';

          const aspectRatio = isFullWidth ? '21/9' : '4/5';

          return (
            <figure
              key={item.title + i}
              className={`poster-figure ${cellClass}`}
              style={{ aspectRatio }}
              tabIndex={0}
              aria-label={item.title}
            >
              {item.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  loading="lazy"
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '280px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }}
                >
                  <span
                    className="mono-label"
                    style={{ color: 'var(--dim)', textAlign: 'center', padding: '2rem' }}
                  >
                    {item.placeholder ? '[ IMAGE PENDING ]' : item.title}
                  </span>
                </div>
              )}

              {/* Full-width — persistent type overlay */}
              {isFullWidth && (
                <div className="poster-overlay-full">
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h2>
                  <p className="mono-label" style={{ color: 'var(--dim)' }}>{item.context}</p>
                </div>
              )}

              {/* Non-full — hover caption */}
              {!isFullWidth && (
                <figcaption className="poster-hover-caption">
                  <p className="mono-label" style={{ color: 'var(--fg)' }}>{item.title}</p>
                  <p className="mono-label" style={{ color: 'var(--dim)', marginTop: '0.25rem' }}>{item.context}</p>
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </>
  );
}
