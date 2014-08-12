
module.exports = {

  adapter: 'api',
  attributes: {

    company: {
      model: 'company'
    },

    dba: {
      type: 'string'
    },

    logo: {
      type: 'string'
    },

    languages: {
      type: 'string',
      required: true
    },

    preferredBuyer: {
      buyerType: {
        type: 'string',
        required: true
      },

      language: {
        type: 'string',
        required: true
      },

      location: {
        type: 'string',
        required: true
      }
    },

    supplierType: {
      type: 'string'
    },

    deliveryTerms: {
      type: 'string'
    },

    acceptedCurrency: {
      type: 'string',
      required: true
    },

    acceptedPaymentTerms: {
      type: 'string',
      required: true
    },

    socialOutlets: {
      google: {
        type: 'string'
      },

      twitter: {
        type: 'string'
      },

      pinterest: {
        type: 'string'
      },

      tumblr: {
        type: 'string'
      },

      linkedin: {
        type: 'string'
      },

      instagram: {
        type: 'string'
      }
    },

    relevantLink: {
      title: {
        type: 'string'
      },

      url: {
        type: 'string'
      }
    },

    contact: {
      name: {
        type: 'string',
        required: true
      },

      position: {
        type: 'string',
        required: true
      },

      email: {
        type: 'string',
        required: true
      }
    },

    companyDescription: {
      type: 'text'
    },

    productDescription: {
      type: 'string'
    },

    assets: {
      model: 'asset'
    },

    /* photos */

    sor: {
      environmentalSustainability: {
        type: 'text'
      },

      qualitySourcing: {
        type: 'text'
      },

      workplaceSafety: {
        type: 'text'
      },

      laborEducationTraining: {
        type: 'text'
      },

      reinvestment: {
        type: 'text'
      }
    },

    locations: {
      collection: 'location',
      via: 'supplier'
    },

    active: {
      type: 'boolean'
    },

    rfx: {
      model: 'rfx'
    }
  }
};

