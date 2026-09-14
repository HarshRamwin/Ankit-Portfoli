import type { Config } from 'tailwindcss';

/**
 * Design tokens for "From Commit to Production".
 * One accent (signal green) + two status hues (amber = running, red = failed).
 * Everything else is a neutral steel ramp so the UI never turns into a rainbow dashboard.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080A0D',
        elevated: '#0B0D10',
        surface: '#11151A',
        raised: '#171C22',
        line: '#1E252D',
        'line-strong': '#2B343E',
        ink: '#F5F7FA',
        muted: '#89929E',
        faint: '#5D6875',
        accent: '#37E2A0',
        'accent-dim': '#1C8A61',
        'accent-ghost': 'rgba(55, 226, 160, 0.10)',
        running: '#E5B74B',
        failed: '#F2604E',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 18px 40px -24px rgba(0,0,0,0.9)',
        glow: '0 0 0 1px rgba(55,226,160,0.35), 0 0 28px -8px rgba(55,226,160,0.45)',
      },
      transitionTimingFunction: {
        pipeline: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        packet: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { transform: 'translateX(400%)', opacity: '0' },
        },
        'packet-y': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { transform: 'translateY(400%)', opacity: '0' },
        },
        blink: {
          '0%, 45%': { opacity: '1' },
          '50%, 95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '70%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        packet: 'packet 3.2s linear infinite',
        'packet-y': 'packet-y 3.2s linear infinite',
        blink: 'blink 1.15s steps(1, end) infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
