const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16121A",
        cream: "#FBF6F1",
        blush: "#F6D9EC",
        orchid: "#E9A8D6",
        berry: "#B8327A",
        lime: "#F2E86D",
        cocoa: "#6F4E37",
        gray: colors.neutral,
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Archivo Black", "Impact", "sans-serif"],
        script: ["Instrument Serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
