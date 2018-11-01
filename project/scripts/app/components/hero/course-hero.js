var scrollama = require("scrollama");

var lerp = require("../../utils/lerp");
var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");

/**
 * Parallax effect for the hero
 */

var $hero = document.querySelector(".js-course-hero");
var $picture = document.querySelector(".js-course-hero__image__picture");
var $overlay = document.querySelector(".js-course-hero__image__picture__overlay");
var $img = document.querySelector(".js-course-hero__image__picture img");

function onProgress(e) {
  $picture.style.transform = "scaleY(" + (1 - e.progress) + ")";
  $img.style.transform = "scaleY(" + (1 + e.progress) + ")";
  $overlay.style.transform = "scaleY(" + (1 + e.progress) + ")";
  $overlay.style.opacity = lerp(0, 1, e.progress);
}

var scroller = scrollama();

function setupParallax(e) {
  if (!$hero || !$picture || !$img) return;

  scroller
    .setup({
      step: ".js-course-hero__image",
      offset: (1 / document.documentElement.clientHeight) * e.space,
      progress: true,
      debug: true
    })
    .onStepProgress(onProgress);
}

dispatcher.on(constants.EVENT_RESIZE, scroller.resize);
dispatcher.once(constants.EVENT_NAV_VISIBLE_SPACE_CHANGE, setupParallax);

/**
 * Listen for nav space changes
 */

function onNavSpaceChange(e) {
  scroller.offsetTrigger((1 / document.documentElement.clientHeight) * e.space);
  scroller.resize();
}

dispatcher.on(constants.EVENT_NAV_VISIBLE_SPACE_CHANGE, onNavSpaceChange);

// /**
//  * Do parallax only for desktop
//  */

// function onBreakpointChange(e) {
//   if (e.breakpoint === constants.DESKTOP) {
//     scroller.enable();
//   } else {
//     scroller.disable();
//     onProgress({
//       progress: 0
//     });
//   }
// }

// dispatcher.on(constants.EVENT_BREAKPOINT_CHANGE, onBreakpointChange);
