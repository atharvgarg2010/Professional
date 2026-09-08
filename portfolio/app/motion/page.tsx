import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import VideoCard from '@/components/motion/VideoCard';
import MotionHero from '@/components/motion/MotionHero';

export const metadata: Metadata = { title: 'Motion' };

const videos = [
  {
    title:       'Jack Of All Trades',
    year:        '2026',
    description: "A 'know me better' type of reel, showcasing my journey, diverse skills, and creative personality.",
    videoSrc:    '/motion/jack-of-all-trades.mp4',
    inProgress:  false,
  },
  {
    title:       'Teaser One',
    year:        '2026',
    description: "A cinematic saga—Titanic 2026. A dramatic and visually striking teaser composition.",
    videoSrc:    '/motion/teaser1-v2.mp4',
    inProgress:  false,
  },
  {
    title:       'Final Output',
    year:        '2026',
    description: "Metronexus — let's design the future. The finalized motion graphics composition that pushes boundaries.",
    videoSrc:    '/motion/final.mp4',
    inProgress:  false,
  },
  {
    title:       'Final Alternative',
    year:        '2026',
    description: "A thrilling detective saga. An alternate final render exploring a suspenseful, mysterious pacing.",
    videoSrc:    '/motion/finallll.mp4',
    inProgress:  false,
  },
  {
    title:       'Mint Lemonade',
    year:        '2026',
    description: 'Refreshing mint lemonade product showcase reel.',
    videoSrc:    '/motion/mint-lemonade.mp4',
    inProgress:  false,
    isReel:      true,
  },
  {
    title:       'Sundae Reel',
    year:        '2026',
    description: 'Delicious sundae presentation in a vertical reel format.',
    videoSrc:    '/motion/sundae-reel.mp4',
    inProgress:  false,
    isReel:      true,
  },
];

export default function MotionPage() {
  const landscapeVideos = videos.filter(v => !v.isReel);
  const reelVideos = videos.filter(v => v.isReel);

  return (
    <PageShell>
      <MotionHero />

      <section
        style={{ padding: '0 2rem', flex: 1 }}
        aria-label="Motion projects"
      >
        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          {landscapeVideos.length > 0 && (
            <VideoCard key={landscapeVideos[0].title} {...landscapeVideos[0]} />
          )}
        </div>

        {reelVideos.length > 0 && (
          <article className="hairline-b" style={{ padding: '8rem 0' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div className="flex items-baseline gap-4 mb-4" style={{ marginBottom: '4rem' }}>
                <h2 className="text-display-m" style={{ color: 'var(--fg)' }}>Reels & Shorts</h2>
                <span className="mono-label" style={{ color: 'var(--dim)' }}>VERTICAL</span>
              </div>
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                  gap: '4rem' 
                }}
              >
                {reelVideos.map(v => (
                  <VideoCard key={v.title} {...v} isGridItem />
                ))}
              </div>
            </div>
          </article>
        )}

        <div style={{ maxWidth: '1536px', margin: '0 auto' }}>
          {landscapeVideos.slice(1).map((v) => (
            <VideoCard key={v.title} {...v} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
