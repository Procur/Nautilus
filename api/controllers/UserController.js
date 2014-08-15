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

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ checkUserInUse, createUser ], sendResponse);

  function checkUserInUse(callback) {
    User
      .findOne({ email: p.email })
      .exec(function(err, user) {
        if (user) { throw "Email bad"; }
        
        AuthService.hashPassword(p.password, function(err, hash) { 
          p.password = hash;
          callback(err, user);
        });
      });
  }

  function createUser(user, callback) {
    User
      .create(p)
      .exec(function(err, user) { callback(user); });
  }

  function sendResponse(err, user) {
    ErrorHandler.serverError(err, res);
    if (err) { res.send(400, 'The specified email address is currently in use.'); }

    res.status(201).json(user);
  }
}


  
  









create: function() {
      User.findOne({ email: p.email }, function(err, user) {
      errorHandler.serverError(err, res);
      if(user !== undefined) {
        res.send(400, 'The specified email address is currently in use.');
      }
      else {
        authFunctions.hashPassword(p.password, function(err, hash){
          User.create(p, function(err, user){
            errorHandler.serverError(err, res);
            res.status(201);
            res.json(user);
          });
        });
      }
    });
  },

  index: function(req, res) {
    User.find().exec(function(err, users){
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(users, res);
      res.json(users);
    });
  },

  show: function(req, res) {
    var p = req.params.all();

    User.findOne({ id: p.id }, function(err, user){
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(user, res);
      res.json(200, user);
    });
  },

  modify: function(req, res) {
    var p = req.params.all();

    User.update({ id: p.id }, p, function(err, user){
      errorHandler.qc(err, res, user);
      res.json(200, user);
    });
  },

  deactivate: function(req, res) {
    var p = req.params.all();
    User.findOne({ id: p.id }, function(err, user){
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(user, res);
      if(user.active === false){
        res.send(400, 'User is already inactive');
      }
      else {
        User.update(user, { active: false }, function(err, user){
          errorHandler.serverError(err, res);
          errorHandler.nullCollection(user, res);
          res.send(200, 'User account has been deactivated.');
        });
      }
    });
  },

  grantGlobalAdmin: function(req, res) {
    var p = req.params.all();

    User.findOne({ id: p.id }, function(err, user) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(user, res);
      if(user.globalAdministrator === true){
        res.send(400, 'User is already a global administrator.')
      }
      else {
        User.update(user, { globalAdministrator: true }, function(err, user) {
          errorHandler.serverError(err, res);
          errorHandler.nullCollection(user, res);
          res.status(200);
          res.json(user);
        });
      }
    });
  },

  revokeGlobalAdmin: function(req, res) {
    var p = req.params.all();

    User.findOne({ id: p.id }, function(err, user) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(user, res);
      if(user.globalAdministrator === false){
        res.send(400, 'User already lacks global administrator privileges.')
      }
      else {
        User.update(user, { globalAdministrator: false }, function(err, user) {
          errorHandler.serverError(err, res);
          errorHandler.nullCollection(user, res);
          res.status(200);
          res.json(user);
        });
      }
    });
  }
};
