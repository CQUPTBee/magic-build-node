'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');

class setNewService extends Service {
  async create(req) {
    const id = req.id;
    console.log("service-id:", id);
    const fileName = path.resolve(__dirname, '../public/', `${id}.json`);
    console.log("fileName:", fileName);
    console.log("req.data:", req);
    console.log(JSON.stringify(req));
    const addFile = fs.writeFile(fileName, JSON.stringify(req), 'utf-8', (err) => {
      const url = '/getComponentList/' + id;
      console.log("service-url:", url); 
      const result = {
        code: 1,
        message: "success",
        url: this.url,
      }
      return result;
    });
    console.log("addFile:", addFile);    
    
  }; 
}

module.exports = setNewService;
