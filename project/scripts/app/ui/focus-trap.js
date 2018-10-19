var focusTrap = require("focus-trap");
var assign = require("object-assign");

/**
 * Trap focus
 */

var focusTrapInstance;

function enable($el, $initialFocus, options) {
  setTimeout(function() {
    focusTrapInstance = focusTrap(
      $el,
      assign(
        {},
        {
          initialFocus: $initialFocus,
          escapeDeactivates: false,
          clickOutsideDeactivates: true
        },
        options
      )
    ).activate();
  }, 0);
}

module.exports.enable = enable;

/**
 * Stop trap focus
 */

function disable() {
  if (focusTrapInstance) {
    focusTrapInstance.deactivate();
    focusTrapInstance = null;
  }
}

module.exports.disable = disable;
