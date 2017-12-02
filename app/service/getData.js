'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path')
const util = require('util');
const readFile = util.promisify(fs.readFile);

class getNewService extends Service {
  async find(id) {
    // const result = await this.ctx.curl(`http://photoserver/id=${id}`, { dataType: 'json' });

    const fileName = path.resolve(__dirname, '../public/', `${id}.json`);
    const result = await readFile(fileName, 'utf8')
    // const result = id;
    return result;
  }
}

module.exports = getNewService;
