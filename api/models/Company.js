/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: true,
  attributes: {

    name: {
      type: 'string',
      required: true,
      unique: true
    },

    phone: {
      countryCode: {
        type: 'string',
        required: true
      },

      number: {
        type: 'string',
        required: true
      },

      extension: {
        type: 'string'
      }
    },

    fax: {
      countryCode: {
        type: 'string',
        required: true
      },

      number: {
        type: 'string',
        required: true
      },

      extension: {
        type: 'string'
      }
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    website: {
      type: 'string',
      required: true
    },

    industry: {
      type: 'string'
    },

    employeeCount: {
      type: 'integer',
      required: true
    },

    primaryMode: {
      type: 'string',
      required: true
    },

    wizardComplete: {
      type: 'boolean',
      required: true
    },

    handle: {
      type: 'string',
      required: true,
      unique: true
    },

    active: {
      type: 'boolean',
      required: true
    },

    //ASSOCIATIONS HERE//

    locations: {
      collection: 'location',
      via: 'company'
    },

    assets: {
      collection: 'asset',
      via: 'company'
    },

    logo: {
      type: 'string'
    }

  }
};

