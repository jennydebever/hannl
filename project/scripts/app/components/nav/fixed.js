var debounce = require("debounce");

var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");
var getBreakpoint = require("../../ui/get-breakpoint");

var $nav = document.querySelector(".js-nav");
var $topbar = document.querySelector(".js-topbar");
var $coursenav = document.querySelector(".js-coursenav");
var $coursenavMobileToggle = document.querySelector(".js-coursenav-toggle");

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
  calculateVisibleSpace();
}

dispatcher.on(constants.EVENT_RESIZE, onResize);

setTimeout(onResize, 0);

/**
 * Calculate visible space and set data attribute for easy access
 */

function calculateVisibleSpace() {
  if (!$spacer || !$nav) return;

  var visibleSpace = $spacer.getBoundingClientRect().height + $nav.getBoundingClientRect().top;

  if (+$spacer.getAttribute("data-space") !== visibleSpace) {
    $spacer.setAttribute("data-space", visibleSpace);

    dispatcher.dispatch({
      type: constants.EVENT_NAV_VISIBLE_SPACE_CHANGE,
      space: visibleSpace
    });
  }
}

// listen for current scroll for accurate measurement
window.addEventListener("scroll", calculateVisibleSpace, { passive: true });

// debounce for final measurement
window.onscroll = debounce(calculateVisibleSpace, 250);
