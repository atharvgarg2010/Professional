'use client';

import PageShell from '@/components/PageShell';
import Reveal from '@/components/Reveal';
import ProjectCard from '@/components/dev/ProjectCard';

const projects = [
  {
    command:     '$ atlas --status',
    title:       'Atlas',
    year:        '2025',
    status:      'live' as const,
    description:
      'Atlas is a finance trading AI analyser that ingests market data, runs backtests, and surfaces structured signals. Built to remove noise from trading decisions — not to make them autonomously.',
    stack:       ['Python', 'FastAPI', 'Pandas', 'Next.js', 'PostgreSQL'],
    metric:      'Placeholder metric — supply real backtest result or accuracy %',
    placeholder: false,
  },
  {
    command:     '$ jee-tracker --users all',
    title:       'JEE Multi-User Tracker',
    year:        '2025',
    status:      'live' as const,
    description:
      'A multi-user tracking application for JEE preparation — shared dashboards, per-subject progress logging, and comparative analytics across enrolled users. Built for a small study group; scaled to handle concurrent sessions.',
    stack:       ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    metric:      undefined,
    placeholder: false,
  },
  {
    command:     '$ project-3 --info',
    title:       '[Project 3 — Pending]',
    year:        '2025',
    status:      'wip' as const,
    description:
      '[ CONTENT PENDING — Supply: project name, one-paragraph description (your own words), tech stack, and a screenshot or terminal output. ]',
    stack:       [],
    metric:      undefined,
    placeholder: true,
  },
  {
    command:     '$ project-4 --info',
    title:       '[Project 4 — Pending]',
    year:        '2025',
    status:      'wip' as const,
    description:
      '[ CONTENT PENDING — Supply: project name, one-paragraph description (your own words), tech stack, and a screenshot or terminal output. ]',
    stack:       [],
    metric:      undefined,
    placeholder: true,
  },
];

const PAD = '2rem';

export default function DevContent() {
  return (
    <PageShell>
      {/* ── Header ────────────────────────────────────────────────── */}
      <section
        className="hairline-b"
        style={{ padding: '5rem 2rem 3rem' }}
      >
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          <p className="mono-label" style={{ color: 'var(--dim)', marginBottom: '1.5rem' }}>
            DEVELOPMENT & AI
          </p>
          <h1
            className="text-display-xl"
            style={{ color: 'var(--fg)', marginBottom: '1.5rem' }}
          >
            BUILD<br />LOG
          </h1>
          <p
            className="text-body"
            style={{ color: 'var(--dim)', maxWidth: '52ch' }}
          >
            Systems, models, and interfaces. Each project below is something that runs — not a mockup.
          </p>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────── */}
      <section style={{ padding: `0 ${PAD}`, flex: 1 }}>
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 70}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Blinking cursor ───────────────────────────────────────── */}
      <div style={{ padding: `2.5rem ${PAD}` }}>
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          <span
            className="mono-label blink-cursor"
            style={{ color: 'var(--dim)' }}
            aria-hidden="true"
          >
            $
          </span>
        </div>
      </div>
    </PageShell>
  );
}
