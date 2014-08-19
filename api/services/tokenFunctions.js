var uuid = require('node-uuid');

module.exports = {

  generateToken: generateToken,
  checkUserForToken: checkUserForToken,
  saveToken: saveToken

};

function generateToken(callback) {
  var token = uuid.v4();
  callback(token);
}

function checkUserForToken(userId, callback) {
  ApiToken.findOne({ user: userId }, function(err, token) {
    errorHandler.serverError(err, res);
    callback(token);
  });
}

function saveToken(userId, token, callback) {
  ApiToken.create({ user: userId, token: token }, function(err, token) {
    errorHandler.qc(err, res, token);
    callback(token);
  });
}
