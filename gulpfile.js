// Gulp Dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');

// Server
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

// Build Dependencies
var browserify = require('gulp-browserify');
var browserifyHandlebars = require('browserify-handlebars');
var uglify = require('gulp-uglify');

// Style Dependencies
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// Development Dependencies
var jshint = require('gulp-jshint');

// Test Dependencies
var mochaPhantomjs = require('gulp-mocha-phantomjs');

// ********* Lint *********
gulp.task('lint-client', ()=>{
  'use strict';

  return gulp.src('./client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', ()=>{
  'use strict';

  return gulp.src('./test/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// ********* Browserify *********


gulp.task('browserify-client', ['lint-client'], ()=>{
  'use strict';

  browserSync.reload();

  return gulp.src('client/index.js')
    .pipe(browserify({
      transform: [browserifyHandlebars],
      insertGlobals: true
    }))
    .pipe(uglify())
    .pipe(rename('lemmings.js'))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify-test', ['lint-test'], ()=>{
  'use strict';

  return gulp.src('./test/client/index.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('client-test.js'))
    .pipe(gulp.dest('build'));
});

// ********* Build *********
// gulp.task('minify', ['styles'], ()=>{
//   'use strict';

//   return gulp.src('build/lemmings.css')
//     .pipe(minifyCSS())
//     .pipe(rename('lemmings.min.css'))
//     .pipe(gulp.dest('public/styles'));
// });

// gulp.task('uglify', ['browserify-client'], ()=>{
//   'use strict';

//   return gulp.src('build/lemmings.js')
//     .pipe(uglify())
//     .pipe(rename('lemmings.min.js'))
//     .pipe(gulp.dest('public/js'));
// });


// ********* Test *********
gulp.task('test', ['lint-test', 'browserify-test'], ()=>{
  'use strict';

  return gulp.src('test/client/index.html')
    .pipe(mochaPhantomjs());
});


// ********* Server *********
gulp.task('js', ()=>{
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


gulp.task('serve', ()=>{
  'use strict';

  // nodemon to run the server and refresh when changes happen
  let stream = nodemon({
    script: './server/app.js',

  }).on('restart', ()=>{
    console.log('restarted!');
    // gulp.src('./server/app.js');
  }).on('crash', ()=>{
    console.log('app crashed! restarting in 10 seconds');
    stream.emit('restart', 10);
  });
});

gulp.task('browserSync', ()=>{
  'use strict';

  // browser-sync to refresh to web page when pages happen
  browserSync.init({
    proxy: 'localhost:3000'
  });
});


gulp.task('watch', ()=>{
  'use strict';

  gulp.watch("./client/**/*.js", ['js']);

  gulp.watch("./client/styles/*.scss", ['sass']);
  gulp.watch("./client/*.html").on('change', browserSync.reload);
});

// ********* Tasks *********
// gulp.task('build', ['uglify', 'minify']);
// gulp.task('build', ['minify']);
gulp.task('default', ['serve', 'browserSync', 'sass', 'watch']);