var delegate = require("delegate-events");
var focusTrap = require("../../utils/focus-trap");
var constants = require("../../../constants");

var $menu = document.querySelector(".js-menu");

/**
 * Show menu
 */

function show() {
  // toggle buttons aria-expanded attribute
  var $$buttons = document.querySelectorAll(".js-menu-show");
  for (var i = 0, l = $$buttons.length; i < l; ++i) {
    $$buttons[i].setAttribute("aria-expanded", true);
  }

  // add class to body
  document.body.classList.add(constants.MENU_OPEN_CLASS);

  // add class to menu
  $menu.classList.add(constants.OPEN_CLASS);

  // unhide
  $menu.removeAttribute("hidden");

  // trap focus inside menu
  focusTrap.enable($menu);

  // listen for key press
  document.addEventListener("keydown", onKeyDown, false);
}

/**
 * Close
 */

function close() {
  function closeAnimationEnd() {
    // stop listening to animationend
    $menu.removeEventListener("animationend", closeAnimationEnd);

    // remove closed class from menu
    $menu.classList.remove(constants.CLOSED_CLASS);

    // remove open class from menu
    $menu.classList.remove(constants.OPEN_CLASS);

    // hide
    $menu.setAttribute("hidden", true);

    // remove class from body
    document.body.classList.remove(constants.MENU_OPEN_CLASS);

    // enable focus outside of menu
    focusTrap.disable();

    // stop listening for keydown
    document.removeEventListener("keydown", onKeyDown);

    // toggle buttons aria-expanded attribute
    var $$buttons = document.querySelectorAll(".js-menu-show");
    for (var i = 0, l = $$buttons.length; i < l; ++i) {
      $$buttons[i].setAttribute("aria-expanded", false);
    }
  }

  // listen for animation ending
  $menu.addEventListener("animationend", closeAnimationEnd, false);

  // start closing
  $menu.classList.add(constants.CLOSED_CLASS);
}

delegate.bind(document.body, ".js-menu-close", "click", close);

/**
 * Key press
 */

function onKeyDown(e) {
  if (e.which === constants.KEY_ESCAPE) {
    close();
  }
}

/**
 * Catch button click
 */

function onMenuShowClick() {
  show();
}

delegate.bind(document.body, ".js-menu-show", "click", onMenuShowClick);
