module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EFEEEA",
        sheet: "#F8F7F4",
        ink: "#0F0F0E",
        plate: "#1430E6",
        flame: "#FF4A1C",
        mute: "#77756F",
        rule: "#0F0F0E26",
      },
      fontFamily: {
        display: ['"Anybody Variable"', "Impact", "sans-serif"],
        sans: ['"Schibsted Grotesk Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Martian Mono Variable"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
