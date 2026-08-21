'use client';

import { motion } from 'framer-motion';

const books = [
  {
    id: 'quantum-trio',
    title: 'THE QUANTUM TRIO',
    subtitle: 'Fight for the Superminds',
    year: '2023',
    genre: 'SCI-FI',
    summary: 'When a villain with a dark past kidnaps the brother of a brilliant scientist, three teenagers with superpowers must join forces to rescue him. A fast-paced science fiction adventure written at age 12.',
    image: '/author/quantum.png',
    link: 'https://www.notionpress.com'
  },
  {
    id: 'echoes-of-the-past',
    title: 'THE ECHOES OF THE PAST',
    subtitle: 'Mystery & Psychological Suspense',
    year: '39 PAGES',
    genre: 'THRILLER',
    summary: 'When the Chatterjee family purchases a grand old mansion, they awaken a chilling curse buried deep in its walls. Their daughter, Shridha, is drawn into a trance-like possession tied to a forgotten queen. Their only hope lies with Veeransh, a young detective who must untangle a legacy of betrayal, vengeance, and supernatural power.',
    image: '/author/echoes.png',
    link: 'https://store.pothi.com/book/atharv-garg-echoes-past/'
  }
];

export default function AuthorClient() {
  const ink = 'var(--fg)';
  const paper = 'transparent'; // We will let the global background show through, but the container will have var(--bg)

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg)', 
      color: ink, 
      overflowX: 'hidden',
      fontFamily: '"Times New Roman", Times, serif',
      perspective: '1200px' // For the 3D unfold effect
    }}>
      
      {/* ── Uneven edge lighting / vignette to simulate old paper ── */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 49,
          background: 'radial-gradient(circle at center, transparent 40%, color-mix(in srgb, var(--fg) 10%, transparent) 100%)',
        }}
      />

      {/* ── 3D Unfold Animation Container ── */}
      <motion.div 
        initial={{ rotateX: -60, y: 100, opacity: 0, transformOrigin: 'top' }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 60, delay: 0.1 }}
        style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '6rem 2rem 4rem', 
          position: 'relative', 
          zIndex: 10,
          backgroundColor: 'var(--bg)', // Acts as the paper
          boxShadow: '0 0 50px rgba(0,0,0,0.1)'
        }}
      >
        
        {/* ── The Masthead ── */}
        <header 
          style={{ 
            borderBottom: `4px solid ${ink}`,
            borderTop: `1px solid ${ink}`,
            paddingBottom: '2rem',
            marginBottom: '3rem',
            textAlign: 'center'
          }}
        >
          {/* Top Info Bar */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            borderBottom: `1px solid ${ink}`, 
            borderTop: `4px solid ${ink}`, 
            padding: '0.5rem 0',
            marginBottom: '2rem'
          }}>
            <span>VOL. I — THE ARCHIVE</span>
            <span>CIRCULATION: PRIVATE</span>
            <span>PRESERVED FOR ATHARV @ 80</span>
          </div>

          <h1 style={{
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            fontWeight: 700,
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0'
          }}>
            THE DAILY <br /> DELUSIONS
          </h1>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 400,
            fontStyle: 'italic',
            borderBottom: `1px solid ${ink}`,
            borderTop: `1px solid ${ink}`,
            padding: '0.5rem 0',
            display: 'inline-block'
          }}>
            A written archive of a 16-year-old mind.
          </h2>

          <div 
            className="columns-1 md:columns-2"
            style={{ 
              columnGap: '2rem', 
              textAlign: 'justify',
              marginTop: '3rem',
              fontSize: '1.1rem',
              lineHeight: 1.5,
              fontFamily: 'Georgia, serif'
            }}
          >
            <p style={{ margin: '0 0 1rem 0' }}>
              <span style={{ float: 'left', fontSize: '3.5rem', lineHeight: '0.8', paddingTop: '0.2rem', paddingRight: '0.5rem', fontWeight: 700 }}>A</span>
              passionate young writer with a flair for mystery and psychological thrillers, captivating readers with stories that explore the depths of human emotion and the shadows of the mind. These books were written a long time ago. 
            </p>
            <p style={{ margin: 0 }}>
              They are the unfiltered, raw, and sometimes delusional ideas of a younger self. Archived here with sharp borders and stark reality. Age is no barrier to imagination, and this archive stands as a testament to building worlds.
            </p>
          </div>
        </header>

        {/* ── The Front Page Articles (Books) ── */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem',
          borderTop: `2px solid ${ink}`
        }}>
          
          {books.map((book, i) => (
            <motion.article 
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 + 0.5 }}
              style={{
                border: `1px solid ${ink}`,
                borderRight: `2px solid ${ink}`,
                borderBottom: `4px solid ${ink}`,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'color-mix(in srgb, var(--fg) 2%, transparent)'
              }}
            >
              {/* Image Section */}
              <div style={{ 
                width: '100%', 
                borderBottom: `1px solid ${ink}`,
                overflow: 'hidden',
                padding: '1rem',
                backgroundColor: 'color-mix(in srgb, var(--fg) 5%, transparent)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img 
                  src={book.image} 
                  alt={book.title} 
                  style={{ 
                    maxHeight: '400px', 
                    maxWidth: '100%', 
                    objectFit: 'contain', 
                    filter: 'grayscale(20%) contrast(1.1)', // Slight vintage fade
                    border: `1px solid ${ink}`
                  }} 
                />
              </div>

              {/* Data Section */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Meta row */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.75rem',
                  borderBottom: `1px solid ${ink}`,
                  paddingBottom: '0.5rem',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  <span>CATALOG: {book.id.toUpperCase()}</span>
                  <span>{book.year}</span>
                </div>

                <h3 style={{ 
                  fontFamily: '"Times New Roman", Times, serif',
                  fontSize: '2rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  margin: '0 0 0.5rem 0'
                }}>
                  {book.title}
                </h3>
                
                <h4 style={{ 
                  fontFamily: '"Helvetica Neue", Inter, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'color-mix(in srgb, var(--fg) 70%, transparent)',
                  margin: '0 0 1.5rem 0'
                }}>
                  {book.subtitle}
                </h4>

                <p style={{ 
                  fontFamily: 'Georgia, serif',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  textAlign: 'justify',
                  margin: '0 0 2rem 0',
                  flex: 1
                }}>
                  {book.summary}
                </p>

                {/* CTA */}
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    padding: '1rem',
                    border: `1px solid ${ink}`,
                    backgroundColor: 'transparent',
                    color: ink,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.backgroundColor = ink;
                    (e.target as HTMLElement).style.color = 'var(--bg)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.color = ink;
                  }}
                >
                  Retrieve Document ↗
                </a>
              </div>
            </motion.article>
          ))}
          
        </div>

      </motion.div>
    </div>
  );
}
