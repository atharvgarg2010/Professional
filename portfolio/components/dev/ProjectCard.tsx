// Dev-specific project card — terminal command output style.
// NOT a shared ProjectCard. Structurally distinct from all other category components.

interface DevProjectCardProps {
  command:      string;
  title:        string;
  year:         string;
  description:  string;
  stack:        string[];
  metric?:      string;
  imageAlt?:    string;
  imageSrc?:    string;
  status?:      'live' | 'wip' | 'archived';
  placeholder?: boolean;
}

export default function ProjectCard({
  command,
  title,
  year,
  description,
  stack,
  metric,
  imageSrc,
  imageAlt,
  status = 'live',
  placeholder = false,
}: DevProjectCardProps) {
  return (
    <article
      className="hairline-b"
      style={{ padding: '3rem 0' }}
      aria-label={`Project: ${title}`}
    >
      {/* Command line header */}
      <div style={{ marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--dim)' }}>
        <span style={{ color: 'var(--accent)' }}>{command}</span>
      </div>

      {/* Title row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
          }}
        >
          {title}
        </h2>
        <span className="mono-label" style={{ color: 'var(--dim)' }}>{year}</span>
        <span
          className="mono-label"
          style={{
            color: status === 'live' ? 'var(--accent)' : 'var(--dim)',
            borderBottom: status === 'live' ? '1px solid var(--accent)' : 'none',
          }}
        >
          {status === 'live' ? 'LIVE' : status === 'wip' ? 'IN PROGRESS' : 'ARCHIVED'}
        </span>
      </div>

      {/* Body — description + image. Stacks on mobile. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          marginBottom: '1.5rem',
        }}
      >
        {/* Description column */}
        <div>
          <p
            className="text-body"
            style={{ color: 'var(--fg)', marginBottom: '1.5rem', maxWidth: '60ch' }}
          >
            {description}
          </p>

          {/* Stack tags */}
          {stack.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {stack.map(tech => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          )}

          {/* Metric */}
          {metric && (
            <p className="mono-label" style={{ color: 'var(--accent)', marginTop: '1rem' }}>
              → {metric}
            </p>
          )}
        </div>

        {/* Image / placeholder */}
        <div
          className="hairline"
          style={{
            minHeight: '200px',
            aspectRatio: '16/9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)' }}
              loading="lazy"
            />
          ) : (
            <span
              className="mono-label"
              style={{ color: 'var(--dim)', textAlign: 'center', padding: '1rem' }}
            >
              {placeholder ? '[ SCREENSHOT PENDING ]' : '[ NO IMAGE ]'}
            </span>
          )}
        </div>
      </div>

      {/* Terminal status line */}
      <div
        className="hairline"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          padding: '0.75rem 1rem',
          color: 'var(--dim)',
          backgroundColor: 'rgba(0,0,0,0.3)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>→</span>
        {' '}status: <span style={{ color: 'var(--fg)' }}>{status}</span>
        {stack.length > 0 && (
          <span>
            {'  '}stack: <span style={{ color: 'var(--fg)' }}>{stack.join(', ')}</span>
          </span>
        )}
      </div>
    </article>
  );
}
