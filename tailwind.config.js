import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'frost-light': 'rgba(255, 255, 255, 0.8)',
        'frost-dark': 'rgba(0, 0, 0, 0.8)',
        'frost-light-chat': 'rgba(255, 255, 255, 0.95)',
        'frost-dark-chat': 'rgba(28, 28, 30, 0.95)',
        'scrim': 'rgba(50, 50, 50, 0.5)',
        'apple-gray': {
          50: '#F5F5F7', // Light mode background
          100: '#E5E5EA',
          200: '#D1D1D6',
          300: '#C7C7CC',
          400: '#AEAEB2',
          500: '#8E8E93',
          600: '#636366',
          700: '#48484A',
          800: '#3A3A3C',
          850: '#2C2C2E', // Elev 2
          900: '#1C1C1E', // Elev 3 (Modal Dark)
          950: '#000000', // Dark mode background
        }
      },
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
    },
  },
  plugins: [
    tailwindAnimate
  ],
}