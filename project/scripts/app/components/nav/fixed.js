var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");
var getBreakpoint = require("../../ui/get-breakpoint");

var $nav = document.querySelector(".js-nav");
var $topbar = document.querySelector(".js-topbar");
var $coursenav = document.querySelector(".js-coursenav");
var $coursenavMobileToggle = document.querySelector(".js-coursenav-mobile-toggle");

/**
 * Add a spacer to compensate the fixed header height
 */

var $spacer = document.querySelector(".js-nav-spacer");
function resizeSpacer() {
  if (!$nav || !$spacer) {
    return;
  }

  var h = 0;

  // always add topnav height
  if ($topbar) {
    h += $topbar.getBoundingClientRect().height;
  }

  // add coursenav height
  if ($coursenav) {
    if (getBreakpoint() === constants.DESKTOP) {
      h += $coursenav.getBoundingClientRect().height;
    } else {
      h += $coursenavMobileToggle.getBoundingClientRect().height;
    }
  }

  // set spacer height
  $spacer.style.height = h + "px";
}

/**
 * Window resize
 */

function onResize() {
  resizeSpacer();
}

dispatcher.on(constants.EVENT_RESIZE, onResize);

setTimeout(onResize, 0);
