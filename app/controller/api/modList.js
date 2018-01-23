'use strict'

const BaseController = require('../../core/baseController');

class ModList extends BaseController {
  async render() {
    const {
      ctx,
      service,
    } = this;
    const res = await service.modList.render();
    ctx.body = res;
  }
}

module.exports = ModList;