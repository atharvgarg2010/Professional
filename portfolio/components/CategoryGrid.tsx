'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  // {
  //   href:    '/dev',
  //   slug:    'dev',
  //   label:   'Dev & AI',
  //   accent:  '#78ffb4',
  //   bg:      '#0b1f14',
  //   desc:    'Systems, models, and things that actually run.',
  //   index:   'A',
  // },
  {
    href:    '/design',
    slug:    'design',
    label:   'Design',
    accent:  '#ff5a2b',
    bg:      '#1a0a06',
    desc:    'Type, image, and layout as argument.',
    index:   'A', // Updated index
  },
  {
    href:    '/photography',
    slug:    'photography',
    label:   'Photography',
    accent:  '#f2f2f2',
    bg:      '#0a0a0a',
    desc:    'Light caught before the moment closed.',
    index:   'B', // Updated index
  },
  {
    href:    '/motion',
    slug:    'motion',
    label:   'Motion',
    accent:  '#a678ff',
    bg:      '#140a1f',
    desc:    'Frame rate as medium.',
    index:   'C',
  },
  {
    href:    '/contact',
    slug:    'contact',
    label:   'Contact',
    accent:  '#7ab8ff',
    bg:      '#0a0f1a',
    desc:    'Let\'s build something together.',
    index:   'D',
  },
  // {
  //   href:    '/marketing',
  //   slug:    'marketing',
  //   label:   'Marketing',
  //   accent:  '#7ab8ff',
  //   bg:      '#0a0f1a',
  //   desc:    'Strategic thinking, written as if someone were paying for it.',
  //   index:   'E',
  // },
  // {
  //   href:    '/author',
  //   slug:    'author',
  //   label:   'Author',
  //   accent:  '#e74c3c',
  //   bg:      '#1a0503',
  //   desc:    'The delusions of a 16-year-old mind, preserved for the 80-year-old.',
  //   index:   'F',
  // },
];

export default function CategoryGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={cat.href}
          id={`category-link-${cat.slug}`}
          onMouseEnter={() => setHovered(cat.slug)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(cat.slug)}
          onBlur={() => setHovered(null)}
          className="group flex items-center hairline-b"
          style={{
            padding: '1.75rem 2rem',
            backgroundColor: hovered === cat.slug ? cat.bg : 'transparent',
            transition: 'background-color 350ms cubic-bezier(.16,.84,.32,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            textDecoration: 'none',
          }}
          aria-label={`View ${cat.label} work`}
        >
          {/* Left — letter index + label */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
            <span
              className="mono-label"
              style={{
                color: hovered === cat.slug ? cat.accent : 'var(--dim)',
                transition: 'color 350ms',
                minWidth: '1.2ch',
                flexShrink: 0,
              }}
            >
              {cat.index}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: hovered === cat.slug ? cat.accent : 'var(--fg)',
                transition: 'color 350ms',
              }}
            >
              {cat.label}
            </span>
          </div>

          {/* Right — description + arrow, hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            <span
              className="mono-label"
              style={{
                color: hovered === cat.slug ? cat.accent + 'cc' : 'var(--dim)',
                maxWidth: '30ch',
                textAlign: 'right',
                transition: 'color 350ms',
                lineHeight: 1.5,
              }}
            >
              {cat.desc}
            </span>
            <span
              className="mono-label"
              style={{
                color: hovered === cat.slug ? cat.accent : 'var(--dim)',
                transition: 'color 350ms, transform 350ms',
                display: 'inline-block',
                transform: hovered === cat.slug ? 'translateX(6px)' : 'translateX(0)',
                flexShrink: 0,
              }}
            >
              →
            </span>
          </div>

          {/* Mobile arrow only */}
          <span
            className="mono-label md:hidden"
            style={{
              color: hovered === cat.slug ? cat.accent : 'var(--dim)',
              transition: 'color 350ms',
              flexShrink: 0,
            }}
          >
            →
          </span>
        </Link>
      ))}
    </div>
  );
}
