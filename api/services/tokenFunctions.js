var uuid = require('node-uuid');

module.exports = {

  generateToken: generateToken,
  checkUserForToken: checkUserForToken,
  saveToken: saveToken,
  replaceToken: replaceToken

};

function generateToken(callback) {
  var token = uuid.v1();
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

function replaceToken(userId, token, callback) {

  async.waterfall([
    checkForOldToken,
    destroyOldToken,
    generateNewToken,
    checkNewTokenUniqueness,
    issueToUser
  ], handleError);

  function checkForOldToken(userId, token, callback) {
    ApiToken.findOne({ user: userId, token: token }, function(err, token) {
      callback(err, token);
    });
  }

  function destroyOldToken(token, callback) {
    ApiToken.destroy({ token: token }, function(err, token) {
      callback(err, token);
    })
  }

  function generateNewToken(callback) {
    var newToken = uuid.v1();
    callback(newToken);
  }

  function checkNewTokenUniqueness(newToken, callback) {
    ApiToken.findOne({ token: newToken }, function(err, oldToken) {
      callback(oldToken);
    });
  }

  function issueToUser(userId, token, callback) {
    ApiToken.create({ user: userId, token: token }, function (err, newToken) {
      callback(newToken);
    });
  }

  function handleError(err, newToken) {
    errorHandler.qc(err, res, newToken);
  }
}