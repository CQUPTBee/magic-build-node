const mongoose = require('./connect.js');
const Schema = mongoose.Schema;

/**
 * @description 定义数据模式
 */
const modSchema = new Schema({
  tplName: String,
  tplVersion: {
    type: String,
    default: '0.0.1'
  },
  tplAddress: {
    type: String,
    default: ''
  },
  localAddress:{
    type: String
  },
  data: {
    type: Object
  }

})
 
/**
 * @description 定义数据模型
 */
const Mod = mongoose.model('Mod', modSchema, 'mods');
module.exports = Mod;
