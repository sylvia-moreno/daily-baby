const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV;
const isProduction = env === 'production';

module.exports = {
  entry: './bin/www',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, './dist'),
  },
  /*resolve: {
    alias: {
      src: path.resolve('src'),
      test: path.resolve('test'),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: ['node_modules'],
  },*/
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : {
                loader: 'style-loader',
              },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'node_modules/')],
              },
            },
          },
          /*{
            loader: 'sass-resources-loader',
            options: {resources: [path.resolve(__dirname, 'src/scss/_core.scss')]},
          },*/
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name].css'}),
  ],
};
