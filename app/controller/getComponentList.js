// 获取组件数组接口
'use strict';

const Controller = require('egg').Controller;

class getList extends Controller {
  async componentList() {
    const ctx = this.ctx;
    const cid = ctx.params.id;
    const cdata = await ctx.service.getData.find(cid);
    ctx.response.body = cdata;
  }
}

module.exports = getList;
