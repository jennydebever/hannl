/*! han.nl v0.1.0 */ !(function r(u, a, s) {
  function d(t, e) {
    if (!a[t]) {
      if (!u[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (c) return c(t, !0);
        var o = new Error("Cannot find module '" + t + "'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      var i = (a[t] = { exports: {} });
      u[t][0].call(
        i.exports,
        function(e) {
          return d(u[t][1][e] || e);
        },
        i,
        i.exports,
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
        var o, i;
        (o = this),
          (i = function() {
            return (function(n) {
              var o = {};
              function i(e) {
                if (o[e]) return o[e].exports;
                var t = (o[e] = { exports: {}, id: e, loaded: !1 });
                return n[e].call(t.exports, t, t.exports, i), (t.loaded = !0), t.exports;
              }
              return (i.m = n), (i.c = o), (i.p = ""), i(0);
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
                  var o = null,
                    d = ["input", "select", "textarea"],
                    i = [],
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
                    h = !1;
                  try {
                    var e = Object.defineProperty({}, "passive", {
                      get: function() {
                        h = !0;
                      }
                    });
                    window.addEventListener("test", null, e);
                  } catch (e) {}
                  var v = function() {
                      var e = !!h && { passive: !0 };
                      window.PointerEvent
                        ? (window.addEventListener("pointerdown", m), window.addEventListener("pointermove", g))
                        : window.MSPointerEvent
                          ? (window.addEventListener("MSPointerDown", m), window.addEventListener("MSPointerMove", g))
                          : (window.addEventListener("mousedown", m),
                            window.addEventListener("mousemove", g),
                            "ontouchstart" in window &&
                              (window.addEventListener("touchstart", x, e), window.addEventListener("touchend", m))),
                        window.addEventListener(b(), g, e),
                        window.addEventListener("keydown", x),
                        window.addEventListener("keyup", x),
                        window.addEventListener("focusin", E),
                        window.addEventListener("focusout", L);
                    },
                    m = function(e) {
                      if (!p) {
                        var t = e.which,
                          n = f[e.type];
                        "pointer" === n && (n = S(e));
                        var o = !w.length && -1 === c.indexOf(t),
                          i = w.length && -1 !== w.indexOf(t),
                          r = ("keyboard" === n && t && (o || i)) || "mouse" === n || "touch" === n;
                        if (a !== n && r) {
                          a = n;
                          try {
                            window.sessionStorage.setItem("what-input", a);
                          } catch (e) {}
                          y("input");
                        }
                        if (s !== n && r) {
                          var u = document.activeElement;
                          if (u && u.nodeName && -1 === d.indexOf(u.nodeName.toLowerCase())) {
                            s = n;
                            try {
                              window.sessionStorage.setItem("what-intent", s);
                            } catch (e) {}
                            y("intent");
                          }
                        }
                      }
                    },
                    y = function(e) {
                      t.setAttribute("data-what" + e, "input" === e ? a : s), O(e);
                    },
                    g = function(e) {
                      if ((I(e), !p && !r)) {
                        var t = f[e.type];
                        if (("pointer" === t && (t = S(e)), s !== t)) {
                          s = t;
                          try {
                            window.sessionStorage.setItem("what-intent", s);
                          } catch (e) {}
                          y("intent");
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
                        : L();
                    },
                    L = function() {
                      (n = null), t.removeAttribute("data-whatelement"), t.removeAttribute("data-whatclasses");
                    },
                    x = function(e) {
                      m(e),
                        window.clearTimeout(o),
                        (p = !0),
                        (o = window.setTimeout(function() {
                          p = !1;
                        }, 100));
                    },
                    S = function(e) {
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
                    O = function(e) {
                      for (var t = 0, n = i.length; t < n; t++)
                        i[t].type === e && i[t].fn.call(void 0, "input" === e ? a : s);
                    },
                    I = function(e) {
                      u.x !== e.screenX || u.y !== e.screenY
                        ? ((r = !1), (u.x = e.screenX), (u.y = e.screenY))
                        : (r = !0);
                    };
                  return (
                    "addEventListener" in window &&
                      Array.prototype.indexOf &&
                      ((f[b()] = "mouse"), v(), y("input"), y("intent")),
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
                        i.push({ fn: e, type: t || "input" });
                      },
                      unRegisterOnChange: function(e) {
                        var t = (function(e) {
                          for (var t = 0, n = i.length; t < n; t++) if (i[t].fn === e) return t;
                        })(e);
                        (t || 0 === t) && i.splice(t, 1);
                      }
                    }
                  );
                })();
              }
            ]);
          }),
          "object" == typeof n && "object" == typeof t
            ? (t.exports = i())
            : "function" == typeof define && define.amd
              ? define("whatInput", [], i)
              : "object" == typeof n
                ? (n.whatInput = i())
                : (o.whatInput = i());
      },
      {}
    ],
    2: [
      function(e, t, n) {
        e("what-input");
      },
      { "what-input": 1 }
    ]
  },
  {},
  [2]
);
