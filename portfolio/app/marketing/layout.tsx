import type { Metadata } from 'next';
import { getThemeForSegment } from '@/lib/theme';

export const metadata: Metadata = {
  title: 'Marketing Thesis',
  description: 'Strategic case study exercises by Atharv — ideation-level thinking, written as if someone were paying for it.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const theme = getThemeForSegment('/marketing');
  return (
    <div data-theme={theme} style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
