/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: create,
  show: show,
  modify: modify,
  deactivate: deactivate
};

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfUserExists, createUser ], Responder.dispatch(req, res, 201));

  function rejectIfUserExists(cb) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        err = (user) ? 'emailExists' : err;
        cb(err, user);
      });
  }

  function createUser(user, cb) {
    p.companyAdmin = true;
    User.create(p).exec(function(err, user) { cb(err, user); });
  }
}

function show(req, res) {
  Responder.dispatch(req, res)(null, req.currentUser);
}

function modify(req, res) {
  var p = req.params.all(),
      user = req.currentUser;

  User.update(user.id, p).exec(Responder.dispatch(req, res, 201));
}

function deactivate(req, res) {
  var user = req.currentUser;
  User.deactivate(user.id).exec(Responder.dispatch(req, res));
}
