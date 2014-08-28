module.exports = {

  badApiToken: badApiToken,
  invalidHost: invalidHost

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

function invalidHost(req, callback) {

  var payload = {

  };

  Log.create(payload, function(err, log) {
    if(err) { return res.send(500); }
    callback(log);
  });

}