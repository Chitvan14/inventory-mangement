// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#0849B0"
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
