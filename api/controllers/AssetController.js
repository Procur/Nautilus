/**
 * AssetController
 *
 * @description :: Server-side logic for managing assets
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
  Asset.find().exec(sendResponse(req, res));
}

function create(req, res) {
  Asset.create(req.params.all()).exec(sendResponse(req, res, 201));
}

function show(req, res) {
  var p = req.params.all();
  Asset.findOne({ id: p.id }).exec(sendResponse(req, res));
}

function modify(req, res) {
  var p = req.params.all();
  Asset.update({ id: p.id }, p).exec(sendResponse(req, res, 201));
}

function deactivate(req, res) {
  var p = req.params.all();
  Asset.deactivate(p.id).exec(sendResponse(req, res));
}

function sendResponse(req, res, successStatusCode) {
  return function (err, object) {
    successStatusCode = successStatusCode || 200;
    var e = ErrorHandler.intercept(err, object, req.params.all());

    if (e) { 
      return res.json(e.status, e);
    }
    else {
      return res.json(successStatusCode, object);
    }
  };
}

//////////////////////////

function setUserProfilePhoto(req, res) {
  var p = req.params.all;

}

function setCompanyLogo(req, res) {
  var p = req.params.all;

}

function setBuyerLogo(req, res) {
  var p = req.params.all;

}

function setSupplierLogo(req, res) {
  var p = req.params.all;

}