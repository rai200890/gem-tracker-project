exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    specs: ['spec/javascripts/e2e/**/*.js'],

    baseUrl: 'http://localhost:4000',
    framework: 'jasmine',
    onPrepare: function() {
        var HttpBackend = require('http-backend-proxy');
        proxy = new HttpBackend(browser);
    },
    jasmineNodeOpts: {
        display: 'full',
        isVerbose: true
    },
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 3000
}
