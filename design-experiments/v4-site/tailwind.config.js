/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0a2640",
          'navy-deep': "#061829",
          teal: "#00abc0",
          'teal-bright': "#2dd4e6",
        },
        cream: {
          DEFAULT: "#f5f1ea",
          dark: "#ebe4d6",
        }
      },
      fontFamily: {
        sans: ["General Sans", "sans-serif"],
        body: ["General Sans", "sans-serif"],
        display: ["General Sans", "sans-serif"],
        merriweather: ["General Sans", "sans-serif"],
        lora: ["General Sans", "sans-serif"],
        zilla: ["General Sans", "sans-serif"],
      }
    },
  },
  plugins: [],
}
