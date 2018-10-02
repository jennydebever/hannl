const gulp = require("gulp-v4");
const gutil = require("gulp-util");

require("require-dir")("./tasks");
require("./watch");
require("./clean");

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "templates",
      "styles",
      "scripts:app",
      "scripts:head",
      "scripts:libs"
    )
  )
);
gulp.task("default", gulp.parallel("server", "watch"));
