var scrollama = require("scrollama");
var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");

/**
 * Track in/out view state and dispatch events accordingly
 */

function onEnter(e) {
  if (!e.element.classList.contains(constants.INVIEW_CLASS)) {
    e.element.classList.add(constants.INVIEW_CLASS);
  }

  dispatcher.dispatch({
    type: constants.EVENT_SECTION_INVIEW,
    target: e.element,
    direction: e.direction
  });
}

function onExit(e) {
  if (e.element.classList.contains(constants.INVIEW_CLASS)) {
    e.element.classList.remove(constants.INVIEW_CLASS);
  }

  dispatcher.dispatch({
    type: constants.EVENT_SECTION_OUTVIEW,
    target: e.element,
    direction: e.direction
  });
}

if (document.querySelectorAll(".section").length) {
  var scroller = scrollama();

  scroller
    .setup({
      step: ".section"
    })
    .onStepEnter(onEnter)
    .onStepExit(onExit);

  dispatcher.on(constants.EVENT_RESIZE, scroller.resize);
}
