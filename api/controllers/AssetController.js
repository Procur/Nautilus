/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: create,
  index: index,
  show: show,
  modify: modify,
  deactivate: deactivate
};

////////////////////////////////////////

function create(req, res) {
  var p = req.params.all();

  Asset.create(p, function(err, asset) {
    errorHandler.qc(err, res, asset);
    res.json(201, asset);
  });
}

////////////////////////////////////////

function index(req, res) {
  Asset.find()
      .then(function(assets) {
        errorHandler.nullCollection(assets, res);
        res.json(200, assets);
      }).fail(function(err) {
        errorHandler.serverError(err, res);
      });
}

////////////////////////////////////////

function show(req, res) {
  var p = req.params.all();

  Asset.findOne({ id: p.id }, function(err, asset) {
    errorHandler.serverError(err, res);
    errorHandler.nullCollection(asset, res);
    res.status(200);
    res.json(asset);
  });
}

////////////////////////////////////////

function modify(req, res) {
  var p = req.params.all();

  Asset.update({ id: p.id }, p, function(err, asset) {
    errorHandler.qc(err, res, asset);
    res.json(200, asset);
  });
}

////////////////////////////////////////

function deactivate(req, res) {

  var p = req.params.all();

  async.waterfall([ fetchAsset(), deactivateAsset()], sendResponse());

  function fetchAsset(callback) {
    Asset.findOne({ id: p.id }, function(err, asset){
      callback(err, asset);
    });
  }

  function deactivateAsset(asset, callback) {
    Asset.update(asset, { active: false, visible: false }, function(err, asset) {
      callback(asset);
    });
  }

  function sendResponse(err, asset) {
    errorHandler.qc(err, res, asset);
    res.json(200, asset);
  }
}