'use strict'

const Service = require('egg').Service;
// const request = require('request');
const uuidv1 = require('uuid/v1');
const fs = require('fs'); 
const fse = require('fs-extra')
const path = require('path');
const clone = require('git-clone');
const Mod = require('../db/modSchema.js');
const Page =require('../db/pageSchema.js');
const cdn = require('cdn');

class modListService extends Service {
  async render (req) {

     // 获取模板coding地址
    let repoUrl = req.repository.ssh_url;
    console.log('repoUrl:  ', repoUrl);
    // clone目标文件夹
    let targetPath = path.resolve(this.config.baseDir, '', 'app/public/repo/mods/');
    // clone代码
    clone(repoUrl, targetPath, res => {
      console.log('clone res')
      // 新clone的模板数组
      let repoPath = 'app/public/repo/mods/src/components/modsList/';
      let repoFolder = fs.readdirSync(repoPath);
      console.log('新clone的模板数组repoFolder:  ', repoFolder);

      // 遍历package.json,判断模板是否存在
      repoFolder.forEach((val, index) => {
        let fPath = repoPath + val; 
        console.log('fpth: ', fPath);
        let stats = fs.statSync(fPath);
        // 判断是否是文件夹
        if (stats.isDirectory()) {
          // 读取json文件
          let pkgFile = fs.readFileSync(repoPath + `${val}` + '/package.json', 'utf-8');
          console.log('pkgFile:', typeof pkgFile);
          console.log('pkgFile.name: ', JSON.parse(pkgFile).name);
          let pkgData = JSON.parse(pkgFile);
          // 读取默认数据  cdn
          let tplAddress = fPath + '/src/build';

          // cdn
          let localAddress = fs.readFileSync(fPath + '/src/build/local.json', 'utf-8');
          let modData = fs.readFileSync(fPath + '/src/build/data.json', 'utf-8');
         
          // 在集合中查询模块名
          Mod.find({
            tplName: pkgData.name
          },(err, res) => {
            if(err){
              console.log('tplName err:', err);
              return;
            } 
            // 查询结果为空
            if (res == ''){ 
              // 发送数据和local.json到cdn

              // 新建数据模型
              let newMod = Mod({
                tplName: pkgData.name,
                tplVersion: pkgData.version,
                tplAddress: tplAddress,
                localAddress: localAddress,
                data: modData
              });
              console.log('newMod: ', newMod);
              Mod.create(newMod, (err, res) => {
                if(err) {
                  console.log('tplName creat err: ', err);
                  return;
                }
                console.log('tplName creat res: ', res)
              });
            } else {
              Mod.find({
                tplVersion: pkgData.version
              }, (err, res) => {
                if(err) {
                  console.log('tplVersion err ', err);
                  return;
                }
                if (res == '') {
                  // 发送数据和local.json到cdn
                  let newMod =new Mod({
                    tplName: pkgData.name,
                    tplVersion: pkgData.version,
                    tplAddress: tplAddress,
                    data: modData
                  });
                  console.log('newMod: ', newMod);
                  Mod.create(newMod, (err, res) => {
                    if (err) {
                      console.log('tplVersion creat err: ', err);
                      return;
                    }
                    console.log('tplVersion creat res: ', res)
                  });
                }else {
                  console.log('tplVersion 已经存在');
                  return;
                }               
              })                          
            }             
          })

        } 
       return;       
      })
      
      // 已经存在的模板数组
      /* let modFolder = fs.readdirSync('app/public/modules/');
      console.log('已经存在的模板数组modFolder:', modFolder);
      // 遍历数组判断模板是否以及存在
      repoFolder.forEach((val, index) => {
        console.log("index:", index);
        console.log('val:', val);
        if (modFolder.includes(val)) {
          console.log('模板已存在') 
          return;
        } else {
          console.log('app/public/repo/mods/src/components/modsList/${val}', 'app/public/repo/mods/src/components/modsList/' + `${val}`);
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
            this.ctx.logger;
            console.log('err:\n', err)
          })
        }
          
         // fse.removeSync('app/public/repo/' + `${val}`);

      }) */
    })
    
  }
}

module.exports = modListService;
