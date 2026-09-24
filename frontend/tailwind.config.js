/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        peru: {
          DEFAULT: 'var(--red)',
          deep: 'var(--red-deep)',
          tint: 'var(--red-tint)',
        },
        amber: {
          DEFAULT: 'var(--amber)',
          tint: 'var(--amber-tint)',
        },
        ok: {
          DEFAULT: 'var(--ok)',
          tint: 'var(--ok-tint)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Libre Franklin"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,24,33,.05), 0 8px 30px rgba(20,24,33,.06)',
        lg2: '0 20px 60px rgba(20,24,33,.14)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'rotate(-6deg) translateY(0)' },
          '50%': { transform: 'rotate(-6deg) translateY(-10px)' },
        },
        fadeup: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        fadeup: 'fadeup .32s ease both',
      },
    },
  },
  plugins: [],
};
