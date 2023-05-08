/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
  },
  important: true,
  theme: {
    extend: {},
    // container: {
    //   maxWidth: 'columns.7xl',
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    //   paddingLeft: 'spacing.4',
    //   paddingRight: 'spacing.4'
    // }
  },
  plugins: [],

}

