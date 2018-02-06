'use strict';
const path = require('path');
const pkg = require('../package.json');

module.exports = config => {
  return {
    name: pkg.name,
    baseDir: path.resolve(__dirname, '../'),

    // use for cookie sign key, should change to your own and keep security
    keys: pkg.name + '_1512030452306_1643',

    // static : true,
    security: {
      // csrf: {
      //   headerName: 'x-csrf-token',
      // },
      csrf: false
    },


    // 改变jsonwenjianneicun大小
    bodyParser: {
      jsonLimit: '1mb',
      formLimit: '1mb',
    },

    db: {
      dir: path.resolve(__dirname, '../', 'app/db/'), // 本地开发、测试环境 json 数据目录
       
    },
    
    // 模板文件
    tplFile: {
      dir: path.resolve(__dirname, '../', 'app/public/modules/'),
    },

  }
};
