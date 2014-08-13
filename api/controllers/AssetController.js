/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var p = req.params.all();

    Asset.create(p, function(err, asset) {
      errorHandler.qc(err, res, asset);
      res.json(201, asset);
    });
  },

  index: function(req, res) {
    Asset.find()
        .then(function(assets) {
          errorHandler.nullCollection(assets, res);
          res.json(200, assets);
        }).fail(function(err) {
          errorHandler.serverError(err, res);
        });
  },

  show: function(req, res) {
    var p = req.params.all();

    Asset.findOne({ id: p.id }, function(err, asset) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(asset, res);
      res.status(200);
      res.json(asset);
    });
  },

  modify: function(req, res) {
    var p = req.params.all();

    Asset.update({ id: p.id }, p, function(err, asset) {
      errorHandler.qc(err, res, asset);
      res.json(200, asset);
    });
  },

  deactivate: function(req, res) {
    var p = req.params.all();

    Asset.findOne({ id: p.id }, function(err, asset) {
      errorHandler.serverError(err, res);
      errorHandler.nullCollection(asset, res);
      Asset.update(asset, { active: false, visible: false }, function(err, asset) {
        errorHandler.serverError(err, res);
        errorHandler.nullCollection(asset, res);
        res.status(200);
        res.json(asset);
      });
    });
  }
};

