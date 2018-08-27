const gulp = require("gulp");
const del = require("del");
const copydir = require("copy-dir");
const paths = require("../paths");

gulp.task("export", gulpDone => {
  // remove export/**/*
  del.sync([paths.EXPORT + "**/*"]);

  // copy httpdocs folder with some exceptions
  copydir.sync(paths.DEST.templates, paths.EXPORT, function(stat, filepath) {
    if (filepath.indexOf("images/content") > -1) {
      return false;
    } else if (filepath.indexOf("design-manual") > -1) {
      return false;
    } else if (filepath.indexOf("design-system") > -1) {
      return false;
    } else if (filepath.indexOf("_redirects") > -1) {
      return false;
    } else if (filepath.indexOf("robots.txt") > -1) {
      return false;
    }

    return true;
  });

  gulpDone();
});
