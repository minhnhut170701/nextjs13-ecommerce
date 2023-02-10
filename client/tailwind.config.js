/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "banner-1": "url('../images/banner-1.jpg')",
        "cate-1": "url('../images/cate-1.jpg')",
        "cate-2": "url('../images/cate-2.jpg')",
        "cate-3": "url('../images/cate-3.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/line-clamp')],
};
