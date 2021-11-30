module.exports = {
  purge: ["./**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#FAFBFD", //bg-brand-background
          darkgray: "#F0F3F8",
          green: "#87C13C",
          darkgreen: "#6BA52B",
          red: "#FF8860",
          darkred: "#DB6146",
          yellow: "#FFA800",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
