module.exports = function(grunt) {
// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

//GOT IT FROM HERE: http://thecrumb.com/2014/03/15/using-grunt-for-live-reload/
grunt.initConfig({

    // Grunt express - our webserver
    // https://github.com/blai/grunt-express
    express: {
        all: {
            options: {
                server: "server.js",
                bases: ['C:\\Git\\TrailFinder\\app'],
                //bases: ['Sites/Trailfinder'],
                port: 8080,
                hostname: "0.0.0.0",
                livereload: true
            }
        }
    },
    sass: {
        dist: {
            files: {
                'app/css/app.css': 'app/sass/app.scss'
            }
        }
    },
    cssmin: {
      combine: {
        files: {
          'app/css/app.min.css': ['app/css/app.css']
        }
      }
    },
    // grunt-watch will monitor the projects files
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
                files: ['app/*.html', 'app/sass/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
            }
        }
    },
    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        all: {
            path: 'http://localhost:8080/index.html'
        }
    }
    });

    grunt.registerTask('build', ['sass', 'cssmin']);
    grunt.registerTask('default', ['build', 'express', 'open', 'watch']);

};
    
   
    