/**
 * add underscore to a title
 * by wrapping the last word it in a span
 *
 * <h2 class='js-underscore'>hello <span class='underscore-wrap'>world<span class='underscore'>_</span></span></h2>
 */

var $$titles = document.querySelectorAll(".js-underscore");

for (var i = 0, l = $$titles.length; i < l; ++i) {
  var $title = $$titles[i];

  var text = $title.textContent.trim().split(" ");

  // add title text and wrapper span to title
  var $wrapper = document.createElement("span");
  $wrapper.classList.add("underscore-wrap");
  $wrapper.innerHTML = text[text.length - 1];

  // add title text and wrapper span to title
  var $span = document.createElement("span");
  $span.classList.add("underscore");
  $span.innerHTML = "_";
  $wrapper.appendChild($span);

  // set title text
  $title.innerText = text.splice(0, text.length - 1).join(" ") + " ";

  // add last word + svg
  $title.appendChild($wrapper);
}
