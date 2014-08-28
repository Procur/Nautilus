/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden (data, err) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  if (data) { sails.log.verbose('Sending 403 ("Forbidden") response: \n', data); }
  else sails.log.verbose('Sending 403 ("Forbidden") response');

  var response = {
    status: 403,
    error: 'Invalid API Token',
    message: 'You are missing or passed an invalid or improperly configured API token. ' +
      'Procur API tokens are 36-digit hexadecimal strings and should be set in your request ' +
      'header as `apitoken`.'
  };

  logFunctions.badApiToken(req, function(log) {
    res.status(403);
    res.json(response);
  });
};

