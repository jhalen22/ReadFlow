/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0f172a", // primary navy — panels, buttons, headings
          800: "#16213c",
        },
        flow: {
          400: "#38bdf8", // "Flow" wordmark / accent blue
          500: "#0ea5e9",
          600: "#4f46e5", // links (indigo-blue)
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
