/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      blue: {
        100: "#f0f7ff",
        200: "#dee8f4",
        300: "#dae5f2",
        400: "#262dd1",
        450: "#3992E5",
        500: "#0e159e",
        600: "#181d7a",
        700: "#090c45",
        800: "#06082d",
      },
      purple: {
        100: "#dedff8",
        200: "#d1d3ff",
        300: "#5f65e5",
        400: "#3f44a4",
      },
      pink: {
        100: "#feeaf0",
        200: "#fbb1c7",
        300: "#f52c68",
      },
      gray: {
        100: "#f5f5f5",
        400: "#2B2B2B",
        500: "#252729",
        900: "#121214",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "selector",
};
