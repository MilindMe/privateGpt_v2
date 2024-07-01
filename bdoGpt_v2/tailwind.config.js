/** @type {import('tailwindcss').Config} */
module.exports = {
  mode :'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#1E1F20',
          800: '#1A1A1C',
          700: '#131314',
          600: '#444746',
          500: '#BDC1C6'
        },
        blue:{
          900: '#22346E'
        },
        red:{
          900: '#9E2C35'
        }
      },

      fontFamily:{
        roboto:["Roboto","sans-serif"],
      },

      animation:{
        "text-gradient": "text 5s linear infinite"
      },
      keyframes:{
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}