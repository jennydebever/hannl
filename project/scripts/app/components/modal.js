var delegate = require("delegate-events");
var focusTrap = require("../ui/focus-trap");
var constants = require("../../constants");
var dispatcher = require("../dispatcher");

/**
 * This is a script for a generic modal window
 * there are listeners for button.js-modal-open and button.js-modal-close
 * it will set classes on body and modal element
 * and trap focus inside the modal
 *
 * <div hidden id="menu" role="dialog" aria-modal="true" aria-label="My modal">
 *  <button type="button" aria-label="Close modal" aria-expanded="false" aria-controls="menu" class="js-modal-close">close</button>
 * </div>
 *
 * <button type="button" aria-label="Open modal" aria-expanded="false" aria-controls="menu" class="js-modal-open">open</button>
 * <button type="button" aria-label="Toggle modal" aria-expanded="false" aria-controls="menu" class="js-modal-toggle">toggle</button>
 */

/**
 * Show modal
 */

var currentModalId = null;
var currentModalType = null;

function open(rel) {
  if (!rel) return;

  // if another is open, close that first
  if (currentModalId) {
    close(currentModalId, function() {
      open(rel);
    });
    return;
  }

  var $currentModal = document.getElementById(rel);
  if (!$currentModal) {
    return;
  }

  currentModalId = rel;
  currentModalType = $currentModal.getAttribute("data-modal") || currentModalId;

  function openAnimationEnd() {
    // remove opening class
    document.body.classList.remove(constants.MODAL_OPENING_CLASS);

    // stop listening to animationend
    $currentModal.removeEventListener("animationend", openAnimationEnd);

    // listen for key press
    document.addEventListener("keydown", onKeyDown, false);

    // toggle buttons aria-expanded attribute
    var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModalId + "']");
    for (var i = 0, l = $$showButtons.length; i < l; ++i) {
      $$showButtons[i].setAttribute("aria-expanded", true);
    }

    var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModalId + "']");
    for (i = 0, l = $$closeButtons.length; i < l; ++i) {
      $$closeButtons[i].setAttribute("aria-expanded", false);
    }

    var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModalId + "']");
    for (i = 0, l = $$toggleButtons.length; i < l; ++i) {
      $$toggleButtons[i].setAttribute("aria-expanded", true);
    }

    // trap focus inside element
    focusTrap.enable($currentModal);

    // emit event
    dispatcher.dispatch({
      type: constants.EVENT_MODAL_AFTER_OPEN,
      target: $currentModal
    });
  }

  // emit event
  dispatcher.dispatch({
    type: constants.EVENT_MODAL_BEFORE_OPEN,
    target: $currentModal
  });

  // unhide
  $currentModal.removeAttribute("hidden");

  // add class to body
  document.body.classList.add(constants.MODAL_OPEN_CLASS);
  document.body.classList.add(constants.MODAL_OPEN_CLASS + "--" + currentModalType);
  document.body.classList.add(constants.MODAL_OPENING_CLASS);

  // add class to element
  $currentModal.classList.add(constants.OPEN_CLASS);

  // listen for animation ending
  $currentModal.addEventListener("animationend", openAnimationEnd, false);

  // add history state
  history.pushState("", "", "#" + currentModalId);
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

function close(rel, cb) {
  if (rel && rel !== currentModalId) {
    return;
  }

  var $currentModal = document.getElementById(currentModalId);
  if (!$currentModal) {
    return;
  }

  function closeAnimationEnd() {
    // remove closing class from body
    document.body.classList.remove(constants.MODAL_CLOSING_CLASS);

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
    document.body.classList.remove(constants.MODAL_OPEN_CLASS + "--" + currentModalType);

    // enable focus outside of modal
    focusTrap.disable();

    // toggle buttons aria-expanded attribute
    var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModalId + "']");
    for (var i = 0, l = $$showButtons.length; i < l; ++i) {
      $$showButtons[i].setAttribute("aria-expanded", true);
    }

    var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModalId + "']");
    for (i = 0, l = $$closeButtons.length; i < l; ++i) {
      $$closeButtons[i].setAttribute("aria-expanded", false);
    }

    var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModalId + "']");
    for (i = 0, l = $$toggleButtons.length; i < l; ++i) {
      $$toggleButtons[i].setAttribute("aria-expanded", false);
    }

    // emit event
    dispatcher.dispatch({
      type: constants.EVENT_MODAL_AFTER_CLOSE,
      target: $currentModal
    });

    currentModalId = null;
    currentModalType = null;

    if (cb) cb();
  }

  // emit event
  dispatcher.dispatch({
    type: constants.EVENT_MODAL_BEFORE_CLOSE,
    target: $currentModal
  });

  // listen for animation ending
  $currentModal.addEventListener("animationend", closeAnimationEnd, false);

  // start closing
  $currentModal.classList.add(constants.CLOSED_CLASS);
  document.body.classList.add(constants.MODAL_CLOSING_CLASS);

  history.pushState("", "", window.location.pathname);
}

/**
 * Listen for close button clicks
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
 * Listen for toggle button clicks
 */

function onToggleButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute("aria-controls");
  if (rel) {
    if ($btn.getAttribute("aria-expanded") === "true") {
      close(rel);
    } else {
      open(rel);
    }
  }
}

delegate.bind(document.body, ".js-modal-toggle", "click", onToggleButtonClick);

/**
 * Close on escape press
 */

function onKeyDown(e) {
  if (e.which === constants.KEY_ESCAPE) {
    close(null);
  }
}

/**
 * Open via dispatcher
 *
 * dispatcher.dispatch({
 *  type: constants.REQUEST_MODAL_OPEN,
 *  id: 'menu'
 * })
 */

function onRequestOpen(e) {
  open(e.id);
}

dispatcher.on(constants.REQUEST_MODAL_OPEN, onRequestOpen);

/**
 * Close via dispatcher
 *
 * dispatcher.dispatch({
 *  type: constants.REQUEST_MODAL_CLOSE
 *  cb: function() {}
 * })
 */

function onRequestClose(e) {
  close(null, e.cb);
}

dispatcher.on(constants.REQUEST_MODAL_CLOSE, onRequestClose);

/**
 * Catch hash change
 */

function onPopState() {
  if (location.hash) {
    try {
      open(location.hash.substring(1));
    } catch (err) {
      console.log(err);
    }
  } else {
    close(null);
  }
}
onPopState();
window.addEventListener("popstate", onPopState);
