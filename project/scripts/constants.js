var keyMirror = require("keymirror");

/**
 * Classes
 */

var classes = {
  OPEN_CLASS: "is-open"
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
