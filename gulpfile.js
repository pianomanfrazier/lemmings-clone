// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Servers
var browserSync = require('browser-sync').create();

// Style Dependencies
var sass = require('gulp-sass');

// ********* Server *********

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

  gulp.watch("./client/styles/*.scss", ['sass']);
  gulp.watch("./client/*.html").on('change', browserSync.reload);
});

// ********* Tasks *********
gulp.task('default', ['browserSync', 'sass', 'watch']);
