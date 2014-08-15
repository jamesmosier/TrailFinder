module.exports = function(grunt) {
// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

//example taken from: http://thecrumb.com/2014/03/15/using-grunt-for-live-reload/
grunt.initConfig({
    
    //https://github.com/gruntjs/grunt-contrib-connect
    connect: {
        server: {
          options: {
            port: 3000,
            base: '<%= build_dir %>',
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            livereload: true,
            open: true
          }
        }
    },
    
    //https://github.com/gruntjs/grunt-contrib-sass
    sass: {
        dist: {
            files: {
                'assets/css/app.css': 'sass/app.scss',
                'assets/css/lemonade.css': 'sass/lemonade/lemonade.scss'
            }
        }
    },

    //https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      combine: {
        files: {
          'assets/css/app.min.css': ['assets/css/lemonade.css', 'assets/css/app.css']
        }
      }
    },

    //combine files like this: 'assets/js/output.js': ['js/input.js', 'js/input2.js']
    uglify: {
        scriptz: {
          files: {
            'assets/js/main.js': 'js/main.js'
          }
        }
    },
    
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
                files: ['*.html', 'sass/*.scss', 'docs/*'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
            }
        }
    }

    });

    grunt.registerTask('build', ['sass', 'cssmin', 'uglify']);
    grunt.registerTask('default', ['build', 'connect']);

};
    
   
    