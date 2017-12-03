'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.render('<div>Hello.egg</div>');
    this.ctx.body = 'hello, egg';
  }
}

module.exports = HomeController;
