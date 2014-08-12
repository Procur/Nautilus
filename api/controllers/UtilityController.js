/**
 * UtilityController
 *
 * @description :: Server-side logic for managing utilities
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  heartbeat: function(req, res) {
    var payload = "Procur API v1: Documentation: [doc address]";
    res.send(200, payload);
  }
};

