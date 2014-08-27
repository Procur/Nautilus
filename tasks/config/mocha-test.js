module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/config/config.spec.js',
              'test/*.spec.js']
      }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
