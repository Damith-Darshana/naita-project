/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'naita': {
          'red': '#87212E',
          'gray': {
            DEFAULT: '#636262',
            'dark': '#242424',
            'medium': '#414141',
            'light': '#7D7D7D',
            'lighter': '#333333'
          }
        }
      },
      borderRadius: {
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '10': '10px',
        '12': '12px',
        '30': '30px',
        '77': '77px'
      }
      
    },
  },
  plugins: [],
}