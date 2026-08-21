import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import DesignClient from '@/components/design/DesignClient';

export const metadata: Metadata = { 
  title: 'Design — Atharv',
  description: 'Design work by Atharv. Interactive portfolio gallery.',
};

export default function DesignPage() {
  return (
    <PageShell>
      {/* 
        The entire Design page experience is now client-side driven 
        to support the scroll-linked parallax and drag interactions.
      */}
      <DesignClient />

      {/* ── Asset note ───────────────────────────────────────────── */}
      <section
        className="hairline-t"
        style={{ padding: '2rem' }}
      >
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          <p className="mono-label" style={{ color: 'var(--dim)' }}>
            [ SUPPLY 8-12 DESIGN ASSETS — WebP preferred, longest edge 2400px ]
          </p>
        </div>
      </section>
    </PageShell>
  );
}
