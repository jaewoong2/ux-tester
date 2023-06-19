module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-custom-properties-fallback': {
      importFrom: require.resolve('react-spring-bottom-sheet/defaults.json'),
    },
    autoprefixer: {},
  },
}
