var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    rename = require("gulp-rename");

gulp.task('js', function() {
    gutil.log('== Minify JS ==');
    gulp.src('lib/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
});