module.exports = {

  badApiToken: badApiToken

};

function badApiToken(req, callback) {

  var payload = {
    ip: req.ip,
    host: req.host,
    params: req.params.all(),
    headers: req.headers,
    path: req.path,
    apitoken: req.headers.apitoken
  };

  Log.create(payload, function(err, log) {
    if(err) { return res.send(500); }
    callback(log);
  });
}