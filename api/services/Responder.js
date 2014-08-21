module.exports = {
  dispatch: dispatch
};

function dispatch (req, res, successStatusCode) {

  return function (err, object) {
    successStatusCode = successStatusCode || 200;

    if (!object || err === 'recordDeleted') { return res.notFound(object, err, true); }
    if (err) { return res.badRequest(object, err); }
    if (successStatusCode === 201) { return res.created(object); }
    else { return res.ok(object); }
  };

}
