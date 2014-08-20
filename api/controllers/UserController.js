/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: index,
  create: create,
  show: show,
  modify: modify,
  deactivate: deactivate
};

function index(req, res) {
  User.find().exec(sendResponse(req, res));
}

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfUserExists, createUser ], sendResponse(req, res, 201));

  function rejectIfUserExists(cb) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        err = (user) ? 'EmailAlreadyExistsError' : err;
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
  var p = req.params.all();
  User.findOne({ id: p.id }).exec(sendResponse(req, res));
}

function modify(req, res) {
  var p = req.params.all();
  User.update({ id: p.id }, p).exec(sendResponse(req, res, 201));
}

function deactivate(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfUserDeactivated, deactivateUser ], sendResponse(req, res));

  function rejectIfUserDeactivated(cb) {
    User
      .findOne({ id: p.id })
      .exec(function(err, user) {
        err = (user.deletedAt) ? 'DocumentDeactivatedError' : err;
        cb(err, user);
      });
  }

  function deactivateUser(user, cb) {
    User.deactivate(user.id).exec(function(err, user) { cb(err, user); });
  }
}

function sendResponse(req, res, successStatusCode) {
  return function (err, object) {
    successStatusCode = successStatusCode || 200;
    var e = ErrorHandler.intercept(err, object, req.params.all());

    if (e) { 
      return res.json(e.status, e);
    }
    else {
      return res.json(successStatusCode, object);
    }
  };
}
