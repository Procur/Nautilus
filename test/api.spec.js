var expect = require('chai').expect,
    request = require('supertest'),
    reqObj, resObj;

describe('/', function() {

  it('returns routing error when given a bad route', function(cb) {
    resObj = {
      error: 'Mismatched Route',
      status: 404,
      message: 'No route matches your request.'
    };

    request(sails.hooks.http.app)
      .get('/unexpectedRoute')
      .expect(404)
      .expect(resObj, cb);
  });

  it('returns heartbeat (application, version, links)', function(cb) {
    resObj = {
      application: 'Procur API v1',
      version: 'v1 (alpha)',
      documentation: 'http://api.procur.com/docs'
    };

    request(sails.hooks.http.app)
      .get('/')
      .expect(200)
      .expect(resObj, cb);
  });

  describe('/docs', function() {

    it('returns a json object for json-only clients', function(cb) {
      resObj = { docs: 'https://www.procur.com/' };

      request(sails.hooks.http.app)
        .get('/docs')
        .set('Accept', 'application/json')
        .expect(200)
        .expect(resObj, cb);
    });

    it('redirects to api documentation for html-capable clients', function(cb) {
      request(sails.hooks.http.app)
        .get('/docs')
        .set('Accept', 'text/html')
        .expect(200)
        .end(function(err, res) {
          expect(res.header.location).to.equal('https://www.procur.com/');
          cb();
        });
    });

  });
});
