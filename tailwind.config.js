module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'form-input':'42px',
      },
      minWidth: {
        'navbar-btn':'160px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
