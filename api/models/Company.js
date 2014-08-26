/**
* Company.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: true,
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

    //ASSOCIATIONS HERE//
    users: {
      collection: 'user',
      via: 'company'
    },

    buyer: {
      model: 'buyer'
    },

    supplier: {
      model: 'supplier'
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
    phone = _.pick(phone, ['countryCode', 'number', 'extension']);
    if (!ValidationService.isValidPhoneObject(phone)) { err = 'invalidPhoneOrFax'; }

    return phone;
  });

  // `undefined` is necessary to protect against null
  values.phone = phones[0] || undefined;
  values.fax = phones[1] || undefined;
  cb(err);
}
