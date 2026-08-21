import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AuthorClient from '@/components/author/AuthorClient';

export const metadata: Metadata = { 
  title: 'Author — Atharv',
  description: 'Books and writing by Atharv. Exploring science fiction and mystery.' 
};

export default function AuthorPage() {
  return (
    <PageShell>
      <AuthorClient />
    </PageShell>
  );
}
