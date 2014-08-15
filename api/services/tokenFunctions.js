var uuid = require('node-uuid');

module.exports = {

  generateToken: generateToken

};

function generateToken(callback) {
  var token = uuid.v1();

  ApiToken.findOne({ token: token }, function(err, token) {
    errorHandler.serverError(err, res);
    callback(token);
  });
}