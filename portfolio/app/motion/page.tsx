import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import VideoCard from '@/components/motion/VideoCard';

export const metadata: Metadata = { title: 'Motion' };

const videos = [
  {
    title:       'Motion Project 01',
    year:        '2025',
    description: '[ CONTENT PENDING — Supply title, description, H.264 MP4 under 15MB, and a poster frame. ]',
    inProgress:  true,
  },
  {
    title:       'Motion Project 02',
    year:        '2025',
    description: '[ CONTENT PENDING — Supply title, description, video file, and poster frame. ]',
    inProgress:  true,
  },
  {
    title:       'Motion Project 03',
    year:        '2025',
    description: '[ CONTENT PENDING — Supply title, description, video file, and poster frame. ]',
    inProgress:  true,
  },
];

export default function MotionPage() {
  return (
    <PageShell>
      <section
        className="hairline-b"
        style={{ padding: '5rem 2rem 3rem' }}
      >
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          <p className="mono-label" style={{ color: 'var(--dim)', marginBottom: '1.5rem' }}>
            MOTION GRAPHICS
          </p>
          <h1
            className="text-display-xl"
            style={{ color: 'var(--fg)', marginBottom: '1.5rem' }}
          >
            FRAME<br />RATE
          </h1>
          <p
            className="text-body"
            style={{ color: 'var(--dim)', maxWidth: '52ch' }}
          >
            3–4 video works. Hover any card to play. Videos are muted and never autoplay on load.
          </p>
        </div>
      </section>

      <section
        style={{ padding: '0 2rem', flex: 1 }}
        aria-label="Motion projects"
      >
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          {videos.map((v) => (
            <VideoCard key={v.title} {...v} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
