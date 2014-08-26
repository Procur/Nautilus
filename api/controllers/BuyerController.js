/**
 * BuyerController
 *
 * @description :: Server-side logic for managing buyers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {

  },

  index: function(req, res) {

  },

  show: function(req, res) {
    Buyer.findOne(req.currentUser.buyer, { active: false }, Responder.dispatch(req, res));
  },

  modify: function(req, res) {
    Buyer.update(req.currentUser.buyer, { active: false }, Responder.dispatch(req, res, 201));
  },

  deactivate: function(req, res) {
    Buyer.update(req.currentUser.buyer, { active: false }, Responder.dispatch(req, res, 201));
  }
};

