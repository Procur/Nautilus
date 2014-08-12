/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  attributes: {
    company: {
      model: 'company'
    },

    buyer: {
      model: 'buyer'
    },

    supplier: {
      model: 'supplier'
    },

    name: {
      type: 'string',
      required: true
    },

    address: {
      line1: {
        type: 'string',
        required: true
      },

      line2: {
        type: 'string'
      }
    },

    city: {
      type: 'string',
      required: true
    },

    province: {
      type: 'string',
      required: true
    },

    country: {
      type: 'string',
      required: true
    },

    postalCode: {
      type: 'string',
      required: true
    },

    isHq: {
      type: 'boolean'
    },

    type: {
      type: 'string',
      required: true
    }
  }
};

