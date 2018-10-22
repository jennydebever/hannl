var delegate = require("delegate-events");
var focusTrap = require("../ui/focus-trap");
var constants = require("../../constants");

/**
 * This is a script for a generic modal window
 * there are listeners for button.js-modal-open and button.js-modal-close
 * it will set classes on body and modal element
 * and trap focus inside the modal
 *
 * <div hidden id="menu" role="dialog" aria-modal="true" aria-label="My modal">
 *  <button type="button" aria-label="Close modal" aria-expanded="false" aria-controls="menu" class="js-modal-close">close</button>
 * </div>
 */

/**
 * Show modal
 */

var currentModal = null;

function open(rel) {
  if (!rel) return;

  currentModal = rel;
  var $currentModal = document.getElementById(rel);
  if (!$currentModal) {
    return;
  }

  // toggle buttons aria-expanded attribute
  var $$showButtons = document.querySelectorAll(".js-modal-show[rel='" + currentModal + "']");
  for (var i = 0, l = $$showButtons.length; i < l; ++i) {
    $$showButtons[i].setAttribute("aria-expanded", true);
  }

  var $$closeButtons = document.querySelectorAll(".js-modal-hide[rel='" + currentModal + "']");
  for (i = 0, l = $$closeButtons.length; i < l; ++i) {
    $$closeButtons[i].setAttribute("aria-expanded", false);
  }

  // add class to body
  document.body.classList.add(constants.MODAL_OPEN_CLASS);
  document.body.classList.add(constants.MODAL_OPEN_CLASS + "--" + currentModal);

  // add class to element
  $currentModal.classList.add(constants.OPEN_CLASS);

  // unhide
  $currentModal.removeAttribute("hidden");

  // trap focus inside element
  focusTrap.enable($currentModal);

  // listen for key press
  document.addEventListener("keydown", onKeyDown, false);
}

/**
 * Listen for show button clicks
 */

function onOpenButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute("aria-controls");

  if (rel) {
    open(rel);
  }
}

delegate.bind(document.body, ".js-modal-open", "click", onOpenButtonClick);

/**
 * Close
 */

function close(rel) {
  if (rel && rel !== currentModal) {
    return;
  }

  var $currentModal = document.getElementById(currentModal);

  function closeAnimationEnd() {
    // stop listening for keydown
    document.removeEventListener("keydown", onKeyDown);

    // stop listening to animationend
    $currentModal.removeEventListener("animationend", closeAnimationEnd);

    // remove closed class from modal
    $currentModal.classList.remove(constants.CLOSED_CLASS);

    // remove open class from modal
    $currentModal.classList.remove(constants.OPEN_CLASS);

    // hide
    $currentModal.setAttribute("hidden", true);

    // remove class from body
    document.body.classList.remove(constants.MODAL_OPEN_CLASS);
    document.body.classList.remove(constants.MODAL_OPEN_CLASS + "--" + currentModal);

    // enable focus outside of modal
    focusTrap.disable();

    // toggle buttons aria-expanded attribute
    var $$showButtons = document.querySelectorAll(".js-modal-show[rel='" + currentModal + "']");
    for (var i = 0, l = $$showButtons.length; i < l; ++i) {
      $$showButtons[i].setAttribute("aria-expanded", true);
    }

    var $$closeButtons = document.querySelectorAll(".js-modal-hide[rel='" + currentModal + "']");
    for (i = 0, l = $$closeButtons.length; i < l; ++i) {
      $$closeButtons[i].setAttribute("aria-expanded", false);
    }
  }

  // listen for animation ending
  $currentModal.addEventListener("animationend", closeAnimationEnd, false);

  // start closing
  $currentModal.classList.add(constants.CLOSED_CLASS);
}

/**
 * Listen for show button clicks
 */

function onCloseButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute("aria-controls");
  if (rel) {
    close(rel);
  }
}

delegate.bind(document.body, ".js-modal-close", "click", onCloseButtonClick);

/**
 * Key press
 */

function onKeyDown(e) {
  if (e.which === constants.KEY_ESCAPE) {
    close();
  }
}
