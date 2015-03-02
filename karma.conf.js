module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'vendor/assets/bower_components/jquery/jquery.min.js',
            'vendor/assets/bower_components/kendo-ui/js/kendo.web.min.js',
            'vendor/assets/bower_components/bootstrap/dist/js/bootstrap.min.js',
            'vendor/assets/bower_components/angular/angular.min.js',
            'vendor/assets/bower_components/angular-cookie/angular-cookie.min.js',
            'vendor/assets/bower_components/angular-kendo/build/angular-kendo.min.js',
            'vendor/assets/bower_components/angular-loading-bar/build/loading-bar.min.js',
            'vendor/assets/bower_components/angular-mocks/angular-mocks.js',
            'vendor/assets/bower_components/angular-sanitize/angular-sanitize.min.js',
            'vendor/assets/bower_components/angular-localization/angular-localization.min.js',
            'vendor/assets/bower_components/angular-route/angular-route.min.js',
            'vendor/assets/bower_components/angular-resource/angular-resource.min.js',
            'vendor/assets/bower_components/angular-smart-table/dist/smart-table.min.js',
            'vendor/assets/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'vendor/assets/bower_components/angular-ui-select/dist/select.min.js',
            'vendor/assets/bower_components/angular-bootstrap/ui-bootstrap.min.js',
            'app/assets/javascripts/interceptors/*.js',
            'app/assets/javascripts/controllers/*.js',
            'app/assets/javascripts/services/*.js',
            'app/assets/javascripts/resources/*.js',
            'app/assets/javascripts/filters/*.js',
            'app/assets/javascripts/directives/*.js',
            'app/assets/javascripts/app.js',
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
