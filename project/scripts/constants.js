var keyMirror = require("keymirror");

/**
 * Classes
 */

var classes = {
  OPEN_CLASS: "is-open",
  FOCUS_CLASS: "has-focus",
  CLOSED_CLASS: "is-closed",
  MODAL_OPEN_CLASS: "modal-is-open",
  SCROLLING_UP_CLASS: "is-scrolling-up",
  SCROLLED_TOP_CLASS: "is-scrolled-to-top",
  SCROLLED_BOTTOM_CLASS: "is-scrolled-to-bottom",
  SCROLLED_FREE_CLASS: "is-scrolled-free",
  COURSENAV_DROPDOWN_OPEN_CLASS: "has-coursenav-dropdown-open"
};

/**
 * Events
 */

var events = keyMirror({
  EVENT_BREAKPOINT_CHANGE: null,
  EVENT_RESIZE: null,
  EVENT_MODAL_AFTER_OPEN: null,
  EVENT_MODAL_BEFORE_OPEN: null,
  EVENT_MODAL_AFTER_CLOSE: null,
  EVENT_MODAL_BEFORE_CLOSE: null,
  REQUEST_MODAL_OPEN: null,
  REQUEST_MODAL_CLOSE: null
});

/**
 * Misc
 */

var misc = {
  KEY_ESCAPE: 27,
  KEY_ENTER: 13,
  KEY_TAB: 9,
  KEY_BACKSPACE: 8,
  KEY_DELETE: 46,
  KEY_UP: 38,
  KEY_DOWN: 40,
  BREAKPOINTS: {
    MOBILE: 0,
    TABLET: 768,
    DESKTOP: 1024
  },
  MOBILE: "MOBILE",
  TABLET: "TABLET",
  DESKTOP: "DESKTOP"
};

var constants = Object.assign({}, classes, events, misc);

module.exports = constants;
