// webpack.extra.js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
          mangle: { safari10: true },
          compress: { safari10: true },
          format: { safari10: true }
        }
      })
    ]
  }
};
