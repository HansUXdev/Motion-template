// var gulp = require('gulp');
// var testResponsive = require('gulp-responsive-images');
// var responsive = require('gulp-responsive');

// This file should be able to resize images dynamically


gulp.task('interchange', function () {
  gulp.src('source/images/**/*')
    .pipe(testResponsive({
      '*.png': [
        {
          width: 100,
          suffix: 'small'
        },
        {
          width: 100 * 2,
          suffix: 'medium'
        }
        {
          width: 100 * 3,
          suffix: 'large'
        },
      ],
    }))
    .pipe(sprite({}))
    .pipe(gulp.dest('dist/assets/interchange'));
});