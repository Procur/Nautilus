module.exports.routes = {

  'get /': 'UtilityController.heartbeat',
  'get /docs': 'UtilityController.docs',

  'post /signup': 'UserController.create',
  'post /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',


  'get /users': 'UserController.show',
  'delete /users/:id': 'UserController.deactivate',

  'get /companies': 'CompanyController.index'

};
