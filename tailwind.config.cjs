/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colours to mirror Calvero aesthetics
        primary: '#161616',
        secondary: '#F5F5F5',
        accent: '#D4AF37',
      },
    },
  },
  plugins: [],
};