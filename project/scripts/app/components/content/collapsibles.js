var delegate = require('delegate-events');
var constants = require('../../../constants');
var slideUp = require('slide-anim').slideUp;
var slideDown = require('slide-anim').slideDown;
var findParent = require('find-parent');

/**
 * Open/close collapsible item
 */

function toggle($btn, $content, speed) {
  if (!$btn || !$content) {
    return;
  }

  var $collapsible = findParent.byClassName($content, 'js-collapsible');

  if ($btn.getAttribute('aria-expanded') === 'false') {
    $btn.setAttribute('aria-expanded', true);
    $collapsible.classList.add(constants.OPEN_CLASS);

    slideDown($content, { duration: speed || 200 }).then(function() {
      $content.setAttribute('tabIndex', '-1');
      $content.focus();
    });
  } else {
    $btn.setAttribute('aria-expanded', false);
    $collapsible.classList.remove(constants.OPEN_CLASS);
    slideUp($content, { duration: speed || 200 });
  }
}

/**
 * collapsible Button click
 */

function onButtonClick(e) {
  var $btn = e.delegateTarget;
  var rel = $btn.getAttribute('aria-controls');

  if (rel) {
    toggle($btn, document.getElementById(rel));
  }
}

delegate.bind(document.body, '.js-collapsible__button', 'click', onButtonClick);

/**
 * Hide/show on load
 */

function toggleOnLoad() {
  var $$collapsibles = document.querySelectorAll('.js-collapsible');
  for (var i = 0, l = $$collapsibles.length; i < l; ++i) {
    var $collapsible = $$collapsibles[i];
    var $btn = $collapsible.querySelector('.js-collapsible__button');
    var $content = $collapsible.querySelector('.js-collapsible__content');
    toggle($btn, $content, 1);
  }
}

toggleOnLoad();
