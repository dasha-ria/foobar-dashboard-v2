module.exports = {
  purge: ["./**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          background: "#FAFBFD", //bg-brand-background
          green: "#87C13C",
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
