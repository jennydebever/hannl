var keyMirror = require("keymirror");

/**
 * Classes
 */

var classes = {
  OPEN_CLASS: "is-open",
  CLOSED_CLASS: "is-closed",
  MODAL_OPEN_CLASS: "modal-is-open"
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
