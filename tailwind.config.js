/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangla: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        english: ['"Outfit"', '"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
