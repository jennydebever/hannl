const gulp = require("gulp");
const del = require("del");
const paths = require("./paths");

gulp.task("clean", cb => {
  return del(
    [
      paths.DEST.templates + "*.html",
      paths.DEST.styles + "**/*.css",
      paths.DEST.scripts + "**/*.js.",
      paths.DEST.images + "**/*"
    ],
    cb
  );
});
