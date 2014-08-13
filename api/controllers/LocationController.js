/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var p = req.params.all();

    Location.create(p, function(err, location){
      errorHandler.qc(err, res, location);
      res.json(201, location);
    });
  },

  index: function(req, res) {
    Location.find()
        .then(function(locations) {
          errorHandler.nullCollection(locations, res);
          res.json(200, locations);
        }).fail(function(err) {
          errorHandler.serverError(err, res);
        });
  },

  show: function(req, res) {
    var p = req.params.all();

    Location.findOne({ id: p.id }, function(err, location){
      errorHandler.qc(err, res, location);
      res.json(200, location);
    });
  },

  modify: function(req, res) {
    var p = req.params.all;

    Location.findOne({ id: p.id }, function(err, location) {
      errorHandler.qc(err, res, location);
      Location.update(p, function(err, location){
        errorHandler.qc(err, res, location);
        res.json(200, location);
      });
    });
  },

  destroy: function(req, res) {
    var p = req.params.all();

    Location.update({ id: p.id }, { active: false }, function(err, location){
      errorHandler.qc(err, res, location);
      res.send(200, 'Location ' + location.id + ' deactivated.');
    });
  }
};

