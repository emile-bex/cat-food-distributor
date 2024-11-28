const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const glob = require("glob");

module.exports = [
  {
    entry: glob.sync("./src/db/**/*.ts").reduce((acc, file) => {
      acc[file.replace(/^\.\//, "").replace(/\.ts$/, "")] = file;
      return acc;
    }, {}),
    output: {
      path: join(__dirname, '../../dist/apps/typeorm-migration'),
      filename: "[name].js",
      chunkFilename: "[name]-[id].js",
      sourceMapFilename: '[name].js.map',
      libraryTarget: "commonjs",
    },
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './typeorm.config.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
        'sourceMap': true
      })
    ]
  },
  {
    output: {
      path: join(__dirname, '../../dist/apps/cat-food-distributor-back'),
      libraryTarget: "commonjs",
    },
    plugins: [
      new NxAppWebpackPlugin({
        target: 'node',
        compiler: 'tsc',
        main: './src/main.ts',
        tsConfig: './tsconfig.app.json',
        assets: ['./src/assets'],
        optimization: false,
        outputHashing: 'none',
        'sourceMap': true
      })
    ]
  }];

