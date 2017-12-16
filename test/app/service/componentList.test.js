'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('test/app/service/componentList.test.js', () => {
  describe('get()', () => {
    it('should get exists componentList', async () => {
      const ctx = app.mockContext();
      const componentList = await ctx.service.componentList.get('237dd180-db34-11e7-88cb-69fcfb717c67');
      // app.mockService('componentList', 'get', () => {
      //   return {
      //     id: "237dd180-db34 - 11e7 - 88cb-69fcfb717c67"
      //   }
      // })
      console.log('componentList:', componentList);
      assert(componentList);
    });

    // it('should get null when componentList not exists ', async () => {
    //   const ctx = app.mockContext();
    //   const componentList = await ctx.service.componentList.get('f848ebb0-db4e-11e7-abb8-838a6e570a9d');

    //   console.log('componentList:', componentList);
    //   assert(!componentList);
    // });

  });
});

