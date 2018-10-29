const gulp = require("gulp-v4");
const uglify = require("gulp-uglify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const gutil = require("gulp-util");
const banner = require("gulp-banner");
const envify = require("envify");
const eslint = require("gulp-eslint");

const paths = require("../paths");

// Linter

function lint(folder) {
  return gulp
    .src(paths.SRC.scripts + folder + "/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format());
}

// Scripts

function scripts(name) {
  const b = browserify({
    entries: paths.SRC.scripts + "/" + name + "/index.js",
    transform: [envify]
  });

  return (
    b
      .bundle()
      .pipe(source(name + ".js"))
      .pipe(buffer())
      .on("error", gutil.log)
      // .pipe(uglify())
      .pipe(
        banner("/*! han.nl v<%= pkg.version %> */", {
          pkg: require("../../package.json")
        })
      )
      .pipe(gulp.dest(paths.DEST.scripts))
  );
}

// main
gulp.task("scripts:lint:app", () => {
  return lint("app");
});

gulp.task("scripts:build:app", () => {
  return scripts("app");
});

// libs
gulp.task("scripts:lint:libs", () => {
  return lint("libs");
});

gulp.task("scripts:build:libs", () => {
  return scripts("libs");
});

// head
gulp.task("scripts:lint:head", () => {
  return lint("head");
});

gulp.task("scripts:build:head", () => {
  return scripts("head");
});

gulp.task("scripts:app", gulp.series("scripts:lint:app", "scripts:build:app"));
gulp.task("scripts:libs", gulp.series("scripts:lint:libs", "scripts:build:libs"));
gulp.task("scripts:head", gulp.series("scripts:lint:head", "scripts:build:head"));
