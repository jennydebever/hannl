var delegate = require("delegate-events");
var findParent = require("find-parent");
var constants = require("../../../constants");

var $current;

function open($el) {
  if ($el === $current) {
    return;
  }

  close(null);
  $current = $el;
  $current.classList.add(constants.FOCUS_CLASS);
  document.body.classList.add(constants.COURSENAV_DROPDOWN_OPEN_CLASS);
}

/**
 * Close
 */
function close($el) {
  if ($el === $current) {
    return;
  }

  if ($current) {
    $current.classList.remove(constants.FOCUS_CLASS);
    document.body.classList.remove(constants.COURSENAV_DROPDOWN_OPEN_CLASS);

    $current = null;
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
