/**
 * Resonance — "Midnight / Classic" design tokens.
 *
 * Tailwind v4 is driven from CSS (`@import "tailwindcss"`), but this project
 * keeps its palette / typography / motion tokens in one JS file that
 * `src/index.css` loads with `@config "../tailwind.config.js"`.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Deep space blues → rich blacks. `void` is the true backdrop. */
        midnight: {
          50: '#eef1fb',
          100: '#d6ddf3',
          200: '#aab8e6',
          300: '#7b8fd4',
          400: '#4d63b8',
          500: '#2f4291',
          600: '#22316f',
          700: '#1a2657',
          800: '#111a42',
          900: '#0b1230',
          950: '#070b1c',
          void: '#03040c',
        },
        /* Gilded accents — borders, active states, glow. `500` is metallic gold. */
        gold: {
          50: '#fdf9ee',
          100: '#f9efcf',
          200: '#f2dc9c',
          300: '#e9c469',
          400: '#e0ad3f',
          500: '#d4af37',
          600: '#b8912e',
          700: '#8f6d25',
          800: '#6b5020',
          900: '#4a3717',
        },
        /* Muted ink for body copy / secondary UI data. */
        haze: {
          100: '#e9edfa',
          200: '#c7cfe6',
          300: '#9aa6c9',
          400: '#6f7da8',
        },
      },
      fontFamily: {
        /* Mystical / classic — headings. */
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        /* Clean, high-legibility — UI + data. */
        sans: [
          '"Inter Variable"',
          'Inter',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      letterSpacing: {
        cosmic: '0.35em',
        wide: '0.12em',
      },
      borderRadius: {
        panel: '1.5rem',
      },
      boxShadow: {
        /* Soft gold halo for active / focused elements. */
        'gold-glow':
          '0 0 22px -2px rgba(212, 175, 55, 0.45), 0 0 64px -14px rgba(212, 175, 55, 0.35)',
        'gold-ring': '0 0 0 1px rgba(212, 175, 55, 0.35)',
        /* Default panel lift + inner top highlight. */
        panel:
          '0 24px 70px -24px rgba(2, 4, 12, 0.85), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'inner-veil': 'inset 0 0 60px rgba(3, 4, 12, 0.55)',
      },
      backgroundImage: {
        'midnight-radial':
          'radial-gradient(ellipse 90% 55% at 50% -10%, rgba(212,175,55,0.13), transparent 60%), radial-gradient(ellipse 75% 50% at 100% 0%, rgba(37,53,111,0.38), transparent 55%), linear-gradient(180deg, #070b1c 0%, #05070f 55%, #03040c 100%)',
        'gold-sheen':
          'linear-gradient(135deg, #f2dc9c 0%, #d4af37 45%, #8f6d25 100%)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        'aura-breathe': {
          '0%, 100%': { transform: 'scale(0.9)', opacity: '0.6' },
          '50%': { transform: 'scale(1.12)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'aura-orbit': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        /* backdrop star accents — opacity only, so it never shifts layout */
        twinkle: {
          '0%, 100%': { opacity: '0.18' },
          '50%': { opacity: '0.55' },
        },
        /* brand mark on splash / onboarding — a barely-there breath */
        hum: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        /* content settling into place — oracle cards, revealed panels */
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        /* a sound wave rippling outward — the frequency session */
        'freq-ring': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '15%': { opacity: '0.55' },
          '100%': { transform: 'scale(1.12)', opacity: '0' },
        },
        /* the deck riffling during a shuffle */
        'card-shuffle': {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-15px) rotate(-7deg)' },
          '50%': { transform: 'translateX(11px) rotate(5deg)' },
          '75%': { transform: 'translateX(-6px) rotate(-2deg)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'aura-breathe': 'aura-breathe 8s ease-in-out infinite',
        'aura-orbit': 'aura-orbit 44s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        twinkle: 'twinkle 5s ease-in-out infinite',
        hum: 'hum 5s ease-in-out infinite',
        'rise-in': 'rise-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'freq-ring': 'freq-ring 6s ease-out infinite',
        'card-shuffle': 'card-shuffle 0.6s ease-in-out infinite',
      },
      transitionTimingFunction: {
        resonance: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
