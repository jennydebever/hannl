const gulp = require('gulp');
const bs = require('browser-sync').create('dev');

const paths = require('../paths');

// BrowserSync
gulp.task('server', () => {
  bs.init({
    server: {
      baseDir: paths.serve,
      directory: true
    },
    files: [
      paths.DEST.styles,
      paths.DEST.scripts,
      paths.DEST.styleguide + 'lib/'
    ],
    notify: false,
    port: 8000,
    open: false
  });
});

gulp.task('browser:reload', (done) => {
  bs.reload();
  done();
});

gulp.task('browser:notify', (done) => {
  bs.notify("Compiling...");
  done();
});