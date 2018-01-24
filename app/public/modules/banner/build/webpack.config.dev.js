const _ = require('lodash');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const merge = require('webpack-merge')


const baseConfig = require('./webpack.config.base');
const config = _.clone(baseConfig);

let webpackConfig = merge(config, {
    devtool: 'inline-source-map',
    plugins: [
        // new NpmInstallPlugin(),
        new HtmlWebpackPlugin({
          title: '本地模拟服务器环境',
          template: './src/defaultServer/mods.hbs'
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8888' })
    ],
    devServer: {
        port: 8888,
        contentBase: "../src",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    } 
})
module.exports = webpackConfig;
