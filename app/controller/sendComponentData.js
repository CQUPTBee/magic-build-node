// 发送数据接口
'use strict';
const Controller = require('egg').Controller;

class componentData extends Controller {
  async create() {
    const { ctx, service } = this;
    const req = Object.assign(ctx.request.body);
    console.log("req:", req);
    // 调用Service 进行业务处理
    const res = await service.sendData.create(req);
    console.log("res.url", res);
    ctx.body = res.url;
  }
}

module.exports = componentData;
