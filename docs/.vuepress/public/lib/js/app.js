/*! han.nl v0.1.0 */ !(function i(s, a, c) {
  function d(t, e) {
    if (!a[t]) {
      if (!s[t]) {
        var n = "function" == typeof require && require;
        if (!e && n) return n(t, !0);
        if (u) return u(t, !0);
        var o = new Error("Cannot find module '" + t + "'");
        throw ((o.code = "MODULE_NOT_FOUND"), o);
      }
      var r = (a[t] = { exports: {} });
      s[t][0].call(
        r.exports,
        function(e) {
          return d(s[t][1][e] || e);
        },
        r,
        r.exports,
        i,
        s,
        a,
        c
      );
    }
    return a[t].exports;
  }
  for (var u = "function" == typeof require && require, e = 0; e < c.length; e++) d(c[e]);
  return d;
})(
  {
    1: [
      function(e, t, n) {
        var r = e("matches-selector");
        t.exports = function(e, t, n) {
          for (var o = n ? e : e.parentNode; o && o !== document; ) {
            if (r(o, t)) return o;
            o = o.parentNode;
          }
        };
      },
      { "matches-selector": 9 }
    ],
    2: [
      function(e, t, n) {
        var r, i, s;
        function a() {
          (r = window.addEventListener ? "addEventListener" : "attachEvent"),
            (i = window.removeEventListener ? "removeEventListener" : "detachEvent"),
            (s = "addEventListener" !== r ? "on" : "");
        }
        (n.bind = function(e, t, n, o) {
          return r || a(), e[r](s + t, n, o || !1), n;
        }),
          (n.unbind = function(e, t, n, o) {
            return i || a(), e[i](s + t, n, o || !1), n;
          });
      },
      {}
    ],
    3: [
      function(e, t, n) {
        function o(t, n, o) {
          var r, i, s, a, c;
          function d() {
            var e = Date.now() - a;
            e < n && 0 <= e ? (r = setTimeout(d, n - e)) : ((r = null), o || ((c = t.apply(s, i)), (s = i = null)));
          }
          null == n && (n = 100);
          var e = function() {
            (s = this), (i = arguments), (a = Date.now());
            var e = o && !r;
            return r || (r = setTimeout(d, n)), e && ((c = t.apply(s, i)), (s = i = null)), c;
          };
          return (
            (e.clear = function() {
              r && (clearTimeout(r), (r = null));
            }),
            (e.flush = function() {
              r && ((c = t.apply(s, i)), (s = i = null), clearTimeout(r), (r = null));
            }),
            e
          );
        }
        (o.debounce = o), (t.exports = o);
      },
      {}
    ],
    4: [
      function(e, t, n) {
        var i = e("closest"),
          s = e("component-event"),
          a = ["focus", "blur"];
        (n.bind = function(n, o, e, r, t) {
          return (
            -1 !== a.indexOf(e) && (t = !0),
            s.bind(
              n,
              e,
              function(e) {
                var t = e.target || e.srcElement;
                (e.delegateTarget = i(t, o, !0, n)), e.delegateTarget && r.call(n, e);
              },
              t
            )
          );
        }),
          (n.unbind = function(e, t, n, o) {
            -1 !== a.indexOf(t) && (o = !0), s.unbind(e, t, n, o);
          });
      },
      { closest: 1, "component-event": 2 }
    ],
    5: [
      function(e, t, n) {
        var c =
            Object.create ||
            function(e) {
              var t = function() {};
              return (t.prototype = e), new t();
            },
          s =
            Object.keys ||
            function(e) {
              var t = [];
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
              return n;
            },
          i =
            Function.prototype.bind ||
            function(e) {
              var t = this;
              return function() {
                return t.apply(e, arguments);
              };
            };
        function o() {
          (this._events && Object.prototype.hasOwnProperty.call(this, "_events")) ||
            ((this._events = c(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }
        (((t.exports = o).EventEmitter = o).prototype._events = void 0), (o.prototype._maxListeners = void 0);
        var r,
          a = 10;
        try {
          var d = {};
          Object.defineProperty && Object.defineProperty(d, "x", { value: 0 }), (r = 0 === d.x);
        } catch (e) {
          r = !1;
        }
        function u(e) {
          return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners;
        }
        function l(e, t, n, o) {
          var r, i, s;
          if ("function" != typeof n) throw new TypeError('"listener" argument must be a function');
          if (
            ((i = e._events)
              ? (i.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), (i = e._events)), (s = i[t]))
              : ((i = e._events = c(null)), (e._eventsCount = 0)),
            s)
          ) {
            if (
              ("function" == typeof s ? (s = i[t] = o ? [n, s] : [s, n]) : o ? s.unshift(n) : s.push(n),
              !s.warned && (r = u(e)) && 0 < r && s.length > r)
            ) {
              s.warned = !0;
              var a = new Error(
                "Possible EventEmitter memory leak detected. " +
                  s.length +
                  ' "' +
                  String(t) +
                  '" listeners added. Use emitter.setMaxListeners() to increase limit.'
              );
              (a.name = "MaxListenersExceededWarning"),
                (a.emitter = e),
                (a.type = t),
                (a.count = s.length),
                "object" == typeof console && console.warn && console.warn("%s: %s", a.name, a.message);
            }
          } else (s = i[t] = n), ++e._eventsCount;
          return e;
        }
        function f() {
          if (!this.fired)
            switch ((this.target.removeListener(this.type, this.wrapFn), (this.fired = !0), arguments.length)) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
              default:
                for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                this.listener.apply(this.target, e);
            }
        }
        function p(e, t, n) {
          var o = { fired: !1, wrapFn: void 0, target: e, type: t, listener: n },
            r = i.call(f, o);
          return (r.listener = n), (o.wrapFn = r);
        }
        function v(e) {
          var t = this._events;
          if (t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (n) return n.length;
          }
          return 0;
        }
        function m(e, t) {
          for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
          return n;
        }
        r
          ? Object.defineProperty(o, "defaultMaxListeners", {
              enumerable: !0,
              get: function() {
                return a;
              },
              set: function(e) {
                if ("number" != typeof e || e < 0 || e != e)
                  throw new TypeError('"defaultMaxListeners" must be a positive number');
                a = e;
              }
            })
          : (o.defaultMaxListeners = a),
          (o.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || isNaN(e))
              throw new TypeError('"n" argument must be a positive number');
            return (this._maxListeners = e), this;
          }),
          (o.prototype.getMaxListeners = function() {
            return u(this);
          }),
          (o.prototype.emit = function(e) {
            var t,
              n,
              o,
              r,
              i,
              s,
              a = "error" === e;
            if ((s = this._events)) a = a && null == s.error;
            else if (!a) return !1;
            if (a) {
              if ((1 < arguments.length && (t = arguments[1]), t instanceof Error)) throw t;
              var c = new Error('Unhandled "error" event. (' + t + ")");
              throw ((c.context = t), c);
            }
            if (!(n = s[e])) return !1;
            var d = "function" == typeof n;
            switch ((o = arguments.length)) {
              case 1:
                !(function(e, t, n) {
                  if (t) e.call(n);
                  else for (var o = e.length, r = m(e, o), i = 0; i < o; ++i) r[i].call(n);
                })(n, d, this);
                break;
              case 2:
                !(function(e, t, n, o) {
                  if (t) e.call(n, o);
                  else for (var r = e.length, i = m(e, r), s = 0; s < r; ++s) i[s].call(n, o);
                })(n, d, this, arguments[1]);
                break;
              case 3:
                !(function(e, t, n, o, r) {
                  if (t) e.call(n, o, r);
                  else for (var i = e.length, s = m(e, i), a = 0; a < i; ++a) s[a].call(n, o, r);
                })(n, d, this, arguments[1], arguments[2]);
                break;
              case 4:
                !(function(e, t, n, o, r, i) {
                  if (t) e.call(n, o, r, i);
                  else for (var s = e.length, a = m(e, s), c = 0; c < s; ++c) a[c].call(n, o, r, i);
                })(n, d, this, arguments[1], arguments[2], arguments[3]);
                break;
              default:
                for (r = new Array(o - 1), i = 1; i < o; i++) r[i - 1] = arguments[i];
                !(function(e, t, n, o) {
                  if (t) e.apply(n, o);
                  else for (var r = e.length, i = m(e, r), s = 0; s < r; ++s) i[s].apply(n, o);
                })(n, d, this, r);
            }
            return !0;
          }),
          (o.prototype.on = o.prototype.addListener = function(e, t) {
            return l(this, e, t, !1);
          }),
          (o.prototype.prependListener = function(e, t) {
            return l(this, e, t, !0);
          }),
          (o.prototype.once = function(e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.on(e, p(this, e, t)), this;
          }),
          (o.prototype.prependOnceListener = function(e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.prependListener(e, p(this, e, t)), this;
          }),
          (o.prototype.removeListener = function(e, t) {
            var n, o, r, i, s;
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            if (!(o = this._events)) return this;
            if (!(n = o[e])) return this;
            if (n === t || n.listener === t)
              0 == --this._eventsCount
                ? (this._events = c(null))
                : (delete o[e], o.removeListener && this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
              for (r = -1, i = n.length - 1; 0 <= i; i--)
                if (n[i] === t || n[i].listener === t) {
                  (s = n[i].listener), (r = i);
                  break;
                }
              if (r < 0) return this;
              0 === r
                ? n.shift()
                : (function(e, t) {
                    for (var n = t, o = n + 1, r = e.length; o < r; n += 1, o += 1) e[n] = e[o];
                    e.pop();
                  })(n, r),
                1 === n.length && (o[e] = n[0]),
                o.removeListener && this.emit("removeListener", e, s || t);
            }
            return this;
          }),
          (o.prototype.removeAllListeners = function(e) {
            var t, n, o;
            if (!(n = this._events)) return this;
            if (!n.removeListener)
              return (
                0 === arguments.length
                  ? ((this._events = c(null)), (this._eventsCount = 0))
                  : n[e] && (0 == --this._eventsCount ? (this._events = c(null)) : delete n[e]),
                this
              );
            if (0 === arguments.length) {
              var r,
                i = s(n);
              for (o = 0; o < i.length; ++o) "removeListener" !== (r = i[o]) && this.removeAllListeners(r);
              return this.removeAllListeners("removeListener"), (this._events = c(null)), (this._eventsCount = 0), this;
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t);
            else if (t) for (o = t.length - 1; 0 <= o; o--) this.removeListener(e, t[o]);
            return this;
          }),
          (o.prototype.listeners = function(e) {
            var t,
              n = this._events;
            return n && (t = n[e])
              ? "function" == typeof t
                ? [t.listener || t]
                : (function(e) {
                    for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
                    return t;
                  })(t)
              : [];
          }),
          (o.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : v.call(e, t);
          }),
          (o.prototype.listenerCount = v),
          (o.prototype.eventNames = function() {
            return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : [];
          });
      },
      {}
    ],
    6: [
      function(e, t, n) {
        "use strict";
        var o = {
          byMatcher: function(e, t, n) {
            if ((void 0 === n && (n = {}), null === n || Array.isArray(n) || "object" != typeof n))
              throw new Error("Expected opts to be an object.");
            if (e && e !== document) return t(e) ? e : this.byMatcher(e.parentNode, t, n);
            if (n.throwOnMiss) throw new Error("Expected to find parent node, but none was found.");
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
    7: [
      function(e, t, n) {
        var b = e("tabbable"),
          g = e("xtend"),
          L = null;
        function E(e) {
          return setTimeout(e, 0);
        }
        t.exports = function(e, t) {
          var o = document,
            n = "string" == typeof e ? o.querySelector(e) : e,
            r = g({ returnFocusOnDeactivate: !0, escapeDeactivates: !0 }, t),
            i = {
              firstTabbableNode: null,
              lastTabbableNode: null,
              nodeFocusedBeforeActivation: null,
              mostRecentlyFocusedNode: null,
              active: !1,
              paused: !1
            },
            s = {
              activate: function(e) {
                if (!i.active) {
                  h(), (i.active = !0), (i.paused = !1), (i.nodeFocusedBeforeActivation = o.activeElement);
                  var t = e && e.onActivate ? e.onActivate : r.onActivate;
                  return t && t(), c(), s;
                }
              },
              deactivate: a,
              pause: function() {
                !i.paused && i.active && ((i.paused = !0), d());
              },
              unpause: function() {
                i.paused && i.active && ((i.paused = !1), c());
              }
            };
          return s;
          function a(e) {
            if (i.active) {
              d(), (i.active = !1), (i.paused = !1);
              var t = e && void 0 !== e.onDeactivate ? e.onDeactivate : r.onDeactivate;
              return (
                t && t(),
                (e && void 0 !== e.returnFocus ? e.returnFocus : r.returnFocusOnDeactivate) &&
                  E(function() {
                    y(i.nodeFocusedBeforeActivation);
                  }),
                s
              );
            }
          }
          function c() {
            if (i.active)
              return (
                L && L.pause(),
                (L = s),
                h(),
                E(function() {
                  y(l());
                }),
                o.addEventListener("focusin", p, !0),
                o.addEventListener("mousedown", f, !0),
                o.addEventListener("touchstart", f, !0),
                o.addEventListener("click", m, !0),
                o.addEventListener("keydown", v, !0),
                s
              );
          }
          function d() {
            if (i.active && L === s)
              return (
                o.removeEventListener("focusin", p, !0),
                o.removeEventListener("mousedown", f, !0),
                o.removeEventListener("touchstart", f, !0),
                o.removeEventListener("click", m, !0),
                o.removeEventListener("keydown", v, !0),
                (L = null),
                s
              );
          }
          function u(e) {
            var t = r[e],
              n = t;
            if (!t) return null;
            if ("string" == typeof t && !(n = o.querySelector(t)))
              throw new Error("`" + e + "` refers to no known node");
            if ("function" == typeof t && !(n = t())) throw new Error("`" + e + "` did not return a node");
            return n;
          }
          function l() {
            var e;
            if (
              !(e =
                null !== u("initialFocus")
                  ? u("initialFocus")
                  : n.contains(o.activeElement)
                    ? o.activeElement
                    : i.firstTabbableNode || u("fallbackFocus"))
            )
              throw new Error("You can't have a focus-trap without at least one focusable element");
            return e;
          }
          function f(e) {
            n.contains(e.target) ||
              (r.clickOutsideDeactivates ? a({ returnFocus: !b.isFocusable(e.target) }) : e.preventDefault());
          }
          function p(e) {
            n.contains(e.target) ||
              e.target instanceof Document ||
              (e.stopImmediatePropagation(), y(i.mostRecentlyFocusedNode || l()));
          }
          function v(e) {
            if (!1 !== r.escapeDeactivates && ("Escape" === (t = e).key || "Esc" === t.key || 27 === t.keyCode))
              return e.preventDefault(), void a();
            var t;
            if ("Tab" !== (n = e).key && 9 !== n.keyCode) var n;
            else
              !(function(e) {
                if ((h(), e.shiftKey && e.target === i.firstTabbableNode))
                  return e.preventDefault(), y(i.lastTabbableNode);
                e.shiftKey || e.target !== i.lastTabbableNode || (e.preventDefault(), y(i.firstTabbableNode));
              })(e);
          }
          function m(e) {
            r.clickOutsideDeactivates || n.contains(e.target) || (e.preventDefault(), e.stopImmediatePropagation());
          }
          function h() {
            var e = b(n);
            (i.firstTabbableNode = e[0] || l()), (i.lastTabbableNode = e[e.length - 1] || l());
          }
          function y(e) {
            var t;
            e !== o.activeElement &&
              (e && e.focus
                ? (e.focus(),
                  (i.mostRecentlyFocusedNode = e),
                  (t = e).tagName && "input" === t.tagName.toLowerCase() && "function" == typeof t.select && e.select())
                : y(l()));
          }
        };
      },
      { tabbable: 12, xtend: 13 }
    ],
    8: [
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
    9: [
      function(e, t, n) {
        var o = Element.prototype,
          r =
            o.matchesSelector ||
            o.webkitMatchesSelector ||
            o.mozMatchesSelector ||
            o.msMatchesSelector ||
            o.oMatchesSelector;
        t.exports = function(e, t) {
          if (r) return r.call(e, t);
          for (var n = e.parentNode.querySelectorAll(t), o = 0; o < n.length; ++o) if (n[o] == e) return !0;
          return !1;
        };
      },
      {}
    ],
    10: [
      function(e, t, n) {
        "use strict";
        var c = Object.getOwnPropertySymbols,
          d = Object.prototype.hasOwnProperty,
          u = Object.prototype.propertyIsEnumerable;
        t.exports = (function() {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0])) return !1;
            for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(t)
                .map(function(e) {
                  return t[e];
                })
                .join("")
            )
              return !1;
            var o = {};
            return (
              "abcdefghijklmnopqrst".split("").forEach(function(e) {
                o[e] = e;
              }),
              "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, o)).join("")
            );
          } catch (e) {
            return !1;
          }
        })()
          ? Object.assign
          : function(e, t) {
              for (
                var n,
                  o,
                  r = (function(e) {
                    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(e);
                  })(e),
                  i = 1;
                i < arguments.length;
                i++
              ) {
                for (var s in (n = Object(arguments[i]))) d.call(n, s) && (r[s] = n[s]);
                if (c) {
                  o = c(n);
                  for (var a = 0; a < o.length; a++) u.call(n, o[a]) && (r[o[a]] = n[o[a]]);
                }
              }
              return r;
            };
      },
      {}
    ],
    11: [
      function(e, t, n) {
        var o, r;
        (o = this),
          (r = function(e) {
            "use strict";
            var t =
                "function" == typeof Promise
                  ? Promise
                  : function e(t) {
                      !(function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
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
              P = {
                _: [],
                add: function(e, t, n, o) {
                  P.remove(e), P._.push({ el: e, defaultStyle: t, timeoutId: n, onCancelled: o });
                },
                remove: function(e) {
                  var t = P.findIndex(e);
                  if (-1 !== t) {
                    var n = P._[t];
                    clearTimeout(n.timeoutId), n.onCancelled(), P._.splice(t, 1);
                  }
                },
                find: function(e) {
                  return P._[P.findIndex(e)];
                },
                findIndex: function(n) {
                  var o = -1;
                  return (
                    P._.some(function(e, t) {
                      if (e.el === n) return (o = t), !0;
                    }),
                    o
                  );
                }
              },
              j = "cubic-bezier( 0.19, 1, 0.22, 1 )";
            function D(e) {
              return 0 !== e.offsetHeight;
            }
            function B(e) {
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
            (e.slideDown = function(x) {
              var N = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return new t(function(e) {
                if (
                  (N.onComplete && console.warn("options.onComplete will be deprecated. use 'then' instead"),
                  -1 === P.findIndex(x))
                ) {
                  var t = D(x),
                    n = "number" == typeof N.endHeight,
                    o = N.display || "block",
                    r = N.duration || 400,
                    i = N.onComplete || function() {},
                    s = N.onCancelled || function() {},
                    a = x.getAttribute("style") || "",
                    c = window.getComputedStyle(x),
                    d = (function(e, t) {
                      var n = e.getAttribute("style") || "",
                        o = window.getComputedStyle(e);
                      (e.style.visibility = "hidden"), (e.style.display = t || "block");
                      var r = k(o.getPropertyValue("width"));
                      (e.style.position = "absolute"),
                        (e.style.width = r + "px"),
                        (e.style.height = ""),
                        (e.style.paddingTop = ""),
                        (e.style.paddingBottom = ""),
                        (e.style.borderTopWidth = ""),
                        (e.style.borderBottomWidth = "");
                      var i = k(o.getPropertyValue("padding-top")),
                        s = k(o.getPropertyValue("padding-bottom")),
                        a = k(o.getPropertyValue("border-top-width")),
                        c = k(o.getPropertyValue("border-bottom-width")),
                        d = e.scrollHeight;
                      return (
                        e.setAttribute("style", n),
                        { height: d, paddingTop: i, paddingBottom: s, borderTop: a, borderBottom: c }
                      );
                    })(x, o),
                    u = /border-box/.test(c.getPropertyValue("box-sizing")),
                    l = d.height,
                    f = d.paddingTop,
                    p = d.paddingBottom,
                    v = d.borderTop,
                    m = d.borderBottom,
                    h = r + "ms",
                    y = ["height " + h + " " + j, "padding " + h + " " + j, "border-width " + h + " " + j].join(),
                    b = t ? c.height : "0px",
                    g = t ? c.paddingTop : "0px",
                    L = t ? c.paddingBottom : "0px",
                    E = t ? c.borderTopWidth : "0px",
                    _ = t ? c.borderBottomWidth : "0px",
                    S = n ? N.endHeight + "px" : u ? l + v + m + "px" : l - f - p + "px",
                    w = f + "px",
                    O = p + "px",
                    C = v + "px",
                    A = m + "px";
                  if (b === S && g === w && L === O && E === C && _ === A) return i(), void e();
                  requestAnimationFrame(function() {
                    (x.style.height = b),
                      (x.style.paddingTop = g),
                      (x.style.paddingBottom = L),
                      (x.style.borderTopWidth = E),
                      (x.style.borderBottomWidth = _),
                      (x.style.display = o),
                      (x.style.overflow = "hidden"),
                      (x.style.visibility = "visible"),
                      (x.style.transition = y),
                      (x.style.webkitTransition = y),
                      requestAnimationFrame(function() {
                        (x.style.height = S),
                          (x.style.paddingTop = w),
                          (x.style.paddingBottom = O),
                          (x.style.borderTopWidth = C),
                          (x.style.borderBottomWidth = A);
                      });
                  });
                  var T = setTimeout(function() {
                    B(x),
                      (x.style.display = o),
                      n && ((x.style.height = N.endHeight + "px"), (x.style.overflow = "hidden")),
                      P.remove(x),
                      i(),
                      e();
                  }, r);
                  P.add(x, a, T, s);
                }
              });
            }),
              (e.slideUp = function(_) {
                var S = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                return new t(function(e) {
                  if (
                    (S.onComplete && console.warn("options.onComplete will be deprecated. use 'then' instead"),
                    -1 === P.findIndex(_))
                  ) {
                    var t = D(_),
                      n = S.display || "block",
                      o = S.duration || 400,
                      r = S.onComplete || function() {},
                      i = S.onCancelled || function() {};
                    if (!t) return r(), void e();
                    var s = _.getAttribute("style") || "",
                      a = window.getComputedStyle(_),
                      c = /border-box/.test(a.getPropertyValue("box-sizing")),
                      d = k(a.getPropertyValue("padding-top")),
                      u = k(a.getPropertyValue("padding-bottom")),
                      l = k(a.getPropertyValue("border-top-width")),
                      f = k(a.getPropertyValue("border-bottom-width")),
                      p = _.scrollHeight,
                      v = o + "ms",
                      m = ["height " + v + " " + j, "padding " + v + " " + j, "border-width " + v + " " + j].join(),
                      h = c ? p + l + f + "px" : p - d - u + "px",
                      y = d + "px",
                      b = u + "px",
                      g = l + "px",
                      L = f + "px";
                    requestAnimationFrame(function() {
                      (_.style.height = h),
                        (_.style.paddingTop = y),
                        (_.style.paddingBottom = b),
                        (_.style.borderTopWidth = g),
                        (_.style.borderBottomWidth = L),
                        (_.style.display = n),
                        (_.style.overflow = "hidden"),
                        (_.style.transition = m),
                        (_.style.webkitTransition = m),
                        requestAnimationFrame(function() {
                          (_.style.height = 0),
                            (_.style.paddingTop = 0),
                            (_.style.paddingBottom = 0),
                            (_.style.borderTopWidth = 0),
                            (_.style.borderBottomWidth = 0);
                        });
                    });
                    var E = setTimeout(function() {
                      B(_), (_.style.display = "none"), P.remove(_), r(), e();
                    }, o);
                    P.add(_, s, E, i);
                  }
                });
              }),
              (e.slideStop = function(e) {
                if (P.find(e)) {
                  var t = window.getComputedStyle(e),
                    n = t.height,
                    o = t.paddingTop,
                    r = t.paddingBottom,
                    i = t.borderTopWidth,
                    s = t.borderBottomWidth;
                  B(e),
                    (e.style.height = n),
                    (e.style.paddingTop = o),
                    (e.style.paddingBottom = r),
                    (e.style.borderTopWidth = i),
                    (e.style.borderBottomWidth = s),
                    (e.style.overflow = "hidden"),
                    P.remove(e);
                }
              }),
              (e.isVisible = D),
              Object.defineProperty(e, "__esModule", { value: !0 });
          }),
          "object" == typeof n && void 0 !== t
            ? r(n)
            : "function" == typeof define && define.amd
              ? define(["exports"], r)
              : r((o.slideAnim = {}));
      },
      {}
    ],
    12: [
      function(e, t, n) {
        var o = [
            "input",
            "select",
            "textarea",
            "a[href]",
            "button",
            "[tabindex]",
            "audio[controls]",
            "video[controls]",
            '[contenteditable]:not([contenteditable="false"])'
          ],
          d = o.join(","),
          u =
            "undefined" == typeof Element
              ? function() {}
              : Element.prototype.matches ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.webkitMatchesSelector;
        function r(e, t) {
          t = t || {};
          var n,
            o,
            r,
            i = [],
            s = [],
            a = new v(e.ownerDocument || e),
            c = e.querySelectorAll(d);
          for (
            t.includeContainer && u.call(e, d) && (c = Array.prototype.slice.apply(c)).unshift(e), n = 0;
            n < c.length;
            n++
          )
            l((o = c[n]), a) && (0 === (r = f(o)) ? i.push(o) : s.push({ documentOrder: n, tabIndex: r, node: o }));
          return s
            .sort(p)
            .map(function(e) {
              return e.node;
            })
            .concat(i);
        }
        function l(e, t) {
          return !(
            !i(e, t) ||
            (a((o = n = e)) &&
              "radio" === o.type &&
              !(function(e) {
                if (!e.name) return !0;
                var t = (function(e) {
                  for (var t = 0; t < e.length; t++) if (e[t].checked) return e[t];
                })(e.ownerDocument.querySelectorAll('input[type="radio"][name="' + e.name + '"]'));
                return !t || t === e;
              })(n)) ||
            f(e) < 0
          );
          var n, o;
        }
        function i(e, t) {
          return (
            (t = t || new v(e.ownerDocument || e)),
            !(e.disabled || (a((n = e)) && "hidden" === n.type) || t.isUntouchable(e))
          );
          var n;
        }
        (r.isTabbable = function(e, t) {
          if (!e) throw new Error("No node provided");
          return !1 !== u.call(e, d) && l(e, t);
        }),
          (r.isFocusable = function(e, t) {
            if (!e) throw new Error("No node provided");
            return !1 !== u.call(e, s) && i(e, t);
          });
        var s = o.concat("iframe").join(",");
        function f(e) {
          var t = parseInt(e.getAttribute("tabindex"), 10);
          return isNaN(t) ? ("true" === e.contentEditable ? 0 : e.tabIndex) : t;
        }
        function p(e, t) {
          return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
        }
        function a(e) {
          return "INPUT" === e.tagName;
        }
        function v(e) {
          (this.doc = e), (this.cache = []);
        }
        (v.prototype.hasDisplayNone = function(t, e) {
          if (t === this.doc.documentElement) return !1;
          var n = (function(e, t) {
            for (var n = 0, o = e.length; n < o; n++) if (t(e[n])) return e[n];
          })(this.cache, function(e) {
            return e === t;
          });
          if (n) return n[1];
          var o = !1;
          return (
            "none" === (e = e || this.doc.defaultView.getComputedStyle(t)).display
              ? (o = !0)
              : t.parentNode && (o = this.hasDisplayNone(t.parentNode)),
            this.cache.push([t, o]),
            o
          );
        }),
          (v.prototype.isUntouchable = function(e) {
            if (e === this.doc.documentElement) return !1;
            var t = this.doc.defaultView.getComputedStyle(e);
            return !!this.hasDisplayNone(e, t) || "hidden" === t.visibility;
          }),
          (t.exports = r);
      },
      {}
    ],
    13: [
      function(e, t, n) {
        t.exports = function() {
          for (var e = {}, t = 0; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n) r.call(n, o) && (e[o] = n[o]);
          }
          return e;
        };
        var r = Object.prototype.hasOwnProperty;
      },
      {}
    ],
    14: [
      function(e, t, n) {
        var o = e("delegate-events"),
          r = e("../../../constants"),
          i = e("slide-anim").slideUp,
          s = e("slide-anim").slideDown,
          a = e("find-parent");
        function c(e, t, n) {
          if (e && t) {
            var o = a.byClassName(t, "js-collapsible");
            "false" === e.getAttribute("aria-expanded")
              ? (e.setAttribute("aria-expanded", !0),
                o.classList.add(r.OPEN_CLASS),
                s(t, { duration: n || 200 }).then(function() {
                  t.setAttribute("tabIndex", "-1"), t.focus();
                }))
              : (e.setAttribute("aria-expanded", !1), o.classList.remove(r.OPEN_CLASS), i(t, { duration: n || 200 }));
          }
        }
        o.bind(document.body, ".js-collapsible__button", "click", function(e) {
          var t = e.delegateTarget,
            n = t.getAttribute("aria-controls");
          n && c(t, document.getElementById(n));
        }),
          (function() {
            for (var e = document.querySelectorAll(".js-collapsible"), t = 0, n = e.length; t < n; ++t) {
              var o = e[t];
              c(o.querySelector(".js-collapsible__button"), o.querySelector(".js-collapsible__content"), 1);
            }
          })();
      },
      { "../../../constants": 25, "delegate-events": 4, "find-parent": 6, "slide-anim": 11 }
    ],
    15: [
      function(e, t, n) {
        var o = e("delegate-events"),
          s = e("../ui/focus-trap"),
          a = e("../../constants"),
          c = null;
        function r(e) {
          if (!e || e === c) {
            var i = document.getElementById(c);
            i.addEventListener(
              "animationend",
              function e() {
                document.removeEventListener("keydown", d),
                  i.removeEventListener("animationend", e),
                  i.classList.remove(a.CLOSED_CLASS),
                  i.classList.remove(a.OPEN_CLASS),
                  i.setAttribute("hidden", !0),
                  document.body.classList.remove(a.MODAL_OPEN_CLASS),
                  document.body.classList.remove(a.MODAL_OPEN_CLASS + "--" + c),
                  s.disable();
                for (
                  var t = document.querySelectorAll(".js-modal-show[rel='" + c + "']"), n = 0, o = t.length;
                  n < o;
                  ++n
                )
                  t[n].setAttribute("aria-expanded", !0);
                var r = document.querySelectorAll(".js-modal-hide[rel='" + c + "']");
                for (n = 0, o = r.length; n < o; ++n) r[n].setAttribute("aria-expanded", !1);
              },
              !1
            ),
              i.classList.add(a.CLOSED_CLASS);
          }
        }
        function d(e) {
          e.which === a.KEY_ESCAPE && r();
        }
        o.bind(document.body, ".js-modal-open", "click", function(e) {
          var t = e.delegateTarget.getAttribute("aria-controls");
          t &&
            (function(e) {
              if (e) {
                c = e;
                var t = document.getElementById(e);
                if (t) {
                  for (
                    var n = document.querySelectorAll(".js-modal-show[rel='" + c + "']"), o = 0, r = n.length;
                    o < r;
                    ++o
                  )
                    n[o].setAttribute("aria-expanded", !0);
                  var i = document.querySelectorAll(".js-modal-hide[rel='" + c + "']");
                  for (o = 0, r = i.length; o < r; ++o) i[o].setAttribute("aria-expanded", !1);
                  document.body.classList.add(a.MODAL_OPEN_CLASS),
                    document.body.classList.add(a.MODAL_OPEN_CLASS + "--" + c),
                    t.classList.add(a.OPEN_CLASS),
                    t.removeAttribute("hidden"),
                    s.enable(t),
                    document.addEventListener("keydown", d, !1);
                }
              }
            })(t);
        }),
          o.bind(document.body, ".js-modal-close", "click", function(e) {
            var t = e.delegateTarget.getAttribute("aria-controls");
            t && r(t);
          });
      },
      { "../../constants": 25, "../ui/focus-trap": 21, "delegate-events": 4 }
    ],
    16: [
      function(e, t, n) {
        var o,
          r = e("delegate-events"),
          i = e("find-parent"),
          s = e("../../../constants");
        function a(e) {
          e !== o &&
            (c(null),
            (o = e).classList.add(s.FOCUS_CLASS),
            document.body.classList.add(s.COURSENAV_DROPDOWN_OPEN_CLASS));
        }
        function c(e) {
          e !== o &&
            o &&
            (o.classList.remove(s.FOCUS_CLASS),
            document.body.classList.remove(s.COURSENAV_DROPDOWN_OPEN_CLASS),
            (o = null));
        }
        r.bind(document.body, ".js-subnav__item", "mouseover", function(e) {
          a(i.byClassName(e.delegateTarget, "js-subnav__item"));
        }),
          r.bind(document.body, ".js-subnav__item", "mouseout", function(e) {
            c(i.byClassName(e.relatedTarget, "js-subnav__item"));
          }),
          r.bind(document.body, ".js-subnav__item a", "focusin", function(e) {
            a(i.byClassName(e.delegateTarget, "js-subnav__item"));
          }),
          r.bind(document.body, ".js-subnav__item a", "focusout", function(e) {
            c(i.byClassName(e.relatedTarget, "js-subnav__item"));
          }),
          r.bind(document.body, ".js-coursenav-dropdown-close", "focus", function() {
            c();
          });
      },
      { "../../../constants": 25, "delegate-events": 4, "find-parent": 6 }
    ],
    17: [
      function(e, t, n) {
        var o = e("../../dispatcher"),
          r = e("../../../constants"),
          i = document.querySelector(".js-nav"),
          s = document.querySelector(".js-topbar"),
          a = document.querySelector(".js-subnav"),
          c = document.querySelector(".js-nav-spacer");
        function d() {
          !(function() {
            if (i && c) {
              var e = 0;
              s && (e += s.getBoundingClientRect().height),
                a && (e += a.getBoundingClientRect().height),
                (c.style.height = e + "px");
            }
          })();
        }
        o.on(r.EVENT_RESIZE, d), setTimeout(d, 0);
      },
      { "../../../constants": 25, "../../dispatcher": 18 }
    ],
    18: [
      function(e, t, n) {
        var o = e("events").EventEmitter,
          r = e("object-assign")({}, o.prototype, {
            dispatch: function(e) {
              if (!e.type || "" === e.type.trim() || null === e.type) throw new i("Invalid event name: " + e.type);
              this.emit(e.type, e);
            }
          });
        function i(e) {
          (this.name = "EventError"), (this.message = e || "Event error"), (this.stack = new Error().stack);
        }
        r.setMaxListeners(200),
          (t.exports = r),
          ((i.prototype = Object.create(Error.prototype)).constructor = i),
          (t.exports.EventError = i);
      },
      { events: 5, "object-assign": 10 }
    ],
    19: [
      function(e, t, n) {
        (window.HAN = {}),
          e("./ui/breakpoint"),
          e("./components/nav/fixed"),
          e("./components/nav/coursenav"),
          e("./ui/scroll-direction"),
          e("./utils/grid"),
          e("./utils/video"),
          e("./components/content/collapsibles"),
          e("./components/modal"),
          e("./utils/grid");
      },
      {
        "./components/content/collapsibles": 14,
        "./components/modal": 15,
        "./components/nav/coursenav": 16,
        "./components/nav/fixed": 17,
        "./ui/breakpoint": 20,
        "./ui/scroll-direction": 22,
        "./utils/grid": 23,
        "./utils/video": 24
      }
    ],
    20: [
      function(e, t, n) {
        var o = e("../../constants"),
          r = e("../dispatcher"),
          i = e("debounce"),
          s = null;
        function a() {
          r.dispatch({ type: o.EVENT_RESIZE }), d();
        }
        function c() {
          var e = null;
          for (var t in o.BREAKPOINTS)
            window.matchMedia
              ? window.matchMedia("(min-width: " + o.BREAKPOINTS[t] + "px)").matches && (e = t)
              : document.documentElement.clientWidth >= o.BREAKPOINTS[t] && (e = t);
          return e;
        }
        function d() {
          var e = c();
          e !== s && ((s = e), r.dispatch({ type: o.EVENT_BREAKPOINT_CHANGE, breakpoint: s }));
        }
        d(), window.addEventListener("resize", i(a, 50)), a(), (t.exports.get = c);
      },
      { "../../constants": 25, "../dispatcher": 18, debounce: 3 }
    ],
    21: [
      function(e, t, n) {
        var o,
          r = e("focus-trap"),
          i = e("object-assign");
        (t.exports.enable = function(e, t, n) {
          setTimeout(function() {
            o = r(e, i({}, { initialFocus: t, escapeDeactivates: !1, clickOutsideDeactivates: !0 }, n)).activate();
          }, 0);
        }),
          (t.exports.disable = function() {
            o && (o.deactivate(), (o = null));
          });
      },
      { "focus-trap": 7, "object-assign": 10 }
    ],
    22: [
      function(e, t, n) {
        var r = e("../../constants"),
          i = document.querySelector(".js-topbar");
        document.querySelector(".main").style.height = "200vh";
        var s = document.documentElement.scrollTop;
        function o() {
          var e = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            t = !1;
          e < s && (t = !0),
            t
              ? document.body.classList.contains(r.SCROLLING_UP_CLASS) ||
                document.body.classList.add(r.SCROLLING_UP_CLASS)
              : document.body.classList.contains(r.SCROLLING_UP_CLASS) &&
                document.body.classList.remove(r.SCROLLING_UP_CLASS),
            (s = e);
          var n = !1,
            o = !1;
          i ? s <= i.getBoundingClientRect().height && (n = !0) : 0 === s && (n = !0),
            n
              ? document.body.classList.contains(r.SCROLLED_TOP_CLASS) ||
                document.body.classList.add(r.SCROLLED_TOP_CLASS)
              : document.body.classList.contains(r.SCROLLED_TOP_CLASS) &&
                document.body.classList.remove(r.SCROLLED_TOP_CLASS),
            s + window.innerHeight >= document.body.offsetHeight && (o = !0),
            o
              ? document.body.classList.contains(r.SCROLLED_BOTTOM_CLASS) ||
                document.body.classList.add(r.SCROLLED_BOTTOM_CLASS)
              : document.body.classList.contains(r.SCROLLED_BOTTOM_CLASS) &&
                document.body.classList.remove(r.SCROLLED_BOTTOM_CLASS),
            n || o
              ? document.body.classList.contains(r.SCROLLED_FREE_CLASS) &&
                document.body.classList.remove(r.SCROLLED_FREE_CLASS)
              : document.body.classList.contains(r.SCROLLED_FREE_CLASS) ||
                document.body.classList.add(r.SCROLLED_FREE_CLASS);
        }
        o(), window.addEventListener("scroll", o, { passive: !0 });
      },
      { "../../constants": 25 }
    ],
    23: [
      function(e, t, n) {
        var o = 0;
        function r() {
          if (o % 2 == 0) {
            var e = document.createElement("div");
            e.classList.add("demo-grid-overlay"),
              (e.innerHTML =
                '<div class="demo-grid"><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div></div>'),
              document.body.appendChild(e);
          } else document.body.removeChild(document.querySelector(".demo-grid-overlay"));
          ++o;
        }
        (window.HAN.grid = r),
          document.addEventListener(
            "keydown",
            function(e) {
              76 === e.which && e.ctrlKey && r();
            },
            !1
          );
      },
      {}
    ],
    24: [
      function(e, t, n) {
        var o,
          r = document.getElementsByClassName("play-pause");
        for (o = 0; o < r.length; o++)
          r[o].addEventListener("click", function() {
            var e = document.getElementById(this.dataset.target);
            1 == e.paused
              ? (e.play(), this.classList.remove("paused"), this.classList.add("playing"))
              : (e.pause(), this.classList.add("paused"), this.classList.remove("playing"));
          });
      },
      {}
    ],
    25: [
      function(e, t, n) {
        var o = e("keymirror")({ EVENT_BREAKPOINT_CHANGE: null, EVENT_RESIZE: null }),
          r = Object.assign(
            {},
            {
              OPEN_CLASS: "is-open",
              FOCUS_CLASS: "has-focus",
              CLOSED_CLASS: "is-closed",
              MODAL_OPEN_CLASS: "modal-is-open",
              SCROLLING_UP_CLASS: "is-scrolling-up",
              SCROLLED_TOP_CLASS: "is-scrolled-to-top",
              SCROLLED_BOTTOM_CLASS: "is-scrolled-to-bottom",
              SCROLLED_FREE_CLASS: "is-scrolled-free",
              COURSENAV_DROPDOWN_OPEN_CLASS: "has-coursenav-dropdown-open"
            },
            o,
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
        t.exports = r;
      },
      { keymirror: 8 }
    ]
  },
  {},
  [19]
);
