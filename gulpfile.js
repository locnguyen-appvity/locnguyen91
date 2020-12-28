'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch');

gulp.task('sass', function() {
	return gulp.src('sass/style.sass')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
	gulp.watch('sass/**/*.sass', ['sass']);
});
