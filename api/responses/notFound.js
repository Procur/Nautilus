/**
 * 404 (Not Found) Handler
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

module.exports = function notFound (data, err, isGoodRoute) {

  isGoodRoute = isGoodRoute || false;

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data) { sails.log.verbose('Sending 404 ("Not Found") response: \n', data); }
  else { sails.log.verbose('Sending 404 ("Not Found") response'); }

  var response = {
    status: 404,
    error: 'Not Found',
    message: ''
  };

  if (isGoodRoute) {
    response.message = 'Your request was received and appears to be valid, but the' +
      ' record you are trying to retrieve doesn\'t exist or has been deleted.';
  }
  else {
    response.error = 'Mismatched Route';
    response.message = 'No route matches your request.';
  }

  res.status(404);
  res.json(response);

};
