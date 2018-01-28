'use strict'

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const Mod = require('../db/modSchema.js');
const Page = require('../db/pageSchema.js');

class getPageService extends Service {
  async get(id) {
   
    return 123;
  }
}

module.exports = getPageService;