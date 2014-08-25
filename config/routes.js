module.exports.routes = {

  'get /': 'UtilityController.heartbeat',
  'get /docs': 'UtilityController.docs',

  'post /signup': 'UserController.create',
  'post /login': 'AuthController.login',
  'get /logout': 'AuthController.logout',

  'get /users': 'UserController.show',
  'put /users': 'UserController.modify',
  'delete /users': 'UserController.deactivate',

  'get /companies': 'CompanyController.index',
  'post /company': 'CompanyController.create'

};
