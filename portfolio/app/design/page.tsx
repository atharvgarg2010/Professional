import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import DesignClient from '@/components/design/DesignClient';

export const metadata: Metadata = { 
  title: 'Design',
  description: 'Design work by Atharv. Interactive portfolio gallery showcasing web design, UI/UX, and branding projects.',
  openGraph: {
    title: 'Design | Atharv',
    description: 'Design work by Atharv. Interactive portfolio gallery showcasing web design, UI/UX, and branding projects.',
    url: '/design',
  },
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
