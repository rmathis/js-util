'use strict';

module.exports = function (config) {
    config.set({
        basePath: '../../',
        frameworks: [
            'mocha',
            'chai',
            'sinon-chai'
        ],
        browsers: [
            'PhantomJS'
        ],
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/underscore/underscore.js',
            'node_modules/showdown/compressed/Showdown.js',
            'src/**/*.js',
            'test/unit/spec/**/*.spec.js'
        ],
        reporters: [
            'spec'
        ],
        plugins: [
            'karma-*'
        ],
        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,
        logLevel: config.LOG_INFO
    });
};
