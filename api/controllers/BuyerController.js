/**
 * BuyerController
 *
 * @description :: Server-side logic for managing buyers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: index,
  create: create,
  show: show,
  modify: modify,
  deactivate: deactivate
};

function index(req, res) {
  Buyer.find().exec(function(err, buyers) {
    if(err){ res.send(500) }
    res.json(200, buyers);
  });
}

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfAlreadyBuyer, createBuyer, updateUser ], Responder.dispatch(req, res, 201));

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
      cb(err, buyer);
    });
  }

  function updateUser(buyer, cb) {
    User.update(req.currentUser.id, { buyer: buyer.id }, function(err, user) {
      cb(err, user);
    });
  }
}

function show(req, res) {
  Buyer.findOne(req.currentUser.buyer, Responder.dispatch(req, res));
}

function modify(req, res) {
  Buyer.update(req.currentUser.buyer, p, Responder.dispatch(req, res, 201));
}

function deactivate(req, res) {
  Buyer.update(req.currentUser.buyer, { active: false }, Responder.dispatch(req, res, 201));
}