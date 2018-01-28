'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/api/getPage/:id', controller.api.getPage.get);
  router.post('/api/componentList/', controller.api.componentList.create); 
  router.post('/api/modList/', controller.api.modList.render);
};
