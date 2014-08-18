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
  User
    .find()
    .exec(function(err, users) {
      errorHandler.qc(err, res, user);
      
      res.status(200).json(users);
    });
}

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfUserExists, createUser ], sendResponse);

  function rejectIfUserExists(cb) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        if (user) { cb('EmailExistsError', user); }
        
        cb(err, user);
      });
  }

  function createUser(user, cb) {
    User
      .create(p)
      .exec(function(err, user) { cb(err, user); });
  }

  function sendResponse(err, user) {
    errorHandler.qc(err, res, user);
    if (err === 'EmailExistsError') { 
      var message = 'The specified email address is currently in use.';
      return res.status(400).json(errorHandler.buildError(err, message));
    }

    res.status(201).json(user);
  }
}

function show(req, res) {
  var p = req.params.all();

  User
    .findOne({ id: p.id })
    .exec(function(err, user) {
      errorHandler.qc(err, res, user);

      res.status(200).json(user);
    });
}

function modify(req, res) {
  var p = req.params.all();

  User
    .update({ id: p.id }, p)
    .exec(function(err, user) {
      errorHandler.qc(err, res, user);

      res.status(200).json(user);
    });
}

function deactivate(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfUserDeactivated, deactivateUser ], sendResponse);

  function rejectIfUserDeactivated(cb) {
    User
      .findOne({ id: p.id })
      .exec(function(err, user) {
        if (user.deletedAt) { cb('UserDeactivatedError', user); }

        cb(err, user);
      });
  }

  function deactivateUser(user, cb) {
    User
      .deactivate(user.id)
      .exec(function(err, user) { cb(err, user); });
  }

  function sendResponse(err, user) {
    errorHandler.qc(err, res, user);

    res.status(200).json(user);
  }
}
