var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    mocha = require('gulp-mocha'),
    less = require('gulp-less'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

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

gulp.task('react', function () {
  browserify('./src/windows/src/app.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      title: 'React',
      message: 'Bundle complete'
    }));
});

gulp.task('less', function () {
  gulp.src('src/windows/less/main.less')
  .pipe(less())
  .pipe(gulp.dest('dist'));
});

gulp.task('testing', ['test'], function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['test']);
});

gulp.task('watch', ['react', 'testing'], function () {
  gulp.watch([
    'src/windows/**/*.jsx',
    'src/windows/**/*.html',
    'src/windows/**/*.js'
  ], ['react']);
  gulp.watch([
    'src/windows/less/**/*.less'
  ], ['less']);
})
