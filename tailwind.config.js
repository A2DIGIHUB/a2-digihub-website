/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OKIKE Brand Colors
        ios: {
          bg: 'var(--ios-bg)',
          surface: 'var(--ios-surface)',
          'surface-2': 'var(--ios-surface-2)',
          text: 'var(--ios-text)',
          subtext: 'var(--ios-subtext)',
          blue: 'var(--ios-blue)', // OKIKE Orange
          gold: 'var(--ios-gold)', // Secondary accent
          purple: 'var(--ios-purple)', // Dark accent
          border: 'var(--ios-border)',
          // Keep static colors that don't change
          green: '#34c759',
          red: '#ff3b30',
          orange: '#ff9500',
          divider: 'rgba(0,0,0,0.1)',
        },
        primary: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#F34309', // OKIKE Orange - Main brand
          600: '#E64A19',
          700: '#D84315',
          800: '#BF360C',
          900: '#A52A0A',
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
