/**
 * SupplierController
 *
 * @description :: Server-side logic for managing suppliers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var p = req.params.all(),
        apiToken = req.headers.apitoken;

    userFunctions.findByApiToken(apiToken, function(user) {
      if(!user.supplier) {
        Supplier.create(p, function(err, supplier) {
          if(err) { return res.send(500); }
          return res.json(201, supplier); //TODO: I feel like this needs to update company as well.
        });
      }
      else {
        res.send(400, 'This company is already a supplier.')
      }
    });
  },

  index: function(req, res) {
    Supplier.find(function(err, suppliers) {
      if(err) { return res.send(500); }
      res.json(200, suppliers);
    });
  },

  show: function(req, res) {
    var p = req.params.all();

    Supplier.findOne({ id: p.id }, function(err, supplier) {
      if(err) { return res.send(500); }
      res.json(200, supplier);
    });
  },

  modify: function(req, res) {
    var p = req.params.all();

    Supplier.update(p, function(err, supplier) {
      if(err) { return res.send(500); }
      res.json(200, supplier);
    });
  },

  deactivate: function(req, res) {
    var p = req.params.all();

    Supplier.update({ active: false }, function(err, supplier) {
      if(err) { return res.send(500); }
      res.send(200, 'Supplier has been deactivated.');
    });
  }

};
