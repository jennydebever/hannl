var scrollama = require("scrollama");

var lerp = require("../../utils/lerp");
var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");
var getBreakpoint = require("../../ui/get-breakpoint");

/**
 * Parallax effect for the hero
 */

var $hero = document.querySelector(".js-course-hero");
var $picture = document.querySelector(".js-course-hero__image__picture");
var $overlay = document.querySelector(".js-course-hero__image__picture__overlay");
var $img = document.querySelector(".js-course-hero__image__picture img");

function onProgress(e) {
  if (getBreakpoint() !== constants.DESKTOP) {
    e.progress = 0;
  }

  $overlay.style.opacity = lerp(0, 1, e.progress);

  e.progress *= 0.3;

  $picture.style.transform = "scaleY(" + (1 - e.progress) + ")";
  $img.style.transform = $overlay.style.transform = "scaleY(" + (1 + e.progress) + ")";
}

var scroller = scrollama();

function setupParallax() {
  if (!$hero || !$picture || !$img) return;

  scroller
    .setup({
      step: ".js-course-hero__image",
      offset: 0,
      progress: true,
      debug: false
    })
    .onStepProgress(onProgress);
}

function onResize() {
  scroller.resize();
}

dispatcher.on(constants.EVENT_RESIZE, onResize);
setupParallax();
