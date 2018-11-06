/*! han.nl v0.1.0 */ !(function E(i, O, u) {
  function l(n, r) {
    if (!O[n]) {
      if (!i[n]) {
        var t = "function" == typeof require && require;
        if (!r && t) return t(n, !0);
        if (a) return a(n, !0);
        var e = new Error("Cannot find module '" + n + "'");
        throw ((e.code = "MODULE_NOT_FOUND"), e);
      }
      var o = (O[n] = { exports: {} });
      i[n][0].call(
        o.exports,
        function(r) {
          return l(i[n][1][r] || r);
        },
        o,
        o.exports,
        E,
        i,
        O,
        u
      );
    }
    return O[n].exports;
  }
  for (var a = "function" == typeof require && require, r = 0; r < u.length; r++) l(u[r]);
  return l;
})(
  {
    1: [
      function(r, n, t) {
        "use strict";
        n.exports = function(r) {
          var n,
            t = {};
          if (!(r instanceof Object) || Array.isArray(r))
            throw new Error("keyMirror(...): Argument must be an object.");
          for (n in r) r.hasOwnProperty(n) && (t[n] = n);
          return t;
        };
      },
      {}
    ],
    2: [
      function(r, n, t) {
        "use strict";
        var u = Object.getOwnPropertySymbols,
          l = Object.prototype.hasOwnProperty,
          a = Object.prototype.propertyIsEnumerable;
        n.exports = (function() {
          try {
            if (!Object.assign) return !1;
            var r = new String("abc");
            if (((r[5] = "de"), "5" === Object.getOwnPropertyNames(r)[0])) return !1;
            for (var n = {}, t = 0; t < 10; t++) n["_" + String.fromCharCode(t)] = t;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(n)
                .map(function(r) {
                  return n[r];
                })
                .join("")
            )
              return !1;
            var e = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function(r) {
                e[r] = r;
              }),
              "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, e)).join("")
            );
          } catch (r) {
            return !1;
          }
        })()
          ? Object.assign
          : function(r, n) {
              for (
                var t,
                  e,
                  o = (function(r) {
                    if (null == r) throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(r);
                  })(r),
                  E = 1;
                E < arguments.length;
                E++
              ) {
                for (var i in (t = Object(arguments[E]))) l.call(t, i) && (o[i] = t[i]);
                if (u) {
                  e = u(t);
                  for (var O = 0; O < e.length; O++) a.call(t, e[O]) && (o[e[O]] = t[e[O]]);
                }
              }
              return o;
            };
      },
      {}
    ],
    3: [
      function(r, n, t) {
        var e = r("../../constants");
        n.exports = function() {
          var r = null;
          for (var n in e.BREAKPOINTS)
            window.matchMedia
              ? window.matchMedia("(min-width: " + e.BREAKPOINTS[n] + "px)").matches && (r = n)
              : document.documentElement.clientWidth >= e.BREAKPOINTS[n] && (r = n);
          return r;
        };
      },
      { "../../constants": 4 }
    ],
    4: [
      function(r, n, t) {
        var e = r("keymirror"),
          o = r("object-assign")(
            {},
            {
              OPEN_CLASS: "is-open",
              FOCUS_CLASS: "has-focus",
              CLOSED_CLASS: "is-closed",
              INVIEW_CLASS: "is-inview",
              MODAL_OPEN_CLASS: "modal-is-open",
              MODAL_OPENING_CLASS: "modal-is-opening",
              MODAL_CLOSING_CLASS: "modal-is-closing",
              SCROLLING_UP_CLASS: "is-scrolling-up",
              SCROLLED_TOP_CLASS: "is-scrolled-to-top",
              SCROLLED_BOTTOM_CLASS: "is-scrolled-to-bottom",
              SCROLLED_FREE_CLASS: "is-scrolled-free",
              COURSENAV_DROPDOWN_OPEN_CLASS: "has-coursenav-dropdown-open"
            },
            e({
              EVENT_BREAKPOINT_CHANGE: null,
              EVENT_RESIZE: null,
              EVENT_MODAL_AFTER_OPEN: null,
              EVENT_MODAL_BEFORE_OPEN: null,
              EVENT_MODAL_AFTER_CLOSE: null,
              EVENT_MODAL_BEFORE_CLOSE: null,
              EVENT_SECTION_INVIEW: null,
              EVENT_SECTION_OUTVIEW: null,
              EVENT_NAV_VISIBLE_SPACE_CHANGE: null,
              EVENT_TAB_CHANGE: null,
              REQUEST_MODAL_OPEN: null,
              REQUEST_MODAL_CLOSE: null,
              REQUEST_SCROLLTO: null,
              REQUEST_PREVENT_SCROLL_BEHAVIOR: null
            }),
            {
              KEY_ESCAPE: 27,
              KEY_ENTER: 13,
              KEY_TAB: 9,
              KEY_BACKSPACE: 8,
              KEY_DELETE: 46,
              KEY_UP: 38,
              KEY_DOWN: 40,
              BREAKPOINTS: { MOBILE: 0, TABLET: 768, DESKTOP: 1024 },
              MOBILE: "MOBILE",
              TABLET: "TABLET",
              DESKTOP: "DESKTOP"
            }
          );
        n.exports = o;
      },
      { keymirror: 1, "object-assign": 2 }
    ],
    5: [
      function(r, n, t) {
        var e = r("../app/ui/get-breakpoint");
        document.documentElement.setAttribute("data-breakpoint", e().toLowerCase());
      },
      { "../app/ui/get-breakpoint": 3 }
    ]
  },
  {},
  [5]
);
