/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["poppins", "sans-serif"],
    },
    extend: {
      fontFamily: {
        publicSans: ["public-sans", "sans-serif"],
        roboto: ["roboto", "sans-serif"],
        openSans: ["open-sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
