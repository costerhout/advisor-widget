/**
 * Grunt Module
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
        * Set project object
        */
        project: {
            basedir: '.',
            bert: {
                scss: '../bert/src/scss'
            },
            src: {
                css: '<%= project.basedir %>/css',
                scss: '<%= project.basedir %>/scss',
                js: '<%= project.basedir %>/js',
            },
            dist: {
                css: '<%= project.basedir %>/dist/css',
                scss: '<%= project.basedir %>/dist/scss',
                js: '<%= project.basedir %>/dist/js',
            },
            dev: {
                css: '<%= project.basedir %>/dev/css',
                scss: '<%= project.basedir %>/dev/scss',
                js: '<%= project.basedir %>/dev/js',
            },
            test: {
                basedir: '<%= project.basedir %>/test',
                port: 8005,
                livereload: 8006
            }
        },
        /**
        * Project banner
        */
        tag: {
            banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' * <%= pkg.title %>\n' +
            ' * <%= pkg.url %>\n' +
            ' * @author <%= pkg.author %>\n' +
            ' * @version <%= pkg.version %>\n' +
            ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
            ' */\n'
        },
        /**
        * Sass
        */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    loadPath: [
                        '<%= project.src.scss %>/dev',
                        '<%= project.bert.scss %>/dev'
                    ]
                },
                files: [
                    {
                    expand: true,
                    cwd: '<%= project.src.scss %>/',
                    src: ['**/*.scss'],
                    dest: '<%= project.dev.css %>/',
                    ext: '.css',
                    extDot: 'first'
                    }
                ]
            },
            dist: {
                options: {
                    style: 'compressed',
                    loadPath: [
                        '<%= project.src.scss %>/dist',
                        '<%= project.bert.scss %>/dist'
                    ]
                },
                files: [
                    {
                    expand: true,
                    cwd: '<%= project.src.scss %>/',
                    src: ['**/*.scss'],
                    dest: '<%= project.dist.css %>/',
                    ext: '.css',
                    extDot: 'first'
                    }
                ]
            }
        },
        /**
        * Watch
        */
        watch: {
            css: {
                files: [ '<%= project.src.scss %>/**/*.scss' ],
                tasks: ['sass:dev', 'sass:dist', 'postcss:dist'],
            },
            livereload: {
                options: {
                    livereload: '<%= project.test.livereload %>'
                },
                files: [
                    '<%= project.basedir %>/test/*.html',
                    '<%= project.basedir %>/test/*.js',
                ]
            }
        },
        postcss: {
            options: {
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '<%= project.dist.css %>/**/*.css'
            },
            dev: {
                src: '<%= project.dev.css %>/**/*.css'
            }
        },
        connect: {
            server: {
                options: {
                    base: ['<%= project.test.basedir %>'],
                    port: '<%= project.test.port %>',
                    middleware: function(connect, options, middlewares) {
                        var connectSSI = require('connect-ssi');

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var directory = options.directory || options.base[options.base.length - 1];

                        middlewares.unshift(connectSSI({
                            baseDir: directory,
                            ext: '.html'
                        }));
                        return middlewares;
                    },
                    livereload: '<%= project.test.livereload %>',
                    open: {
                        target: 'http://localhost:' + '<%= project.test.port %>',
                        appName: 'open',
                        callback: function() {}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-connect')

 /**
 * Default task
 * Run `grunt` on the command line
 */
    grunt.registerTask('default', [
        'connect', 'watch'
    ]);
    grunt.registerTask('compile', [
        'sass:dev', 'sass:div', 'postcss:dist'
    ]);
}
