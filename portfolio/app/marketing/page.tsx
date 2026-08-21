import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import MarketingClient from '@/components/marketing/MarketingClient';
import MarketingHero from '@/components/marketing/MarketingHero';

export const metadata: Metadata = { 
  title: 'Marketing Thesis — Atharv',
  description: 'Strategic marketing thinking and case studies by Atharv.' 
};

export default function MarketingPage() {
  return (
    <PageShell>
      {/* ── Animated Hero ───────────────────────────────────────────── */}
      <MarketingHero />

      {/* ── Interactive Thesis Grid & Modal ──────────────────────── */}
      <MarketingClient />

    </PageShell>
  );
}
