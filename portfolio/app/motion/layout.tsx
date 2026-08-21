import type { Metadata } from 'next';
import { getThemeForSegment } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Motion graphics and animation work by Atharv.',
};

export default function MotionLayout({ children }: { children: React.ReactNode }) {
  const theme = getThemeForSegment('/motion');
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
