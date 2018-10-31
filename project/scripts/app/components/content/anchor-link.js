var delegate = require("delegate-events");
var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");

/**
 * Scroll to element by setting focus when internal anchor link is clicked
 */

function onAnchorLinkClick(e) {
  var href = e.target.getAttribute("href");
  if (href.indexOf("#") !== 0) {
    return;
  }

  var $rel = document.getElementById(href.substring(1));
  if ($rel) {
    e.preventDefault();

    dispatcher.dispatch({
      type: constants.REQUEST_SCROLLTO,
      target: $rel
    });
  }
}

delegate.bind(document.body, "a", "click", onAnchorLinkClick);
