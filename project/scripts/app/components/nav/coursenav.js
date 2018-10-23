var delegate = require("delegate-events");
var findParent = require("find-parent");
var constants = require("../../../constants");

/**
 * Coursenav dropdown logic for desktop
 */

var $currentDropdown;

function open($el) {
  if ($el === $currentDropdown) {
    return;
  }

  close(null);
  $currentDropdown = $el;
  $currentDropdown.classList.add(constants.FOCUS_CLASS);
  document.body.classList.add(constants.COURSENAV_DROPDOWN_OPEN_CLASS);
}

/**
 * Close
 */
function close($el) {
  if ($el === $currentDropdown) {
    return;
  }

  if ($currentDropdown) {
    $currentDropdown.classList.remove(constants.FOCUS_CLASS);
    document.body.classList.remove(constants.COURSENAV_DROPDOWN_OPEN_CLASS);

    $currentDropdown = null;
  }
}

/**
 * Open with pointer
 */

function onMouseOver(e) {
  open(findParent.byClassName(e.delegateTarget, "js-subnav__item"));
}

delegate.bind(document.body, ".js-subnav__item", "mouseover", onMouseOver);

/**
 * Close with pointer
 */

function onMouseOut(e) {
  close(findParent.byClassName(e.relatedTarget, "js-subnav__item"));
}

delegate.bind(document.body, ".js-subnav__item", "mouseout", onMouseOut);

/**
 * Open with keyboard focus
 */

function onFocus(e) {
  open(findParent.byClassName(e.delegateTarget, "js-subnav__item"));
}

delegate.bind(document.body, ".js-subnav__item a", "focusin", onFocus);

/**
 * Close with keyboard
 */

function onFocusOut(e) {
  close(findParent.byClassName(e.relatedTarget, "js-subnav__item"));
}

delegate.bind(document.body, ".js-subnav__item a", "focusout", onFocusOut);

/**
 * Close by moving focus to black overlay
 */

function onOverlayFocus() {
  close();
}

delegate.bind(document.body, ".js-coursenav-dropdown-close", "focus", onOverlayFocus);

/**
 * Toggle mobile
 */

function toggleMobile() {
  if (document.body.classList.contains(constants.COURSENAV_MOBILE_OPEN_CLASS)) {
    document.body.classList.remove(constants.COURSENAV_MOBILE_OPEN_CLASS);
  } else {
    document.body.classList.add(constants.COURSENAV_MOBILE_OPEN_CLASS);
  }
}

delegate.bind(document.body, ".js-coursenav-mobile-toggle", "click", toggleMobile);
