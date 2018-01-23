'use strict'

const Service = require('egg').Service;
// const request = require('request');
const uuidv1 = require('uuid/v1');

class modListService extends Service {
  async render (req) {
    let id = uuidv1();
    console.log('id:', id);
    console.log('---------------req----------');
    console.log(req);
    // 生成模板文件夹
    let folder = fs.mkdirSync('app/public/modules/' + `${req.title}`);
    console.log('folder:', folder);
    // 获取模板coding地址
    let repoUrl = req.repository.ssh_url;
    console.log('repoUrl:', repoUrl);
    // clone目标文件夹
    let targetPath = path.resolve(this.config.baseDir, '', 'app/public/modules/');
    clone(repoUrl, targetPath, res => {
      console.log('clone res')
    })
  }
}

module.exports = modListService;