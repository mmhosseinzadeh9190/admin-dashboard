/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        Roboto: ['"Roboto"', ...defaultTheme.fontFamily.sans],
      },

      letterSpacing: {
        0.1: "0.1px",
      },

      colors: {
        gray: {
          100: "#FAFAFB",
          200: "#F1F1F5",
          300: "#E2E2EA",
          400: "#D5D5DC",
          500: "#B5B5BE",
          600: "#92929D",
          700: "#696974",
          800: "#44444F",
          900: "#171725",
        },
        primary: {
          50: "#faf4ff",
          100: "#f4e5ff",
          200: "#ebcfff",
          300: "#dbaaff",
          400: "#c573ff",
          500: "#af3eff",
          600: "#9c19ff",
          700: "#870ae6",
          800: "#6a0dad",
          900: "#5f0d96",
          950: "#410071",
        },
        success: {
          50: "#f0fdf5",
          100: "#dcfce8",
          200: "#bbf7d1",
          300: "#86efad",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803c",
          800: "#166533",
          900: "#14532b",
        },
        error: {
          50: "#fff1f1",
          100: "#ffdfdf",
          200: "#ffc5c5",
          300: "#ff9d9d",
          400: "#ff6464",
          500: "#ff3333",
          600: "#ed1515",
          700: "#c80d0d",
          800: "#a50f0f",
          900: "#881414",
        },
        warning: {
          50: "#FFF7ED",
          100: "#FFEDC7",
          200: "#FFD69A",
          300: "#FFB74D",
          400: "#FFA500",
          500: "#FF8C00",
          600: "#FF7F00",
          700: "#FF6B00",
          800: "#FF5A00",
          900: "#FF4500",
        },
      },
    },
  },
  plugins: [],
};
