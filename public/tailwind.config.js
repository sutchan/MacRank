
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
        },
        // Centralized colors for glassmorphism ("Frost") effects
        frost: {
          light: 'rgba(251, 251, 253, 0.8)',      // Header Light
          dark: 'rgba(22, 22, 23, 0.8)',         // Header Dark
          'light-chat': 'rgba(255, 255, 255, 0.95)', // AIChat Light
          'dark-chat': 'rgba(30, 30, 30, 0.95)',       // AIChat Dark
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  }
}
