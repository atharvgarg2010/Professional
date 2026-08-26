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

    </PageShell>
  );
}
