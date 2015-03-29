var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var modified = require('gulp-modified');
var connect = require('gulp-connect');
var plumber = require('gulp-plumber');
var ghPages = require('gulp-gh-pages');

gulp.task('compile:styles', function () {
  gulp.src('src/styles/main.styl')
    .pipe(plumber())
    .pipe(modified('styles'))
    .pipe(stylus())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:scripts', function () {
  gulp.src('src/scripts/main.js')
    .pipe(plumber())
    .pipe(modified('scripts'))
    .pipe(browserify())
    .pipe(connect.reload())
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['compile:scripts', 'compile:styles']);

gulp.task('watch', function () {
  gulp.watch(['src/scripts/**'], ['compile:scripts']);
  gulp.watch(['src/styles/**'], ['compile:styles']);
});

gulp.task('serve', function () {
  connect.server({
    'livereload': true,
    'port': process.env.PORT || 3000
  });
});

gulp.task('publish', ['compile'], function() {
  return gulp.src(['index.html', 'revealjs/**', 'dist/*'])
    .pipe(ghPages());
});

gulp.task('default', ['compile', 'watch', 'serve']);
