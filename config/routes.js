module.exports.routes = {

  'get /': 'UtilityController.heartbeat',

  'post /signup': 'UserController.create',
  'post /login': 'AuthController.login',

  'get /users': 'UserController.index',

  'get /hosttest': 'AuthController.login'
};
