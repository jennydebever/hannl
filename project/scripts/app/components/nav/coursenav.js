var dispatcher = require("../../dispatcher");
var constants = require("../../../constants");
var getBreakpoint = require("../../ui/get-breakpoint");

/**
 * Listen to breakpoint changes
 * and make the coursenav modal or not based on breakpoint
 */

var $coursenav = document.querySelector(".js-coursenav");
var $coursenavWrapper = document.querySelector(".js-coursenav-wrapper");

function onBreakpointChange(e) {
  if (!$coursenav) return;

  // for desktop
  if (e.breakpoint === constants.DESKTOP) {
    // make non modal
    $coursenavWrapper.setAttribute("aria-modal", "false");

    // remove open class
    $coursenav.classList.remove(constants.OPEN_CLASS);

    // remove hidden attribute
    $coursenavWrapper.removeAttribute("hidden");

    // for tablet and mobile
  } else {
    // if the coursenav isn't already open (e.g when switching between tablet/mobile)
    if (!$coursenav.classList.contains(constants.OPEN_CLASS)) {
      // make it modal
      $coursenavWrapper.setAttribute("aria-modal", true);

      // set hidden attribute
      $coursenavWrapper.setAttribute("hidden", "true");
    }
  }

  // clean up modal window
  $coursenav.removeAttribute("hidden");

  if (document.body.classList.contains(constants.MODAL_OPEN_CLASS + "--coursenav")) {
    dispatcher.dispatch({
      type: constants.REQUEST_MODAL_CLOSE,
      cb: function() {
        $coursenav.removeAttribute("hidden");
      }
    });
  }
}

onBreakpointChange({
  breakpoint: getBreakpoint()
});

dispatcher.on(constants.EVENT_BREAKPOINT_CHANGE, onBreakpointChange);

/**
 * Add active state to coursenav anchor link
 */

var $$subnavLinks = document.querySelectorAll(".js-subnav__item.is-active .js-coursenav-dropdown a");

function setActiveNavItem(e) {
  var id = e.target.getAttribute("id");

  for (var i = 0, l = $$subnavLinks.length; i < l; ++i) {
    var $subnavLink = $$subnavLinks[i];
    var href = $subnavLink.getAttribute("href");

    // not an anchor link, move on
    if (href.indexOf("#") !== 0) continue;

    if (href.substring(1) === id) {
      $subnavLink.classList.add(constants.INVIEW_CLASS);
    } else {
      if ($subnavLink.classList.contains(constants.INVIEW_CLASS)) {
        $subnavLink.classList.remove(constants.INVIEW_CLASS);
      }
    }
  }
}

dispatcher.on(constants.EVENT_SECTION_INVIEW, setActiveNavItem);
