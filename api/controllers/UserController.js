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

  },

  show: function(req, res) {

  },

  modify: function(req, res) {

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
  }

};
