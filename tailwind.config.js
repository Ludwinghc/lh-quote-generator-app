/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#64748B",
        tertiary: "#BC4800",
        neutral: "#0F172A",
      },
      fontFamily: { sans: ["Inter", "sans-serif"] },
    },
  },
};
