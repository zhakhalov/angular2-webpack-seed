const gulp = require('gulp');
const path = require('path');
const webpack = require('gulp-webpack');
const webserver = require('gulp-webserver');

gulp.task('build', () => gulp.src('./src/app.ts')
  .pipe(webpack(require('./webpack.config')))
  .pipe(gulp.dest('www'))
);

gulp.task('watch', () => gulp.src('./src/app.ts')
  .pipe(webpack(Object.assign(require('./webpack.config'), { watch: true })))
  .pipe(gulp.dest('www'))
);

gulp.task('serve', function() {
  gulp.src('www')
    .pipe(webserver({
      port: 3000,
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});