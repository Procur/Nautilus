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
        error: 'Mismatched Route',
        status: 404,
        message: 'No route matches your request.'
      };
      request(sails.hooks.http.app)
      .get('/users/somethingInvalid')
      .expect(404)
      .expect(responseObj, done);
    });
  });
});