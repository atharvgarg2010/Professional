import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AuthorClient from '@/components/author/AuthorClient';

export const metadata: Metadata = { 
  title: 'Author',
  description: 'Books, publications, and creative writing by Atharv. Exploring science fiction, mystery, and technological thesis.',
  openGraph: {
    title: 'Author | Atharv',
    description: 'Books, publications, and creative writing by Atharv. Exploring science fiction, mystery, and technological thesis.',
    url: '/author',
  },
};

export default function AuthorPage() {
  return (
    <PageShell>
      <AuthorClient />
    </PageShell>
  );
}
