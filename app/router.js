'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/componentList/:id', controller.api.componentList.get);
  router.post('/api/componentList/', controller.api.componentList.create); 
  router.get('/api/render/', controller.api.render.render);
};
