var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");

var $nav = document.querySelector(".js-nav");
var $topbar = document.querySelector(".js-topbar");
var $subnav = document.querySelector(".js-subnav");

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

  // add subnav height
  if ($subnav) {
    h += $subnav.getBoundingClientRect().height;
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
