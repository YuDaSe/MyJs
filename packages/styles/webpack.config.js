const scss = [
  'file-loader?name=bundle.css',
  'extract-loader',
  'css-loader',
  // for configuration see postcss.config.js (autoprefixer)
  'postcss-loader',
  // resolve image paths based on the sass-loader source maps
  'resolve-url-loader',
  'sass-loader?sourceMap',
  './index.scss'
];

module.exports = {
  entry: ['./index.js', scss.join('!')],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: { limit: 10000 }
      }
    ]
  },
  output: { filename: 'bundle.js' }
};
