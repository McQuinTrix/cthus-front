var gulp = require('gulp');
var webpack = require('gulp-webpack');
var runSequence = require('run-sequence');

//Running Webpack and Copy
gulp.task('default', function() {
    runSequence('webpack','copy', function(){
        console.log("Done!");
    })
});

//Copy files to WWW Folder
gulp.task('copy', function(){
   gulp.src(['style/**/*.css'])
       .pipe(gulp.dest('www/style'))

    gulp.src(['dist/**'])
       .pipe(gulp.dest('www/dist'))

    gulp.src(['*.html'])
       .pipe(gulp.dest('www'))

    gulp.src(['imgs/**/*'])
        .pipe(gulp.dest('www/imgs'))
});

//Running Webpack
gulp.task('webpack', function () {
    return gulp.src('src/index.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'))
})