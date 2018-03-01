var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass');

var sassFiles = 'style/comp-sass/**.scss',
    cssDest = 'style/';

//Running Webpack and Copy
gulp.task('default', function() {
    runSequence('webpack','compile-sass','copy', function(){
        console.log("Done!");
    })
});

//Copy files to WWW Folder
gulp.task('copy', function(){
   gulp.src(['style/**/*.css'])
       .pipe(gulp.dest('www/style'));

    //Font awesome css
    gulp.src(['node_modules/font-awesome/css/**'])
        .pipe(gulp.dest('www/style/fa/css'));

    //Font awesome font files
    gulp.src(['node_modules/font-awesome/fonts/**'])
        .pipe(gulp.dest('www/style/fa/fonts'));

    gulp.src(['dist/**'])
       .pipe(gulp.dest('www/dist'));

    gulp.src(['*.html'])
       .pipe(gulp.dest('www'));

    gulp.src(['imgs/**/*'])
        .pipe(gulp.dest('www/imgs'))
});

//Running Webpack
gulp.task('webpack', function () {
    return gulp.src('src/index.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'))
});

//Compile SASS
gulp.task('compile-sass', function () {
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest));
});