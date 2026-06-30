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
        DEFAULT: '#0c0c14',
        light: '#13131f',
        mid: '#1a1a2e',
        deep: '#06060d',
      },
      gold: {
        DEFAULT: '#9333ea',
        light: '#a855f7',
        dark: '#7e22ce',
        pale: '#e9d5ff',
      },
      paper: {
        DEFAULT: '#f5f3ff',
        dim: '#c4b5fd',
        muted: '#9580ba',
      },
      terra: {
        DEFAULT: '#6d28d9',
        light: '#7c3aed',
        dark: '#4c1d95',
      },
    },
    fontFamily: {
      serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-jetbrains)', '"Courier New"', 'monospace'],
    },
    extend: {},
  },
  plugins: [],
}

export default config
