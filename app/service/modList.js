'use strict'

const Service = require('egg').Service;
// const request = require('request');
const uuidv1 = require('uuid/v1');
const fs = require('fs'); 
const fse = require('fs-extra')
const path = require('path');
const clone = require('git-clone');


class modListService extends Service {
  async render (req) {
    let id = uuidv1();
    console.log('id:', id);
    console.log('---------------req----------');
    console.log(req);

     // 获取模板coding地址
    let repoUrl = req.repository.ssh_url;
    console.log('repoUrl:  ', repoUrl);
    // clone目标文件夹
    let targetPath = path.resolve(this.config.baseDir, '', 'app/public/repo/mods/');
    // clone代码
    clone(repoUrl, targetPath, res => {
      console.log('clone res')
      // 新clone的模板数组
      let repoFolder = fs.readdirSync('app/public/repo/mods/src/components/modsList/');
      console.log('新clone的模板数组repoFolder:  ', repoFolder);
      // 已经存在的模板数组
      let modFolder = fs.readdirSync('app/public/modules');
      console.log('已经存在的模板数组modFolder:', modFolder);
      // 遍历数组判断模板是否以及存在
      repoFolder.forEach((val, index) => {
        console.log("index:", index);
        console.log('val:', val);
        if (modFolder.includes(val)) {
          console.log('模板已存在') 
          return;
        } else {
          console.log('app/public/repo/mods/src/components/modsList/${val}', 'app/public/repo//mods/src/components/modsList/' + `${val}`);
          // 模板不存在，创建val文件夹
          let newVal = 'app/public/modules/' + `${val}`;
          fs.mkdirSync(newVal);
          console.log('newVal:', newVal)
          // 将新模板copy到modules文件夹下
          fse.copy('app/public/repo/mods/src/components/modsList/' + `${val}`, newVal)
          .then(() => {
            console.log('当前文件夹下的模板', fs.readdirSync('app/public/modules'));
            return
          })
          .catch((err) => {
            console.log('err:\n', err)
          })
        }
          
         // fse.removeSync('app/public/repo/' + `${val}`);

      })


      // // 提取模板代码
      // fse.copy('app/public/repo/mods/src/components/modsList/', 'app/public/repo/')
      // .then(() => {
      //   console.log('copy success!');
      //   // 删除多余的文件
      //   fse.removeSync('app/public/repo/mods');
        
        
      // })
      // .catch((err ) => {
      //   console.log('err:', err);
      // })

      
    })
    

    // if (modFolder.includes(`${req.title}`)){
    //   console.log('')
    // }
    // else {

    //   // 生成模板文件夹
    //   let folder = fs.mkdirSync('app/public/modules/' + `${req.title}`);
    //   console.log('folder:', folder);
      
    // }
  }
}

module.exports = modListService;
