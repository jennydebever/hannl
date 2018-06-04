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
    styles: 'httpdocs/static/css/',
    scripts: 'httpdocs/static/js/',
    styleguide: 'httpdocs/design-system/'
  }
};

paths.locals = {
  CSS_URL: '/static/css/',
  JS_URL: '/static/js/',
  IMAGES_URL: '/static/images/',
  FONTS_URL: '/static/fonts/',
  VIDEOS_URL: '/static/video/',
  TEMPLATES_PATH: paths.SRC.templates
};

module.exports = paths;