module.exports = function(req, res, next) {

  var apiToken = req.headers.apitoken;

  // DO NOT RELEASE INTO PRODUCTION!!!
  if (apiToken === 'skipme') { return next(); }
  // DO NOT RELEASE INTO PRODUCTION!!!

  ApiToken
    .findOne({ token: apiToken })
    .exec(function(err, token) {
      if (err || !token) { return res.forbidden(); }

      return next();
  });


};
