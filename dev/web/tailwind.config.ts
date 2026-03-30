import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#1a1816',  // Warm dark (NOT pure black)
          900: '#242120',  // Warm surface
          800: '#2e2a28',  // Elevated
          700: '#3a3634',  // Borders
          600: '#4a4543',  // Hover borders
        },
        light: {
          50: '#faf9f8',   // Warm off-white
          100: '#f5f3f0',  // Soft cream
          200: '#eee9e3',  // Light beige
          300: '#e5e0da',  // Borders
          400: '#9c9590',  // Muted
          500: '#6b6560',  // Secondary
        },
        accent: {
          primary: '#d4a574',    // Soft terracotta
          secondary: '#e8c9a8',  // Lighter peach
          muted: '#a67c52',      // Deeper terracotta
        },
      },
      textColor: {
        body: '#3d3833',      // Warm dark brown - light mode
        muted: '#6b6560',     // Muted brown - light mode
        'muted-light': '#9c9590', // Soft gray - light mode
      },
      backgroundColor: {
        base: '#faf9f8',      // Warm off-white - light mode
        surface: '#f5f3f0',   // Soft cream - light mode
        elevated: '#eee9e3',  // Light beige - light mode
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
