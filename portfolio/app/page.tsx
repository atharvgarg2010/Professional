import type { Metadata } from 'next';
import CategoryGrid from '@/components/CategoryGrid';
import HomeHero from '@/components/HomeHero';
import VelocityMarquee from '@/components/VelocityMarquee';

export const metadata: Metadata = {
  title: 'Atharv — Portfolio',
  description:
    'Personal portfolio of Atharv — developer, designer, photographer, and motion artist based in Delhi.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ paddingTop: '48px', overflowX: 'hidden' }}>
      
      {/* ── Cinematic Hero ──────────────────────────────────────────── */}
      <HomeHero />

      {/* ── Scroll Velocity Marquee ─────────────────────────────────── */}
      <VelocityMarquee text="DEVELOPER — DESIGNER — PHOTOGRAPHER — MOTION ARTIST — AUTHOR —" />

      {/* ── Category List ─────────────────────────────────────────────── */}
      <section aria-label="Portfolio categories">
        <div className="max-w-screen-2xl mx-auto">
          <CategoryGrid />
        </div>
      </section>

    </div>
  );
}
