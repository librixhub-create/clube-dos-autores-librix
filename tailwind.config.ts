import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      ink: {
        DEFAULT: '#09090f',
        light: '#111120',
        mid: '#18182a',
        deep: '#050508',
      },
      gold: {
        DEFAULT: '#a855f7',
        light: '#c084fc',
        dark: '#9333ea',
        pale: '#f3e8ff',
      },
      paper: {
        DEFAULT: '#ffffff',
        dim: '#d4c8f0',
        muted: '#8b7aa8',
      },
      terra: {
        DEFAULT: '#c9a24b',
        light: '#d4b56a',
        dark: '#a88538',
      },
    },
    fontFamily: {
      serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-jetbrains)', '"Courier New"', 'monospace'],
    },
    extend: {
      boxShadow: {
        'glow-purple': '0 0 80px -15px rgba(168, 85, 247, 0.3), 0 0 160px -30px rgba(168, 85, 247, 0.12)',
        'glow-purple-sm': '0 0 30px -8px rgba(168, 85, 247, 0.2)',
      },
    },
  },
  plugins: [],
}

export default config
