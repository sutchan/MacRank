// Placed in /public to be served as a static asset
// This config object must be available before the Tailwind CDN script is loaded.

tailwind.config = {
  darkMode: 'class',
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
          'sans-serif'
        ],
      },
      colors: {
        gray: {
          50: '#F5F5F7', // Apple Light Gray Background
          100: '#E8E8ED',
          200: '#D2D2D7',
          300: '#86868B', // Apple Text Gray
          400: '#6E6E73',
          500: '#424245',
          600: '#333336',
          700: '#1D1D1F', // Apple Black/Dark
          800: '#161617',
          900: '#000000',
        },
        blue: {
          500: '#0071E3', // Apple Blue
          600: '#0077ED',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
