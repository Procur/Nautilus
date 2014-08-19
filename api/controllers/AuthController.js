/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: login,
  logout: logout

};

function login(req, res) {
  var p = req.params.all();

  async.waterfall([
    findUser,
    hashSubmittedPassword,
    checkHashAgainstDatabase,
    generateApiToken,
    removeOldToken,
    assignToken
  ], sendResponse(req, res));

  function findUser(callback) {
    User.findOneByEmail(p.email, function(err, user) {
      callback(err, user);
    });
  }

  function hashSubmittedPassword(user, callback) {
    authFunctions.hashPassword(p.password, function(err, hash) {
      callback(err, user, hash);
    });
  }

  function checkHashAgainstDatabase(user, hash, callback) {
    var err = (user.password === hash) ? null : 'InvalidPasswordError';
    callback(err, user);
  }

  function generateApiToken(user, callback) {
    tokenFunctions.generateToken(function(token) {
      callback(null, user, token);
    });
  }

  function removeOldToken(user, token, callback) {
    ApiToken.destroy({ user: user.id }, function(err) {
      callback(err, user, token);
    });
  }

  function assignToken(user, token, callback) {
    ApiToken.create({ user: user.id, token: token }, function(err, token) {
      callback(err, token);
    });
  }
}

function logout(req, res) {
  var p = req.params.all();
}

function sendResponse(req, res, successStatusCode) {
  return function (err, object) {
    successStatusCode = successStatusCode || 200;
    var e = ErrorHandler.intercept(err, object, req.params.all());

    if (e) {
      return res.status(e.status).json(e);
    }
    else {
      res.status(successStatusCode).json(object);
    }
  };
}
