module.exports = function(grunt) {

  grunt.config.set('shell', {
      multiple: {
            command: [
                'sudo npm install mocha --save-dev',
                'sudo npm install grunt-mocha-test --save-dev',
                'sudo npm install sinon --save-dev',
                'sudo npm install assert --save-dev'
            ].join('&&')
        }  });

  grunt.loadNpmTasks('grunt-shell');
};
