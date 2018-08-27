const gulp = require("gulp");
const pug = require("gulp-pug");
const gutil = require("gulp-util");
const plumber = require("gulp-plumber");
const pugLint = require("gulp-pug-lint");
const changed = require("gulp-changed");
const gulpif = require("gulp-if");
const debug = require("gulp-debug");

const locals = require("./data/template-locals");
const paths = require("../paths");

const emitty = require("emitty").setup(paths.SRC.templates, "pug");

// Linter
gulp.task("templates:lint", () => {
  return gulp
    .src(paths.SRC.templates + "**/*.pug")
    .pipe(debug({ title: "Linter:" }))
    .pipe(pugLint())
    .on("error", gutil.log);
});

// Pug > HTML
gulp.task("templates:compile", () => {
  return new Promise((resolve, reject) => {
    gulp
      .src([paths.SRC.templates + "pages/**/*.pug"])
      // .pipe(gulpif((global.isWatching), emitty.filter(global.emittyChangedFile)))
      .pipe(debug({ title: "Compiler:" }))
      .pipe(changed(paths.DEST.templates, { extension: "*" }))
      .pipe(plumber())
      .pipe(
        pug({
          pretty: true,
          locals: Object.assign(
            {
              require: require
            },
            paths.locals,
            locals
          )
        })
      )
      .pipe(gulp.dest(paths.DEST.templates))
      .on("end", resolve)
      .on("error", function(err) {
        console.log(err);
        reject();
      });
  });
});
//});

gulp.task(
  "templates",
  gulp.series("templates:lint", "templates:compile", "browser:reload")
);

// gulp.task('templates:compile', () => {
//  return new Promise((resolve, reject) => {
//    emitty.scan(global.emittyChangedFile).then(() =>
