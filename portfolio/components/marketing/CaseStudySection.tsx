// Marketing-specific case study section.
// Long-form, numbered, sequential. ONLY category that earns numbering.

interface CaseStudySectionProps {
  index:    string;
  heading:  string;
  body:     React.ReactNode;
  accent?:  boolean;
}

export default function CaseStudySection({
  index,
  heading,
  body,
  accent = false,
}: CaseStudySectionProps) {
  return (
    <section
      className="hairline-b"
      style={{ padding: '3.5rem 0' }}
      aria-label={`Section ${index}: ${heading}`}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Number */}
        <span
          className="mono-label"
          style={{
            color: accent ? 'var(--accent)' : 'var(--dim)',
            fontSize: '0.7rem',
            minWidth: '2.5ch',
            paddingTop: '0.35rem',
          }}
        >
          {index}
        </span>

        {/* Content */}
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: accent ? 'var(--accent)' : 'var(--fg)',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            {heading}
          </h2>
          <div
            className="text-body"
            style={{ color: 'var(--fg)', maxWidth: '66ch' }}
          >
            {body}
          </div>
        </div>
      </div>
    </section>
  );
}
