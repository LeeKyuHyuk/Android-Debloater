const lodash = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common.config');

const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.devServer = {
  static: {
    directory: path.join(__dirname, './dist'),
  },
  port: 3000,
  hot: true,
};
rendererConfig.entry = './src/renderer/index.tsx';
rendererConfig.target = 'electron-renderer';
rendererConfig.output.filename = 'renderer.bundle.js';
rendererConfig.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
  }),
];

module.exports = [rendererConfig];
