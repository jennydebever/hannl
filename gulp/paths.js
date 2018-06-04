const paths = {
  serve: './httpdocs',
  EXPORT: 'export/',

  SRC: { // Source paths
    templates: 'project/templates/',
    styles: 'project/styles/',
    scripts: 'project/scripts/'
  },

  DEST: { // Destination paths
    templates: 'httpdocs/',
    styles: 'httpdocs/lib/css/',
    scripts: 'httpdocs/lib/js/',
    styleguide: 'httpdocs/design-system/'
  }
};

paths.locals = {
  CSS_URL: '/lib/css/',
  JS_URL: '/lib/js/',
  IMAGES_URL: '/lib/images/',
  FONTS_URL: '/lib/fonts/',
  VIDEOS_URL: '/lib/video/',
  TEMPLATES_PATH: paths.SRC.templates
};

module.exports = paths;