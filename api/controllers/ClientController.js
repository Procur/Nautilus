/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: create,
  index: index,
  modify: modify,
  destroy: destroy

};

function create(req, res) {
  var p = req.params.all();

  Client.create(p, function(err, client) {
    if(err){ return res.send(500); }
    res.json(201, client);
  });
}

function index(req, res) {
  Client.find(function(err, clients) {
    if(err){ return res.send(500); }
    res.json(200, clients);
  });
}

function modify(req, res) {
  var p = req.params.all();

  Client.update(p, function(err, client) {
    if(err){ return res.send(500); }
    res.json(200, client);
  });
}

function destroy(req, res) {
  var p = req.params.all();

  Client.destroy(p, function(err){
    if(err){ return res.send(500); }
    res.send(200, 'Client removed');
  });
}