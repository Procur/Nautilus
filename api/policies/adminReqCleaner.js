module.exports = function(req, res, next) {

  delete req.params.isGlobalAdmin;
  delete req.params.isCompanyAdmin;

};
