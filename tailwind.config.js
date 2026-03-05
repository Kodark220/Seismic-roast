/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        seismic: {
          50: "#f8f3f4",
          100: "#ecd8df",
          300: "#ce9bae",
          500: "#9c7282",
          700: "#554148",
          900: "#22181d"
        }
      },
      boxShadow: {
        card: "0 24px 70px rgba(0,0,0,.35)"
      }
    }
  },
  plugins: []
};
