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
    console.log('成功！')
    this.ctx.body = {
      code: CODE.SUCCESS,
      msg: 'success',
      data, 
    };
  }

  unLogin(msg) {
    console.log('未登录！')    
    this.ctx.body = {
      code: CODE.UNLOGIN,
      msg: msg,
    }
  }

  notFound(msg) {
    msg = msg || 'not found';
    // this.ctx.throw(404, CODE.FAILD);
    this.ctx.body = {
      code: CODE.FAILD,
      msg
    };
  }
}
module.exports = BaseController;
