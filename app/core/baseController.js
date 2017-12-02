'use strict';

const {
  Controller,
} = require('egg');

const CODE = require('../enums/code');
class BaseController extends Controller {
  // get user() {
  //   return this.ctx.session.user;
  // }

  success(data) {
    this.ctx.body = {
      code: CODE.SUCCESS,
      msg: 'success',
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
