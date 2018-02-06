'use strict'

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const Mod = require('../db/modSchema.js');
const Page = require('../db/pageSchema.js');

class getPageService extends Service {
  async get(id) {
    let newPage = new Page({
      
    })
    let promise = new Promise((resolve, reject) => {
      Page.find({
        documentId: id
      }, (err, res) => {
        if (err) {
          console.log('查询失败：\n', err);
          return 0;
        }
        console.log('res: ', res);
        resolve(res)
      })
    })
    promise.then((val) => {
      console.log('val--------------', val);
      
    })
    return promise; 
  }
}

module.exports = getPageService;