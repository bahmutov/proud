module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js', 'index.js', 'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    complexity: grunt.file.readJSON('complexity.json')
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');

  grunt.registerTask('default', ['jshint', 'complexity']);
};
