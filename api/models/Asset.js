/**
* Asset.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'api',
  schema: true,
  attributes: attributes(),

  // Custom class methods
  upload: upload

};

function attributes() {
  return {
    type: { type: 'string', required: true },
    url: { type: 'string', required: true },
    visible: { type: 'boolean', required: true },
    title: { type: 'string' },
    deletedAt: { type: 'datetime' },

    // ownership associations (hasOnlyOneOf)
    company: { model: 'company' },
    buyer: { model: 'buyer' },
    supplier: { model: 'supplier' },
    user: { model: 'user' }
  };
}

function upload() {
}
