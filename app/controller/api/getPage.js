'use strict';

const BaseController = require('../../core/baseController');

class getPageController extends BaseController {
  /**
    * @desc 获取组件数据
    */
  async get() {
    const ctx = this.ctx;
    console.log('ctx', ctx);
    const cid = ctx.params.id;
    if (cid === undefined || cid === '') this.notFound('未定义ID');
    const cdata = await ctx.service.getPage.get(cid);
    this.success(cdata);
  }
}

module.exports = getPageController;