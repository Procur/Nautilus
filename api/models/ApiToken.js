/**
* ApiToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: true,
  attributes: {
    user: {
      model: 'user'
    },

    token: {
      type: 'string',
      unique: true,
      required: true
    }
  }
};

