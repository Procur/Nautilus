/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function(req, res) {
    var p = req.params.all();

    userFunctions.findByApiToken(p.apitoken, function(user){
      if(user.company !== undefined) {
        Company.create(p, function(err, company) {
          errorHandler.qc(err, res, company);
          res.json(201, company);
        });
      }
      else {
        res.send(400, 'This user already belongs to a company.');
      }
    });
  },

  index: function(req, res) {
    Company.find()
        .then(function(companies) {
          errorHandler.nullCollection(companies, res);
          res.json(200, companies);
        }).fail(function(err) {
          errorHandler.serverError(err, res);
        });
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
  }
};

