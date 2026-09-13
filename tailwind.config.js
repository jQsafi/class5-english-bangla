/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bangla: [
          '"Noto Sans Bengali"',
          '"Kohinoor Bangla"',
          '"Bangla Sangam MN"',
          '"SolaimanLipi"',
          '"Kalpurush"',
          '"Hind Siliguri"',
          'system-ui',
          'sans-serif',
        ],
        english: [
          '"Outfit"',
          '"Noto Sans Bengali"',
          '"Inter"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
