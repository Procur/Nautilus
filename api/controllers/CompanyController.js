/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: create,
  index: index,
  show: show,
  modify: modify,
  deactivate: deactivate

};

////////////////////////////////////////

function create(req, res) {
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
}

////////////////////////////////////////

function index(req, res) {
  Company.find()
      .then(function(companies) {
        errorHandler.nullCollection(companies, res);
        res.json(200, companies);
      }).fail(function(err) {
        errorHandler.serverError(err, res);
      });
}

////////////////////////////////////////

function show(req, res) {
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
}

////////////////////////////////////////

function modify(req, res) {
  var p = req.params.all();

  async.waterfall([ fetchCompany, modifyCompany], sendResponse);

  function fetchCompany(callback) {
    Company.findOne({ id: p.id }, function(err, company) {
      callback(company);
    });
  }

  function modifyCompany(company, callback) {
    Company.update(company, p, function(err, company) {
      callback(company);
    });
  }

  function sendResponse(err, company) {
    errorHandler.qc(err, res, company);
    res.json(200, company);
  }
}

////////////////////////////////////////

function deactivate(req, res) {

  var p = req.params.all();

  async.waterfall([ fetchCompany, deactivateCompany], sendResponse);

  function fetchCompany(callback) {
    Company.findOne({ id: p.id }, function(err, company){
      callback(err, company);
    });
  }

  function deactivateCompany(company, callback) {
    Company.update(company, { active: false, visible: false }, function(err, company) {
      callback(err, company);
    });
  }

  function sendResponse(err, company) {
    errorHandler.qc(err, res, company);
    res.json(200, company);
  }
}
