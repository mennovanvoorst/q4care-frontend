/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['"Roboto"', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        'layout': '1fr 5fr',
        'layoutFullWidth': '1fr 1fr 1fr',
      },
      gridTemplateRows: {
        'layout': '64px 1fr',
        'layoutFullWidth': '1fr 2fr 1fr',
      }
    },
  },
  plugins: [],
}
