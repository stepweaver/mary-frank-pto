/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#00b140', // Base theme color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        background: {
          DEFAULT: '#fafafa',
          secondary: '#f5f5f5',
          tertiary: '#e5e5e5',
        },
        surface: {
          DEFAULT: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#e9ecef',
        },
        text: {
          primary: '#171717',
          secondary: '#525252',
          tertiary: '#737373',
          muted: '#a3a3a3',
        },
        border: {
          DEFAULT: '#e5e5e5',
          secondary: '#d4d4d4',
          accent: '#00b140',
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
