var assert = require('assert');
var request = require('supertest');

describe('Users', function() {
  it('returns 200 status', function(done) {
    request(sails.hooks.http.app)
    .get('/users')
    .expect(200, done);
  });
});

describe('GET /users/:id', function() {
  describe('when id is invalid', function() {
    it('returns 404 error', function(done) {
      var responseObj = {
        error: 'NullCollectionError',
        status: 404,
        message: 'Collection not found.'
      };
      request(sails.hooks.http.app)
      .get('/users/somethingInvalid')
      .expect(404)
      .expect(responseObj, done);
    });
  });
});