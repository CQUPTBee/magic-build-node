'use strict'

const BaseController = require('../../core/baseController');

class ModList extends BaseController {
  async render() {
    const {
      ctx,
      service,
    } = this;
    const req = Object.assign(ctx.request.body);
    const res = await service.modList.render(req);
    console.log('ctx: -----------', res);
    if(res == 0) {
      this.notFound(res);
      return;
    }
    this.success(res);
  }
}

module.exports = ModList;
