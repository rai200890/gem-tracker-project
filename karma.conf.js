module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-loading-bar/build/loading-bar.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.min.js',
            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'bower_components/angular-smart-table/dist/smart-table.min.js',
            'app/assets/javascripts/controllers/*.js',
            'app/assets/javascripts/services/*.js',
            'app/assets/javascripts/resources/*.js',
            'app/assets/javascripts/gemTrackerApp.js',
            'app/assets/javascripts/templates.js',
            'spec/javascripts/unit/**/*.js'
        ],

        plugins : ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage','karma-mocha-reporter'],

        browsers: ['PhantomJS'],

        reporters: ['mocha','coverage'],

        preprocessors: {
            'app/assets/javascripts/**/*.js': 'coverage'
        },

        coverageReporter: {
            type : 'html',
            dir : 'coverage'
        },
        display: 'full',
        isVerbose: true,
        showColors: true,
        includeStackTrace: true
    });
};
