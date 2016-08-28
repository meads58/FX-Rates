"use strict"; //opens in strict mode for catching errors e.g. undeclared variables

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server that we downloaded from npm 
var open = require('gulp-open'); //Opens a URL in the browser
var browserify = require('browserify'); //bundles the JS scripts
var reactify = require('reactify'); //transforms react JSX to JS
var source = require('vinyl-source-stream'); //Use conventional text streams with gulp
var concat = require('gulp-concat'); //concatenates files
var lint = require('gulp-eslint');

var config = {
    port: 9005,
    devBaseURL: "http://localhost",
    paths: {
        html: './src/*.html', //match any html files in the source dir
        js: './src/**/.js',
        css: [
      		'node_modules/bootstrap/dist/css/bootstrap.min.css',
      		'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    	],
        dist: './dist',
        mainJS: './src/main.js'
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

gulp.task('js', function(){
    browserify(config.paths.mainJS)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch', function(){
    gulp.watch(config.paths.html, ['html', 'lint'])
});

gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);