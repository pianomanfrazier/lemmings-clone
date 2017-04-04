// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Servers
var browserSync = require('browser-sync').create();

// Build Dependencies
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-handlebars');

// Style Dependencies
var sass = require('gulp-sass');

// ********* Server *********
gulp.task('templates', ()=>{
  'use strict';

  return gulp.src('./client/**/*.hbs')
    .pipe(handlebars())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./server/public/javascripts'));
});

gulp.task('js', ['templates'], ()=>{
  'use strict';

  return gulp.src('./client/**/*.js')
      .pipe(browserify())
      .pipe(uglify())
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('./server/public/javascripts'));
});


gulp.task('sass', ()=>{
  'use strict';

  return gulp.src("./client/styles/*.scss")
      .pipe(sass())
      .pipe(rename('main.css'))
      .pipe(gulp.dest('./server/public/stylesheets'))
      .pipe(browserSync.stream());
});

gulp.task('browserSync', ()=>{
  'use strict';

  // browser-sync to refresh to web page when pages happen
  browserSync.init({
    proxy: 'localhost:3000',
    port: 5000
  });
});


gulp.task('watch', ()=>{
  'use strict';

  gulp.watch("./client/**/*.js", ['js']);
  gulp.watch("./client/styles/*.scss", ['sass']);
  gulp.watch("./client/*.html").on('change', browserSync.reload);
});

// ********* Tasks *********
gulp.task('default', ['browserSync', 'sass', 'watch']);
