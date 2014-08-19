var sails = require('sails');
var app;

before(function (cb) {
  sails.lift({}, function(err, sails) {
    app = sails;
    cb(err, sails);
  });
});

after(function (cb) {
  app.lower(cb);
});
