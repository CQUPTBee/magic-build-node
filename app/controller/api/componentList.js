// 获取组件数组接口
'use strict';

const BaseController = require('../../core/baseController');

class ComponentListController extends BaseController {
  /**
   * @desc 获取组件数据
   */
  async get() {
    const ctx = this.ctx;
    const cid = ctx.params.id;
    if (cid === undefined || cid === '') this.notFound('未定义ID');
    const cdata = await ctx.service.componentList.get(cid);
    this.success(cdata);
  }


  /**
   * @desc 接收组件数据
   */
  async create() {
    const {
      ctx,
      service,
    } = this;
    const req = Object.assign(ctx.request.body);
    console.log('req type:', typeof req);
    // 调用Service 进行业务处理
    const res = await service.componentList.create(req);
    this.success(res);
  }
}

module.exports = ComponentListController;
