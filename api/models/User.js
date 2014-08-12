/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

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

    active: {
      type: 'boolean',
      required: true
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

    /** defaultMode: {
    *  type: 'string',
    *  required: true
    *}
    */

    /*company: {
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
      via: 'users',
      dominant: true
    },

    notification: {
      collection: 'notification',
      via: 'users',
      dominant: true
    },*/

    globalAdmin: {
      type: 'boolean'
    }
  }
};
