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
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}