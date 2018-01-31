'use strict'

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const Mod = require('../db/modSchema.js');
const Page = require('../db/pageSchema.js');

class getPageService extends Service {
  async get(id) {
    
    return Page.find({
      documentId: id
    }, (err, res) => {
      if(err) {
        console.log('查询失败：\n', err);
        return;
      }
      console.log('res: ', res);
    })
  }
}

module.exports = getPageService;