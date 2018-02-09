'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

gulp.task('pug', function buildHTML() {
  return gulp.src('*.pug')
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest(''))
});

gulp.task('sass', function () {
 return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css'));
});

gulp.task('css', function () {
 var processors = [
    shortcss,
    cssnext, 
    autoprefixer({browsers: ['> 1%'], cascade: false})
];
 return gulp.src('./css/style.css')
 .pipe(postcss(processors))
 .pipe(gulp.dest('./css'));
});

gulp.task('default', ['sass', 'css', 'pug']);

gulp.task('watch', function() {
    gulp.watch('css/*.css', ['css']);
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch('css/*.css', ['sass']);
    gulp.watch('*.pug', ['pug']);
    gulp.watch('*.html', ['pug']);
}); 