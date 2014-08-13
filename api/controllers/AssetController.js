/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {

  },

  index: function(req, res) {

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

  },

  destroy: function(req, res) {

  }
};

