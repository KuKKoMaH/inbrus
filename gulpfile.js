const gulp = require('gulp');
const config = require('./gulp/config');
require('require-dir')('./gulp/tasks', { recurse: true });

gulp.task('build', gulp.series(
  function (cb) {
    config.setEnv('production');
    config.logEnv();
    cb();
  },
  'clean',
  'css',
  'icons',
  'html',
  'js',
  'images',
));

gulp.task('default', gulp.series(
  (cb) => {
    config.setEnv('development');
    config.logEnv();
    cb();
  },
  'clean',
  'css',
  'icons',
  'html',
  'js',
  (cb) => {
    gulp.watch('src/**/*.pug', gulp.parallel('html'));
    gulp.watch('src/**/*.styl', gulp.parallel('css'));
    gulp.watch('src/**/*.js', gulp.parallel('js'));
    gulp.watch('src/icons/*.svg', gulp.parallel('icons'));
    cb()
  },
  'server',
));
