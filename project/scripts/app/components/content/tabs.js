var delegate = require("delegate-events");
var findParent = require("find-parent");
var constants = require("../../../constants");

/**
 * Open/close collapsible item
 * checks aria-expanded attribute on button
 * to decide whether to expand or not
 *
 * Listen for EVENT_TAB_CHANGE to watch for changes
 */

function show($btn, $content, setImmediate) {
  if (!$btn || !$content) {
    return;
  }

  var $tabs = findParent.byClassName($btn, "js-tabs");
  var $$tabs = $tabs.querySelectorAll(".js-tabs__button");

  // close all tabs
  for (var i = 0, l = $$tabs.length; i < l; ++i) {
    var $tab = $$tabs[i];

    if ($tab === $btn) continue;
    $tab.setAttribute("aria-expanded", false);
  }

  // set expanded
  $btn.setAttribute("aria-expanded", true);

  // send event so parent can catch it
  var evt = new CustomEvent(constants.EVENT_TAB_CHANGE, {
    bubbles: true,
    detail: {
      target: $btn,
      rel: $btn.getAttribute("aria-controls")
    }
  });

  $tabs.dispatchEvent(evt);

  if (!setImmediate) {
    // make focusable
    $content.setAttribute("tabIndex", "-1");

    // set focus for screenreaders
    // but move to the end of the stack for event to be handled
    setTimeout(function() {
      $content.focus();
    }, 0);
  }
}

/**
 * Toggle tabs on button click
 * find element referenced by aria-controls and toggle
 */

function onButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute("aria-controls");
  if (rel) {
    show($btn, document.getElementById(rel));
  }
}

delegate.bind(document.body, ".js-tabs__button", "click", onButtonClick);

/**
 * On load, activate enabled item
 */

var $$tabs = document.querySelectorAll(".js-tabs");
for (var i = 0, l = $$tabs.length; i < l; ++i) {
  var $btn = $$tabs[i].querySelector('.js-tabs__button[aria-expanded="true"]');
  var rel = $btn.getAttribute("aria-controls");
  if (rel) {
    show($btn, document.getElementById(rel));
  }
}
