var uuid = require('node-uuid');

module.exports = {

  generateToken: generateToken

};

function generateToken(callback) {
  var token = uuid.v1();
  callback(token);
}