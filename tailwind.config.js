const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
  variants: {},
  plugins: [],
};
