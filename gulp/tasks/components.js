const fs = require("fs");
const pug = require("pug");
const gulp = require("gulp");
const pugdoc = require("pug-doc");
const discodip = require("discodip");
const locals = require("./data/template-locals");
const paths = require("../paths");

/**
 * Aggregate all documented pug components
 */

gulp.task("pug-doc", gulpDone => {
  pugdoc({
    input: "project/templates/**/*.pug",
    output: "docs/components.json",
    locals: Object.assign({}, paths.locals, locals),
    complete: gulpDone
  });
});

/**
 * Output all components as [component].html/[component].json to public folder
 */

gulp.task("discodip", gulpDone => {
  discodip({
    output: "docs/.vuepress/public/components/",
    components: "docs/components.json",
    prerender: {
      port: 3000,
      path: "lib/",
      serveFolder: "docs/.vuepress/public"
    },
    headHtml: `
    ${pug.compileFile(paths.SRC.templates + "icons/_symbols.pug")()}
    <link rel='shortcut icon' href='http://han.nl/favicon.ico' />
    <link rel='stylesheet' href='/lib/css/theme.css' />
    <style>
    html, body {
      background-color: white;
    }
    body > div > hr.demo {
      margin: 40px 0;
      border: 0;
      border-top: 1px solid #f0f4f4;
    }
    </style>
    `,
    bodyHtml: `
    <script src='/lib/js/libs.js' defer></script>
    <script src='/lib/js/app.js' defer></script>
    `,
    onComplete: () => {
      fs.unlinkSync("docs/components.json");
      gulpDone();
    }
  });
});

gulp.task("components", gulp.series("pug-doc", "discodip"));
