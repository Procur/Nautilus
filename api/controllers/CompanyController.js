/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var mongo = require('sails-mongo');

module.exports = {

  create: create,
  index: index,
  show: show,
  modify: modify,
  deactivate: deactivate

};

////////////////////////////////////////

function create(req, res) {
  var
    p = req.params.all();
    user = req.currentUser;
  
  async.waterfall([rejectIfUserHasCompany, createCompany, addAssociation], Responder.dispatch(req, res, 201));
  function rejectIfUserHasCompany (cb){
    err = (user.company) ? 'userHasCompany' : undefined;
    cb(err);
  }

  function createCompany(cb) {
    Company.create(p).exec(function(err, company) { cb(err, company); });
  }

  function addAssociation(company, cb) {
    company.users.add(user);
    company.save(function (err) { cb(err, company); });
  }

}

////////////////////////////////////////

function index(req, res) {
  var user = req.currentUser;
  Company.find(user.company).exec(Responder.dispatch(req, res, 201));

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
  var p = req.params.all(),
      user = req.currentUser;

  Company.update(user.company, p).exec(Responder.dispatch(req, res, 201));
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
