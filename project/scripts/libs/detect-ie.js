var ua = window.navigator.userAgent;

var msie = ua.indexOf("MSIE ");
var trident = ua.indexOf("Trident/");
var edge = ua.indexOf("Edge/");
if (msie > 0) {
  // IE 10 or older => return version number
  document.documentElement.className += " old-ie ie ie" + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
} else if (trident > 0) {
  // IE 11 => return version number
  var rv = ua.indexOf("rv:");
  document.documentElement.className += " ie ie" + parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
} else if (edge > 0) {
  document.documentElement.className += " edge";
}
