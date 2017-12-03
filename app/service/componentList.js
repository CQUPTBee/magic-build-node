'use strict';

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
    const result = {
      id,
    };
    return result;
  }
}

module.exports = ComponentListService;
