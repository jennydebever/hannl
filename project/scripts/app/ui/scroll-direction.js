var constants = require("../../constants");
var dispatcher = require("../dispatcher");

var $topbar = document.querySelector(".js-topbar");

/**
 * Check scroll and set body classes
 * - scrolling up
 * - scrolled to top
 * - scrolled to bottom
 */

var isScrolling;
var y = document.documentElement.scrollTop;

function onScroll() {
  window.clearTimeout(isScrolling);

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function() {
    document.body.classList.remove(constants.SCROLLING_AUTO_CLASS);
  }, 250);

  // do nothing is scrolling is done by javascript
  if (document.body.classList.contains(constants.SCROLLING_AUTO_CLASS)) {
    return;
  }

  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  // scroll direction
  var up = false;
  if (scrollTop < y) {
    up = true;
  }

  if (up) {
    if (!document.body.classList.contains(constants.SCROLLING_UP_CLASS)) {
      document.body.classList.add(constants.SCROLLING_UP_CLASS);
    }
  } else {
    if (document.body.classList.contains(constants.SCROLLING_UP_CLASS)) {
      document.body.classList.remove(constants.SCROLLING_UP_CLASS);
    }
  }

  y = scrollTop;

  // scrolled to top
  var scrolledTop = false;
  var scrolledBottom = false;

  if ($topbar) {
    if (y <= $topbar.getBoundingClientRect().height) {
      scrolledTop = true;
    }
  } else {
    if (y === 0) {
      scrolledTop = true;
    }
  }

  if (scrolledTop) {
    if (!document.body.classList.contains(constants.SCROLLED_TOP_CLASS)) {
      document.body.classList.add(constants.SCROLLED_TOP_CLASS);
    }
  } else {
    if (document.body.classList.contains(constants.SCROLLED_TOP_CLASS)) {
      document.body.classList.remove(constants.SCROLLED_TOP_CLASS);
    }
  }

  // scrolled to bottom
  if (y + window.innerHeight >= document.body.offsetHeight) {
    scrolledBottom = true;
  }

  if (scrolledBottom) {
    if (!document.body.classList.contains(constants.SCROLLED_BOTTOM_CLASS)) {
      document.body.classList.add(constants.SCROLLED_BOTTOM_CLASS);
    }
  } else {
    if (document.body.classList.contains(constants.SCROLLED_BOTTOM_CLASS)) {
      document.body.classList.remove(constants.SCROLLED_BOTTOM_CLASS);
    }
  }

  // scrolling main
  if (!scrolledTop && !scrolledBottom) {
    if (!document.body.classList.contains(constants.SCROLLED_FREE_CLASS)) {
      document.body.classList.add(constants.SCROLLED_FREE_CLASS);
    }
  } else {
    if (document.body.classList.contains(constants.SCROLLED_FREE_CLASS)) {
      document.body.classList.remove(constants.SCROLLED_FREE_CLASS);
    }
  }
}

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/**
 * Temporary scroll freeze request by javascript
 * disables setting new classes to avoid jumping navigation
 * used for when javascript does the scrolling
 *
 * dispatcher.dispatch({
 *   type: constants.REQUEST_SCROLL_FREEZE
 * });
 */

function onRequestFreeze() {
  document.body.classList.add(constants.SCROLLING_AUTO_CLASS);
}

dispatcher.on(constants.REQUEST_SCROLL_FREEZE, onRequestFreeze);
