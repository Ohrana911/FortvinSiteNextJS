/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'color-blue': '#5482A4',
        'color-light-blue': '#BCDBF2',
        'color-dark': '#2F3336',
        'color-gray': '#63696F',
        'color-light-gray': '#E3E8ED',
      }
    },
  },
  plugins: [],
}