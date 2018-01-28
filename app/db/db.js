const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/nodeBuild';

module.exports = db => {

  /**
   *  @desc 插入数据
   */

  let insertData = (db, callback) => {
    // let database = db.db("nodeBuild");
    // 连接到mods集合
    let collection = db.collection('mods');
    // 模板数据
    let data = [];
    // 插入数据
    collection.insert(data, (err, res) => {
      if(err) {
        console.log('insert err: \n', err);
        return ;
      } 
      callback(res);
    })
  }

  /**
   * @desc 查询数据
   */
  let selectData = (db, callback) => {
    let collection = db.collection('mods');
    //查询数据
    let selectStr = { "name": 'banner' };
    collection.find(selectStr).toArray((err, result) => {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  }

  /**
   * @desc  修改数据
   */
  let updateData = function (db, callback) {
    //连接到表  
    let collection = db.collection('mods');
    //更新数据
    let oldStr = { "name": 'banner' };
    let updateStr = { $set: { "url": "https://www.baidu.com" } };
    collection.update(oldStr, updateStr, (err, result) => {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  }

  /**
   * @des
   */
  let delData = function (db, callback) {
    //连接到表  
    let collection = db.collection('site');
    //删除数据
    let delStr = { "name": 'banner' };
    collection.remove(delStr, (err, result) => {
      if (err) {
        console.log('Error:' + err);
        return;
      }
      callback(result);
    });
  }
}