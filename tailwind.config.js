module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'form-input':'42px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
