var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    errorlog = require('gulp-jshint-file-reporter');

gulp.task('lint', function() {
    'use strict';

    return gulp.src(['src/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter(errorlog));
});
