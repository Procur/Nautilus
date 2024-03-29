/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  migrate: 'safe',
  deactivate: deactivate,
  attributes: attributes()

};

function attributes() {
  return {
    deletedAt: {
      type: 'datetime'
    }
  };  
}

function deactivate (objectId) {
  var now = new Date();
  return this.update({ id: objectId }, { deletedAt: now });
}
