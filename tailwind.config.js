/** @type {import('tailwindcss').Config} */
export default {
  content: ["assets/**", "entrypoints/**", "components/**"],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      animation: {
        blink: "blink 250ms infinite",
      },
    },
  },
  plugins: [],
};
