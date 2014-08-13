/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  company: function(req, res) {

  },

  index: function(req, res) {

  },

  show: function(req, res) {
    var p = req.params.all();
    Company.findOne()
      .where({ id: p.id })
      .then(function(company){
          errorHandler.nullCollection(company, res);
          res.status(200);
          res.json(company);
        }).fail(function(err){
          errorHandler.serverError(err, res);
        });
  },

  modify: function(req, res) {

  },

  deactivate: function(req, res) {
    var p = req.params.all();

    Company.findOne({ id: p.id }, function(err, company) {
      errorHandler.qc(err, res, company);
      Company.update(company, { active: false }, function(err, company) {
        errorHandler.qc(err, res, company);
        res.json(200, company);
      });
    });
  },
};

