'use strict';

var gulp = require('gulp'),
    karma = require('karma').server;

gulp.task('test:karma', function (done) {
    karma.start({
        configFile: __dirname + '/../../test/unit/karma.conf.js',
        singleRun: true
    }, done);
});
