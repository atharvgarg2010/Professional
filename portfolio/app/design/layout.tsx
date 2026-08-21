import type { Metadata } from 'next';
import { getThemeForSegment } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Design',
  description: 'Graphic design and visual work by Atharv — poster, type, editorial.',
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  const theme = getThemeForSegment('/design');
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
