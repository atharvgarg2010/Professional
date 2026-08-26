import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import VideoCard from '@/components/motion/VideoCard';

export const metadata: Metadata = { title: 'Motion' };

const videos = [
  {
    title:       'Jack Of All Trades',
    year:        '2026',
    description: 'A high-energy, dynamic showcase of diverse skills and techniques.',
    videoSrc:    '/motion/Jack Of All Trades.mp4',
    inProgress:  false,
  },
  {
    title:       'Teaser One',
    year:        '2026',
    description: 'Fast-paced teaser composition focusing on impactful typography and motion design.',
    videoSrc:    '/motion/Teaser1 v2.mp4',
    inProgress:  false,
  },
  {
    title:       'Final Output',
    year:        '2026',
    description: 'The finalized motion graphics composition.',
    videoSrc:    '/motion/Final.mp4',
    inProgress:  false,
  },
  {
    title:       'Final Alternative',
    year:        '2026',
    description: 'An alternate final render exploring different pacing.',
    videoSrc:    '/motion/finallll.mp4',
    inProgress:  false,
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
