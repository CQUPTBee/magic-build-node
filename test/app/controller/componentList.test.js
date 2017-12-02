'use strict';

const {
  app,
  assert,
} = require('egg-mock/bootstrap');

describe('test/app/controller/componentList.test.js', () => {

  //   it('should GET /', () => {
  //     return app.httpRequest()
  //       .get('/')
  //       .expect('hi, egg')
  //       .expect(200);
  //   });
});

describe('test/app/controller/componentList.test.js', () => {
  it('should POST /componentList/', async () => {
    const result = await app.httpRequest()
      .post('/api/componentList/')
      .set('Accept', 'application/json')
      .send({
        data: [{
          name: 'list',
          id: '1454684234154',
          data: {
            name: 'list',
            title: 'ffffff',
            url: 'http://ohm0er3qe.bkt.clouddn.com/seo2.jpg',
          },
        }],
      })
      .expect(200);
    assert(result.status === 200);
  });
});
