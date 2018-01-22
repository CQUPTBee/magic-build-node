'use strict'

const BaseController = require('../../core/baseController');

class PageRender extends BaseController {
  async render() {
    const ctx = this;
    this.ctx.render('index.hbs');
    this.ctx.body = 'hello, egg';
  }
}

module.exports = PageRender;