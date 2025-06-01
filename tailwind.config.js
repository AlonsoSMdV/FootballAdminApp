/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/index.html",
    "./src/**/*.html",
    "./src/**/*.ts",
    "./src/**/*.scss"
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        shine: 'shine 2s linear infinite',
      },
    },
  },
  plugins: [],
}