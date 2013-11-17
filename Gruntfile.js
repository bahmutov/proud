module.exports = function (grunt) {

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js', 'index.js', 'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    complexity: grunt.file.readJSON('complexity.json'),

    readme: {
      options: {
        readme: './docs/README.tpl.md',
        docs: '.'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-readme');

  grunt.registerTask('default', ['jshint', 'complexity', 'readme']);
};
