var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp
    .src('./src/index.js')
    .pipe($.sourcemaps.init())
    .pipe($.browserify())
    .pipe($.rename('angular-ui-tree-search.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./dist'))
    .pipe($.uglify())
    .pipe($.rename('angular-ui-tree-search.min.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'))
});
