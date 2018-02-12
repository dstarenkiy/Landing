'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps');
    
gulp.task('pug', function buildHTML() {
  var pug = require('gulp-pug');
  return gulp.src('*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest(''))
});

gulp.task('sass', function () {
  var sass = require('gulp-sass'); 
  return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css'));
});

gulp.task('autoprefixer', function () {
    var postcss      = require('gulp-postcss');
    var sourcemaps   = require('gulp-sourcemaps');
    var autoprefixer = require('autoprefixer');
    return gulp.src('./css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass', 'pug', 'autoprefixer']);

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['sass']);
    gulp.watch('*.pug', ['pug']);
    gulp.watch('*.html', ['pug']);
    gulp.watch('./css/*.css', ['autoprefixer']);
}); 