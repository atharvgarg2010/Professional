import type { Metadata } from 'next';
import { Archivo_Black, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import TextureOverlay from '@/components/TextureOverlay';
import Preloader from '@/components/Preloader';

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: 'italic',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atharv.com'), // Replace with your actual domain
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
    url: 'https://atharv.com',
    siteName: 'Atharv Portfolio',
    title: 'Atharv — Portfolio',
    description: 'Personal portfolio of Atharv — developer, designer, photographer, and motion artist based in Delhi.',
    images: [
      {
        url: '/hero-portrait.png', // Or another generic OG image
        width: 1200,
        height: 630,
        alt: 'Atharv Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atharv — Portfolio',
    description: 'Personal portfolio of Atharv — developer, designer, photographer, and motion artist based in Delhi.',
    images: ['/hero-portrait.png'],
  },
  alternates: {
    canonical: 'https://atharv.com',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b0b0c',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${archivoBlack.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable} min-h-screen flex flex-col`}>
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
