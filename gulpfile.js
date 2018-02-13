'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnext = require('postcss-cssnext'),
    shortcss = require('postcss-short'),
    cssmin = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    php = require('gulp-connect-php'),
    browserSync = require('browser-sync');
      
    gulp.task('sass', function () {
        return gulp.src('./sass/**/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css'))
    });

    gulp.task('pug', function () {
        return gulp.src('./pug/*.pug')
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('./'))
    });

    gulp.task('autoprefixer', function () {
        return gulp.src('./css/*.css')
        .pipe(sourcemaps.init())       
        .pipe(postcss([ autoprefixer({browsers: 'last 2 versions'}) ]))
        .pipe(sourcemaps.write('.'))    
        .pipe(gulp.dest('./css'));
    });

    gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: './'
            },
            notify: false,
        });
    });
     
    gulp.task('build', function () {
        gulp.watch('./sass/**/*.scss', gulp.series('sass'));
        gulp.watch('./pug/*.pug', gulp.series('pug'));
        gulp.watch('./*.html').on('change', browserSync.reload);    
    });  
     
    gulp.task('watch', gulp.series('sass','pug',
        gulp.parallel('build','browser-sync')
    ));
         
    gulp.task('default', gulp.series('sass','pug',
        gulp.parallel('watch','browser-sync')
    ));