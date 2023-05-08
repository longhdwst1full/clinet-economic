/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,js, jsx , ts, tsx}"],
  theme: {
    extend: {},
    container: {
      maxWidth: 'columns.7xl',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: 'spacing.4',
      paddingRight: 'spacing.4'
    }
  },
  plugins: [],
}

