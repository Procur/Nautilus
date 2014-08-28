/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: create,
  show: show,
  modify: modify,
  deactivate: deactivate

};

function create(req, res) {
  var
    user = req.currentUser;
    model = req.params.model;  
    location = req.params.location;

  async.waterfall([findModel, addLocation], Responder.dispatch(req, res, 201));
  
  function findModel(cb) {
    sails.models[model].findOne(user[model]).exec(function(err, model) { cb(err, model); });
  }

  function addLocation(model, cb) {
    console.log(model);
    model.locations.add(location);
    model.save(function(err) { cb(err, location); });
  }
}

function show(req, res) {
  var p = req.params.all();
  Location.findOne({ id: p.id }).exec(Responder.dispatch(req, res));
}

function modify(req, res) {
  var p = req.params.all();
  Location.update(p.id, p).exec(Responder.dispatch(req, res, 201));
}

function deactivate(req, res) {
  var p = req.params.all();
  Location.deactivate(p.id).exec(Responder.dispatch(req, res));
}
