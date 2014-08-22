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

  async.waterfall([ fetchUser, verifyPassword, destroyToken, createNewToken ], Responder.dispatch(req, res));

  function fetchUser(cb) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        err = (user) ? err : 'badRequest';
        cb(err, user);
      });
  }

  function verifyPassword(user, cb) {
    authFunctions
      .verifyPassword(user.password, p.password, function(err, passwordsMatch) {
        err = (passwordsMatch) ? err : 'badLogin';
        cb(err, user);
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
          .exec(function(err, users) { 
            cb(err, users[0]);
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
      Responder.dispatch(req, res)(err, { message: 'Log out successful.' });
    });
}
