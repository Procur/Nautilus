module.exports = function(req, res, next) {

  var apiToken = req.headers.apitoken;

  ApiToken.findOne({ token: apiToken }, function(err, token) {
    if(err) { return res.send(500); }
    if(token !== undefined) {
      return next();
    }
    else {
      return res.send(400, 'Invalid API token');
    }
  });

};