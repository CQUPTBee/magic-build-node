const _ = require('lodash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const BASEPATH = path.resolve(__dirname, '..');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base');

const config = _.clone(baseConfig);

let webpackConfig = merge(config, {
    plugins:[
        new CleanWebpackPlugin(
          ['build'],
          {
            root: BASEPATH + '/src',
          }
        ),
        new CopyWebpackPlugin([
          {
              from: './src/index.hbs',
              to:'./'
          },
          {
              from: './src/data/data.json',
              to:'./'
          },
          {
              from: './src/data/jsonschema.json',
              to:'./'
          },
          {
              from: './src/helpers',
              to:'./helpers'
          },
        ]),
    ]
})
module.exports = webpackConfig;
