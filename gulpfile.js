
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var npmDist = require('gulp-npm-dist');

gulp.task('sass-css', function(){
  return gulp.src('html/assets/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('minify-css', function(){
  return gulp.src('html/assets/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// styles for general css
gulp.task('sass-general', function(){
  return gulp.src('html/assets/scss/general/*.scss')
    .pipe(sass())
    .pipe(rename({prefix: 'style.'}))
    .pipe(gulp.dest('html/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: true
  })
});

gulp.task('serve', ['browserSync'], function() {
  gulp.watch([
    'html/assets/general/*.scss'
  ],['sass-css']);

  gulp.watch('html/assets/scss/general/*.scss', ['sass-pages']);

  gulp.watch([
    'html/assets/scss/_variables.scss'
  ],['sass-css', 'sass-general']);

  gulp.watch('index.html', browserSync.reload);
  gulp.watch('html/*/*.html', browserSync.reload);
  gulp.watch('html/assets/js/*.js', browserSync.reload);
})

// Copy dependencies to lib/
gulp.task('npm-lib', function() {
  gulp.src(npmDist(), {base:'./node_modules/'})
    .pipe(rename(function(path) {
      path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
    }))
    .pipe(gulp.dest('lib'));
});
