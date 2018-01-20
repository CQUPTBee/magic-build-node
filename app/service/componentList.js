'use strict';

const clone = require('git-clone');
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ComponentListService extends Service {
  async get(id) {
    const fileName = path.resolve(this.config.db.dir, `${id}.json`);
    const result = await readFile(fileName, 'utf8');
    return result;
  }

  async create(req) {
    const id = uuidv1();
    const fileName = path.resolve(this.config.db.dir, `${id}.json`);
    await writeFile(fileName, JSON.stringify(req), 'utf-8');

    // 从coding clone项目代码
    const repo = 'git@github.com:CQUPTBee/magic-page.git';
    const targetPath = path.resolve(this.config.baseDir, '', 'app/public/modules');
    console.log('targetPath', targetPath);
    clone(repo, targetPath, err => {
      cosnsole('err', err);
    });

    (function () {
      var childProcess = require("child_process");
      var oldSpawn = childProcess.spawn;
      function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
      }
      childProcess.spawn = mySpawn;
    })();
    
    const url = 'http://www.karenhoo/' + `${req.title}.html`
    return url;
  }
}

module.exports = ComponentListService;
