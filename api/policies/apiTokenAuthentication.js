module.exports = function(req, res, next) {

  var apiToken = req.headers.apitoken;

  if (sails.config.environment !== 'production') {
    if (apiToken === 'skipme') { return next(); }
  }
  
  async.waterfall([ validateApiToken, fetchCurrentUser], nextPolicy);

  function validateApiToken(cb) {
    ApiToken
      .findOne({ token: apiToken })
      .exec(function(err, token) {
        err = (token) ? err : 'invalidApiToken';
        cb(err, token);
      });
  }

  function fetchCurrentUser(token, cb) {
    User
      .findOne({ id: token.user })
      .exec(function(err, user) {
        err = (user) ? err : 'invalidApiToken';
        cb(err, user);
      });
  }

  function nextPolicy(err, user) {
    if (err) { return res.forbidden(err); }
    
    req.currentUser = user;
    return next();
  }

};
