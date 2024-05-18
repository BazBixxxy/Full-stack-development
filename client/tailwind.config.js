/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
        // primary: "#F53850",
        primary: "#0369A1",
        secondary: "#2b3440",
      },
    },
  },

  daisyui: {
    themes: [
      // light theme
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          "--primary-muted": "259 94% 71%",
        },
      },
      // cupcake theme
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          "--primary-muted": "183 47% 79%",
        },
      },
      // dark theme
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          "--primary-muted": "262 80% 30%",
        },
      },
    ],
  },
};
