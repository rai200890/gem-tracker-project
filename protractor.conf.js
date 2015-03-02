exports.config = {
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    specs: ['spec/javascripts/e2e/**/*.js'],

    baseUrl: 'http://local.ntp.uff.br:4000',
    framework: 'jasmine',
    onPrepare: function() {
        proxy = require("./spec/javascripts/e2e/support/login_helper.js");
        browser.driver.manage().window().setPosition(0, 0);
        browser.driver.manage().window().setSize(1280, 1024);
        browser.sleep(3000);
    },
    jasmineNodeOpts: {
        display: 'full',
        isVerbose: true
    },
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 300000000
}
