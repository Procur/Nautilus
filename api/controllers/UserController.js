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
        err = (user) ? 'badRequest' : err;
        cb(err, user);
      });
  }

  function createUser(user, cb) {
    User
      .create(req.params.all())
      .exec(function(err, user) { cb(err, user); });
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
  var p = req.params.all();

  async.waterfall([ rejectIfUserDeactivated, deactivateUser ], Responder.dispatch(req, res));

  function rejectIfUserDeactivated(cb) {
    User
      .findOne({ id: p.id })
      .exec(function(err, user) {
        err = (user.deletedAt) ? 'recordDeleted' : err;
        cb(err, user);
      });
  }

  function deactivateUser(user, cb) {
    User.deactivate(user.id).exec(function(err, user) { cb(err, user); });
  }
}

