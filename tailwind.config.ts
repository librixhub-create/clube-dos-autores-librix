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
        DEFAULT: '#111111',
        light: '#191919',
        mid: '#222222',
        deep: '#0a0a0a',
      },
      gold: {
        DEFAULT: '#e0d6c4',
        light: '#ede5d5',
        dark: '#c8bca8',
        pale: '#f5f2ec',
      },
      paper: {
        DEFAULT: '#ffffff',
        dim: '#b8ae9e',
        muted: '#7a7268',
      },
      terra: {
        DEFAULT: '#9c7a4a',
        light: '#b08c58',
        dark: '#7a5c38',
      },
    },
    fontFamily: {
      serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      mono: ['var(--font-jetbrains)', '"Courier New"', 'monospace'],
    },
    extend: {
      boxShadow: {
        'glow-purple': '0 0 80px -15px rgba(156, 122, 74, 0.2), 0 0 160px -30px rgba(156, 122, 74, 0.08)',
        'glow-purple-sm': '0 0 30px -8px rgba(156, 122, 74, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
