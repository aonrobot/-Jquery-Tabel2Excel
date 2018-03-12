var gulp = require('gulp');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    rename = require("gulp-rename");

gulp.task('js', function() {
    return gulp.src('lib/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
});