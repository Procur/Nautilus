module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/config/config.spec.js',
              'tests/userCtrl/*.spec.js',//sample folder
              'tests/*.spec.js']
      }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
