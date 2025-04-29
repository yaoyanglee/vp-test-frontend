/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      //add in extend to add on to their default color palette
      colors:{
        "syn-purple": '#5b0df5',
        "syn-fuchsia": '#FF00FF',
        "syn-navy": '#0B0C5C',
        "syn-sky": '#3F7CF5',
        "syn-turquoise": '#2FB7F4',
        "syn-lavender": '#BF5AF5',
        "syn-aqua": '#6AEFF3',
        "syn-lilac": '#E8EAFD'
      },
      fontFamily: {
        barcode: ['"Libre Barcode 39 Text"'],
      }
    },
  },
  plugins: [
    // Add a plugin to handle `:only-child`
    function({ addVariant, e }) {
      addVariant('only-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`only-child${separator}${className}`)}:only-child`;
        });
      });
    },
  ],
  corePlugins: {
    preflight: false
  },
}
