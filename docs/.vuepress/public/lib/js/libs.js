/*! han.nl v0.1.0 */ !(function r(u, a, s) {
  function d(t, e) {
    if (!a[t]) {
      if (!u[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (c) return c(t, !0);
        var i = new Error("Cannot find module '" + t + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
      }
      var o = (a[t] = { exports: {} });
      u[t][0].call(
        o.exports,
        function(e) {
          return d(u[t][1][e] || e);
        },
        o,
        o.exports,
        r,
        u,
        a,
        s
      );
    }
    return a[t].exports;
  }
  for (var c = "function" == typeof require && require, e = 0; e < s.length; e++) d(s[e]);
  return d;
})(
  {
    1: [
      function(e, t, n) {
        var i, o;
        (i = this),
          (o = function() {
            return (function(n) {
              var i = {};
              function o(e) {
                if (i[e]) return i[e].exports;
                var t = (i[e] = { exports: {}, id: e, loaded: !1 });
                return n[e].call(t.exports, t, t.exports, o), (t.loaded = !0), t.exports;
              }
              return (o.m = n), (o.c = i), (o.p = ""), o(0);
            })([
              function(e, t) {
                "use strict";
                e.exports = (function() {
                  if ("undefined" == typeof document || "undefined" == typeof window)
                    return {
                      ask: function() {
                        return "initial";
                      },
                      element: function() {
                        return null;
                      },
                      ignoreKeys: function() {},
                      specificKeys: function() {},
                      registerOnChange: function() {},
                      unRegisterOnChange: function() {}
                    };
                  var t = document.documentElement,
                    n = null,
                    a = "initial",
                    s = a;
                  try {
                    window.sessionStorage.getItem("what-input") && (a = window.sessionStorage.getItem("what-input")),
                      window.sessionStorage.getItem("what-intent") &&
                        (s = window.sessionStorage.getItem("what-intent"));
                  } catch (e) {}
                  var i = null,
                    d = ["input", "select", "textarea"],
                    o = [],
                    c = [16, 17, 18, 91, 93],
                    w = [],
                    f = {
                      keydown: "keyboard",
                      keyup: "keyboard",
                      mousedown: "mouse",
                      mousemove: "mouse",
                      MSPointerDown: "pointer",
                      MSPointerMove: "pointer",
                      pointerdown: "pointer",
                      pointermove: "pointer",
                      touchstart: "touch"
                    },
                    p = !1,
                    r = !1,
                    u = { x: null, y: null },
                    l = { 2: "touch", 3: "touch", 4: "mouse" },
                    m = !1;
                  try {
                    var e = Object.defineProperty({}, "passive", {
                      get: function() {
                        m = !0;
                      }
                    });
                    window.addEventListener("test", null, e);
                  } catch (e) {}
                  var v = function() {
                      var e = !!m && { passive: !0 };
                      window.PointerEvent
                        ? (window.addEventListener("pointerdown", h), window.addEventListener("pointermove", y))
                        : window.MSPointerEvent
                          ? (window.addEventListener("MSPointerDown", h), window.addEventListener("MSPointerMove", y))
                          : (window.addEventListener("mousedown", h),
                            window.addEventListener("mousemove", y),
                            "ontouchstart" in window &&
                              (window.addEventListener("touchstart", L, e), window.addEventListener("touchend", h))),
                        window.addEventListener(b(), y, e),
                        window.addEventListener("keydown", L),
                        window.addEventListener("keyup", L),
                        window.addEventListener("focusin", E),
                        window.addEventListener("focusout", x);
                    },
                    h = function(e) {
                      if (!p) {
                        var t = e.which,
                          n = f[e.type];
                        "pointer" === n && (n = O(e));
                        var i = !w.length && -1 === c.indexOf(t),
                          o = w.length && -1 !== w.indexOf(t),
                          r = ("keyboard" === n && t && (i || o)) || "mouse" === n || "touch" === n;
                        if (a !== n && r) {
                          a = n;
                          try {
                            window.sessionStorage.setItem("what-input", a);
                          } catch (e) {}
                          g("input");
                        }
                        if (s !== n && r) {
                          var u = document.activeElement;
                          if (u && u.nodeName && -1 === d.indexOf(u.nodeName.toLowerCase())) {
                            s = n;
                            try {
                              window.sessionStorage.setItem("what-intent", s);
                            } catch (e) {}
                            g("intent");
                          }
                        }
                      }
                    },
                    g = function(e) {
                      t.setAttribute("data-what" + e, "input" === e ? a : s), S(e);
                    },
                    y = function(e) {
                      if ((I(e), !p && !r)) {
                        var t = f[e.type];
                        if (("pointer" === t && (t = O(e)), s !== t)) {
                          s = t;
                          try {
                            window.sessionStorage.setItem("what-intent", s);
                          } catch (e) {}
                          g("intent");
                        }
                      }
                    },
                    E = function(e) {
                      e.target.nodeName
                        ? ((n = e.target.nodeName.toLowerCase()),
                          t.setAttribute("data-whatelement", n),
                          e.target.classList &&
                            e.target.classList.length &&
                            t.setAttribute("data-whatclasses", e.target.classList.toString().replace(" ", ",")))
                        : x();
                    },
                    x = function() {
                      (n = null), t.removeAttribute("data-whatelement"), t.removeAttribute("data-whatclasses");
                    },
                    L = function(e) {
                      h(e),
                        window.clearTimeout(i),
                        (p = !0),
                        (i = window.setTimeout(function() {
                          p = !1;
                        }, 100));
                    },
                    O = function(e) {
                      return "number" == typeof e.pointerType
                        ? l[e.pointerType]
                        : "pen" === e.pointerType
                          ? "touch"
                          : e.pointerType;
                    },
                    b = function() {
                      return "onwheel" in document.createElement("div")
                        ? "wheel"
                        : void 0 !== document.onmousewheel
                          ? "mousewheel"
                          : "DOMMouseScroll";
                    },
                    S = function(e) {
                      for (var t = 0, n = o.length; t < n; t++)
                        o[t].type === e && o[t].fn.call(void 0, "input" === e ? a : s);
                    },
                    I = function(e) {
                      u.x !== e.screenX || u.y !== e.screenY
                        ? ((r = !1), (u.x = e.screenX), (u.y = e.screenY))
                        : (r = !0);
                    };
                  return (
                    "addEventListener" in window &&
                      Array.prototype.indexOf &&
                      ((f[b()] = "mouse"), v(), g("input"), g("intent")),
                    {
                      ask: function(e) {
                        return "intent" === e ? s : a;
                      },
                      element: function() {
                        return n;
                      },
                      ignoreKeys: function(e) {
                        c = e;
                      },
                      specificKeys: function(e) {
                        w = e;
                      },
                      registerOnChange: function(e, t) {
                        o.push({ fn: e, type: t || "input" });
                      },
                      unRegisterOnChange: function(e) {
                        var t = (function(e) {
                          for (var t = 0, n = o.length; t < n; t++) if (o[t].fn === e) return t;
                        })(e);
                        (t || 0 === t) && o.splice(t, 1);
                      }
                    }
                  );
                })();
              }
            ]);
          }),
          "object" == typeof n && "object" == typeof t
            ? (t.exports = o())
            : "function" == typeof define && define.amd
              ? define("whatInput", [], o)
              : "object" == typeof n
                ? (n.whatInput = o())
                : (i.whatInput = o());
      },
      {}
    ],
    2: [
      function(e, t, n) {
        var i = window.navigator.userAgent,
          o = i.indexOf("MSIE "),
          r = i.indexOf("Trident/"),
          u = i.indexOf("Edge/");
        if (0 < o)
          document.documentElement.className += " old-ie ie ie" + parseInt(i.substring(o + 5, i.indexOf(".", o)), 10);
        else if (0 < r) {
          var a = i.indexOf("rv:");
          document.documentElement.className += " ie ie" + parseInt(i.substring(a + 3, i.indexOf(".", a)), 10);
        } else 0 < u && (document.documentElement.className += " edge");
      },
      {}
    ],
    3: [
      function(e, t, n) {
        e("what-input"), e("./detect-ie");
      },
      { "./detect-ie": 2, "what-input": 1 }
    ]
  },
  {},
  [3]
);
