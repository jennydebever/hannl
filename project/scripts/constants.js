var keyMirror = require("keymirror");

/**
 * Classes
 */

var classes = {
  OPEN_CLASS: "is-open",
  CLOSED_CLASS: "is-closed",
  MENU_OPEN_CLASS: "menu-is-open",
  SITESEARCH_OPEN_CLASS: "sitesearch-is-open"
};

/**
 * Events
 */

var events = keyMirror({});

/**
 * Misc
 */

var misc = {
  KEY_ESCAPE: 27
};

var constants = Object.assign({}, classes, events, misc);

module.exports = constants;
