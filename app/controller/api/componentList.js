// 获取组件数组接口
'use strict';

const BaseController = require('../../core/baseController');

class ComponentListController extends BaseController {
  /**
   * @desc 接收组件数据,拉去模板组装，生成完整页面，返回页面url
   */
  async create() {
    const {
      ctx,
      service,
    } = this;
    const req = Object.assign(ctx.request.body);

    // 调用Service 进行业务处理
    const res = await service.componentList.create(req);
    console.log('service-res', res);
    this.success(res);
    
  }

}

module.exports = ComponentListController;
