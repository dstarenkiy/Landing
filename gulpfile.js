'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),   
    browserSync = require('browser-sync').create();

    gulp.task('serve', function() {
        browserSync.init({
            server: {
                baseDir: './build'
            }          
        });
        browserSync.watch('build', browserSync.reload)
    });
    
    gulp.task('pug', function () {
        return gulp.src('src/*.pug')
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .on('end',browserSync.reload);
    });  

    gulp.task('sass', function () {
        return gulp.src('src/sass/*.scss')
        .pipe(gp.sourcemaps.init())
          .pipe(gp.sass({}))
          .pipe(gp.autoprefixer({
              browsers: ['last 10 versions']
          }))
          .pipe(gp.cssbeautify())
          .pipe(gp.sourcemaps.write())
          .pipe(gulp.dest('build/css/'))
          .pipe(browserSync.reload({
              stream: true
          }));
    });    
     
    gulp.task('watch', function () {
        gulp.watch('src/sass/*.scss', gulp.series('sass'));
        gulp.watch('src/*.pug', gulp.series('pug'));            
    }); 
         
    gulp.task('default', gulp.series(
        gulp.parallel('pug','sass'),
        gulp.parallel('watch','serve')
    ));