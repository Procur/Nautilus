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
  beforeValidate: beforeValidate,
};

function attributes() {
  return {
    name: {
      type: 'string',
      required: true,
      unique: true
    },

    phone: {
      type: 'json',
      required: true
    },

    email: {
      type: 'email',
      required: true,
      unique: true
    },

    companyType: {
      type: 'string',
      required: true
    },

    primaryLanguage: {
      type: 'string',
      required: true
    },

    country: {
      type: 'string',
      required: true
    },

    handle: {
      type: 'string',
      defaultsTo: 'temp_' + Date.now(),
      unique: true,
      required: true
    },

    wizardComplete: {
      type: 'boolean',
      defaultsTo: false,
      required: true
    },

    fax: {
      type: 'json'
    },

    website: {
      type: 'string'
    },

    industry: {
      type: 'string'
    },

    employeeCount: {
      type: 'integer'
    },

    primaryMode: {
      type: 'string',
    },

    dbaName: {
      type: 'string'
    },
    
    productCategories: {
      type: 'array'
    }
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

function beforeValidate(values, callback) {
  async.parallel([ validatePhones ], cb);

  function validatePhones(cb) {
    var phones = [ values.phone, values.fax ],
        err;

    phones = _.map(phones, function(phone) {
      if (!phone) { return undefined; }
      phone = _.pick(phone, ['countryCode', 'number', 'extension']);
      if (!ValidationService.isValidPhoneObject(phone)) { err = 'invalidPhoneOrFax'; }

      // `undefined` is necessary to protect against null
      return phone || undefined;
    });

    if (values.phone) { values.phone = phones[0]; }
    if (values.fax) { values.fax = phones[1]; }

    cb(err, values);
  }

  function cb(err, results) {
    callback(err);
  }

}

