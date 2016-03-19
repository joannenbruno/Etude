'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');	// synch browser and code changes
var nodemon = require('gulp-nodemon');			
var lint = require('gulp-eslint');					// lint JS files
var imagemin = require('gulp-imagemin');		// optimizing images
var rename = require('gulp-rename');				// optimizing js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// configuration object
var config = {
	proxyUrl: "http://localhost:8080",
	browser: "google chrome",
	port: 7000,
	paths: {
		files: "public/**/*.*",
		images: "public/images/*",
		js: "public/scripts/*.js",
		waveformJs: "public/scripts/waveformScripts/*.js"
	}
}

// destination configuration object
var destConfig = {
	paths: {
		images: 'public/dist/images',
		waveformJs: 'public/dist/scripts/waveformScripts'
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

// image task
gulp.task('images', function() {
	return gulp.src(config.paths.images)
	.pipe(imagemin({progressive : true}))
	.pipe(gulp.dest(destConfig.paths.images));
});

// waveform-based scripts task
gulp.task('waveform-scripts', function() {
  return gulp.src(config.paths.waveformJs)
    .pipe(concat('waveformMain.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(destConfig.paths.waveformJs))
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
	gulp.watch(config.paths.waveformJs, ['lint']);
	gulp.watch(config.paths.waveformJs, ['waveform-scripts']);
	gulp.watch(config.paths.images, ['images']);
});

// default gulp tasks
gulp.task('default', ['browser-sync', 'watch'], function () {});
