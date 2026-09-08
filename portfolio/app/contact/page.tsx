import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Atharv for collaborations, inquiries, and freelance opportunities.',
  openGraph: {
    title: 'Contact | Atharv',
    description: 'Get in touch with Atharv for collaborations, inquiries, and freelance opportunities.',
    url: '/contact',
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactClient />
    </PageShell>
  );
}
