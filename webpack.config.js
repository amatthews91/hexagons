const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    contentBase: './dist',
    hot: true
  },
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
};