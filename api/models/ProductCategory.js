/**
 * ProductCategory
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  adapter: 'api',
  attributes: {

    buyer:{
      collection: 'buyer',
      via: 'productCategory'
    },

    supplier:{
      collection: 'supplier',
      via: 'productCategory'
    }
  }
};
