var gulp = require('gulp'),
    jscs = require('gulp-jscs');

gulp.task('checkstyle', function() {
    'use strict';

    return gulp.src(['src/**/*.js'])
        .pipe(jscs('.jscsrc'));
});
