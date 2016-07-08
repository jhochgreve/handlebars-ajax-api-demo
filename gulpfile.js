var gulp            = require('gulp'),
    jshint          = require('gulp-jshint'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    prefix          = require('gulp-autoprefixer'),

    //Variables
    input  = {
      'sassMaster'  : 'assets/styles/styles.sass',
      'sassWatch'   : 'assets/styles/**/*.sass'
    }

    output = {
      'css' : 'styles'
    }
//Gulp Tasks
gulp.task('images')
gulp.task('build', ['jshint','build-js-vendor', 'build-js','build-css','watch']);
gulp.task('default', ['watch'])

//Build CSS
gulp.task('build-css', function() {
  return gulp.src(input.sassMaster)
    .pipe(sass())
    .pipe(prefix("last 3 versions", "> 1%", "ie 8", "ie 7", "ie 6"))
    .pipe(gulp.dest(output.css));
});

//Build JS
gulp.task('build-js', function(){
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/modernizr.min.js',
    'assets/js/custom.js'
  ])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('js'))
});

// JShint
gulp.task('jshint', function() {
  return gulp.src('assets/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//Watch Tasks
gulp.task('watch', function() {
  gulp.watch('assets/js/**/*.js', ['jshint', 'build-js']);
  gulp.watch(input.sassWatch, ['build-css']);
});
