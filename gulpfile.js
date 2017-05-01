// Gulp Dependencies
var gulp = require('gulp');
var run = require('gulp-run');

gulp.task('sass', ()=>{
  'use strict';
  return run('sass --watch ./client/styles/main.scss:./server/public/stylesheets/main.css').exec();
});

gulp.task('watchify', ()=>{
  'use strict';

  return run('watchify -t [ hbsfy -t ] ./client/index.js -o ./server/public/javascripts/bundle.js -v').exec();
});

// ********* Tasks *********
gulp.task('default', ['sass', 'watchify']);
