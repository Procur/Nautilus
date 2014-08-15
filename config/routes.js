module.exports.routes = {

  'get /': 'UtilityController.heartbeat',

  'post /signup': 'UserController.create',

  'get /users': 'UserController.index',
  'get /users/:id': 'UserController.show',
  'delete /users/:id': 'UserController.deactivate'
};

