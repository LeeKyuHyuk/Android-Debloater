const lodash = require('lodash');
const CopyPlugin = require('copy-webpack-plugin');
const commonConfig = require('./webpack.common.config');

const mainConfig = lodash.cloneDeep(commonConfig);
mainConfig.entry = './src/main/main.ts';
mainConfig.target = 'electron-main';
mainConfig.output.filename = 'main.bundle.js';
mainConfig.plugins = [
  new CopyPlugin({
    patterns: [
      {
        from: 'package.json',
        to: 'package.json',
        transform: (content) => {
          const jsonContent = JSON.parse(content);

          delete jsonContent.devDependencies;
          delete jsonContent.scripts;
          delete jsonContent.build;

          jsonContent.main = './main.bundle.js';
          jsonContent.scripts = { start: 'electron ./main.bundle.js' };
          jsonContent.postinstall = 'electron-builder install-app-deps';

          return JSON.stringify(jsonContent, undefined, 2);
        },
      },
    ],
  }),
];

module.exports = [mainConfig];
