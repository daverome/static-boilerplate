module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    var sourcePath = 'app/',
        destinationPath = 'public/',
        javascripts = sourcePath + 'javascripts/**/*.js',
        stylesheets = sourcePath + 'sass/**/*.scss';

    grunt.initConfig({
        sourcePath: sourcePath,

        destinationPath: destinationPath,

        //***************************************************************************
        // JS
        //***************************************************************************
        jshint: {
            dev: [
                javascripts,
                '!' + sourcePath + 'javascripts/vendor/**/*.js',
                '!' + sourcePath + 'javascripts/libs/**/*.js'
            ]
        },

        concat: {
            options: {
                separator: ';'
            },
            dev: {
                src: [
                    sourcePath + 'javascripts/vendor/**/*.js',
                    javascripts,
                    '!' + sourcePath + 'javascripts/libs/**/*.js'
                ],
                dest: destinationPath + 'js/app.js',
            }
        },

        uglify: {
            dist: {
                src: [
                    sourcePath + 'javascripts/vendor/**/*.js',
                    javascripts,
                    '!' + sourcePath + 'javascripts/libs/**/*.js'
                ],
                dest: destinationPath + 'js/app.min.js'
            }
        },


        //***************************************************************************
        // CSS
        //***************************************************************************
        sass: {
            dev: {
                options: {
                    lineNumbers: true,
                    style: 'expanded'
                },
                files: {
                    "<%= destinationPath + 'css/styles.dev.css' %>": "<%= sourcePath + 'sass/styles.scss' %>"
                }
            },
            dist: {
                options: {
                    style: 'nested',
                    quiet: true
                },
                files: {
                    "<%= destinationPath + 'css/styles.css' %>": "<%= sourcePath + 'sass/styles.scss' %>"
                }
            }
        },


        //***************************************************************************
        // HTML
        //***************************************************************************
        jekyll: {
            dev: {
                options: {
                    src: sourcePath + 'jekyll',
                    dest: sourcePath + 'jekyll/_site'
                }
            }
        },

        //***************************************************************************
        // Misc
        //***************************************************************************
        copy: {
            jekyll: {
                files: [{
                    'expand': true,
                    'cwd': sourcePath + 'jekyll/_site',
                    'src': ['**/*.html'],
                    'dest': destinationPath
                }]
            }
        },

        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: javascripts,
                tasks: ['jshint', 'concat']
            },
            sass: {
                options: {
                    livereload: false
                },
                files: stylesheets,
                tasks: ['sass:dev', 'sass:dist']
            },
            jekyll: {
                files: [
                    sourcePath + 'jekyll/**/*.html',
                    '!' + sourcePath + 'jekyll/_site/**/*.html'
                ],
                tasks: ['jekyll', 'copy:jekyll']
            }
        }
    });

    grunt.registerTask( 'default', ['watch'] );
};