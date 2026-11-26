module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#EFE8DE",
        ink: "#1B1411",
        caramel: "#C8763A",
        berry: "#B3263E",
        mint: "#2F7A5F",
        sky: "#7FB2E5",
        butter: "#F3D36B",
        cocoa: "#5B3A29",
        foam: "#FFF6EA",
        wa: "#25D366",
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "Arial Black", "sans-serif"],
        sans: ['"Figtree Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      maxWidth: { site: "1360px" },
    },
  },
  plugins: [],
};
