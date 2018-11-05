var tippy = require("tippy.js");
var constants = require("../../../constants");
var focusTrap = require("../../ui/focus-trap");

/**
 * Make tippy
 */

function makeTippy($btn) {
  var rel = $btn.getAttribute("aria-controls");
  var $tooltip = document.getElementById(rel);

  if (!$tooltip) {
    return;
  }

  tippy($btn, {
    content: $tooltip,
    delay: 100,
    arrow: true,
    arrowType: "round",
    size: "large",
    duration: 500,
    animation: "scale",
    allowHTML: true,
    interactive: true,
    theme: "light",
    trigger: "click",
    inertia: true,
    onShown: function(e) {
      e.reference.setAttribute("aria-expanded", true);
      $tooltip.firstChild.setAttribute("tabIndex", "-1");
      focusTrap.enable($tooltip, $tooltip.firstChild);
      document.addEventListener("keydown", onKeyDown);
    },
    onHidden: function(e) {
      e.reference.setAttribute("aria-expanded", false);
      document.removeEventListener("keydown", onKeyDown);
    }
  });
}

var $$tippies = document.querySelectorAll(".js-tooltip-button");
for (var i = 0, l = $$tippies.length; i < l; ++i) {
  makeTippy($$tippies[i]);
}

/**
 * Close on escape
 */

function onKeyDown(e) {
  if (e.which === constants.KEY_ESCAPE) {
    focusTrap.disable();
    tippy.hideAllPoppers();
  }
}
