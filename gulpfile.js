/**
 * Gulpfile
 *
 * @author    Mirum Bandung
 **/

var gulp       = require('gulp');
var less       = require('gulp-less');
var watch 	   = require('gulp-watch');
var minifyCSS  = require('gulp-minify-css');  
var rename     = require('gulp-rename');  
var header     = require('gulp-header');  
var pkg        = require('./package.json');

var banner = ['/**',  
  ' * <%= pkg.name %> v<%= pkg.version %>',
  ' * <%= pkg.description %>',
  ' * <%= pkg.author.name %> <<%= pkg.author.email %>>',
  ' */',
  ''].join('\n');

gulp.task('compile-less', function() {  
  gulp.src('./css/style.less')
    .pipe(less())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch-less', function() {  
  gulp.watch('./css/**/*.less' , ['compile-less']);
});

gulp.task('minify-css', function() {  
  gulp.src('./css/style.css')
    .pipe(minifyCSS())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest( './css/' ));
});

gulp.task('default', ['compile-less', 'watch-less']); 
gulp.task('build', ['minify-css']);