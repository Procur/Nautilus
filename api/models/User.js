/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: true,
  attributes: attributes(),

  // Lifecycle callbacks
  beforeCreate: hashPassword
    
};

function attributes() {
  return {

    apiToken: {
      model: 'ApiToken'
    },

    firstName: {
      type: 'string',
      required: true
    },

    lastName: {
      type: 'string',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    password: {
      type: 'string',
      required: true
    },

    emailVerified: {
      type: 'boolean'
    },

    profileComplete: {
      type: 'boolean'
    },

    activeMode: {
      type: 'string',
      required: true,
      defaultsTo: 'pending'
    },

    deletedAt: {
      type: 'datetime'
    },

    image: {
      type: 'string'
    },

    jobTitle: {
      type: 'string'
    },

    division: {
      type: 'string'
    },

    companyAdmin: {
      type: 'boolean',
      required: true
    },

    defaultMode: {
      type: 'string',
      required: true,
      defaultsTo: 'pending'
    },

    company: {
      model: 'company'
    },

    buyer: {
      model: 'buyer'
    },

    supplier: {
      model: 'supplier'
    },

    preference: {
      collection: 'preference',
      via: 'user',
      dominant: true
    },

    notification: {
      collection: 'notification',
      via: 'user',
      dominant: true
    },

    globalAdmin: {
      type: 'boolean'
    },

    notBfg: { // not branded, finished goods
      type: 'boolean'
    }
  };
}

function hashPassword(values, cb) {
  var bcrypt = require('bcrypt');
  var salt = 10;

  bcrypt
    .hash(values.password, salt, function(err, hash) {
      if (err) return cb(err);
      
      values.password = hash;
      cb();
    });
}
