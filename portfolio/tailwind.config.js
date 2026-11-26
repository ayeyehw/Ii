module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08090A",
        panel: "#101214",
        raise: "#171A1D",
        line: "rgba(237,239,234,0.12)",
        fg: "#EDEFEA",
        mute: "#8B918C",
        blue: { DEFAULT: "#2F6BFF", deep: "#0E1F4D", soft: "#8DAEFF" },
        green: { DEFAULT: "#0F4D3A", lt: "#3FA37C", deep: "#0A2E23" },
        wa: "#25D366",
      },
      fontFamily: {
        sans: ['"Figtree Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1360px" },
    },
  },
  plugins: [],
};
