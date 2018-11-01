var constants = require("../../constants");
var dispatcher = require("../dispatcher");
var scrollIntoView = require("scroll-into-view");

var $topbar = document.querySelector(".js-topbar");

/**
 * Check scroll and set body classes
 * - scrolling up
 * - scrolled to top
 * - scrolled to bottom
 */

var y = document.documentElement.scrollTop;
var preventScrollBehavior = false;

function onScroll() {
  // do nothing is scrolling is done by javascript
  if (preventScrollBehavior) {
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
 * handle request scroll to element
 * this behavior is way too complex, due to differences
 * in mobile/tablet and desktop navigation
 *
 * dispatcher.dispatch({
 *   type: constants.REQUEST_SCROLLTO,
 *   target: $element
 * });
 */

var $navSpacer = document.querySelector(".js-nav-spacer");

function onRequestScrollto(e) {
  if (!e.target) return;

  y = 0;
  onScroll();
  preventScrollBehavior = true;

  // adjust scroll a bit to update current scroll anchor
  scrollIntoView(
    e.target,
    {
      time: 250,
      align: {
        top: 0
      }
    },
    function() {
      // set focus
      e.target.setAttribute("tabindex", "-1");
      e.target.focus();

      // adjust scroll ofset
      if ($navSpacer) {
        window.scrollBy({ top: -$navSpacer.getAttribute("data-space"), behavior: "smooth" });
      }

      // re-enable scroll up/down logic
      setTimeout(function() {
        preventScrollBehavior = false;
      }, 200);
    }
  );
}

dispatcher.on(constants.REQUEST_SCROLLTO, onRequestScrollto);

/**
 * Initial scroll offset
 */

if (location.hash) {
  var $rel = document.getElementById(location.hash.substring(1));
  if ($rel) {
    dispatcher.dispatch({
      type: constants.REQUEST_SCROLLTO,
      target: $rel
    });
  }
}
