var gulp = require('gulp'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var paths ={
    src: {
        js: "path/to/js"
    },
    dst: {
        js: "path/to/dst"
    }

};

/*-------------------------------------------------------------------------- JAVASCRIPT
 */

// Lint JS
gulp.task('jshint', function() {
    return gulp.src(paths.src.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('gulpJS', function() {
    return gulp.src(paths.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dst.js));
});

// Watch JS
gulp.task('watchJS', function() {
    return watch(paths.src.js, ['gulpJS']);
});

/*-------------------------------------------------------------------------- TASKS
 */


gulp.task('default', ['watchJS']);
