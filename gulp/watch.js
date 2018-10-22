const gulp = require("gulp-v4");
const paths = require("./paths");

require("emitty").setup(paths.SRC.templates, "pug");

// Watch
gulp.task("watch", () => {
  global.isWatching = true;

  gulp
    .watch(paths.SRC.templates + "**/*.pug", gulp.series("browser:notify", "templates", "components"))
    .on("all", (event, filepath) => {
      global.emittyChangedFile = filepath;
    });
  gulp.watch(paths.SRC.styles + "**/*.scss", gulp.series("browser:notify", "styles"));
  gulp.watch(paths.SRC.scripts + "app/**/*.js", gulp.series("browser:notify", "scripts:app"));
  gulp.watch(paths.SRC.scripts + "libs/**/*.js", gulp.series("browser:notify", "scripts:libs"));
  gulp.watch(paths.SRC.scripts + "head/**/*.js", gulp.series("browser:notify", "scripts:head"));
});
