module.exports = function (grunt) {

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js', 'index.js', 'src/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
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

  grunt.registerTask('default', ['jshint', 'complexity', 'readme']);
};
