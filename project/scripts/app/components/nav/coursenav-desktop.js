var delegate = require("delegate-events");
var findParent = require("find-parent");
var constants = require("../../../constants");
var getBreakpoint = require("../../ui/get-breakpoint");

/**
 * Coursenav dropdown logic for desktop
 */

var $currentDropdown;

function open($el) {
  if (getBreakpoint() !== constants.DESKTOP) return;

  if ($el === $currentDropdown) {
    return;
  }

  close(null);
  $currentDropdown = $el;
  $currentDropdown.classList.add(constants.FOCUS_CLASS);
  document.body.classList.add(constants.COURSENAV_DROPDOWN_OPEN_CLASS);

  // listen for key press
  document.addEventListener("keydown", onKeyDown);
}

/**
 * Close
 */
function close($el) {
  if (getBreakpoint() !== constants.DESKTOP) return;

  if ($el === $currentDropdown) {
    return;
  }

  if ($currentDropdown) {
    $currentDropdown.classList.remove(constants.FOCUS_CLASS);
    document.body.classList.remove(constants.COURSENAV_DROPDOWN_OPEN_CLASS);
    $currentDropdown = null;
  }

  // listen for key press
  document.removeEventListener("keydown", onKeyDown, false);
}

/**
 * Key press
 */

function onKeyDown(e) {
  if (e.which === constants.KEY_ESCAPE) {
    var $focus = findParent.byClassName($currentDropdown, "js-subnav__item");
    if ($focus) {
      $focus.querySelector("a").focus();
    }
    close(null);
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
