/**
 * BuyerController
 *
 * @description :: Server-side logic for managing buyers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: create,

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

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfAlreadyBuyer, createBuyer ], Responder.dispatch(req, res, 201));

  function rejectIfAlreadyBuyer(cb) {
    Buyer.findOne({ id: req.currentUser.buyer }, function(err, buyer) {
      if(buyer === undefined){
        cb(err, buyer);
      }
      else {
        res.send(400, 'User is already associated with a buyer');
      }
    });
  }

  function createBuyer(buyer, cb) {
    Buyer.create(p, function(err, buyer) {
      callback(err, buyer);
    });
  }

  function updateUser(buyer, cb) {
    User.update(req.currentUser.id, { buyer: buyer.id }, function(err, user) {
      cb(err, user);
    });
  }
}