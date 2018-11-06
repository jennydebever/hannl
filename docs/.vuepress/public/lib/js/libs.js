/*! han.nl v0.1.0 */ !(function r(s, c, l) {
  function a(e, t) {
    if (!c[e]) {
      if (!s[e]) {
        var n = "function" == typeof require && require;
        if (!t && n) return n(e, !0);
        if (u) return u(e, !0);
        var o = new Error("Cannot find module '" + e + "'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      var i = (c[e] = { exports: {} });
      s[e][0].call(
        i.exports,
        function(t) {
          return a(s[e][1][t] || t);
        },
        i,
        i.exports,
        r,
        s,
        c,
        l
      );
    }
    return c[e].exports;
  }
  for (var u = "function" == typeof require && require, t = 0; t < l.length; t++) a(l[t]);
  return a;
})(
  {
    1: [
      function(t, e, n) {
        "document" in window.self &&
          (("classList" in document.createElement("_") &&
            (!document.createElementNS ||
              "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) ||
            (function(t) {
              "use strict";
              if ("Element" in t) {
                var e = "classList",
                  n = "prototype",
                  o = t.Element[n],
                  i = Object,
                  r =
                    String[n].trim ||
                    function() {
                      return this.replace(/^\s+|\s+$/g, "");
                    },
                  s =
                    Array[n].indexOf ||
                    function(t) {
                      for (var e = 0, n = this.length; e < n; e++) if (e in this && this[e] === t) return e;
                      return -1;
                    },
                  c = function(t, e) {
                    (this.name = t), (this.code = DOMException[t]), (this.message = e);
                  },
                  l = function(t, e) {
                    if ("" === e) throw new c("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(e)) throw new c("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return s.call(t, e);
                  },
                  a = function(t) {
                    for (
                      var e = r.call(t.getAttribute("class") || ""), n = e ? e.split(/\s+/) : [], o = 0, i = n.length;
                      o < i;
                      o++
                    )
                      this.push(n[o]);
                    this._updateClassName = function() {
                      t.setAttribute("class", this.toString());
                    };
                  },
                  u = (a[n] = []),
                  h = function() {
                    return new a(this);
                  };
                if (
                  ((c[n] = Error[n]),
                  (u.item = function(t) {
                    return this[t] || null;
                  }),
                  (u.contains = function(t) {
                    return -1 !== l(this, (t += ""));
                  }),
                  (u.add = function() {
                    for (
                      var t, e = arguments, n = 0, o = e.length, i = !1;
                      (t = e[n] + ""), -1 === l(this, t) && (this.push(t), (i = !0)), ++n < o;

                    );
                    i && this._updateClassName();
                  }),
                  (u.remove = function() {
                    var t,
                      e,
                      n = arguments,
                      o = 0,
                      i = n.length,
                      r = !1;
                    do {
                      for (t = n[o] + "", e = l(this, t); -1 !== e; ) this.splice(e, 1), (r = !0), (e = l(this, t));
                    } while (++o < i);
                    r && this._updateClassName();
                  }),
                  (u.toggle = function(t, e) {
                    t += "";
                    var n = this.contains(t),
                      o = n ? !0 !== e && "remove" : !1 !== e && "add";
                    return o && this[o](t), !0 === e || !1 === e ? e : !n;
                  }),
                  (u.toString = function() {
                    return this.join(" ");
                  }),
                  i.defineProperty)
                ) {
                  var f = { get: h, enumerable: !0, configurable: !0 };
                  try {
                    i.defineProperty(o, e, f);
                  } catch (t) {
                    (void 0 !== t.number && -2146823252 !== t.number) ||
                      ((f.enumerable = !1), i.defineProperty(o, e, f));
                  }
                } else i[n].__defineGetter__ && o.__defineGetter__(e, h);
              }
            })(window.self),
          (function() {
            "use strict";
            var t = document.createElement("_");
            if ((t.classList.add("c1", "c2"), !t.classList.contains("c2"))) {
              var e = function(t) {
                var o = DOMTokenList.prototype[t];
                DOMTokenList.prototype[t] = function(t) {
                  var e,
                    n = arguments.length;
                  for (e = 0; e < n; e++) (t = arguments[e]), o.call(this, t);
                };
              };
              e("add"), e("remove");
            }
            if ((t.classList.toggle("c3", !1), t.classList.contains("c3"))) {
              var n = DOMTokenList.prototype.toggle;
              DOMTokenList.prototype.toggle = function(t, e) {
                return 1 in arguments && !this.contains(t) == !e ? e : n.call(this, t);
              };
            }
            t = null;
          })());
      },
      {}
    ],
    2: [
      function(t, e, n) {
        !(function(v, m) {
          "use strict";
          if (
            "IntersectionObserver" in v &&
            "IntersectionObserverEntry" in v &&
            "intersectionRatio" in v.IntersectionObserverEntry.prototype
          )
            "isIntersecting" in v.IntersectionObserverEntry.prototype ||
              Object.defineProperty(v.IntersectionObserverEntry.prototype, "isIntersecting", {
                get: function() {
                  return 0 < this.intersectionRatio;
                }
              });
          else {
            var e = [];
            (t.prototype.THROTTLE_TIMEOUT = 100),
              (t.prototype.POLL_INTERVAL = null),
              (t.prototype.USE_MUTATION_OBSERVER = !0),
              (t.prototype.observe = function(e) {
                if (
                  !this._observationTargets.some(function(t) {
                    return t.element == e;
                  })
                ) {
                  if (!e || 1 != e.nodeType) throw new Error("target must be an Element");
                  this._registerInstance(),
                    this._observationTargets.push({ element: e, entry: null }),
                    this._monitorIntersections(),
                    this._checkForIntersections();
                }
              }),
              (t.prototype.unobserve = function(e) {
                (this._observationTargets = this._observationTargets.filter(function(t) {
                  return t.element != e;
                })),
                  this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
              }),
              (t.prototype.disconnect = function() {
                (this._observationTargets = []), this._unmonitorIntersections(), this._unregisterInstance();
              }),
              (t.prototype.takeRecords = function() {
                var t = this._queuedEntries.slice();
                return (this._queuedEntries = []), t;
              }),
              (t.prototype._initThresholds = function(t) {
                var e = t || [0];
                return (
                  Array.isArray(e) || (e = [e]),
                  e.sort().filter(function(t, e, n) {
                    if ("number" != typeof t || isNaN(t) || t < 0 || 1 < t)
                      throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return t !== n[e - 1];
                  })
                );
              }),
              (t.prototype._parseRootMargin = function(t) {
                var e = (t || "0px").split(/\s+/).map(function(t) {
                  var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                  if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                  return { value: parseFloat(e[1]), unit: e[2] };
                });
                return (e[1] = e[1] || e[0]), (e[2] = e[2] || e[0]), (e[3] = e[3] || e[1]), e;
              }),
              (t.prototype._monitorIntersections = function() {
                this._monitoringIntersections ||
                  ((this._monitoringIntersections = !0),
                  this.POLL_INTERVAL
                    ? (this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL))
                    : (n(v, "resize", this._checkForIntersections, !0),
                      n(m, "scroll", this._checkForIntersections, !0),
                      this.USE_MUTATION_OBSERVER &&
                        "MutationObserver" in v &&
                        ((this._domObserver = new MutationObserver(this._checkForIntersections)),
                        this._domObserver.observe(m, {
                          attributes: !0,
                          childList: !0,
                          characterData: !0,
                          subtree: !0
                        }))));
              }),
              (t.prototype._unmonitorIntersections = function() {
                this._monitoringIntersections &&
                  ((this._monitoringIntersections = !1),
                  clearInterval(this._monitoringInterval),
                  (this._monitoringInterval = null),
                  o(v, "resize", this._checkForIntersections, !0),
                  o(m, "scroll", this._checkForIntersections, !0),
                  this._domObserver && (this._domObserver.disconnect(), (this._domObserver = null)));
              }),
              (t.prototype._checkForIntersections = function() {
                var c = this._rootIsInDom(),
                  l = c ? this._getRootRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                this._observationTargets.forEach(function(t) {
                  var e = t.element,
                    n = g(e),
                    o = this._rootContainsTarget(e),
                    i = t.entry,
                    r = c && o && this._computeTargetAndRootIntersection(e, l),
                    s = (t.entry = new a({
                      time: v.performance && performance.now && performance.now(),
                      target: e,
                      boundingClientRect: n,
                      rootBounds: l,
                      intersectionRect: r
                    }));
                  i
                    ? c && o
                      ? this._hasCrossedThreshold(i, s) && this._queuedEntries.push(s)
                      : i && i.isIntersecting && this._queuedEntries.push(s)
                    : this._queuedEntries.push(s);
                }, this),
                  this._queuedEntries.length && this._callback(this.takeRecords(), this);
              }),
              (t.prototype._computeTargetAndRootIntersection = function(t, e) {
                if ("none" != v.getComputedStyle(t).display) {
                  for (var n, o, i, r, s, c, l, a, u = g(t), h = w(t), f = !1; !f; ) {
                    var d = null,
                      p = 1 == h.nodeType ? v.getComputedStyle(h) : {};
                    if ("none" == p.display) return;
                    if (
                      (h == this.root || h == m
                        ? ((f = !0), (d = e))
                        : h != m.body && h != m.documentElement && "visible" != p.overflow && (d = g(h)),
                      d &&
                        ((n = d),
                        (o = u),
                        void 0,
                        (i = Math.max(n.top, o.top)),
                        (r = Math.min(n.bottom, o.bottom)),
                        (s = Math.max(n.left, o.left)),
                        (c = Math.min(n.right, o.right)),
                        (a = r - i),
                        !(u = 0 <= (l = c - s) &&
                          0 <= a && { top: i, bottom: r, left: s, right: c, width: l, height: a })))
                    )
                      break;
                    h = w(h);
                  }
                  return u;
                }
              }),
              (t.prototype._getRootRect = function() {
                var t;
                if (this.root) t = g(this.root);
                else {
                  var e = m.documentElement,
                    n = m.body;
                  t = {
                    top: 0,
                    left: 0,
                    right: e.clientWidth || n.clientWidth,
                    width: e.clientWidth || n.clientWidth,
                    bottom: e.clientHeight || n.clientHeight,
                    height: e.clientHeight || n.clientHeight
                  };
                }
                return this._expandRectByRootMargin(t);
              }),
              (t.prototype._expandRectByRootMargin = function(n) {
                var t = this._rootMarginValues.map(function(t, e) {
                    return "px" == t.unit ? t.value : (t.value * (e % 2 ? n.width : n.height)) / 100;
                  }),
                  e = { top: n.top - t[0], right: n.right + t[1], bottom: n.bottom + t[2], left: n.left - t[3] };
                return (e.width = e.right - e.left), (e.height = e.bottom - e.top), e;
              }),
              (t.prototype._hasCrossedThreshold = function(t, e) {
                var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                  o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (n !== o)
                  for (var i = 0; i < this.thresholds.length; i++) {
                    var r = this.thresholds[i];
                    if (r == n || r == o || r < n != r < o) return !0;
                  }
              }),
              (t.prototype._rootIsInDom = function() {
                return !this.root || i(m, this.root);
              }),
              (t.prototype._rootContainsTarget = function(t) {
                return i(this.root || m, t);
              }),
              (t.prototype._registerInstance = function() {
                e.indexOf(this) < 0 && e.push(this);
              }),
              (t.prototype._unregisterInstance = function() {
                var t = e.indexOf(this);
                -1 != t && e.splice(t, 1);
              }),
              (v.IntersectionObserver = t),
              (v.IntersectionObserverEntry = a);
          }
          function a(t) {
            (this.time = t.time),
              (this.target = t.target),
              (this.rootBounds = t.rootBounds),
              (this.boundingClientRect = t.boundingClientRect),
              (this.intersectionRect = t.intersectionRect || {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
              }),
              (this.isIntersecting = !!t.intersectionRect);
            var e = this.boundingClientRect,
              n = e.width * e.height,
              o = this.intersectionRect,
              i = o.width * o.height;
            this.intersectionRatio = n ? Number((i / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
          }
          function t(t, e) {
            var n,
              o,
              i,
              r = e || {};
            if ("function" != typeof t) throw new Error("callback must be a function");
            if (r.root && 1 != r.root.nodeType) throw new Error("root must be an Element");
            (this._checkForIntersections = ((n = this._checkForIntersections.bind(this)),
            (o = this.THROTTLE_TIMEOUT),
            (i = null),
            function() {
              i ||
                (i = setTimeout(function() {
                  n(), (i = null);
                }, o));
            })),
              (this._callback = t),
              (this._observationTargets = []),
              (this._queuedEntries = []),
              (this._rootMarginValues = this._parseRootMargin(r.rootMargin)),
              (this.thresholds = this._initThresholds(r.threshold)),
              (this.root = r.root || null),
              (this.rootMargin = this._rootMarginValues
                .map(function(t) {
                  return t.value + t.unit;
                })
                .join(" "));
          }
          function n(t, e, n, o) {
            "function" == typeof t.addEventListener
              ? t.addEventListener(e, n, o || !1)
              : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n);
          }
          function o(t, e, n, o) {
            "function" == typeof t.removeEventListener
              ? t.removeEventListener(e, n, o || !1)
              : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n);
          }
          function g(t) {
            var e;
            try {
              e = t.getBoundingClientRect();
            } catch (t) {}
            return e
              ? ((e.width && e.height) ||
                  (e = {
                    top: e.top,
                    right: e.right,
                    bottom: e.bottom,
                    left: e.left,
                    width: e.right - e.left,
                    height: e.bottom - e.top
                  }),
                e)
              : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
          }
          function i(t, e) {
            for (var n = e; n; ) {
              if (n == t) return !0;
              n = w(n);
            }
            return !1;
          }
          function w(t) {
            var e = t.parentNode;
            return e && 11 == e.nodeType && e.host ? e.host : e;
          }
        })(window, document);
      },
      {}
    ],
    3: [
      function(t, e, n) {
        !(function() {
          "use strict";
          function t() {
            var l = window,
              a = document;
            if (!("scrollBehavior" in a.documentElement.style && !0 !== l.__forceSmoothScrollPolyfill__)) {
              var t,
                e = l.HTMLElement || l.Element,
                s = 468,
                u = {
                  scroll: l.scroll || l.scrollTo,
                  scrollBy: l.scrollBy,
                  elementScroll: e.prototype.scroll || f,
                  scrollIntoView: e.prototype.scrollIntoView
                },
                h = l.performance && l.performance.now ? l.performance.now.bind(l.performance) : Date.now,
                n = ((t = l.navigator.userAgent), new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(t) ? 1 : 0);
              (l.scroll = l.scrollTo = function() {
                void 0 !== arguments[0] &&
                  (!0 !== o(arguments[0])
                    ? c.call(
                        l,
                        a.body,
                        void 0 !== arguments[0].left ? ~~arguments[0].left : l.scrollX || l.pageXOffset,
                        void 0 !== arguments[0].top ? ~~arguments[0].top : l.scrollY || l.pageYOffset
                      )
                    : u.scroll.call(
                        l,
                        void 0 !== arguments[0].left
                          ? arguments[0].left
                          : "object" != typeof arguments[0]
                            ? arguments[0]
                            : l.scrollX || l.pageXOffset,
                        void 0 !== arguments[0].top
                          ? arguments[0].top
                          : void 0 !== arguments[1]
                            ? arguments[1]
                            : l.scrollY || l.pageYOffset
                      ));
              }),
                (l.scrollBy = function() {
                  void 0 !== arguments[0] &&
                    (o(arguments[0])
                      ? u.scrollBy.call(
                          l,
                          void 0 !== arguments[0].left
                            ? arguments[0].left
                            : "object" != typeof arguments[0]
                              ? arguments[0]
                              : 0,
                          void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
                        )
                      : c.call(
                          l,
                          a.body,
                          ~~arguments[0].left + (l.scrollX || l.pageXOffset),
                          ~~arguments[0].top + (l.scrollY || l.pageYOffset)
                        ));
                }),
                (e.prototype.scroll = e.prototype.scrollTo = function() {
                  if (void 0 !== arguments[0])
                    if (!0 !== o(arguments[0])) {
                      var t = arguments[0].left,
                        e = arguments[0].top;
                      c.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
                    } else {
                      if ("number" == typeof arguments[0] && void 0 === arguments[1])
                        throw new SyntaxError("Value could not be converted");
                      u.elementScroll.call(
                        this,
                        void 0 !== arguments[0].left
                          ? ~~arguments[0].left
                          : "object" != typeof arguments[0]
                            ? ~~arguments[0]
                            : this.scrollLeft,
                        void 0 !== arguments[0].top
                          ? ~~arguments[0].top
                          : void 0 !== arguments[1]
                            ? ~~arguments[1]
                            : this.scrollTop
                      );
                    }
                }),
                (e.prototype.scrollBy = function() {
                  void 0 !== arguments[0] &&
                    (!0 !== o(arguments[0])
                      ? this.scroll({
                          left: ~~arguments[0].left + this.scrollLeft,
                          top: ~~arguments[0].top + this.scrollTop,
                          behavior: arguments[0].behavior
                        })
                      : u.elementScroll.call(
                          this,
                          void 0 !== arguments[0].left
                            ? ~~arguments[0].left + this.scrollLeft
                            : ~~arguments[0] + this.scrollLeft,
                          void 0 !== arguments[0].top
                            ? ~~arguments[0].top + this.scrollTop
                            : ~~arguments[1] + this.scrollTop
                        ));
                }),
                (e.prototype.scrollIntoView = function() {
                  if (!0 !== o(arguments[0])) {
                    var t = (function(t) {
                        for (
                          var e, n, o;
                          !1 == ((t = t.parentNode) === a.body) &&
                          !1 === ((n = i((e = t), "Y") && r(e, "Y")), (o = i(e, "X") && r(e, "X")), n || o);

                        );
                        return t;
                      })(this),
                      e = t.getBoundingClientRect(),
                      n = this.getBoundingClientRect();
                    t !== a.body
                      ? (c.call(this, t, t.scrollLeft + n.left - e.left, t.scrollTop + n.top - e.top),
                        "fixed" !== l.getComputedStyle(t).position &&
                          l.scrollBy({ left: e.left, top: e.top, behavior: "smooth" }))
                      : l.scrollBy({ left: n.left, top: n.top, behavior: "smooth" });
                  } else u.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                });
            }
            function f(t, e) {
              (this.scrollLeft = t), (this.scrollTop = e);
            }
            function o(t) {
              if (
                null === t ||
                "object" != typeof t ||
                void 0 === t.behavior ||
                "auto" === t.behavior ||
                "instant" === t.behavior
              )
                return !0;
              if ("object" == typeof t && "smooth" === t.behavior) return !1;
              throw new TypeError(
                "behavior member of ScrollOptions " +
                  t.behavior +
                  " is not a valid value for enumeration ScrollBehavior."
              );
            }
            function i(t, e) {
              return "Y" === e
                ? t.clientHeight + n < t.scrollHeight
                : "X" === e
                  ? t.clientWidth + n < t.scrollWidth
                  : void 0;
            }
            function r(t, e) {
              var n = l.getComputedStyle(t, null)["overflow" + e];
              return "auto" === n || "scroll" === n;
            }
            function d(t) {
              var e,
                n,
                o,
                i,
                r = (h() - t.startTime) / s;
              (i = r = 1 < r ? 1 : r),
                (e = 0.5 * (1 - Math.cos(Math.PI * i))),
                (n = t.startX + (t.x - t.startX) * e),
                (o = t.startY + (t.y - t.startY) * e),
                t.method.call(t.scrollable, n, o),
                (n === t.x && o === t.y) || l.requestAnimationFrame(d.bind(l, t));
            }
            function c(t, e, n) {
              var o,
                i,
                r,
                s,
                c = h();
              t === a.body
                ? ((i = (o = l).scrollX || l.pageXOffset), (r = l.scrollY || l.pageYOffset), (s = u.scroll))
                : ((i = (o = t).scrollLeft), (r = t.scrollTop), (s = f)),
                d({ scrollable: o, method: s, startTime: c, startX: i, startY: r, x: e, y: n });
            }
          }
          "object" == typeof n && void 0 !== e ? (e.exports = { polyfill: t }) : t();
        })();
      },
      {}
    ],
    4: [
      function(t, e, n) {
        var o, i;
        (o = this),
          (i = function() {
            return (function(n) {
              var o = {};
              function i(t) {
                if (o[t]) return o[t].exports;
                var e = (o[t] = { exports: {}, id: t, loaded: !1 });
                return n[t].call(e.exports, e, e.exports, i), (e.loaded = !0), e.exports;
              }
              return (i.m = n), (i.c = o), (i.p = ""), i(0);
            })([
              function(t, e) {
                "use strict";
                t.exports = (function() {
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
                  var e = document.documentElement,
                    n = null,
                    c = "initial",
                    l = c;
                  try {
                    window.sessionStorage.getItem("what-input") && (c = window.sessionStorage.getItem("what-input")),
                      window.sessionStorage.getItem("what-intent") &&
                        (l = window.sessionStorage.getItem("what-intent"));
                  } catch (t) {}
                  var o = null,
                    a = ["input", "select", "textarea"],
                    i = [],
                    u = [16, 17, 18, 91, 93],
                    h = [],
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
                    d = !1,
                    r = !1,
                    s = { x: null, y: null },
                    p = { 2: "touch", 3: "touch", 4: "mouse" },
                    v = !1;
                  try {
                    var t = Object.defineProperty({}, "passive", {
                      get: function() {
                        v = !0;
                      }
                    });
                    window.addEventListener("test", null, t);
                  } catch (t) {}
                  var m = function() {
                      var t = !!v && { passive: !0 };
                      window.PointerEvent
                        ? (window.addEventListener("pointerdown", g), window.addEventListener("pointermove", y))
                        : window.MSPointerEvent
                          ? (window.addEventListener("MSPointerDown", g), window.addEventListener("MSPointerMove", y))
                          : (window.addEventListener("mousedown", g),
                            window.addEventListener("mousemove", y),
                            "ontouchstart" in window &&
                              (window.addEventListener("touchstart", E, t), window.addEventListener("touchend", g))),
                        window.addEventListener(T(), y, t),
                        window.addEventListener("keydown", E),
                        window.addEventListener("keyup", E),
                        window.addEventListener("focusin", b),
                        window.addEventListener("focusout", _);
                    },
                    g = function(t) {
                      if (!d) {
                        var e = t.which,
                          n = f[t.type];
                        "pointer" === n && (n = I(t));
                        var o = !h.length && -1 === u.indexOf(e),
                          i = h.length && -1 !== h.indexOf(e),
                          r = ("keyboard" === n && e && (o || i)) || "mouse" === n || "touch" === n;
                        if (c !== n && r) {
                          c = n;
                          try {
                            window.sessionStorage.setItem("what-input", c);
                          } catch (t) {}
                          w("input");
                        }
                        if (l !== n && r) {
                          var s = document.activeElement;
                          if (s && s.nodeName && -1 === a.indexOf(s.nodeName.toLowerCase())) {
                            l = n;
                            try {
                              window.sessionStorage.setItem("what-intent", l);
                            } catch (t) {}
                            w("intent");
                          }
                        }
                      }
                    },
                    w = function(t) {
                      e.setAttribute("data-what" + t, "input" === t ? c : l), O(t);
                    },
                    y = function(t) {
                      if ((L(t), !d && !r)) {
                        var e = f[t.type];
                        if (("pointer" === e && (e = I(t)), l !== e)) {
                          l = e;
                          try {
                            window.sessionStorage.setItem("what-intent", l);
                          } catch (t) {}
                          w("intent");
                        }
                      }
                    },
                    b = function(t) {
                      t.target.nodeName
                        ? ((n = t.target.nodeName.toLowerCase()),
                          e.setAttribute("data-whatelement", n),
                          t.target.classList &&
                            t.target.classList.length &&
                            e.setAttribute("data-whatclasses", t.target.classList.toString().replace(" ", ",")))
                        : _();
                    },
                    _ = function() {
                      (n = null), e.removeAttribute("data-whatelement"), e.removeAttribute("data-whatclasses");
                    },
                    E = function(t) {
                      g(t),
                        window.clearTimeout(o),
                        (d = !0),
                        (o = window.setTimeout(function() {
                          d = !1;
                        }, 100));
                    },
                    I = function(t) {
                      return "number" == typeof t.pointerType
                        ? p[t.pointerType]
                        : "pen" === t.pointerType
                          ? "touch"
                          : t.pointerType;
                    },
                    T = function() {
                      return "onwheel" in document.createElement("div")
                        ? "wheel"
                        : void 0 !== document.onmousewheel
                          ? "mousewheel"
                          : "DOMMouseScroll";
                    },
                    O = function(t) {
                      for (var e = 0, n = i.length; e < n; e++)
                        i[e].type === t && i[e].fn.call(void 0, "input" === t ? c : l);
                    },
                    L = function(t) {
                      s.x !== t.screenX || s.y !== t.screenY
                        ? ((r = !1), (s.x = t.screenX), (s.y = t.screenY))
                        : (r = !0);
                    };
                  return (
                    "addEventListener" in window &&
                      Array.prototype.indexOf &&
                      ((f[T()] = "mouse"), m(), w("input"), w("intent")),
                    {
                      ask: function(t) {
                        return "intent" === t ? l : c;
                      },
                      element: function() {
                        return n;
                      },
                      ignoreKeys: function(t) {
                        u = t;
                      },
                      specificKeys: function(t) {
                        h = t;
                      },
                      registerOnChange: function(t, e) {
                        i.push({ fn: t, type: e || "input" });
                      },
                      unRegisterOnChange: function(t) {
                        var e = (function(t) {
                          for (var e = 0, n = i.length; e < n; e++) if (i[e].fn === t) return e;
                        })(t);
                        (e || 0 === e) && i.splice(e, 1);
                      }
                    }
                  );
                })();
              }
            ]);
          }),
          "object" == typeof n && "object" == typeof e
            ? (e.exports = i())
            : "function" == typeof define && define.amd
              ? define("whatInput", [], i)
              : "object" == typeof n
                ? (n.whatInput = i())
                : (o.whatInput = i());
      },
      {}
    ],
    5: [
      function(t, e, n) {
        var o = window.navigator.userAgent,
          i = o.indexOf("MSIE "),
          r = o.indexOf("Trident/"),
          s = o.indexOf("Edge/");
        if (0 < i)
          document.documentElement.className += " old-ie ie ie" + parseInt(o.substring(i + 5, o.indexOf(".", i)), 10);
        else if (0 < r) {
          var c = o.indexOf("rv:");
          document.documentElement.className += " ie ie" + parseInt(o.substring(c + 3, o.indexOf(".", c)), 10);
        } else 0 < s && (document.documentElement.className += " edge");
      },
      {}
    ],
    6: [
      function(t, e, n) {
        t("classlist-polyfill"),
          t("intersection-observer"),
          t("smoothscroll-polyfill").polyfill(),
          t("what-input"),
          t("./detect-ie");
      },
      {
        "./detect-ie": 5,
        "classlist-polyfill": 1,
        "intersection-observer": 2,
        "smoothscroll-polyfill": 3,
        "what-input": 4
      }
    ]
  },
  {},
  [6]
);
