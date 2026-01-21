/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // iOS 18 System Colors - Soft Periwinkle Palette
        ios: {
          bg: 'var(--ios-bg)',
          surface: 'var(--ios-surface)',
          'surface-2': 'var(--ios-surface-2)',
          text: 'var(--ios-text)',
          subtext: 'var(--ios-subtext)',
          blue: 'var(--ios-blue)', // Now soft periwinkle
          gold: 'var(--ios-gold)', // Premium gold accent
          purple: 'var(--ios-purple)', // Deeper purple
          border: 'var(--ios-border)',
          // Keep static colors that don't change
          green: '#34c759',
          red: '#ff3b30',
          orange: '#ff9500',
          divider: 'rgba(0,0,0,0.1)',
        },
        primary: {
          50: '#EEEDF5',
          100: '#DEDBF0',
          200: '#BDB6E2',
          300: '#9B92D3',
          400: '#7A6DC5', // Periwinkle-400
          500: '#594886', // Periwinkle-500 - Main brand
          600: '#473A92', // Deeper purple
          700: '#352C6D',
          800: '#241D49',
          900: '#120F24',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Text',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem', // Super rounded for cards
        'squircle': '20px', // Iconic Apple shape approximation
      },
      boxShadow: {
        'ios': '0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02)',
        'ios-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)', // iOS Spring-like
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
};
// Force rebuild
