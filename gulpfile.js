var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var modified = require('gulp-modified');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var ghPages = require('gulp-gh-pages');
var filter = require('gulp-filter');

gulp.task('compile:styles', function () {
  return gulp.src('src/styles/main.styl')
    .pipe(plumber())
    .pipe(modified('styles'))
    .pipe(stylus())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:html', function () {
  return gulp.src('index.html')
    .pipe(plumber())
    .pipe(connect.reload());
});

gulp.task('compile:scripts', function () {
  return gulp.src('src/scripts/main.js')
    .pipe(plumber())
    .pipe(modified('scripts'))
    .pipe(browserify())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['compile:scripts', 'compile:styles', 'compile:html']);

gulp.task('watch', function () {
  gulp.watch(['src/scripts/**'], ['compile:scripts']);
  gulp.watch(['src/styles/**'], ['compile:styles']);
  gulp.watch(['index.html'], ['compile:html']);
});

gulp.task('serve', function () {
  connect.server({
    'livereload': true,
    'port': process.env.PORT || 3000
  });
});

gulp.task('publish', ['compile'], function() {
  return gulp.src([
      'index.html',
      '**/*.css',
      '**/*.js',
      '**/*.woff',
      '**/*.eot',
      '**/*.ttf'
    ]).pipe(filter([
      '**',
      '!node_modules/**',
      '!src/**',
      '!gulpfile.js'
    ])).pipe(ghPages());
});

gulp.task('default', ['compile', 'watch', 'serve']);
