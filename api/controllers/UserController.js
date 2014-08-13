/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var p = req.params.all();

    User.findOne({ email: p.email }, function(err, user) {
      errorHandler.serverError(err, res);
      if(user !== undefined) {
        res.send(400, 'The specified email address is currently in use.');
      }
      else {
        authFunctions.hashPassword(p.password, function(err, hash){
          User.create({
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            password: hash,
            activeMode: 'signup',
            active: true,
            companyAdmin: false,
            defaultMode: 'signup'
          }, function(err, user){
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
