const pug = require("pug");
const gulp = require("gulp");
const paths = require("../paths");
const pugDoc = require("pug-doc");
const DesignManual = require("design-manual");
const locals = require("./data/template-locals");

/**
 * Pug Doc
 */

gulp.task("pug-doc", gulpDone => {
  pugDoc({
    input: paths.SRC.templates + "**/*.pug",
    output: paths.DEST.designsystem + "pugdoc.json",
    locals: Object.assign({}, paths.locals, locals),
    complete: gulpDone
  });
});

/**
 * Design Manual
 */

const config = {
  output: paths.DEST.designsystem,
  components: paths.DEST.designsystem + "pugdoc.json",
  pages: "design-system/",
  force: false,
  meta: {
    domain: "han.nl",
    title: "Design System",
    avatar: "https://www.han.nl/lib/css/han/images/default/han_oh.gif",
    version: "v" + require("../../package.json").version
  },
  nav: [
    { label: "Index", href: "/design-system/index.html" },
    { label: "Atomen", href: "/design-system/atomen.html" },
    { label: "Content", href: "/design-system/content.html" },
    { label: "Navigatie", href: "/design-system/navigatie.html" },
    { label: "Docs ↗", href: "/docs/index.html" }
  ],
  renderPages: true,
  renderComponents: true,
  renderCSS: true,
  prerender: {
    port: 3000,
    path: "design-system/",
    serveFolder: "httpdocs/"
  },
  headHtml: `
    <link rel='stylesheet' href='/lib/css/design-manual.css' />
    <link rel="shortcut icon" href="http://han.nl/favicon.ico">
  `,
  componentHeadHtml: `
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
  componentBodyHtml: `
    <script src='/lib/js/libs.js' defer></script>
    <script src='/lib/js/app.js' defer></script>
  `
};

/**
 * Build component library
 */

gulp.task("build-design-manual", cb => {
  DesignManual.build(
    Object.assign({}, config, {
      onComplete: cb
    })
  );
});

gulp.task("design-manual", gulp.series("pug-doc", "build-design-manual"));

/**
 * Build docs
 */

gulp.task("build-docs", cb => {
  DesignManual.build(
    Object.assign({}, config, {
      output: paths.DEST.docs,
      components: paths.DEST.designsystem + "pugdoc.json",
      pages: "docs/",
      meta: {
        domain: "han.nl",
        title: "Docs",
        avatar: "https://www.han.nl/lib/css/han/images/default/han_oh.gif",
        version: "v" + require("../../package.json").version
      },
      nav: [
        { label: "Index", href: "/docs/index.html" },
        { label: "Iconen", href: "/docs/iconen.html" },
        { label: "Typografie", href: "/docs/typografie.html" },
        { label: "Design system ↗", href: "/design-system/index.html" }
      ],
      renderPages: true,
      renderComponents: true,
      renderCSS: true,
      prerender: false,
      onComplete: cb
    })
  );
});

gulp.task("docs", gulp.series("build-docs"));
