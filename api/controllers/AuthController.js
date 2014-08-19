/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  login: login,
  logout: logout

};

function login(req, res) {
  var p = req.params.all();
  return console.log(req.host);
  //res.json(req);
}

function logout(req, res) {
  var p = req.params.all();
}