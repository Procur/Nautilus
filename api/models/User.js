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

  // Custom class methods
  deactivate: paranoidDeactivate,

  // Lifecycle callbacks
  beforeCreate: hashPassword
    
};

function attributes() {
  return {

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
      required: true
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
      required: true
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
    }
  };
}

function paranoidDeactivate(user, cb) {
  console.log(user);
  var now = new Date();
  User
    .update(user, { deletedAt: now })
    .exec(function(err, user) { console.log(err); console.log(user); cb(null, user); });
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
