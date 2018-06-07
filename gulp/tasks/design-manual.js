const gulp = require('gulp');
const paths = require('../paths');
const pugDoc = require('pug-doc');
const DesignManual = require('design-manual');
const locals = require('./data/template-locals');


/**
 * Pug Doc
 */

//gulp.task('pug-doc', (gulpDone) => {
//  pugDoc({
//    input: paths.SRC.templates + '**/*.pug',
//    output: paths.DEST.styleguide + 'pugdoc.json',
//   locals: Object.assign({}, paths.locals, locals),
//    complete: (all) => {
//      console.log(all);
//      
//      gulpDone();
//    }
//  });
//});


gulp.task('pug-doc', (gulpDone) => {
  pugDoc({
    input: paths.SRC.templates + '**/*.pug',
    output: paths.DEST.styleguide + 'pugdoc.json',
    locals: Object.assign({}, paths.locals, locals),
    complete: gulpDone
  });
});

/**
 * Design Manual
 */

const config = {
  output: paths.DEST.styleguide,
  components: paths.DEST.styleguide + 'pugdoc.json',
  pages: 'design-system/',
  force: (process.env.NODE_ENV === 'prod'),
  meta: {
    domain: 'han.nl',
    title: 'Design System',
    avatar: 'https://www.han.nl/lib/css/han/images/default/han_oh.gif',
    version: 'v' + require('../../package.json').version
  },
  nav: [
    { label: 'Index', href: '/design-system/index.html' },
    { label: 'Typograpy', href: '/design-system/typography.html' },
    { label: 'Page 2', href: '/design-system/page2.html' },
    { label: 'Page 3', href: '/design-system/page3.html' },
	  { label: 'Docs', href: '/design-system/docs.html' }
  ],
  renderPages: true,
  renderComponents: true,
  renderCSS: true,
  prerender: {
    port: 3000,
    path: 'design-system/',
    serveFolder: 'httpdocs/',
  },
  headHtml: `
    <link rel='stylesheet' href='/lib/css/design-manual.css' />
    <link rel="shortcut icon" href="http://han.nl/favicon.ico">
  `,
  componentHeadHtml: `
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

gulp.task('build-design-manual', (cb) => {
  DesignManual.build(Object.assign({}, config, {
    onComplete: cb
  }));
});

gulp.task('design-manual', gulp.series('pug-doc', 'build-design-manual'));