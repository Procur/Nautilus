/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: create,
  show: show,
  modify: modify,
  deactivate: deactivate
};

function create(req, res) {
  Asset.create(req.params.all()).exec(Responder.dispatch(req, res, 201));
}

function show(req, res) {
  var p = req.params.all();
  Asset.findOne({ id: p.id }).exec(Responder.dispatch(req, res));
}

function modify(req, res) {
  var p = req.params.all();
  Asset.update({ id: p.id }, p).exec(Responder.dispatch(req, res, 201));
}

function deactivate(req, res) {
  var p = req.params.all();
  Asset.deactivate(p.id).exec(Responder.dispatch(req, res));
}
