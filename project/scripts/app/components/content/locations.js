var delegate = require("delegate-events");
var findParent = require("find-parent");
var constants = require("../../../constants");

/**
 * Capture tab change event inside map address
 */

function onTabChange(e) {
  // find parent locations element
  var $el = findParent.byClassName(e.detail.target, "js-locations");

  // find all children that should respond to tab change
  var $$relatedChildren = $el.querySelectorAll("[data-rel]");

  var index = [].slice.call(e.detail.target.parentNode.children).indexOf(e.detail.target);

  // iterate over children
  for (var i = 0, l = $$relatedChildren.length; i < l; ++i) {
    var $rel = $$relatedChildren[i];

    // show active items
    if ($rel.getAttribute("data-rel") === e.detail.rel) {
      $rel.classList.add(constants.OPEN_CLASS);

      // hide the rest
    } else {
      $rel.classList.remove(constants.OPEN_CLASS);
    }
  }

  // find photos
  var $$images = $el.querySelectorAll(".js-locations__images__item");
  for (i = 0, l = $$images.length; i < l; ++i) {
    // add translate to slide images
    $$images[i].style.transform = ["translateX(-", index * 100, "%)"].join("");
  }
}

/**
 * On load add event listener for tab changes
 */

var $$locations = document.querySelectorAll(".js-locations");
for (var i = 0, l = $$locations.length; i < l; ++i) {
  var $locations = $$locations[i];
  delegate.bind($locations, ".js-tabs", constants.EVENT_TAB_CHANGE, onTabChange);
}
