import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Reference CSS variables — never hardcode Tailwind palette colors.
        // Use as: bg-[var(--bg)], text-[var(--fg)], etc.
        'theme-bg':     'var(--bg)',
        'theme-fg':     'var(--fg)',
        'theme-dim':    'var(--dim)',
        'theme-line':   'var(--line)',
        'theme-accent': 'var(--accent)',
      },
      fontFamily: {
        display: ['Archivo Black', 'sans-serif'],
        body:    ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        serif:   ['Instrument Serif', 'serif'],
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(.16,.84,.32,1)',
      },
      transitionDuration: {
        'theme': '500ms',
      },
    },
  },
  plugins: [],
};

export default config;
