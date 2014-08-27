/**
 * CompanyController
 *
 * @description :: Server-side logic for managing companies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var mongo = require('sails-mongo');

module.exports = {

  create: create,
  //index: index,
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
/*
function index(req, res) {

   var user = req.currentUser;
  
   Company.find().exec(Responder.dispatch(req, res, 201));
}
*/
////////////////////////////////////////

function show(req, res) {
  var user = req.currentUser;
  
  Company.findOne(user.company).exec(Responder.dispatch(req, res, 201));
}

////////////////////////////////////////

function modify(req, res) {
  var p = req.params.all(),
      user = req.currentUser;

  Company.update(user.company, p).exec(Responder.dispatch(req, res, 201));
}

////////////////////////////////////////

function deactivate(req, res) {
  
}
