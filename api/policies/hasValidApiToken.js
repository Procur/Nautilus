module.exports = function(req, res, next) {

  var apiToken = req.headers.apitoken;

  // DO NOT RELEASE INTO PRODUCTION!!!
  if (apiToken === 'skipme') { return next(); }
  // DO NOT RELEASE INTO PRODUCTION!!!
  
  async.waterfall([ validateApiToken, fetchCurrentUser], nextPolicy);

  function validateApiToken(cb) {
    ApiToken
      .findOne({ token: apiToken })
      .exec(function(err, token) {
        err = (token) ? err : 'InvalidApiTokenError';
        cb(err, token);
      });
  }

  function fetchCurrentUser(token, cb) {
    User
      .findOne({ id: token.user })
      .exec(function(err, user) {
        err = (user) ? err : 'InvalidApiTokenError';
        cb(err, user);
      });
  }

  function nextPolicy(err, user) {
    if (err) { return res.forbidden(err); }
    
    req.currentUser = user;
    return next();
  }

};
