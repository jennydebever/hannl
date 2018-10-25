var constants = require("../../constants");

/**
 * get current breakpoint
 */

function getBreakpoint() {
  var view = null;

  for (var key in constants.BREAKPOINTS) {
    if (window.matchMedia) {
      if (window.matchMedia("(min-width: " + constants.BREAKPOINTS[key] + "px)").matches) {
        view = key;
      }
    } else {
      if (document.documentElement.clientWidth >= constants.BREAKPOINTS[key]) {
        view = key;
      }
    }
  }

  return view;
}

module.exports = getBreakpoint;
