const paths = {
  serve: "./docs/.vuepress/public/",

  SRC: {
    templates: "project/templates/",
    styles: "project/styles/",
    scripts: "project/scripts/"
  },

  DEST: {
    templates: "docs/.vuepress/public/",
    styles: "docs/.vuepress/public/lib/css/",
    scripts: "docs/.vuepress/public/lib/js/"
  }
};

paths.locals = {
  CSS_URL: "/lib/css/",
  JS_URL: "/lib/js/",
  IMAGES_URL: "/lib/images/",
  FONTS_URL: "/lib/fonts/",
  VIDEOS_URL: "/lib/video/",
  TEMPLATES_PATH: paths.SRC.templates
};

module.exports = paths;
