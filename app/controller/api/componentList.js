// 获取组件数组接口
'use strict';

const BaseController = require('../../core/baseController');

class ComponentListController extends BaseController {
  /**
   * @desc 获取组件
   */
  async get() {
    const ctx = this.ctx;
    const cid = ctx.params.id;
    const cdata = await ctx.service.componentList.get(cid);
    ctx.response.body = cdata;
  }

  async create() {
    const {
      ctx,
      service,
    } = this;
    const req = Object.assign(ctx.request.body);
    // 调用Service 进行业务处理
    const res = await service.componentList.create(req);
    this.success(res);
  }
}

module.exports = ComponentListController;
