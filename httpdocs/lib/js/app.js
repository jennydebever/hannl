/*! han.nl v0.1.0 */ !(function r(d, s, a) {
  function l(t, e) {
    if (!s[t]) {
      if (!d[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (p) return p(t, !0);
        var o = new Error("Cannot find module '" + t + "'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      var i = (s[t] = { exports: {} });
      d[t][0].call(
        i.exports,
        function(e) {
          return l(d[t][1][e] || e);
        },
        i,
        i.exports,
        r,
        d,
        s,
        a
      );
    }
    return s[t].exports;
  }
  for (
    var p = "function" == typeof require && require, e = 0;
    e < a.length;
    e++
  )
    l(a[e]);
  return l;
})(
  {
    1: [
      function(e, t, n) {
        var i = e("matches-selector");
        t.exports = function(e, t, n) {
          for (var o = n ? e : e.parentNode; o && o !== document; ) {
            if (i(o, t)) return o;
            o = o.parentNode;
          }
        };
      },
      { "matches-selector": 6 }
    ],
    2: [
      function(e, t, n) {
        var i, r, d;
        function s() {
          (i = window.addEventListener ? "addEventListener" : "attachEvent"),
            (r = window.removeEventListener
              ? "removeEventListener"
              : "detachEvent"),
            (d = "addEventListener" !== i ? "on" : "");
        }
        (n.bind = function(e, t, n, o) {
          return i || s(), e[i](d + t, n, o || !1), n;
        }),
          (n.unbind = function(e, t, n, o) {
            return r || s(), e[r](d + t, n, o || !1), n;
          });
      },
      {}
    ],
    3: [
      function(e, t, n) {
        var r = e("closest"),
          d = e("component-event"),
          s = ["focus", "blur"];
        (n.bind = function(n, o, e, i, t) {
          return (
            -1 !== s.indexOf(e) && (t = !0),
            d.bind(
              n,
              e,
              function(e) {
                var t = e.target || e.srcElement;
                (e.delegateTarget = r(t, o, !0, n)),
                  e.delegateTarget && i.call(n, e);
              },
              t
            )
          );
        }),
          (n.unbind = function(e, t, n, o) {
            -1 !== s.indexOf(t) && (o = !0), d.unbind(e, t, n, o);
          });
      },
      { closest: 1, "component-event": 2 }
    ],
    4: [
      function(e, t, n) {
        "use strict";
        var o = {
          byMatcher: function(e, t, n) {
            if (
              (void 0 === n && (n = {}),
              null === n || Array.isArray(n) || "object" != typeof n)
            )
              throw new Error("Expected opts to be an object.");
            if (e && e !== document)
              return t(e) ? e : this.byMatcher(e.parentNode, t, n);
            if (n.throwOnMiss)
              throw new Error(
                "Expected to find parent node, but none was found."
              );
          },
          byClassName: function(e, t, n) {
            return this.byMatcher(
              e,
              function(e) {
                return e.classList.contains(t);
              },
              n
            );
          },
          withDataAttribute: function(e, t, n) {
            return this.byMatcher(
              e,
              function(e) {
                return e.dataset.hasOwnProperty(t);
              },
              n
            );
          }
        };
        t.exports = o;
      },
      {}
    ],
    5: [
      function(e, t, n) {
        "use strict";
        t.exports = function(e) {
          var t,
            n = {};
          if (!(e instanceof Object) || Array.isArray(e))
            throw new Error("keyMirror(...): Argument must be an object.");
          for (t in e) e.hasOwnProperty(t) && (n[t] = t);
          return n;
        };
      },
      {}
    ],
    6: [
      function(e, t, n) {
        var o = Element.prototype,
          i =
            o.matchesSelector ||
            o.webkitMatchesSelector ||
            o.mozMatchesSelector ||
            o.msMatchesSelector ||
            o.oMatchesSelector;
        t.exports = function(e, t) {
          if (i) return i.call(e, t);
          for (
            var n = e.parentNode.querySelectorAll(t), o = 0;
            o < n.length;
            ++o
          )
            if (n[o] == e) return !0;
          return !1;
        };
      },
      {}
    ],
    7: [
      function(e, t, n) {
        var o, i;
        (o = this),
          (i = function(e) {
            "use strict";
            var t =
                "function" == typeof Promise
                  ? Promise
                  : function e(t) {
                      !(function(e, t) {
                        if (!(e instanceof t))
                          throw new TypeError(
                            "Cannot call a class as a function"
                          );
                      })(this, e);
                      var n = function() {};
                      return (
                        t(function() {
                          n();
                        }),
                        {
                          then: function(e) {
                            n = e;
                          }
                        }
                      );
                    },
              W = {
                _: [],
                add: function(e, t, n, o) {
                  W.remove(e),
                    W._.push({
                      el: e,
                      defaultStyle: t,
                      timeoutId: n,
                      onCancelled: o
                    });
                },
                remove: function(e) {
                  var t = W.findIndex(e);
                  if (-1 !== t) {
                    var n = W._[t];
                    clearTimeout(n.timeoutId),
                      n.onCancelled(),
                      W._.splice(t, 1);
                  }
                },
                find: function(e) {
                  return W._[W.findIndex(e)];
                },
                findIndex: function(n) {
                  var o = -1;
                  return (
                    W._.some(function(e, t) {
                      if (e.el === n) return (o = t), !0;
                    }),
                    o
                  );
                }
              },
              j = "cubic-bezier( 0.19, 1, 0.22, 1 )";
            function N(e) {
              return 0 !== e.offsetHeight;
            }
            function O(e) {
              (e.style.visibility = ""),
                (e.style.height = ""),
                (e.style.paddingTop = ""),
                (e.style.paddingBottom = ""),
                (e.style.borderTopWidth = ""),
                (e.style.borderBottomWidth = ""),
                (e.style.overflow = ""),
                (e.style.transition = ""),
                (e.style.webkitTransition = "");
            }
            function k(e) {
              return +e.replace(/px/, "");
            }
            (e.slideDown = function(L) {
              var P =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              return new t(function(e) {
                if (
                  (P.onComplete &&
                    console.warn(
                      "options.onComplete will be deprecated. use 'then' instead"
                    ),
                  -1 === W.findIndex(L))
                ) {
                  var t = N(L),
                    n = "number" == typeof P.endHeight,
                    o = P.display || "block",
                    i = P.duration || 400,
                    r = P.onComplete || function() {},
                    d = P.onCancelled || function() {},
                    s = L.getAttribute("style") || "",
                    a = window.getComputedStyle(L),
                    l = (function(e, t) {
                      var n = e.getAttribute("style") || "",
                        o = window.getComputedStyle(e);
                      (e.style.visibility = "hidden"),
                        (e.style.display = t || "block");
                      var i = k(o.getPropertyValue("width"));
                      (e.style.position = "absolute"),
                        (e.style.width = i + "px"),
                        (e.style.height = ""),
                        (e.style.paddingTop = ""),
                        (e.style.paddingBottom = ""),
                        (e.style.borderTopWidth = ""),
                        (e.style.borderBottomWidth = "");
                      var r = k(o.getPropertyValue("padding-top")),
                        d = k(o.getPropertyValue("padding-bottom")),
                        s = k(o.getPropertyValue("border-top-width")),
                        a = k(o.getPropertyValue("border-bottom-width")),
                        l = e.scrollHeight;
                      return (
                        e.setAttribute("style", n),
                        {
                          height: l,
                          paddingTop: r,
                          paddingBottom: d,
                          borderTop: s,
                          borderBottom: a
                        }
                      );
                    })(L, o),
                    p = /border-box/.test(a.getPropertyValue("box-sizing")),
                    c = l.height,
                    u = l.paddingTop,
                    f = l.paddingBottom,
                    m = l.borderTop,
                    y = l.borderBottom,
                    v = i + "ms",
                    g = [
                      "height " + v + " " + j,
                      "padding " + v + " " + j,
                      "border-width " + v + " " + j
                    ].join(),
                    h = t ? a.height : "0px",
                    b = t ? a.paddingTop : "0px",
                    w = t ? a.paddingBottom : "0px",
                    x = t ? a.borderTopWidth : "0px",
                    _ = t ? a.borderBottomWidth : "0px",
                    T = n
                      ? P.endHeight + "px"
                      : p
                        ? c + m + y + "px"
                        : c - u - f + "px",
                    E = u + "px",
                    A = f + "px",
                    B = m + "px",
                    C = y + "px";
                  if (h === T && b === E && w === A && x === B && _ === C)
                    return r(), void e();
                  requestAnimationFrame(function() {
                    (L.style.height = h),
                      (L.style.paddingTop = b),
                      (L.style.paddingBottom = w),
                      (L.style.borderTopWidth = x),
                      (L.style.borderBottomWidth = _),
                      (L.style.display = o),
                      (L.style.overflow = "hidden"),
                      (L.style.visibility = "visible"),
                      (L.style.transition = g),
                      (L.style.webkitTransition = g),
                      requestAnimationFrame(function() {
                        (L.style.height = T),
                          (L.style.paddingTop = E),
                          (L.style.paddingBottom = A),
                          (L.style.borderTopWidth = B),
                          (L.style.borderBottomWidth = C);
                      });
                  });
                  var S = setTimeout(function() {
                    O(L),
                      (L.style.display = o),
                      n &&
                        ((L.style.height = P.endHeight + "px"),
                        (L.style.overflow = "hidden")),
                      W.remove(L),
                      r(),
                      e();
                  }, i);
                  W.add(L, s, S, d);
                }
              });
            }),
              (e.slideUp = function(_) {
                var T =
                  1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
                return new t(function(e) {
                  if (
                    (T.onComplete &&
                      console.warn(
                        "options.onComplete will be deprecated. use 'then' instead"
                      ),
                    -1 === W.findIndex(_))
                  ) {
                    var t = N(_),
                      n = T.display || "block",
                      o = T.duration || 400,
                      i = T.onComplete || function() {},
                      r = T.onCancelled || function() {};
                    if (!t) return i(), void e();
                    var d = _.getAttribute("style") || "",
                      s = window.getComputedStyle(_),
                      a = /border-box/.test(s.getPropertyValue("box-sizing")),
                      l = k(s.getPropertyValue("padding-top")),
                      p = k(s.getPropertyValue("padding-bottom")),
                      c = k(s.getPropertyValue("border-top-width")),
                      u = k(s.getPropertyValue("border-bottom-width")),
                      f = _.scrollHeight,
                      m = o + "ms",
                      y = [
                        "height " + m + " " + j,
                        "padding " + m + " " + j,
                        "border-width " + m + " " + j
                      ].join(),
                      v = a ? f + c + u + "px" : f - l - p + "px",
                      g = l + "px",
                      h = p + "px",
                      b = c + "px",
                      w = u + "px";
                    requestAnimationFrame(function() {
                      (_.style.height = v),
                        (_.style.paddingTop = g),
                        (_.style.paddingBottom = h),
                        (_.style.borderTopWidth = b),
                        (_.style.borderBottomWidth = w),
                        (_.style.display = n),
                        (_.style.overflow = "hidden"),
                        (_.style.transition = y),
                        (_.style.webkitTransition = y),
                        requestAnimationFrame(function() {
                          (_.style.height = 0),
                            (_.style.paddingTop = 0),
                            (_.style.paddingBottom = 0),
                            (_.style.borderTopWidth = 0),
                            (_.style.borderBottomWidth = 0);
                        });
                    });
                    var x = setTimeout(function() {
                      O(_), (_.style.display = "none"), W.remove(_), i(), e();
                    }, o);
                    W.add(_, d, x, r);
                  }
                });
              }),
              (e.slideStop = function(e) {
                if (W.find(e)) {
                  var t = window.getComputedStyle(e),
                    n = t.height,
                    o = t.paddingTop,
                    i = t.paddingBottom,
                    r = t.borderTopWidth,
                    d = t.borderBottomWidth;
                  O(e),
                    (e.style.height = n),
                    (e.style.paddingTop = o),
                    (e.style.paddingBottom = i),
                    (e.style.borderTopWidth = r),
                    (e.style.borderBottomWidth = d),
                    (e.style.overflow = "hidden"),
                    W.remove(e);
                }
              }),
              (e.isVisible = N),
              Object.defineProperty(e, "__esModule", { value: !0 });
          }),
          "object" == typeof n && void 0 !== t
            ? i(n)
            : "function" == typeof define && define.amd
              ? define(["exports"], i)
              : i((o.slideAnim = {}));
      },
      {}
    ],
    8: [
      function(e, t, n) {
        var o = e("delegate-events"),
          i = e("../../../constants"),
          r = e("slide-anim").slideUp,
          d = e("slide-anim").slideDown,
          s = e("find-parent");
        function a(e, t, n) {
          if (e && t) {
            var o = s.byClassName(t, "js-collapsible");
            "false" === e.getAttribute("aria-expanded")
              ? (e.setAttribute("aria-expanded", !0),
                o.classList.add(i.OPEN_CLASS),
                d(t, { duration: n || 200 }).then(function() {
                  t.setAttribute("tabIndex", "-1"), t.focus();
                }))
              : (e.setAttribute("aria-expanded", !1),
                o.classList.remove(i.OPEN_CLASS),
                r(t, { duration: n || 200 }));
          }
        }
        o.bind(document.body, ".js-collapsible__button", "click", function(e) {
          var t = e.delegateTarget,
            n = t.getAttribute("aria-controls");
          n && a(t, document.getElementById(n));
        }),
          (function() {
            for (
              var e = document.querySelectorAll(".js-collapsible"),
                t = 0,
                n = e.length;
              t < n;
              ++t
            ) {
              var o = e[t];
              a(
                o.querySelector(".js-collapsible__button"),
                o.querySelector(".js-collapsible__content"),
                1
              );
            }
          })();
      },
      {
        "../../../constants": 12,
        "delegate-events": 3,
        "find-parent": 4,
        "slide-anim": 7
      }
    ],
    9: [
      function(e, t, n) {
        (window.HAN = {}),
          console.log("app.js"),
          e("./utils/grid"),
          e("./utils/video"),
          e("./components/content/collapsibles"),
          e("./utils/grid");
      },
      {
        "./components/content/collapsibles": 8,
        "./utils/grid": 10,
        "./utils/video": 11
      }
    ],
    10: [
      function(e, t, n) {
        var o = 0;
        function i() {
          if (o % 2 == 0) {
            var e = document.createElement("div");
            e.classList.add("demo-grid-overlay"),
              (e.innerHTML =
                '<div class="demo-grid"><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div></div>'),
              document.body.appendChild(e);
          } else
            document.body.removeChild(
              document.querySelector(".demo-grid-overlay")
            );
          ++o;
        }
        (window.HAN.grid = i),
          document.addEventListener(
            "keydown",
            function(e) {
              76 === e.which && e.ctrlKey && i();
            },
            !1
          );
      },
      {}
    ],
    11: [
      function(e, t, n) {
        var o,
          i = document.getElementsByClassName("play-pause");
        for (o = 0; o < i.length; o++)
          i[o].addEventListener("click", function() {
            (video = document.getElementById(this.dataset.target)),
              1 == video.paused
                ? (video.play(),
                  this.classList.remove("paused"),
                  this.classList.add("playing"))
                : (video.pause(),
                  this.classList.add("paused"),
                  this.classList.remove("playing"));
          });
      },
      {}
    ],
    12: [
      function(e, t, n) {
        var o = e("keymirror")({}),
          i = Object.assign({}, { OPEN_CLASS: "is-open" }, o, {
            KEY_ESCAPE: 27
          });
        t.exports = i;
      },
      { keymirror: 5 }
    ]
  },
  {},
  [9]
);
