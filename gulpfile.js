var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

gulp.task('build', ['scripts', 'styles']);

gulp.task('scripts', ['scripts:template'], function () {
  return gulp
    .src([
      './node_modules/angular/angular.js',
      './node_modules/angular-ui-tree/dist/angular-ui-tree.js',
      './node_modules/angular-ui-tree-search/dist/angular-ui-tree-search.js',
      './app.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('scripts:template', function () {
  return gulp
    .src([
      './templates/**/*.html'
    ])
    .pipe($.angularTemplatecache({
      module: 'angular-ui-tree-search'
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('styles', function () {
  return gulp
    .src([
      './node_modules/angular/angular-csp.css',
      './node_modules/angular-ui-tree/dist/angular-ui-tree.css',
      './app.css'
    ])
    .pipe($.concat('styles.css'))
    .pipe($.cleanCss())
    .pipe(gulp.dest('./dist'))
});
