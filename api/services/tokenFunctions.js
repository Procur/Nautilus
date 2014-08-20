var uuid = require('node-uuid');

module.exports = {

  generateToken: generateToken,
  checkUserForToken: checkUserForToken,
  saveToken: saveToken

};

function generateToken() {
  return uuid.v4();
}

function checkUserForToken(userId, callback) {
  ApiToken.findOne({ user: userId }, function(err, token) {
    errorHandler.serverError(err, res);
    callback(token);
  });
}

function saveToken(userId, token, callback) {
  ApiToken.create({ user: userId, token: token }, function(err, token) {
    if(err) { return res.send(500); }
    callback(token);
  });
}
