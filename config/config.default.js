'use strict';

module.exports = appInfo => {
  const config = exports = {
    name: 'magicBuildNode',
    baseDur: 'E:\Server\magicBuildNode',
    root: '',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1512030452306_1643';

  // add your config here
  config.middleware = [];

  // 改变jsonwenjianneicun大小
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  return config;
};
