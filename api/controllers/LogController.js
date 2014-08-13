/**
 * LogController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res) {
    Log.find()
        .then(function(logs) {
          errorHandler.nullCollection(logs, res);
          res.json(200, logs);
        }).fail(function(err) {
          errorHandler.serverError(err, res);
        });
  },

  show: function(req, res) {
    var p = req.params.all();

    Log.findOne({ id: p.id }, function(err, log) {
      errorHandler.qc(err, res, log);
      res.json(200, log);
    });
  },

  destroy: function(req, res) {
    var p = req.params.all();

    Log.destroy({ id: p.id }, function(err) {
      errorHandler.serverError(err, res);
      res.send(200, 'Log ' + p.id + ' deleted.');
    });
  }
};

