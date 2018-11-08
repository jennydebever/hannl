/*! han.nl v0.1.0 */ !(function o(s, c, a) {
  function l(e, t) {
    if (!c[e]) {
      if (!s[e]) {
        var n = "function" == typeof require && require;
        if (!t && n) return n(e, !0);
        if (u) return u(e, !0);
        var i = new Error("Cannot find module '" + e + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
      }
      var r = (c[e] = { exports: {} });
      s[e][0].call(
        r.exports,
        function(t) {
          return l(s[e][1][t] || t);
        },
        r,
        r.exports,
        o,
        s,
        c,
        a
      );
    }
    return c[e].exports;
  }
  for (var u = "function" == typeof require && require, t = 0; t < a.length; t++) l(a[t]);
  return l;
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
                  i = t.Element[n],
                  r = Object,
                  o =
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
                  a = function(t, e) {
                    if ("" === e) throw new c("SYNTAX_ERR", "An invalid or illegal string was specified");
                    if (/\s/.test(e)) throw new c("INVALID_CHARACTER_ERR", "String contains an invalid character");
                    return s.call(t, e);
                  },
                  l = function(t) {
                    for (
                      var e = o.call(t.getAttribute("class") || ""), n = e ? e.split(/\s+/) : [], i = 0, r = n.length;
                      i < r;
                      i++
                    )
                      this.push(n[i]);
                    this._updateClassName = function() {
                      t.setAttribute("class", this.toString());
                    };
                  },
                  u = (l[n] = []),
                  f = function() {
                    return new l(this);
                  };
                if (
                  ((c[n] = Error[n]),
                  (u.item = function(t) {
                    return this[t] || null;
                  }),
                  (u.contains = function(t) {
                    return -1 !== a(this, (t += ""));
                  }),
                  (u.add = function() {
                    for (
                      var t, e = arguments, n = 0, i = e.length, r = !1;
                      (t = e[n] + ""), -1 === a(this, t) && (this.push(t), (r = !0)), ++n < i;

                    );
                    r && this._updateClassName();
                  }),
                  (u.remove = function() {
                    var t,
                      e,
                      n = arguments,
                      i = 0,
                      r = n.length,
                      o = !1;
                    do {
                      for (t = n[i] + "", e = a(this, t); -1 !== e; ) this.splice(e, 1), (o = !0), (e = a(this, t));
                    } while (++i < r);
                    o && this._updateClassName();
                  }),
                  (u.toggle = function(t, e) {
                    t += "";
                    var n = this.contains(t),
                      i = n ? !0 !== e && "remove" : !1 !== e && "add";
                    return i && this[i](t), !0 === e || !1 === e ? e : !n;
                  }),
                  (u.toString = function() {
                    return this.join(" ");
                  }),
                  r.defineProperty)
                ) {
                  var h = { get: f, enumerable: !0, configurable: !0 };
                  try {
                    r.defineProperty(i, e, h);
                  } catch (t) {
                    (void 0 !== t.number && -2146823252 !== t.number) ||
                      ((h.enumerable = !1), r.defineProperty(i, e, h));
                  }
                } else r[n].__defineGetter__ && i.__defineGetter__(e, f);
              }
            })(window.self),
          (function() {
            "use strict";
            var t = document.createElement("_");
            if ((t.classList.add("c1", "c2"), !t.classList.contains("c2"))) {
              var e = function(t) {
                var i = DOMTokenList.prototype[t];
                DOMTokenList.prototype[t] = function(t) {
                  var e,
                    n = arguments.length;
                  for (e = 0; e < n; e++) (t = arguments[e]), i.call(this, t);
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
        !(function(m, g) {
          "use strict";
          if (
            "IntersectionObserver" in m &&
            "IntersectionObserverEntry" in m &&
            "intersectionRatio" in m.IntersectionObserverEntry.prototype
          )
            "isIntersecting" in m.IntersectionObserverEntry.prototype ||
              Object.defineProperty(m.IntersectionObserverEntry.prototype, "isIntersecting", {
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
                    : (n(m, "resize", this._checkForIntersections, !0),
                      n(g, "scroll", this._checkForIntersections, !0),
                      this.USE_MUTATION_OBSERVER &&
                        "MutationObserver" in m &&
                        ((this._domObserver = new MutationObserver(this._checkForIntersections)),
                        this._domObserver.observe(g, {
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
                  i(m, "resize", this._checkForIntersections, !0),
                  i(g, "scroll", this._checkForIntersections, !0),
                  this._domObserver && (this._domObserver.disconnect(), (this._domObserver = null)));
              }),
              (t.prototype._checkForIntersections = function() {
                var c = this._rootIsInDom(),
                  a = c ? this._getRootRect() : { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
                this._observationTargets.forEach(function(t) {
                  var e = t.element,
                    n = v(e),
                    i = this._rootContainsTarget(e),
                    r = t.entry,
                    o = c && i && this._computeTargetAndRootIntersection(e, a),
                    s = (t.entry = new l({
                      time: m.performance && performance.now && performance.now(),
                      target: e,
                      boundingClientRect: n,
                      rootBounds: a,
                      intersectionRect: o
                    }));
                  r
                    ? c && i
                      ? this._hasCrossedThreshold(r, s) && this._queuedEntries.push(s)
                      : r && r.isIntersecting && this._queuedEntries.push(s)
                    : this._queuedEntries.push(s);
                }, this),
                  this._queuedEntries.length && this._callback(this.takeRecords(), this);
              }),
              (t.prototype._computeTargetAndRootIntersection = function(t, e) {
                if ("none" != m.getComputedStyle(t).display) {
                  for (var n, i, r, o, s, c, a, l, u = v(t), f = w(t), h = !1; !h; ) {
                    var d = null,
                      p = 1 == f.nodeType ? m.getComputedStyle(f) : {};
                    if ("none" == p.display) return;
                    if (
                      (f == this.root || f == g
                        ? ((h = !0), (d = e))
                        : f != g.body && f != g.documentElement && "visible" != p.overflow && (d = v(f)),
                      d &&
                        ((n = d),
                        (i = u),
                        void 0,
                        (r = Math.max(n.top, i.top)),
                        (o = Math.min(n.bottom, i.bottom)),
                        (s = Math.max(n.left, i.left)),
                        (c = Math.min(n.right, i.right)),
                        (l = o - r),
                        !(u = 0 <= (a = c - s) &&
                          0 <= l && { top: r, bottom: o, left: s, right: c, width: a, height: l })))
                    )
                      break;
                    f = w(f);
                  }
                  return u;
                }
              }),
              (t.prototype._getRootRect = function() {
                var t;
                if (this.root) t = v(this.root);
                else {
                  var e = g.documentElement,
                    n = g.body;
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
                  i = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (n !== i)
                  for (var r = 0; r < this.thresholds.length; r++) {
                    var o = this.thresholds[r];
                    if (o == n || o == i || o < n != o < i) return !0;
                  }
              }),
              (t.prototype._rootIsInDom = function() {
                return !this.root || r(g, this.root);
              }),
              (t.prototype._rootContainsTarget = function(t) {
                return r(this.root || g, t);
              }),
              (t.prototype._registerInstance = function() {
                e.indexOf(this) < 0 && e.push(this);
              }),
              (t.prototype._unregisterInstance = function() {
                var t = e.indexOf(this);
                -1 != t && e.splice(t, 1);
              }),
              (m.IntersectionObserver = t),
              (m.IntersectionObserverEntry = l);
          }
          function l(t) {
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
              i = this.intersectionRect,
              r = i.width * i.height;
            this.intersectionRatio = n ? Number((r / n).toFixed(4)) : this.isIntersecting ? 1 : 0;
          }
          function t(t, e) {
            var n,
              i,
              r,
              o = e || {};
            if ("function" != typeof t) throw new Error("callback must be a function");
            if (o.root && 1 != o.root.nodeType) throw new Error("root must be an Element");
            (this._checkForIntersections = ((n = this._checkForIntersections.bind(this)),
            (i = this.THROTTLE_TIMEOUT),
            (r = null),
            function() {
              r ||
                (r = setTimeout(function() {
                  n(), (r = null);
                }, i));
            })),
              (this._callback = t),
              (this._observationTargets = []),
              (this._queuedEntries = []),
              (this._rootMarginValues = this._parseRootMargin(o.rootMargin)),
              (this.thresholds = this._initThresholds(o.threshold)),
              (this.root = o.root || null),
              (this.rootMargin = this._rootMarginValues
                .map(function(t) {
                  return t.value + t.unit;
                })
                .join(" "));
          }
          function n(t, e, n, i) {
            "function" == typeof t.addEventListener
              ? t.addEventListener(e, n, i || !1)
              : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n);
          }
          function i(t, e, n, i) {
            "function" == typeof t.removeEventListener
              ? t.removeEventListener(e, n, i || !1)
              : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n);
          }
          function v(t) {
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
          function r(t, e) {
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
      function(t, ft, e) {
        var n, i, r, o, s, c, a, l, u;
        (n = window),
          (u = navigator.userAgent),
          n.HTMLPictureElement &&
            /ecko/.test(u) &&
            u.match(/rv\:(\d+)/) &&
            RegExp.$1 < 45 &&
            addEventListener(
              "resize",
              ((r = document.createElement("source")),
              (o = function(t) {
                var e,
                  n,
                  i = t.parentNode;
                "PICTURE" === i.nodeName.toUpperCase()
                  ? ((e = r.cloneNode()),
                    i.insertBefore(e, i.firstElementChild),
                    setTimeout(function() {
                      i.removeChild(e);
                    }))
                  : (!t._pfLastSize || t.offsetWidth > t._pfLastSize) &&
                    ((t._pfLastSize = t.offsetWidth),
                    (n = t.sizes),
                    (t.sizes += ",100vw"),
                    setTimeout(function() {
                      t.sizes = n;
                    }));
              }),
              (s = function() {
                var t,
                  e = document.querySelectorAll("picture > img, img[srcset][sizes]");
                for (t = 0; t < e.length; t++) o(e[t]);
              }),
              (c = function() {
                clearTimeout(i), (i = setTimeout(s, 99));
              }),
              (a = n.matchMedia && matchMedia("(orientation: landscape)")),
              (l = function() {
                c(), a && a.addListener && a.addListener(c);
              }),
              (r.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
              /^[c|i]|d$/.test(document.readyState || "") ? l() : document.addEventListener("DOMContentLoaded", l),
              c)
            ),
          (function(t, o, l) {
            "use strict";
            var r, u, a;
            o.createElement("picture");
            var T = {},
              s = !1,
              e = function() {},
              n = o.createElement("img"),
              f = n.getAttribute,
              h = n.setAttribute,
              d = n.removeAttribute,
              c = o.documentElement,
              i = {},
              I = { algorithm: "" },
              p = "data-pfsrc",
              m = p + "set",
              g = navigator.userAgent,
              S = /rident/.test(g) || (/ecko/.test(g) && g.match(/rv\:(\d+)/) && 35 < RegExp.$1),
              x = "currentSrc",
              v = /\s+\+?\d+(e\d+)?w/,
              w = /(\([^)]+\))?\s*(.+)/,
              y = t.picturefillCFG,
              A = "font-size:100%!important;",
              b = !0,
              E = {},
              _ = {},
              L = t.devicePixelRatio,
              R = { px: 1, in: 96 },
              O = o.createElement("a"),
              M = !1,
              C = /^[ \t\n\r\u000c]+/,
              k = /^[, \t\n\r\u000c]+/,
              z = /^[^ \t\n\r\u000c]+/,
              B = /[,]+$/,
              P = /^\d+$/,
              D = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
              N = function(t, e, n, i) {
                t.addEventListener ? t.addEventListener(e, n, i || !1) : t.attachEvent && t.attachEvent("on" + e, n);
              },
              U = function(e) {
                var n = {};
                return function(t) {
                  return t in n || (n[t] = e(t)), n[t];
                };
              };
            function F(t) {
              return " " === t || "\t" === t || "\n" === t || "\f" === t || "\r" === t;
            }
            var j,
              H,
              W,
              q,
              V,
              X,
              $,
              Y,
              G,
              Q,
              K,
              J,
              Z,
              tt,
              et,
              nt,
              it,
              rt,
              ot,
              st = ((j = /^([\d\.]+)(em|vw|px)$/),
              (H = U(function(t) {
                return (
                  "return " +
                  (function() {
                    for (var t = arguments, e = 0, n = t[0]; ++e in t; ) n = n.replace(t[e], t[++e]);
                    return n;
                  })(
                    (t || "").toLowerCase(),
                    /\band\b/g,
                    "&&",
                    /,/g,
                    "||",
                    /min-([a-z-\s]+):/g,
                    "e.$1>=",
                    /max-([a-z-\s]+):/g,
                    "e.$1<=",
                    /calc([^)]+)/g,
                    "($1)",
                    /(\d+[\.]*[\d]*)([a-z]+)/g,
                    "($1 * e.$2)",
                    /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,
                    ""
                  ) +
                  ";"
                );
              })),
              function(t, e) {
                var n;
                if (!(t in E))
                  if (((E[t] = !1), e && (n = t.match(j)))) E[t] = n[1] * R[n[2]];
                  else
                    try {
                      E[t] = new Function("e", H(t))(R);
                    } catch (t) {}
                return E[t];
              }),
              ct = function(t, e) {
                return t.w ? ((t.cWidth = T.calcListLength(e || "100vw")), (t.res = t.w / t.cWidth)) : (t.res = t.d), t;
              },
              at = function(t) {
                if (s) {
                  var e,
                    n,
                    i,
                    r = t || {};
                  if (
                    (r.elements &&
                      1 === r.elements.nodeType &&
                      ("IMG" === r.elements.nodeName.toUpperCase()
                        ? (r.elements = [r.elements])
                        : ((r.context = r.elements), (r.elements = null))),
                    (i = (e = r.elements || T.qsa(r.context || o, r.reevaluate || r.reselect ? T.sel : T.selShort))
                      .length))
                  ) {
                    for (T.setupRun(r), M = !0, n = 0; n < i; n++) T.fillImg(e[n], r);
                    T.teardownRun(r);
                  }
                }
              };
            function lt(t, e) {
              return t.res - e.res;
            }
            function ut(t, e) {
              var n, i, r;
              if (t && e)
                for (r = T.parseSet(e), t = T.makeUrl(t), n = 0; n < r.length; n++)
                  if (t === T.makeUrl(r[n].url)) {
                    i = r[n];
                    break;
                  }
              return i;
            }
            t.console && console.warn,
              x in n || (x = "src"),
              (i["image/jpeg"] = !0),
              (i["image/gif"] = !0),
              (i["image/png"] = !0),
              (i["image/svg+xml"] = o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")),
              (T.ns = ("pf" + new Date().getTime()).substr(0, 9)),
              (T.supSrcset = "srcset" in n),
              (T.supSizes = "sizes" in n),
              (T.supPicture = !!t.HTMLPictureElement),
              T.supSrcset &&
                T.supPicture &&
                !T.supSizes &&
                ((W = o.createElement("img")),
                (n.srcset = "data:,a"),
                (W.src = "data:,a"),
                (T.supSrcset = n.complete === W.complete),
                (T.supPicture = T.supSrcset && T.supPicture)),
              T.supSrcset && !T.supSizes
                ? ((q = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                  (V = o.createElement("img")),
                  (X = function() {
                    2 === V.width && (T.supSizes = !0), (u = T.supSrcset && !T.supSizes), (s = !0), setTimeout(at);
                  }),
                  (V.onload = X),
                  (V.onerror = X),
                  V.setAttribute("sizes", "9px"),
                  (V.srcset =
                    q + " 1w,data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw== 9w"),
                  (V.src = q))
                : (s = !0),
              (T.selShort = "picture>img,img[srcset]"),
              (T.sel = T.selShort),
              (T.cfg = I),
              (T.DPR = L || 1),
              (T.u = R),
              (T.types = i),
              (T.setSize = e),
              (T.makeUrl = U(function(t) {
                return (O.href = t), O.href;
              })),
              (T.qsa = function(t, e) {
                return "querySelector" in t ? t.querySelectorAll(e) : [];
              }),
              (T.matchesMedia = function() {
                return (
                  t.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches
                    ? (T.matchesMedia = function(t) {
                        return !t || matchMedia(t).matches;
                      })
                    : (T.matchesMedia = T.mMQ),
                  T.matchesMedia.apply(this, arguments)
                );
              }),
              (T.mMQ = function(t) {
                return !t || st(t);
              }),
              (T.calcLength = function(t) {
                var e = st(t, !0) || !1;
                return e < 0 && (e = !1), e;
              }),
              (T.supportsType = function(t) {
                return !t || i[t];
              }),
              (T.parseSize = U(function(t) {
                var e = (t || "").match(w);
                return { media: e && e[1], length: e && e[2] };
              })),
              (T.parseSet = function(t) {
                return (
                  t.cands ||
                    (t.cands = (function(i, f) {
                      function t(t) {
                        var e,
                          n = t.exec(i.substring(s));
                        if (n) return (e = n[0]), (s += e.length), e;
                      }
                      var h,
                        d,
                        e,
                        n,
                        r,
                        o = i.length,
                        s = 0,
                        p = [];
                      function c() {
                        var t,
                          e,
                          n,
                          i,
                          r,
                          o,
                          s,
                          c,
                          a,
                          l = !1,
                          u = {};
                        for (i = 0; i < d.length; i++)
                          (o = (r = d[i])[r.length - 1]),
                            (s = r.substring(0, r.length - 1)),
                            (c = parseInt(s, 10)),
                            (a = parseFloat(s)),
                            P.test(s) && "w" === o
                              ? ((t || e) && (l = !0), 0 === c ? (l = !0) : (t = c))
                              : D.test(s) && "x" === o
                                ? ((t || e || n) && (l = !0), a < 0 ? (l = !0) : (e = a))
                                : P.test(s) && "h" === o
                                  ? ((n || e) && (l = !0), 0 === c ? (l = !0) : (n = c))
                                  : (l = !0);
                        l ||
                          ((u.url = h),
                          t && (u.w = t),
                          e && (u.d = e),
                          n && (u.h = n),
                          n || e || t || (u.d = 1),
                          1 === u.d && (f.has1x = !0),
                          (u.set = f),
                          p.push(u));
                      }
                      function a() {
                        for (t(C), e = "", n = "in descriptor"; ; ) {
                          if (((r = i.charAt(s)), "in descriptor" === n))
                            if (F(r)) e && (d.push(e), (e = ""), (n = "after descriptor"));
                            else {
                              if ("," === r) return (s += 1), e && d.push(e), void c();
                              if ("(" === r) (e += r), (n = "in parens");
                              else {
                                if ("" === r) return e && d.push(e), void c();
                                e += r;
                              }
                            }
                          else if ("in parens" === n)
                            if (")" === r) (e += r), (n = "in descriptor");
                            else {
                              if ("" === r) return d.push(e), void c();
                              e += r;
                            }
                          else if ("after descriptor" === n)
                            if (F(r));
                            else {
                              if ("" === r) return void c();
                              (n = "in descriptor"), (s -= 1);
                            }
                          s += 1;
                        }
                      }
                      for (;;) {
                        if ((t(k), o <= s)) return p;
                        (h = t(z)), (d = []), "," === h.slice(-1) ? ((h = h.replace(B, "")), c()) : a();
                      }
                    })(t.srcset, t)),
                  t.cands
                );
              }),
              (T.getEmValue = function() {
                var t;
                if (!r && (t = o.body)) {
                  var e = o.createElement("div"),
                    n = c.style.cssText,
                    i = t.style.cssText;
                  (e.style.cssText =
                    "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)"),
                    (c.style.cssText = A),
                    (t.style.cssText = A),
                    t.appendChild(e),
                    (r = e.offsetWidth),
                    t.removeChild(e),
                    (r = parseFloat(r, 10)),
                    (c.style.cssText = n),
                    (t.style.cssText = i);
                }
                return r || 16;
              }),
              (T.calcListLength = function(t) {
                if (!(t in _) || I.uT) {
                  var e = T.calcLength(
                    (function(t) {
                      var e,
                        n,
                        i,
                        r,
                        o,
                        s,
                        c,
                        a = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
                        l = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
                      for (
                        i = (n = (function(t) {
                          var e,
                            n = "",
                            i = [],
                            r = [],
                            o = 0,
                            s = 0,
                            c = !1;
                          function a() {
                            n && (i.push(n), (n = ""));
                          }
                          function l() {
                            i[0] && (r.push(i), (i = []));
                          }
                          for (;;) {
                            if ("" === (e = t.charAt(s))) return a(), l(), r;
                            if (c) {
                              if ("*" === e && "/" === t[s + 1]) {
                                (c = !1), (s += 2), a();
                                continue;
                              }
                              s += 1;
                            } else {
                              if (F(e)) {
                                if ((t.charAt(s - 1) && F(t.charAt(s - 1))) || !n) {
                                  s += 1;
                                  continue;
                                }
                                if (0 === o) {
                                  a(), (s += 1);
                                  continue;
                                }
                                e = " ";
                              } else if ("(" === e) o += 1;
                              else if (")" === e) o -= 1;
                              else {
                                if ("," === e) {
                                  a(), l(), (s += 1);
                                  continue;
                                }
                                if ("/" === e && "*" === t.charAt(s + 1)) {
                                  (c = !0), (s += 2);
                                  continue;
                                }
                              }
                              (n += e), (s += 1);
                            }
                          }
                        })(t)).length,
                          e = 0;
                        e < i;
                        e++
                      )
                        if (
                          ((o = (r = n[e])[r.length - 1]),
                          (c = o),
                          (a.test(c) && 0 <= parseFloat(c)) || l.test(c) || "0" === c || "-0" === c || "+0" === c)
                        ) {
                          if (((s = o), r.pop(), 0 === r.length)) return s;
                          if (((r = r.join(" ")), T.matchesMedia(r))) return s;
                        }
                      return "100vw";
                    })(t)
                  );
                  _[t] = e || R.width;
                }
                return _[t];
              }),
              (T.setRes = function(t) {
                var e;
                if (t) for (var n = 0, i = (e = T.parseSet(t)).length; n < i; n++) ct(e[n], t.sizes);
                return e;
              }),
              (T.setRes.res = ct),
              (T.applySetCandidate = function(t, e) {
                if (t.length) {
                  var n,
                    i,
                    r,
                    o,
                    s,
                    c,
                    a,
                    l,
                    u,
                    f,
                    h,
                    d,
                    p,
                    m,
                    g,
                    v,
                    w,
                    y,
                    A,
                    b,
                    E = e[T.ns],
                    _ = T.DPR;
                  if (
                    ((c = E.curSrc || e[x]),
                    (a =
                      E.curCan ||
                      ((f = e),
                      (h = c),
                      !(d = t[0].set) && h && (d = (d = f[T.ns].sets) && d[d.length - 1]),
                      (p = ut(h, d)) &&
                        ((h = T.makeUrl(h)), (f[T.ns].curSrc = h), (f[T.ns].curCan = p).res || ct(p, p.set.sizes)),
                      p)) &&
                      a.set === t[0].set &&
                      ((u = S && !e.complete && a.res - 0.1 > _) || ((a.cached = !0), a.res >= _ && (s = a))),
                    !s)
                  )
                    for (t.sort(lt), s = t[(o = t.length) - 1], i = 0; i < o; i++)
                      if ((n = t[i]).res >= _) {
                        s =
                          t[(r = i - 1)] &&
                          (u || c !== T.makeUrl(n.url)) &&
                          ((m = t[r].res),
                          (g = n.res),
                          (v = _),
                          (w = t[r].cached),
                          (b = A = y = void 0),
                          "saveData" === I.algorithm
                            ? 2.7 < m
                              ? (b = v + 1)
                              : ((A = (g - v) * (y = Math.pow(m - 0.6, 1.5))), w && (A += 0.1 * y), (b = m + A))
                            : (b = 1 < v ? Math.sqrt(m * g) : m),
                          v < b)
                            ? t[r]
                            : n;
                        break;
                      }
                  s &&
                    ((l = T.makeUrl(s.url)), (E.curSrc = l), (E.curCan = s), l !== c && T.setSrc(e, s), T.setSize(e));
                }
              }),
              (T.setSrc = function(t, e) {
                var n;
                (t.src = e.url),
                  "image/svg+xml" === e.set.type &&
                    ((n = t.style.width),
                    (t.style.width = t.offsetWidth + 1 + "px"),
                    t.offsetWidth + 1 && (t.style.width = n));
              }),
              (T.getSet = function(t) {
                var e,
                  n,
                  i,
                  r = !1,
                  o = t[T.ns].sets;
                for (e = 0; e < o.length && !r; e++)
                  if ((n = o[e]).srcset && T.matchesMedia(n.media) && (i = T.supportsType(n.type))) {
                    "pending" === i && (n = i), (r = n);
                    break;
                  }
                return r;
              }),
              (T.parseSets = function(t, e, n) {
                var i,
                  r,
                  o,
                  s,
                  c = e && "PICTURE" === e.nodeName.toUpperCase(),
                  a = t[T.ns];
                (a.src === l || n.src) && ((a.src = f.call(t, "src")), a.src ? h.call(t, p, a.src) : d.call(t, p)),
                  (a.srcset === l || n.srcset || !T.supSrcset || t.srcset) &&
                    ((i = f.call(t, "srcset")), (a.srcset = i), (s = !0)),
                  (a.sets = []),
                  c &&
                    ((a.pic = !0),
                    (function(t, e) {
                      var n,
                        i,
                        r,
                        o,
                        s = t.getElementsByTagName("source");
                      for (n = 0, i = s.length; n < i; n++)
                        ((r = s[n])[T.ns] = !0),
                          (o = r.getAttribute("srcset")) &&
                            e.push({
                              srcset: o,
                              media: r.getAttribute("media"),
                              type: r.getAttribute("type"),
                              sizes: r.getAttribute("sizes")
                            });
                    })(e, a.sets)),
                  a.srcset
                    ? ((r = { srcset: a.srcset, sizes: f.call(t, "sizes") }),
                      a.sets.push(r),
                      (o = (u || a.src) && v.test(a.srcset || "")) ||
                        !a.src ||
                        ut(a.src, r) ||
                        r.has1x ||
                        ((r.srcset += ", " + a.src), r.cands.push({ url: a.src, d: 1, set: r })))
                    : a.src && a.sets.push({ srcset: a.src, sizes: null }),
                  (a.curCan = null),
                  (a.curSrc = l),
                  (a.supported = !(c || (r && !T.supSrcset) || (o && !T.supSizes))),
                  s && T.supSrcset && !a.supported && (i ? (h.call(t, m, i), (t.srcset = "")) : d.call(t, m)),
                  a.supported &&
                    !a.srcset &&
                    ((!a.src && t.src) || t.src !== T.makeUrl(a.src)) &&
                    (null === a.src ? t.removeAttribute("src") : (t.src = a.src)),
                  (a.parsed = !0);
              }),
              (T.fillImg = function(t, e) {
                var n,
                  i,
                  r,
                  o,
                  s,
                  c = e.reselect || e.reevaluate;
                (t[T.ns] || (t[T.ns] = {}), (n = t[T.ns]), c || n.evaled !== a) &&
                  ((n.parsed && !e.reevaluate) || T.parseSets(t, t.parentNode, e),
                  n.supported
                    ? (n.evaled = a)
                    : ((i = t),
                      (o = T.getSet(i)),
                      (s = !1),
                      "pending" !== o && ((s = a), o && ((r = T.setRes(o)), T.applySetCandidate(r, i))),
                      (i[T.ns].evaled = s)));
              }),
              (T.setupRun = function() {
                (M && !b && L === t.devicePixelRatio) ||
                  ((b = !1),
                  (L = t.devicePixelRatio),
                  (E = {}),
                  (_ = {}),
                  (T.DPR = L || 1),
                  (R.width = Math.max(t.innerWidth || 0, c.clientWidth)),
                  (R.height = Math.max(t.innerHeight || 0, c.clientHeight)),
                  (R.vw = R.width / 100),
                  (R.vh = R.height / 100),
                  (a = [R.height, R.width, L].join("-")),
                  (R.em = T.getEmValue()),
                  (R.rem = R.em));
              }),
              T.supPicture
                ? ((at = e), (T.fillImg = e))
                : ((Z = t.attachEvent ? /d$|^c/ : /d$|^c|^i/),
                  (tt = function() {
                    var t = o.readyState || "";
                    (et = setTimeout(tt, "loading" === t ? 200 : 999)),
                      o.body && (T.fillImgs(), ($ = $ || Z.test(t)) && clearTimeout(et));
                  }),
                  (et = setTimeout(tt, o.body ? 9 : 99)),
                  (nt = c.clientHeight),
                  N(
                    t,
                    "resize",
                    ((Y = function() {
                      (b = Math.max(t.innerWidth || 0, c.clientWidth) !== R.width || c.clientHeight !== nt),
                        (nt = c.clientHeight),
                        b && T.fillImgs();
                    }),
                    (G = 99),
                    (J = function() {
                      var t = new Date() - K;
                      t < G ? (Q = setTimeout(J, G - t)) : ((Q = null), Y());
                    }),
                    function() {
                      (K = new Date()), Q || (Q = setTimeout(J, G));
                    })
                  ),
                  N(o, "readystatechange", tt)),
              (T.picturefill = at),
              (T.fillImgs = at),
              (T.teardownRun = e),
              (at._ = T),
              (t.picturefillCFG = {
                pf: T,
                push: function(t) {
                  var e = t.shift();
                  "function" == typeof T[e] ? T[e].apply(T, t) : ((I[e] = t[0]), M && T.fillImgs({ reselect: !0 }));
                }
              });
            for (; y && y.length; ) t.picturefillCFG.push(y.shift());
            (t.picturefill = at),
              "object" == typeof ft && "object" == typeof ft.exports
                ? (ft.exports = at)
                : "function" == typeof define &&
                  define.amd &&
                  define("picturefill", function() {
                    return at;
                  }),
              T.supPicture ||
                (i["image/webp"] = ((it = "image/webp"),
                (rt =
                  "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="),
                ((ot = new t.Image()).onerror = function() {
                  (i[it] = !1), at();
                }),
                (ot.onload = function() {
                  (i[it] = 1 === ot.width), at();
                }),
                (ot.src = rt),
                "pending"));
          })(window, document);
      },
      {}
    ],
    4: [
      function(t, e, n) {
        !(function() {
          "use strict";
          function t() {
            var a = window,
              l = document;
            if (!("scrollBehavior" in l.documentElement.style && !0 !== a.__forceSmoothScrollPolyfill__)) {
              var t,
                e = a.HTMLElement || a.Element,
                s = 468,
                u = {
                  scroll: a.scroll || a.scrollTo,
                  scrollBy: a.scrollBy,
                  elementScroll: e.prototype.scroll || h,
                  scrollIntoView: e.prototype.scrollIntoView
                },
                f = a.performance && a.performance.now ? a.performance.now.bind(a.performance) : Date.now,
                n = ((t = a.navigator.userAgent), new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(t) ? 1 : 0);
              (a.scroll = a.scrollTo = function() {
                void 0 !== arguments[0] &&
                  (!0 !== i(arguments[0])
                    ? c.call(
                        a,
                        l.body,
                        void 0 !== arguments[0].left ? ~~arguments[0].left : a.scrollX || a.pageXOffset,
                        void 0 !== arguments[0].top ? ~~arguments[0].top : a.scrollY || a.pageYOffset
                      )
                    : u.scroll.call(
                        a,
                        void 0 !== arguments[0].left
                          ? arguments[0].left
                          : "object" != typeof arguments[0]
                            ? arguments[0]
                            : a.scrollX || a.pageXOffset,
                        void 0 !== arguments[0].top
                          ? arguments[0].top
                          : void 0 !== arguments[1]
                            ? arguments[1]
                            : a.scrollY || a.pageYOffset
                      ));
              }),
                (a.scrollBy = function() {
                  void 0 !== arguments[0] &&
                    (i(arguments[0])
                      ? u.scrollBy.call(
                          a,
                          void 0 !== arguments[0].left
                            ? arguments[0].left
                            : "object" != typeof arguments[0]
                              ? arguments[0]
                              : 0,
                          void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
                        )
                      : c.call(
                          a,
                          l.body,
                          ~~arguments[0].left + (a.scrollX || a.pageXOffset),
                          ~~arguments[0].top + (a.scrollY || a.pageYOffset)
                        ));
                }),
                (e.prototype.scroll = e.prototype.scrollTo = function() {
                  if (void 0 !== arguments[0])
                    if (!0 !== i(arguments[0])) {
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
                    (!0 !== i(arguments[0])
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
                  if (!0 !== i(arguments[0])) {
                    var t = (function(t) {
                        for (
                          var e, n, i;
                          !1 == ((t = t.parentNode) === l.body) &&
                          !1 === ((n = r((e = t), "Y") && o(e, "Y")), (i = r(e, "X") && o(e, "X")), n || i);

                        );
                        return t;
                      })(this),
                      e = t.getBoundingClientRect(),
                      n = this.getBoundingClientRect();
                    t !== l.body
                      ? (c.call(this, t, t.scrollLeft + n.left - e.left, t.scrollTop + n.top - e.top),
                        "fixed" !== a.getComputedStyle(t).position &&
                          a.scrollBy({ left: e.left, top: e.top, behavior: "smooth" }))
                      : a.scrollBy({ left: n.left, top: n.top, behavior: "smooth" });
                  } else u.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                });
            }
            function h(t, e) {
              (this.scrollLeft = t), (this.scrollTop = e);
            }
            function i(t) {
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
            function r(t, e) {
              return "Y" === e
                ? t.clientHeight + n < t.scrollHeight
                : "X" === e
                  ? t.clientWidth + n < t.scrollWidth
                  : void 0;
            }
            function o(t, e) {
              var n = a.getComputedStyle(t, null)["overflow" + e];
              return "auto" === n || "scroll" === n;
            }
            function d(t) {
              var e,
                n,
                i,
                r,
                o = (f() - t.startTime) / s;
              (r = o = 1 < o ? 1 : o),
                (e = 0.5 * (1 - Math.cos(Math.PI * r))),
                (n = t.startX + (t.x - t.startX) * e),
                (i = t.startY + (t.y - t.startY) * e),
                t.method.call(t.scrollable, n, i),
                (n === t.x && i === t.y) || a.requestAnimationFrame(d.bind(a, t));
            }
            function c(t, e, n) {
              var i,
                r,
                o,
                s,
                c = f();
              t === l.body
                ? ((r = (i = a).scrollX || a.pageXOffset), (o = a.scrollY || a.pageYOffset), (s = u.scroll))
                : ((r = (i = t).scrollLeft), (o = t.scrollTop), (s = h)),
                d({ scrollable: i, method: s, startTime: c, startX: r, startY: o, x: e, y: n });
            }
          }
          "object" == typeof n && void 0 !== e ? (e.exports = { polyfill: t }) : t();
        })();
      },
      {}
    ],
    5: [
      function(t, e, n) {
        var i, r;
        (i = this),
          (r = function() {
            return (function(n) {
              var i = {};
              function r(t) {
                if (i[t]) return i[t].exports;
                var e = (i[t] = { exports: {}, id: t, loaded: !1 });
                return n[t].call(e.exports, e, e.exports, r), (e.loaded = !0), e.exports;
              }
              return (r.m = n), (r.c = i), (r.p = ""), r(0);
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
                    a = c;
                  try {
                    window.sessionStorage.getItem("what-input") && (c = window.sessionStorage.getItem("what-input")),
                      window.sessionStorage.getItem("what-intent") &&
                        (a = window.sessionStorage.getItem("what-intent"));
                  } catch (t) {}
                  var i = null,
                    l = ["input", "select", "textarea"],
                    r = [],
                    u = [16, 17, 18, 91, 93],
                    f = [],
                    h = {
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
                    o = !1,
                    s = { x: null, y: null },
                    p = { 2: "touch", 3: "touch", 4: "mouse" },
                    m = !1;
                  try {
                    var t = Object.defineProperty({}, "passive", {
                      get: function() {
                        m = !0;
                      }
                    });
                    window.addEventListener("test", null, t);
                  } catch (t) {}
                  var g = function() {
                      var t = !!m && { passive: !0 };
                      window.PointerEvent
                        ? (window.addEventListener("pointerdown", v), window.addEventListener("pointermove", y))
                        : window.MSPointerEvent
                          ? (window.addEventListener("MSPointerDown", v), window.addEventListener("MSPointerMove", y))
                          : (window.addEventListener("mousedown", v),
                            window.addEventListener("mousemove", y),
                            "ontouchstart" in window &&
                              (window.addEventListener("touchstart", E, t), window.addEventListener("touchend", v))),
                        window.addEventListener(T(), y, t),
                        window.addEventListener("keydown", E),
                        window.addEventListener("keyup", E),
                        window.addEventListener("focusin", A),
                        window.addEventListener("focusout", b);
                    },
                    v = function(t) {
                      if (!d) {
                        var e = t.which,
                          n = h[t.type];
                        "pointer" === n && (n = _(t));
                        var i = !f.length && -1 === u.indexOf(e),
                          r = f.length && -1 !== f.indexOf(e),
                          o = ("keyboard" === n && e && (i || r)) || "mouse" === n || "touch" === n;
                        if (c !== n && o) {
                          c = n;
                          try {
                            window.sessionStorage.setItem("what-input", c);
                          } catch (t) {}
                          w("input");
                        }
                        if (a !== n && o) {
                          var s = document.activeElement;
                          if (s && s.nodeName && -1 === l.indexOf(s.nodeName.toLowerCase())) {
                            a = n;
                            try {
                              window.sessionStorage.setItem("what-intent", a);
                            } catch (t) {}
                            w("intent");
                          }
                        }
                      }
                    },
                    w = function(t) {
                      e.setAttribute("data-what" + t, "input" === t ? c : a), I(t);
                    },
                    y = function(t) {
                      if ((S(t), !d && !o)) {
                        var e = h[t.type];
                        if (("pointer" === e && (e = _(t)), a !== e)) {
                          a = e;
                          try {
                            window.sessionStorage.setItem("what-intent", a);
                          } catch (t) {}
                          w("intent");
                        }
                      }
                    },
                    A = function(t) {
                      t.target.nodeName
                        ? ((n = t.target.nodeName.toLowerCase()),
                          e.setAttribute("data-whatelement", n),
                          t.target.classList &&
                            t.target.classList.length &&
                            e.setAttribute("data-whatclasses", t.target.classList.toString().replace(" ", ",")))
                        : b();
                    },
                    b = function() {
                      (n = null), e.removeAttribute("data-whatelement"), e.removeAttribute("data-whatclasses");
                    },
                    E = function(t) {
                      v(t),
                        window.clearTimeout(i),
                        (d = !0),
                        (i = window.setTimeout(function() {
                          d = !1;
                        }, 100));
                    },
                    _ = function(t) {
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
                    I = function(t) {
                      for (var e = 0, n = r.length; e < n; e++)
                        r[e].type === t && r[e].fn.call(void 0, "input" === t ? c : a);
                    },
                    S = function(t) {
                      s.x !== t.screenX || s.y !== t.screenY
                        ? ((o = !1), (s.x = t.screenX), (s.y = t.screenY))
                        : (o = !0);
                    };
                  return (
                    "addEventListener" in window &&
                      Array.prototype.indexOf &&
                      ((h[T()] = "mouse"), g(), w("input"), w("intent")),
                    {
                      ask: function(t) {
                        return "intent" === t ? a : c;
                      },
                      element: function() {
                        return n;
                      },
                      ignoreKeys: function(t) {
                        u = t;
                      },
                      specificKeys: function(t) {
                        f = t;
                      },
                      registerOnChange: function(t, e) {
                        r.push({ fn: t, type: e || "input" });
                      },
                      unRegisterOnChange: function(t) {
                        var e = (function(t) {
                          for (var e = 0, n = r.length; e < n; e++) if (r[e].fn === t) return e;
                        })(t);
                        (e || 0 === e) && r.splice(e, 1);
                      }
                    }
                  );
                })();
              }
            ]);
          }),
          "object" == typeof n && "object" == typeof e
            ? (e.exports = r())
            : "function" == typeof define && define.amd
              ? define("whatInput", [], r)
              : "object" == typeof n
                ? (n.whatInput = r())
                : (i.whatInput = r());
      },
      {}
    ],
    6: [
      function(t, e, n) {
        var i = window.navigator.userAgent,
          r = i.indexOf("MSIE "),
          o = i.indexOf("Trident/"),
          s = i.indexOf("Edge/");
        if (0 < r)
          document.documentElement.className += " old-ie ie ie" + parseInt(i.substring(r + 5, i.indexOf(".", r)), 10);
        else if (0 < o) {
          var c = i.indexOf("rv:");
          document.documentElement.className += " ie ie" + parseInt(i.substring(c + 3, i.indexOf(".", c)), 10);
        } else 0 < s && (document.documentElement.className += " edge");
      },
      {}
    ],
    7: [
      function(t, e, n) {
        t("classlist-polyfill"),
          t("picturefill")(),
          t("intersection-observer"),
          t("smoothscroll-polyfill").polyfill(),
          t("what-input"),
          t("./detect-ie");
      },
      {
        "./detect-ie": 6,
        "classlist-polyfill": 1,
        "intersection-observer": 2,
        picturefill: 3,
        "smoothscroll-polyfill": 4,
        "what-input": 5
      }
    ]
  },
  {},
  [7]
);
