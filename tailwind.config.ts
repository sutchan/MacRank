
// v0.3.1
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        gray: {
          50: '#F5F5F7',
          100: '#E8E8ED',
          200: '#D2D2D7',
          300: '#86868B',
          400: '#6E6E73',
          500: '#424245',
          600: '#333336',
          700: '#1D1D1F',
          800: '#161617',
          900: '#000000',
        },
        blue: {
          500: '#0071E3',
          600: '#0077ED',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
