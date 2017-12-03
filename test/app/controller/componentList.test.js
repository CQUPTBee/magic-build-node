'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');
const fs = require('fs');
const path = require('path');

describe('test/app/controller/componentList.test.js', () => {
  const data = {
    data: [{
      name: 'list',
      id: '1454684234154',
      data: {
        name: 'list',
        title: 'ffffff',
        url: 'http://ohm0er3qe.bkt.clouddn.com/seo2.jpg',
      },
    }],
  };

  describe('POST /api/componentList/', () => {
    it('should return true', async () => {
      const result = await app.httpRequest()
        .post('/api/componentList/')
        .set('Accept', 'application/json')
        .send(data)
        .expect(200);
      assert(result.status === 200);
      assert(result.body.code === 1);
    });
  });

  describe('GET /api/componentList/:id', () => {
    let id;

    before(async () => {
      const result = await app.httpRequest()
        .post('/api/componentList/')
        .set('Accept', 'application/json')
        .send(data);
      id = result.body.data.id;
    });

    it('should deepEqual', async () => {
      const result = await app.httpRequest()
        .get(`/api/componentList/${id}`)
        .set('Accept', 'application/json')
        .expect(200);
      assert(result.status === 200);
      assert(result.body.code === 1);
      assert.deepEqual(JSON.parse(result.body.data), data);
    });

    after(() => {
      // 测试完成，移除多余文件
      const fileUrl = path.resolve(app.config.db.dir, `${id}.json`);
      fs.unlinkSync(fileUrl);
    });
  });

  // 未传参数ID
  describe('GET /api/componentList/:id', () => {

    it('should deepEqual', async () => {
      const result = await app.httpRequest()
        .get('/api/componentList/')
        .set('Accept', 'application/json')
        .expect(404);
      assert(result.status === 404);
    });
  });

});
