import type { Metadata } from 'next';
import { getThemeForSegment } from '@/lib/theme';
import DevContent from './DevContent';

export const metadata: Metadata = {
  title: 'Dev & AI',
  description:
    'Development and AI projects by Atharv — Atlas finance AI, JEE tracker, and more.',
};

// Server-side theme injection — zero flash on hard refresh
export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getThemeForSegment('/dev');
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
