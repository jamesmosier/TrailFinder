module.exports = function(grunt) {
// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

//example taken from: http://thecrumb.com/2014/03/15/using-grunt-for-live-reload/
grunt.initConfig({
    

    //https://github.com/gruntjs/grunt-contrib-sass
    sass: {
        dist: {
            files: {
                'www/styles/app.css': 'www/sass/app.scss'
            }
        }
    },

    //https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      combine: {
        files: {
          'www/styles/app.min.css': ['www/styles/app.css']
        }
      }
    },

    //combine files like this: 'assets/js/output.js': ['js/input.js', 'js/input2.js']
    uglify: {
        scriptz: {
          files: {
            'www/js/app.min.js': 'www/js/app.js'
          }
        }
    }

    });

    grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);

};
    
   
    