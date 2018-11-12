var constants = require("../../constants");
var dispatcher = require("../dispatcher");
var getBreakpoint = require("./get-breakpoint");

/**
 * Check for breakpoint changes
 * and notify dispatcher if breakpoint changes
 * or if window resizes
 */

var _breakpoint = null;

// check for initial breakpoint
checkBreakpointChange();

// debounce resize events
window.addEventListener("resize", onResize, { passive: true });
onResize();

/**
 * on resize
 * dispatch window resize
 * check for breakpoint change
 */

function onResize() {
  // notify dispatcher viewport has been resized
  dispatcher.dispatch({
    type: constants.EVENT_RESIZE
  });

  // check for breakpoint change
  checkBreakpointChange();
}

/**
 * check breakpoint change
 * dispatch event if changed
 */

function checkBreakpointChange() {
  var newBreakpoint = getBreakpoint();

  // if breakpoint changed
  if (newBreakpoint !== _breakpoint) {
    _breakpoint = newBreakpoint;

    // notify dispatcher
    dispatcher.dispatch({
      type: constants.EVENT_BREAKPOINT_CHANGE,
      breakpoint: _breakpoint
    });

    // set html class
    document.documentElement.setAttribute("data-breakpoint", _breakpoint.toLowerCase());
  }
}
