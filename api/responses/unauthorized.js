/**
 * 401 (Unauthorized) Handler
 */

module.exports = function unauthorized (data, err) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  if (data) { sails.log.verbose('Sending 401 ("Unauthorized") response: \n', data); }
  else sails.log.verbose('Sending 401 ("Unauthorized") response');

  var response = {
    status: 401,
    error: 'Unauthorized: Invalid API Token',
    message: 'You are missing or passed an invalid or improperly configured API token. ' +
      'Procur API tokens are 36-digit hexadecimal strings and should be set in your request ' +
      'header as `apitoken`.'
  };

  var payload = {
    ip: req.ip,
    host: req.host,
    params: req.params.all(),
    headers: req.headers,
    path: req.path
  };

  Log.create(payload, function(err, log) {
    res.status(401);
    res.json(response);
  });
};