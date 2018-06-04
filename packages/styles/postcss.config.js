module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['> 5%', 'Edge 16'],
      // disable cleaning outdated prefixes
      // (we need it for IE 11, particularly for placeholders):
      remove: false
    }
  }
};
