var Sails = require('sails');


describe("User Model:", function() {  

  // create a variable to hold the instantiated sails server
  var app;

  // Global before hook
  before(function(done) {

    // Lift Sails and start the servers
    Sails.lift({

      log: {
        level: 'error'
      },

    }, function(err, sails) {
      app = sails;
      done(err, sails);
    });
  });

  // Global after hook
  after(function(done) {
    app.lower(done);
  });

var request = require('supertest');
  describe('Users', function() {
    it('returns 200 status', function(done) {
      request(app.hooks.http.app)
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
      request(app.hooks.http.app)
        .get('/users/somethingInvalid')
        .expect(404)
        .expect(responseObj, done);
    });
  });
});
});



