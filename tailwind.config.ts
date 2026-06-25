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
        DEFAULT: '#15261d',
        light: '#1e3329',
        mid: '#243d30',
        deep: '#0d1a13',
      },
      gold: {
        DEFAULT: '#c9a24b',
        light: '#d4b56a',
        dark: '#a88538',
        pale: '#e8d5a3',
      },
      paper: {
        DEFAULT: '#f3eedd',
        dim: '#c8bfa8',
        muted: '#9e968a',
      },
      terra: {
        DEFAULT: '#a8552f',
        light: '#c4693f',
        dark: '#7d3d22',
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
