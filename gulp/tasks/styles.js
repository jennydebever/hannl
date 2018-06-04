const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const cssnano = require('gulp-cssnano');
const changed = require('gulp-changed');
const preprocess = require('gulp-preprocess');
const banner = require('gulp-banner');
const replace = require('gulp-replace');

const paths = require('../paths');


// Linter

gulp.task('styles:lint', () => {
  return gulp.src([
    paths.SRC.styles + '**/*.scss',
    '!' + paths.SRC.styles + 'libs/*.scss'
    ])
   .pipe(sassLint())
   .pipe(sassLint.format());
});


// SASS > CSS

gulp.task('styles:compile', () => {
  return gulp.src([
      paths.SRC.styles + 'theme.scss',
      paths.SRC.styles + 'design-manual.scss',
      paths.SRC.styles + 'print.scss',
    ])
    .pipe(changed(paths.DEST.styles, {extension: '*'}))
    .pipe(sass({ style: 'expanded' }).on('error', sass.logError))
    .pipe(preprocess({
      context: paths.locals
    }))
    .pipe(prefix({ browsers: ['last 20 versions'], cascade: false }))
    .pipe(minify())
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      },
      discardDuplicates: true,
      discardEmpty: true,
      minifyFontValues: true,
      minifySelectors: true
    }))
    .pipe(banner('@charset "UTF-8";/*! han.nl v<%= pkg.version %> */', {
      pkg: require('../../package.json')
    }))
    .pipe(replace('*/@charset "UTF-8";', '*/'))
    .pipe(gulp.dest(paths.DEST.styles));
});

gulp.task('styles', gulp.series('styles:lint', 'styles:compile'));
