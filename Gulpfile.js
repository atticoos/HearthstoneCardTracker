var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    mocha = require('gulp-mocha');

gulp.task('test', function () {
  gulp.src('test/spec/**/*.js')
  .pipe(plumber({
    errorHandler: function (err) {
      notify.onError({
        title: 'Unit Test',
        message: '<%= error.message %>'
      })(err);
      this.emit('end');
    }
  }))
  .pipe(mocha({reporter: 'spec', growl: true}));
});

gulp.task('testing', function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});
