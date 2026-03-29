import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#0c0a09',  // Warm near-black
          900: '#1c1917',  // Warm dark
          800: '#292524',  // Elevated surface
          700: '#44403c',  // Borders
          600: '#57534e',  // Hover borders
        },
        light: {
          50: '#fafaf9',   // Near-white
          100: '#f5f5f4',  // Very light
          200: '#e7e5e4',  // Light gray
          300: '#d6d3d1',  // Medium light
          400: '#a8a29e',  // Muted
          500: '#78716c',  // Subtle
        },
        accent: {
          primary: '#f59e0b',    // Amber-500
          secondary: '#fbbf24',  // Amber-400
          muted: '#92400e',      // Amber-800
        },
      },
      textColor: {
        body: '#1c1917',      // Stone-900 - light mode
        muted: '#78716c',     // Stone-500 - light mode
        'muted-light': '#a8a29e', // Stone-400 - light mode
      },
      backgroundColor: {
        base: '#fafaf9',      // Stone-50 - light mode
        surface: '#f5f5f4',   // Stone-100 - light mode
        elevated: '#e7e5e4',  // Stone-200 - light mode
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    }
  },
  plugins: []
} satisfies Config;
