'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    //require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({
        rails: {
            options: {
                // Task-specific options go here.
                port: 4000,
                environment: "test",
                keepAlive: false
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            }
        },
        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {}
            },
            your_target: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: "protractor.conf.js", // Target-specific config file
                    args: {
                    } // Target-specific arguments
                }
            }
        },
        karma: {
            unit: {
                configFile: "karma.conf.js",
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        shell: {
            webdriver_manager_update: {
                command: './node_modules/protractor/bin/webdriver-manager update --standalone',
                options: {
                    keepAlive: false
                }
            }
        },
        ngtemplates:  {
            sisptaApp:        { /*Nome do módulo da applicação*/
                prefix: "/",
                src:      ['app/assets/templates/**/**.html', 'app/assets/templates/**.html'],
                dest:     'app/assets/javascripts/templates.js',
                options:  {
                    url:    function(url) { return url.replace('app/assets/templates/', ''); }
                }
            }
        }
    });
    grunt.registerTask("unit", "Run unit test",["karma"]);
    grunt.registerTask("e2e", "Run e2e test",["shell:webdriver_manager_update","rails","protractor"]);
    grunt.registerTask("test", "Run unit & e2e tests",["e2e", "unit"]);
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-rails-server');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-angular-templates');
//Removida a gem grunt-angular-templates
//Para incluir os templates no $templateCache, chamar a tarefa grunt ngtemplates, que gerará o arquivo templates.js
//Depois incluir esse arquivo no manifest, após app.js
};