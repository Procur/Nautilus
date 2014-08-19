module.exports.routes = {

  'get /': 'UtilityController.heartbeat',

  'post /signup': 'UserController.create',

  'get /users': 'UserController.index',

  'get /hosttest': 'AuthController.login'
};
