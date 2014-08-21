/**
 * Server Error Handler
 *
 */

module.exports = function serverError (data, err) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data) { sails.log.verbose('Sending 500 ("Internal Server Error") response: \n', data); }
  else { sails.log.verbose('Sending 500 ("Internal Server Error") response'); }

  var response = {
    status: 500,
    error: 'Internal Server Error',
    message: 'An unknown internal server error occurred.'
  };

  res.status(500);
  res.json(response);

};
