'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/getComponentList/:id', controller.getComponentList.componentList);
  router.post('/sendComponentData', controller.sendComponentData.create);
};
