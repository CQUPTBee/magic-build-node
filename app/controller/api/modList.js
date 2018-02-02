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
    // console.log('ctx', ctx);
    // console.log('csrf', ctx.cookies);
    // ctx.cookies.set('_csrf', ctx._csrf, {
    //   httpOnly: true, 
    //   encrypt: true, 
    // });
    // ctx.rotateCsrfSecret();
    if(res == 0) {
      this.notFound(res);
      return;
    }
    this.success(res);
  }
}

module.exports = ModList;
