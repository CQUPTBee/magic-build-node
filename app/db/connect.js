const mongoose = require('mongoose');
const DB_URL = 'mongodb://139.199.90.238:27017/nodeBuild';

/**
 * 连接
 */
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
  console.log('连接成功！');
  console.log('Mongoose connection open to ' + DB_URL);
});

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
  console.log('连接失败');
  console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
  console.log('连接断开');
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose;
