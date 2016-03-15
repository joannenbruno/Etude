'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');	// synch browser and code changes
var nodemon = require('gulp-nodemon');			
var lint = require('gulp-eslint');					// lint JS files

// configuration object
var config = {
	proxyUrl: "http://localhost:8080",
	browser: "google chrome",
	port: 7000,
	paths: {
		files: "public/**/*.*",
		js: "public/scripts/*.js"
	}
}

// browser-sync task
gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: config.proxyUrl,
        files: [config.paths.files],
        browser: config.browser,
        port: config.port,
	});
});

// nodemon helper task
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});

// linting task
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

// watch task for any html/js changes
gulp.task('watch', function() {
	gulp.watch(config.paths.js, ['lint']);
});

// default gulp tasks
gulp.task('default', ['browser-sync', 'watch'], function () {});
