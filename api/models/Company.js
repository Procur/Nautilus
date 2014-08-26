/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: false,
  attributes: attributes(),

  // Lifecycle callbacks
  beforeValidate: beforeValidate
  
};

function attributes() {
  return {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    phone: {
      type: 'json'
     /* countryCode: {
        type: 'string',
        required: true
      },

      number: {
        type: 'string',
        required: true
      },

      extension: {
        type: 'string'
      } */
    },

    fax: {
      type: 'json'
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
    testArray: {
      type:'array'
    },
    //ASSOCIATIONS HERE//
    users: {
      type: 'array',
      collection: 'user',
      via: 'company',
      dominant: true
    },

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
  };
}

function beforeValidate(values, cb) {
  var phones = [ values.phone, values.fax ],
      err;

  phones = _.map(phones, function(phone) {
    if (!phone) { return undefined; }
    phone = _.pick(JSON.parse(phone), ['countryCode', 'number', 'extension']);
    if (!ValidationService.isValidPhoneObject(phone)) { err = 'invalidPhoneOrFax'; }

    return phone;
  });

  // `undefined` is necessary to protect against null
  values.phone = phones[0] || undefined;
  values.fax = phones[1] || undefined;
  cb(err);
}
