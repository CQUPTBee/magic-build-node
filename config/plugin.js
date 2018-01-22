'use strict';

// had enabled by egg
module.exports = {
  static: true,
  // 启用view插件
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  handlebars: {
    enable: true,
    package: 'egg-view-handlebars',
  }
};
