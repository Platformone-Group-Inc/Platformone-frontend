/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      background: "#F6F7F9",
      border: "#E0E9F4",
      placeholder: "#717680",
      inherit: "inherit",
      current: "currentColor",
      transparent: "transparent",
      black: "#000",
      white: "#fff",

      primary: {
        DEFAULT: "#7C5CFC",
        100: "#EEF2FF",
        200: "#E7DEFE",
        300: "#B49DFE",
        400: "#9F84FD",
        500: "#7C5CFC",
        600: "#5E43D8",
        700: "#432EB5",
        800: "#2D1D92",
        900: "#1D1178",
      },

      success: {
        DEFAULT: "#9CD323",
        100: "#F5FCD2",
        200: "#E8FAA6",
        300: "#D3F178",
        400: "#BCE455",
        500: "#9CD323",
        600: "#7FB519",
        700: "#659711",
        800: "#4C7A0B",
        900: "#3B6506",
      },

      error: {
        DEFAULT: "#FF4423",
        100: "#FFE7D3",
        200: "#FFC8A6",
        300: "#FFA37A",
        400: "#FF7F59",
        500: "#FF4423",
        600: "#DB2719",
        700: "#B71112",
        800: "#930B16",
        900: "#7A0619",
      },

      warn: {
        DEFAULT: "#FFC73A",
        100: "#FFF8D7",
        200: "#FFEFB0",
        300: "#FFE488",
        400: "#FFD96B",
        500: "#FFC73A",
        600: "#DBA32A",
        700: "#B7821D",
        800: "#936312",
        900: "#7A4D0B",
      },

      info: {
        DEFAULT: "#54A6FF",
        100: "#DCF3FF",
        200: "#BAE5FF",
        300: "#98D3FF",
        400: "#7EC2FF",
        500: "#54A6FF",
        600: "#3D81DB",
        700: "#2A60B7",
        800: "#1A4393",
        900: "#102E7A",
      },

      secondary: {
        DEFAULT: "#1A202C",
        100: "#E0E9F4",
        200: "#C3D4E9",
        300: "#90A3BF",
        400: "#596780",
        500: "#1A202C",
        600: "#131825",
        700: "#0D121F",
        800: "#080C19",
        900: "#040815",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
