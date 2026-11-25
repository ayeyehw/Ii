module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0C",
        panel: "#161614",
        raise: "#1F1F1C",
        fg: "#F3F1EC",
        mute: "#9D9A92",
        line: "rgba(243,241,236,0.12)",
        wa: "#25D366",
      },
      fontFamily: {
        sans: ['"Onest Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Gloock", "Georgia", "serif"],
      },
      maxWidth: { site: "1320px" },
    },
  },
  plugins: [],
};
