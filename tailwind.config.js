/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'roku-purple': '#4B0082',
        'dark-bg': '#1c1c1e',
        'button-bg': '#2c2c2e',
        'button-active': '#3a3a3c',
      },
    },
  },
  plugins: [],
}
