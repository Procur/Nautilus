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

  async.waterfall([ verifyPassword, destroyToken, createNewToken ], sendResponse(req, res));

  function verifyPassword(cb) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        authFunctions
          .verifyPassword(user.password, p.password, function(err, passwordsMatch) {
            err = (passwordsMatch) ? err : 'InvalidPasswordError';
            cb(err, user);
          });
      });
  }

  function destroyToken(user, cb) {
    ApiToken
      .destroy({ user: user.id })
      .exec(function(err) { cb(err, user); });
  }

  function createNewToken(user, cb) {
    var newToken = tokenFunctions.generateToken();
    
    ApiToken
      .create({ token: newToken, user: user.id })
      .exec(function(err, token) {
        User
          .update(user.id, { apiToken: token.token })
          .exec(function(err, user) { 
            cb(err, user);
          });
      });
  } 
}

function logout(req, res) {
  var p = req.params.all(),
      user = req.currentUser;

  ApiToken
    .destroy({ user: user.id })
    .exec(function(err) {
      sendResponse(req, res)(err, { message: 'Log out successful.' });
    });
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
