var Sails = require('sails');
var app;

describe('Global', function() {

  before(function (cb) {
    Sails.lift({}, function(err, sails) {
      app = sails;
      cb(err, sails);
    });
  });

  after(function (cb) {
    app.lower(cb);
  });

var request = require('supertest');

describe('Users', function() {
  it('returns 200 status', function() {
    request(app)
      .get('/users')
      .expect(200, done);
  });
});
});
