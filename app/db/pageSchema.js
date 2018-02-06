const mongoose = require('./connect.js');
const Schema = mongoose.Schema;

/**
 * @description 定义数据模式
 */
let pageSchema = new Schema({
  documentId: String,
  documentTitle: String,
  documentUrl: {
    type: String,
    default: ''
  },
  tplId: {
    type: Array
  },
  documentData: {
    type: Object
  }

})

/**
 * @description 定义数据模型
 */
const Page = mongoose.model('Page', pageSchema, 'pages');
module.exports = Page;
