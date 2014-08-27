/**
 * Bootstrap
 * (sails.config.bootstrap)
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 */


module.exports.bootstrap = function(cb) {

  // CLOUDINARY BOOTSTRAP
  var cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'huewqecyr',
    api_key: '881324675953382',
    api_secret: 'ba-JzMMUoznUYbnalqxZD3ogTe4'
  });

  cb();
};
