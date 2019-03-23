const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname + '/src/index.js'),
  },
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
    mainFiles: ['index'],
    alias: {},
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-env", { "useBuiltIns": "usage" }],
              ],
            }
          },
        ]
      }, {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  mode: 'production'
}
