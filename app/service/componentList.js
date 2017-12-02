'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const util = require('util');
const uuidv1 = require('uuid/v1');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class ComponentListService extends Service {
  async get(id) {
    const fileName = path.resolve(__dirname, '../db/', `${id}.json`);
    const result = await readFile(fileName, 'utf8');
    return result;
  }

  async create(req) {
    const id = uuidv1();
    const fileName = path.resolve(__dirname, '../db/', `${id}.json`);
    await writeFile(fileName, JSON.stringify(req), 'utf-8');
    const result = {
      id,
    };
    return result;
  }
}

module.exports = ComponentListService;
