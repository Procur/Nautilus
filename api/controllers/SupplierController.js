/**
 * SupplierController
 *
 * @description :: Server-side logic for managing suppliers
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
  Supplier.find().exec(function(err, suppliers) {
    if(err){ res.send(500) }
    res.json(200, suppliers);
  });
}

function create(req, res) {
  var p = req.params.all();

  async.waterfall([ rejectIfAlreadySupplier, createSupplier, updateUser ], Responder.dispatch(req, res, 201));

  function rejectIfAlreadySupplier(cb) {
    Supplier.findOne({ id: req.currentUser.supplier }, function(err, supplier) {
      if(supplier === undefined){
        cb(err, supplier);
      }
      else {
        res.send(400, 'User is already associated with a supplier');
      }
    });
  }

  function createSupplier(buyer, cb) {
    Supplier.create(p, function(err, supplier) {
      cb(err, supplier);
    });
  }

  function updateUser(supplier, cb) {
    Supplier.update(req.currentUser.id, { supplier: supplier.id }, function(err, user) {
      cb(err, user);
    });
  }
}

function show(req, res) {
  Supplier.findOne(req.currentUser.supplier, Responder.dispatch(req, res));
}

function modify(req, res) {
  Supplier.update(req.currentUser.supplier, p, Responder.dispatch(req, res, 201));
}

function deactivate(req, res) {
  Supplier.update(req.currentUser.supplier, { active: false }, Responder.dispatch(req, res, 201));
}