import type { Metadata } from 'next';
import { getThemeForSegment } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Photography',
  description: 'Photography by Atharv — Delhi and beyond.',
};

export default function PhotographyLayout({ children }: { children: React.ReactNode }) {
  const theme = getThemeForSegment('/photography');
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
