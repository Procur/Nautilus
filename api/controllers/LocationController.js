/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: create,
  index: index,
  show: show,
  modify: modify,
  deactivate: deactivate

};

function create(req, res) {
  var p = req.params.all();

  Location.create(p, function(err, location){
    errorHandler.qc(err, res, location);
    res.json(201, location);
  });
}

function index(req, res) {
  Location.find()
      .then(function(locations) {
        errorHandler.nullCollection(locations, res);
        res.json(200, locations);
      }).fail(function(err) {
        errorHandler.serverError(err, res);
      });
}

function show(req, res) {
  var p = req.params.all();

  Location.findOne({ id: p.id }, function(err, location){
    errorHandler.qc(err, res, location);
    res.json(200, location);
  });
}

function modify(req, res) {
  var p = req.params.all();

  async.waterfall([ fetchLocation, modifyLocation], sendResponse);

  function fetchLocation(callback) {
    Location.findOne({ id: p.id }, function(err, location) {
      callback(err, location);
    });
  }

  function modifyLocation(location, callback) {
    Location.update(location, p, function(err, location) {
      callback(err, location);
    });
  }

  function sendResponse(err, location) {
    errorHandler.qc(err, res, location);
    res.json(200, location);
  }
}

function deactivate(req, res) {
  var p = req.params.all();

  async.waterfall([ fetchLocation, deactivateLocation], sendResponse);

  function fetchLocation(callback) {
    Location.findOne({ id: p.id }, function(err, location) {
      callback(err, location);
    });
  }

  function deactivateLocation(location, callback) {
    Location.update(location, { active: false }, function(err, location) {
      callback(location);
    });
  }

  function sendResponse(err, location) {
    errorHandler.qc(err, res, location);
  }
}