'use strict'

const Service = require('egg').Service;
// const request = require('request');
const uuidv1 = require('uuid/v1');

class modListService extends Service {
  async render () {
    let id = uuidv1();
    console.log('id:', id);
    return id;
  }
}

module.exports = modListService;