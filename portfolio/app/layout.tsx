import type { Metadata } from 'next';
import './globals.css';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import TextureOverlay from '@/components/TextureOverlay';
import Preloader from '@/components/Preloader';

export const metadata: Metadata = {
  title: {
    default: 'Atharv — Portfolio',
    template: '%s | Atharv',
  },
  description:
    'Personal portfolio of Atharv — developer, designer, photographer, and motion artist based in Delhi.',
  keywords: ['portfolio', 'developer', 'designer', 'photographer', 'Delhi', 'Atharv'],
  authors: [{ name: 'Atharv' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Atharv Portfolio',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Theme is set per-route by each segment's layout.
  // RootLayout stays theme-neutral; child layouts set data-theme on a wrapper.
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Preloader />
        <TextureOverlay />
        <Topbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
