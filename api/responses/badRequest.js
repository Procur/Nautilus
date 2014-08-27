/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

module.exports = function badRequest(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data) { sails.log.verbose('Sending 400 ("Bad Request") response: \n',data); }
  else sails.log.verbose('Sending 400 ("Bad Request") response');

  var response = {
    status: 400,
    error: 'Bad Request',
    message: 'Your request is invalid.'
  };

  if (options === 'badLogin') { response.message = 'Invalid username or password.'; }
  if (options === 'emailExists') { response.message = 'You are already a member. Please login.'; }
  if (options === 'invalidApiToken') { response.message = 'Your API token is invalid.'; }
  if (options === 'invalidPhoneOrFax') { response.message = 'Validation Error: Check your phone or fax number.'; }
  if (options === 'badRequest') { response.message = 'No known user\'s email address is associated with this request.'; }
  if (options === 'userHasCompany') { response.message = 'A company already exists for this user.'; }

  res.status(400);
  res.json(response);

};

