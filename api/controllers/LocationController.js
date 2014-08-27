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
  Location.create(req.params.all()).exec(Responder.dispatch(req, res, 201));
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
