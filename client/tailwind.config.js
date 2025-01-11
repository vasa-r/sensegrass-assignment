/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        label: "13px",
        controlcopy: "14px",
        copy: "16px",
        largecopy: "18px",
        subtitle: "24px",
        title: "48px",
        controlicon: "16px",
        hero: "62px",
        fullhero: "96px",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        btnClr: "#4D2FF5",
        subHead: "#8c8c8c",
        lightPur: "#A032FB",
        reviewCard: "#13151B",
      },
      boxShadow: {
        price: "rgba(160, 145, 250, 0) 0px 0px 40px 10px",
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
      height: {
        "btm-height": "calc(100vh - 72px)",
      },
    },
  },
  plugins: [],
};
