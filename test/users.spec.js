var expect = require('chai').expect,
    request = require('supertest'),
    reqObj, resObj;

describe('/users', function() {

  describe('SHOW', function() {

    it('returns 401 when missing an apitoken', function(cb) {
      resObj = {
        status: 401,
        error: 'Unauthorized: Invalid API Token',
        message: 'You are missing or passed an invalid or improperly configured API token. ' + 
          'Procur API tokens are 36-digit hexadecimal strings and should be set in your request header as `apitoken`.'
      };

      request(sails.hooks.http.app)
        .get('/users')
        .expect(401)
        .expect(resObj, cb);
    });
  });

});
