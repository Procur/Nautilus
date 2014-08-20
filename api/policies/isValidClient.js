module.exports = function(req, res, next) {

  var clientId = req.headers.clientid,
      host = req.host;

  Client.findOne({ id: clientId }, function(err, client) {
    if(err) { return res.send(500); }
    if(client !== undefined) {
      if ((client.allowedHosts.indexOf(host) > -1) && (clientId == client.id)) {
        return next();
      }
      else {
        return res.send(400, 'Invalid host');
      }
    }
    else {
      return res.send(400, 'Invalid client ID');
    }
  });
};