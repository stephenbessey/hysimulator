/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hyrox: {
          orange: '#FF6B35',
          'orange-light': '#FF8C66',
          'orange-dark': '#E55A2B',
          black: '#1A1A1A',
          'gray-dark': '#2D2D2D',
          'gray-medium': '#4A4A4A',
          'gray-light': '#F5F5F5',
        },
        primary: {
          50: '#fff4f0',
          100: '#ffe8dd',
          200: '#ffccbb',
          300: '#ffa688',
          400: '#ff7955',
          500: '#FF6B35',
          600: '#E55A2B',
          700: '#cc4d22',
          800: '#a83f1c',
          900: '#8a351a',
        },
      },
      fontFamily: {
        'hyrox': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)' },
        }
      },
      backgroundImage: {
        'gradient-hyrox': 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
    },
  },
  plugins: [],
}