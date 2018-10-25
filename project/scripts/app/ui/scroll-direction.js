var constants = require("../../constants");

var $topbar = document.querySelector(".js-topbar");

/**
 * Check scroll and set body classes
 * - scrolling up
 * - scrolled to top
 * - scrolled to bottom
 */

var y = document.documentElement.scrollTop;

function onScroll() {
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
