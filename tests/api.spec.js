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
    it('returns 200 status', function() {
      console.log(app.hooks.http.app);
      request(app.hooks.http.app)
      .get('/users')
      .expect(200, done);
    });
  });
});



