import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			dark: {
  				'600': '#5e4f3f',
  				'700': '#524435',
  				'800': '#463a2b',
  				'900': '#3d3224',
  				'950': '#342b1d'
  			},
  			light: {
  				'50': '#faf9f8',
  				'100': '#f5f3f0',
  				'200': '#eee9e3',
  				'300': '#e5e0da',
  				'400': '#9c9590',
  				'500': '#6b6560'
  			},
  			accent: {
  				primary: '#d4a574',
  				secondary: '#e8c9a8',
  				muted: '#a67c52'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		textColor: {
  			body: '#3d3833',
  			muted: '#6b6560',
  			'muted-light': '#9c9590'
  		},
  		backgroundColor: {
  			base: '#faf9f8',
  			surface: '#f5f3f0',
  			elevated: '#eee9e3'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out',
  			'fade-in-up': 'fadeInUp 0.5s ease-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'slide-down': 'slideDown 0.5s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			float: 'float 6s ease-in-out infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-100%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			}
  		}
  	}
  },
  plugins: []
} satisfies Config;
