/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary))",
          darker: "rgb(var(--color-primary-darker))",
        },

        black: "rgb(var(--color-black))",
        dark: "rgb(var(--color-dark))",

        light: "rgb(var(--color-light))",
        white: "rgb(var(--color-white))",

        muted: {
          DEFAULT: "rgb(var(--color-muted))",
          dark: "rgb(var(--color-muted-dark))",
        },

        border: {
          DEFAULT: "rgb(var(--color-border))",
          dark: "rgb(var(--color-border-dark))",
        },
      },

      borderColor: {
        DEFAULT: "rgb(var(--color-border))",
        dark: "rgb(var(--color-border-dark))",
      },

      boxShadowColor: {
        dark: "rgb(var(--color-border-dark))",
      },

      borderRadius: {
        DEFAULT: ".5rem",
      },
    },
  },
  plugins: [],
};
