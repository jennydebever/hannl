var findParent = require("find-parent");
var constants = require("../../../constants");
var dispatcher = require("../../dispatcher");

var $coursenav = document.querySelector(".js-coursenav");
var $coursenavWrapper = document.querySelector(".js-coursenav-wrapper");

/**
 * Before modal open, unhide wrapper
 */

function onModalOpen(e) {
  if (!$coursenav) return;
  if (e.breakpoint === constants.DESKTOP) return;
  if (e.target !== $coursenav) {
    return;
  }
  $coursenavWrapper.removeAttribute("hidden");
  document.body.addEventListener("click", onBodyClick, false);
}

dispatcher.on(constants.EVENT_MODAL_BEFORE_OPEN, onModalOpen);

/**
 * After modal closes, hide wrapper
 */

function onModalClose(e) {
  if (!$coursenav) return;
  if (e.breakpoint === constants.DESKTOP) return;
  if (e.target !== $coursenav) {
    return;
  }
  $coursenavWrapper.setAttribute("hidden", true);
  document.body.removeEventListener("click", onBodyClick);
}

dispatcher.on(constants.EVENT_MODAL_AFTER_CLOSE, onModalClose);

/**
 * Catch body clicks outside coursenav and close
 */

function onBodyClick(e) {
  if (e.breakpoint === constants.DESKTOP) return;

  if (findParent.byClassName(e.target, "js-coursenav")) {
    if (e.target.nodeName !== "A") {
      return;
    } else {
      if (e.target.getAttribute("href").indexOf("#") !== 0) {
        return;
      }
    }
  }

  e.preventDefault();

  dispatcher.dispatch({
    type: constants.REQUEST_MODAL_CLOSE
  });
}
