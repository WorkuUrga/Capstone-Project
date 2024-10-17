module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // You can set it to 'media' or 'class' if needed
  theme: {
    extend: {
      screens: {
        mobile: "760px", // Custom breakpoint at 760px
      },
    },
  },
  plugins: [],
};
