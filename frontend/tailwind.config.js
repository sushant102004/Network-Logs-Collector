/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm' : '480px',
        'md' : '768px',
        'lg' : '1024px'
      },
      colors: {
        primaryBlack: 'var(--primary-black)'
      }
    },
  },
  plugins: [],
}