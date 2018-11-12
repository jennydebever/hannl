const fs = require("fs");
const gulp = require("gulp-v4");
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
    <link rel='shortcut icon' href='http://han.nl/favicon.ico' />
    <link rel='stylesheet' href='/lib/css/theme.css' />
    <style>
    html, body {
      background-color: white;
    }
    </style>
    `,
    bodyHtml: `
    <script async>
      fetch('/_symbols.html').then(function(res) {
        return res.text();
      }).then(function(html) {
        document.body.insertAdjacentHTML('afterbegin', html);
      });
    </script>
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
