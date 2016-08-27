"use strict"; //opens in strict mode for catching errors e.g. undeclared variables

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server that we downloaded from npm 
var open = require('gulp-open'); //Opens a URL in the browser

var config = {
    port: 9005,
    devBaseURL: "http://localhost",
    paths: {
        html: './src/*.html', //match any html files in the source dir
        dist: './dist'
    } 
}

//Starts local dev server
gulp.task('connect', function() {
    connect.server({
        root: ['dist'],
        port: config.port,
        base : config.devBaseUrl,
        livereload: true //task to releaod our source in the browser anytime a file changes
    });
});

gulp.task('open', ['connect'], function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: config.devBaseURL + ':' + config.port + '/'}))
});

gulp.task('html', function(){
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('default', ['html', 'open']);