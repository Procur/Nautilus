/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*': 'apiTokenAuthentication',
  UtilityController: { 
    '*': true
  },

  AuthController: {
    login: true,
    logout: 'apiTokenAuthentication'
  },

  UserController: {
    create: true
  }

};
