module.exports.routes = {

  'get /': 'UtilityController.heartbeat',

  'post /signup': 'UserController.create',
  'get /test': 'UserController.index'
};
