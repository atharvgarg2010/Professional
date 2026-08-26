'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  // { href: '/dev',          label: 'Dev & AI' },
  { href: '/design',       label: 'Design' },
  { href: '/photography',  label: 'Photography' },
  { href: '/motion',       label: 'Motion' },
  // { href: '/marketing',    label: 'Marketing' },
  // { href: '/author',       label: 'Author' },
];

function useClock() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Kolkata',
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Topbar() {
  const pathname = usePathname();
  const time = useClock();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 hairline-b"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'background-color var(--theme-duration) var(--theme-ease)',
          height: '64px', /* Increased height */
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            padding: '0 2rem',
            maxWidth: '1536px',
            margin: '0 auto',
          }}
        >
          {/* Left — wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
              textDecoration: 'none',
            }}
            aria-label="Home"
          >
            ATHARV
          </Link>

          {/* Center — desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none' }}>
              {navLinks.map(({ href, label }) => {
                const active = pathname?.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        color: active ? 'var(--fg)' : 'var(--dim)',
                        backgroundColor: active ? 'rgba(128,128,128,0.1)' : 'transparent',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        textDecoration: 'none',
                        transition: 'all 200ms ease',
                      }}
                      onMouseEnter={e => {
                        (e.target as HTMLElement).style.backgroundColor = 'rgba(128,128,128,0.1)';
                        (e.target as HTMLElement).style.color = 'var(--fg)';
                      }}
                      onMouseLeave={e => {
                        (e.target as HTMLElement).style.backgroundColor = active ? 'rgba(128,128,128,0.1)' : 'transparent';
                        (e.target as HTMLElement).style.color = active ? 'var(--fg)' : 'var(--dim)';
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right — clock + contact + mobile button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span
              className="mono-label hidden lg:block"
              style={{ color: 'var(--dim)', fontSize: '0.75rem', opacity: 0.6 }}
              aria-live="polite"
              aria-label="Current time IST"
            >
              {time} IST
            </span>

            <Link
              href="/contact"
              className="hidden md:flex mono-label"
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--bg)',
                backgroundColor: 'var(--fg)',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                alignItems: 'center',
                transition: 'opacity 200ms',
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = '0.8'}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = '1'}
            >
              Contact
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden mono-label"
              style={{
                color: menuOpen ? 'var(--fg)' : 'var(--dim)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem 0',
                transition: 'color 200ms',
              }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="mobile-menu-btn"
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '48px',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            backgroundColor: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            overflowY: 'auto',
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0' }}>
              {navLinks.map(({ href, label }) => {
                const active = pathname?.startsWith(href);
                return (
                  <li key={href} style={{ borderBottom: '1px solid var(--line)' }}>
                    <Link
                      href={href}
                      style={{
                        display: 'block',
                        padding: '1.5rem 0',
                        fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                        fontWeight: 600,
                        fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
                        letterSpacing: '-0.02em',
                        color: active ? 'var(--fg)' : 'var(--dim)',
                        textDecoration: 'none',
                      }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA and Clock at bottom of drawer */}
          <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: '"Helvetica Neue", Inter, Arial, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 600,
                color: 'var(--bg)',
                backgroundColor: 'var(--fg)',
                padding: '1rem',
                borderRadius: '8px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Contact
            </Link>
            <span className="mono-label" style={{ color: 'var(--dim)', textAlign: 'center' }}>{time} IST</span>
          </div>
        </div>
      )}
    </>
  );
}
