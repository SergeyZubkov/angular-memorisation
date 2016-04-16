var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var express = require('express');
var autoprefixer = require('gulp-autoprefixer');



gulp.task('serve', function(done) {
	var app = express();

	app.use('/', express.static(__dirname));

	app.listen(4020,function() {
		done();
	})
})

gulp.task('css', function(){
	return gulp.src('css/main.css')
		.pipe(autoprefixer())
		.pipe(plumber())
		.pipe(livereload())

});

gulp.task('js', function(){
	gulp.src('js/*.js')
		.pipe(plumber())
		.pipe(livereload())
});


gulp.task('html', function() {
	gulp.src('index.html')
	.pipe(livereload());
});

// Watch Task
 gulp.task('watch', function(){
 	livereload.listen({start: true});
  	gulp.watch('index.html',['html']);
 	gulp.watch('css/main.css', ['css']);
 	gulp.watch('js/*.js', ['js']);
});



gulp.task('default', ['css', 'js','html','watch','serve']);