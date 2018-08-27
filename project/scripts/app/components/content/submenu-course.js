var delegate = require("delegate-events");
var constants = require("../../../constants");
var slideUp = require("slide-anim").slideUp;
var slideDown = require("slide-anim").slideDown;
var findParent = require("find-parent");

/**
 * Open/close collapsible item
 * checks aria-expanded attribute on button
 * to decide whether to expand or not
 */

function toggle($btn, $content, speed) {
  if (!$btn || !$content) {
    return;
  }

  // get button collapsible parent
  var $collapsible = findParent.byClassName($content, "js-collapsible");

  // current state: not expanded
  if ($btn.getAttribute("aria-expanded") === "false") {
    // set expanded
    $btn.setAttribute("aria-expanded", true);

    // add is-open class
    $collapsible.classList.add(constants.OPEN_CLASS);

    // animate open content div
    slideDown($content, { duration: speed || 200 }).then(function() {
      // make focusable
      $content.setAttribute("tabIndex", "-1");

      // set focus for screenreaders
      $content.focus();
    });

    // current state: expanded
  } else {
    // set not expanded
    $btn.setAttribute("aria-expanded", false);

    // remove is-open class
    $collapsible.classList.remove(constants.OPEN_CLASS);

    // animate close content div
    slideUp($content, { duration: speed || 200 });
  }
}

function toggleButtons() {
  var $$toggleButtons = document.querySelectorAll(".collapsible__title__button");
  for (var i = 0, l = $$toggleButtons.length; i < l; ++i) {
    var $button = $$toggleButtons[i];
    if ($button.classList.contains('show')) {
      $button.classList.remove('show');
    }
    else {
      $button.classList.add('show');
    }
  }
}

/**
 * Toggle collapsible on button click
 * find element referenced by aria-controls and toggle
 */

function onButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute("aria-controls");
  if (rel) {
    toggle($btn, document.getElementById(rel));
  }
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  if (width < 1024) {
    toggleButtons();
  }
}

delegate.bind(document.body, ".js-collapsible__button", "click", onButtonClick);

/**
 * Hide/show all collapsibles on load̦
 */

function toggleOnLoad() {
  var $$collapsibles = document.querySelectorAll(".js-collapsible");
  for (var i = 0, l = $$collapsibles.length; i < l; ++i) {
    // find buttton and content elements
    var $collapsible = $$collapsibles[i];
    var $btn = $collapsible.querySelector(".js-collapsible__button");
    var $content = $collapsible.querySelector(".js-collapsible__content");

    // show/hide with 1ms speed
    toggle($btn, $content, 1);
  }
}

toggleOnLoad();
