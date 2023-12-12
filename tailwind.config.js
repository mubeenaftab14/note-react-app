/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    fontFamily: {
      inter: ['"ff-inter"', 'sans-serif'],
    },
    extend: {
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      }
    },
  },
  plugins: [],
}

