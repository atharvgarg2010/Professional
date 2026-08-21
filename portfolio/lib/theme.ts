// lib/theme.ts
// Single source of truth for all theme tokens.
// These are read server-side to set data-theme on the html element.

export type ThemeKey = 'neutral' | 'dev' | 'design' | 'photography' | 'motion' | 'marketing';

export const themes: Record<ThemeKey, {
  bg: string;
  fg: string;
  dim: string;
  line: string;
  accent: string;
}> = {
  neutral: {
    bg:     '#0b0b0c',
    fg:     '#ededea',
    dim:    '#6e6e6e',
    line:   'rgba(237,237,234,0.14)',
    accent: '#0b0b0c',
  },
  dev: {
    bg:     '#0b1f14',
    fg:     '#78ffb4',
    dim:    '#78ffb4aa',
    line:   '#78ffb433',
    accent: '#78ffb4',
  },
  design: {
    bg:     '#1a0a06',
    fg:     '#ff5a2b',
    dim:    '#ff5a2baa',
    line:   '#ff5a2b33',
    accent: '#ff5a2b',
  },
  photography: {
    bg:     '#0a0a0a',
    fg:     '#f2f2f2',
    dim:    '#f2f2f2aa',
    line:   '#f2f2f233',
    accent: '#f2f2f2',
  },
  motion: {
    bg:     '#140a1f',
    fg:     '#a678ff',
    dim:    '#a678ffaa',
    line:   '#a678ff33',
    accent: '#a678ff',
  },
  marketing: {
    bg:     '#0a0f1a',
    fg:     '#7ab8ff',
    dim:    '#7ab8ffaa',
    line:   '#7ab8ff33',
    accent: '#7ab8ff',
  },
};

// Map route segment → theme key
export const routeThemeMap: Record<string, ThemeKey> = {
  '/':           'neutral',
  '/dev':        'dev',
  '/design':     'design',
  '/photography':'photography',
  '/motion':     'motion',
  '/marketing':  'marketing',
};

export function getThemeForSegment(segment: string): ThemeKey {
  return (routeThemeMap[segment] as ThemeKey) ?? 'neutral';
}
