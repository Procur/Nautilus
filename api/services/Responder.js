module.exports = {
  dispatch: dispatch
};

function dispatch (req, res, successStatusCode) {

  return function (err, object) {
    successStatusCode = successStatusCode || 200;

    // normalize object and remove password
    if (_.isArray(object)) { object = object[0]; }
    object = _.omit(object, 'password');

    // log out for debugging
    sails.log.verbose('===========\nINCOMING REQUEST ROUTE: ' + JSON.stringify(req.method) + ' ' + req.path);
    sails.log.verbose('Request params: ' + JSON.stringify(req.params.all()));
    sails.log.verbose('Dispatching object: ' + JSON.stringify(object));
    sails.log.verbose('Dispatching error: ' + JSON.stringify(err));
    if (!err) { sails.log.verbose('SUCCESSFUL!'); }

    // handle response
    if (!object || err === 'recordDeleted') { return res.notFound(object, err, true); }
    if (err) {

      // handle raw errors from sails
      if (err.toJSON && /E_\w+/.test(err.toJSON().error)) { err = err.toJSON().raw; }

      return res.badRequest(object, err);
    }
    if (successStatusCode === 201) { return res.created(object); }
    else { return res.ok(object); }

  };

}
