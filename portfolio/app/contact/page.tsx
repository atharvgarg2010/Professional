import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch.',
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactClient />
    </PageShell>
  );
}
