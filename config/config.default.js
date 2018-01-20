'use strict';
const path = require('path');
const pkg = require('../package.json');

module.exports = {
  name: pkg.name,
  baseDir: path.resolve(__dirname, '../'),

  // use for cookie sign key, should change to your own and keep security
  keys: pkg.name + '_1512030452306_1643',

  security: {
    csrf: false,
  },
  // add your config here
  middleware: [],

  // 改变jsonwenjianneicun大小
  bodyParser: {
    jsonLimit: '1mb',
    formLimit: '1mb',
  },

  db: {
    dir: path.resolve(__dirname, '../', 'app/db'), // 本地开发、测试环境 json 数据目录
  },


  // 配置插件
  view: {
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.nj',
    mapping: {
      '.nj': 'nunjucks',
    },
    root: [
      path.join(__dirname, 'app/view'), 
    ].join(',')
  },

  // view: {
  //   defaultViewEngine: 'handlebars',
  //   defaultExtension: '.hbs',
  //   mapping: {
  //     '.hbs': 'handlebars',
  //   },
  // },
};
