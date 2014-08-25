module.exports = {
  dispatch: dispatch
};

function dispatch (req, res, successStatusCode) {

  return function (err, object) {
    if (_.isArray(object)) { object = object[0]; }
    successStatusCode = successStatusCode || 200;
    object = _.omit(object, 'password');

    sails.log.verbose('===========\nINCOMING REQUEST ROUTE: ' + JSON.stringify(req.method) + ' ' + req.path);
    sails.log.verbose('Request params: ' + JSON.stringify(req.params.all()));
    sails.log.verbose('Dispatching object: ' + JSON.stringify(object));
    sails.log.verbose('Dispatching error: ' + JSON.stringify(err));
    if (!err) { sails.log.verbose('SUCCESSFUL!'); }

    if (!object || err === 'recordDeleted') { return res.notFound(object, err, true); }
    if (err) { return res.badRequest(object, err); }
    if (successStatusCode === 201) { return res.created(object); }
    else { return res.ok(object); }
  };

}
