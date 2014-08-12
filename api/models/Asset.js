/**
* Asset.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    /*owner: {
      model: 'user'
    },*/

    title: {
      type: 'string'
    },

    type: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string',
      required: 'true'
    },

    active: {
      type: 'boolean',
      required: true
    },

    visible: {
      type: 'boolean',
      required: true
    }
  }
};
