'use strict';

var gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    mqpacker = require('css-mqpacker'),
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
    var processors = ([
        mqpacker({
          sort: true
        })
      ]);
    return gulp.src('src/sass/*.scss')
    .pipe(gp.sourcemaps.init())
        .pipe(gp.sass({}))
        .pipe(gp.postcss(processors))      
        .pipe(gp.autoprefixer({
            browsers: ['last 2 versions', 'ie > 10']
        }))        
        .pipe(gp.sourcemaps.write())        
        .pipe(gp.csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
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