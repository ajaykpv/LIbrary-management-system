module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'smoked-light':'rgba(0,0,0,0.4)'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
