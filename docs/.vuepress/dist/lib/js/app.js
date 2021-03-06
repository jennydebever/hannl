/*! han.nl v0.1.0 */ (function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        var matches = require("matches-selector");

        module.exports = function(element, selector, checkYoSelf) {
          var parent = checkYoSelf ? element : element.parentNode;

          while (parent && parent !== document) {
            if (matches(parent, selector)) return parent;
            parent = parent.parentNode;
          }
        };
      },
      { "matches-selector": 9 }
    ],
    2: [
      function(require, module, exports) {
        var bind, unbind, prefix;

        function detect() {
          bind = window.addEventListener ? "addEventListener" : "attachEvent";
          unbind = window.removeEventListener ? "removeEventListener" : "detachEvent";
          prefix = bind !== "addEventListener" ? "on" : "";
        }

        /**
         * Bind `el` event `type` to `fn`.
         *
         * @param {Element} el
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @return {Function}
         * @api public
         */

        exports.bind = function(el, type, fn, capture) {
          if (!bind) detect();
          el[bind](prefix + type, fn, capture || false);
          return fn;
        };

        /**
         * Unbind `el` event `type`'s callback `fn`.
         *
         * @param {Element} el
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @return {Function}
         * @api public
         */

        exports.unbind = function(el, type, fn, capture) {
          if (!unbind) detect();
          el[unbind](prefix + type, fn, capture || false);
          return fn;
        };
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        /**
         * Returns a function, that, as long as it continues to be invoked, will not
         * be triggered. The function will be called after it stops being called for
         * N milliseconds. If `immediate` is passed, trigger the function on the
         * leading edge, instead of the trailing. The function also has a property 'clear'
         * that is a function which will clear the timer to prevent previously scheduled executions.
         *
         * @source underscore.js
         * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
         * @param {Function} function to wrap
         * @param {Number} timeout in ms (`100`)
         * @param {Boolean} whether to execute at the beginning (`false`)
         * @api public
         */
        function debounce(func, wait, immediate) {
          var timeout, args, context, timestamp, result;
          if (null == wait) wait = 100;

          function later() {
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
              timeout = setTimeout(later, wait - last);
            } else {
              timeout = null;
              if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
              }
            }
          }

          var debounced = function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
              result = func.apply(context, args);
              context = args = null;
            }

            return result;
          };

          debounced.clear = function() {
            if (timeout) {
              clearTimeout(timeout);
              timeout = null;
            }
          };

          debounced.flush = function() {
            if (timeout) {
              result = func.apply(context, args);
              context = args = null;

              clearTimeout(timeout);
              timeout = null;
            }
          };

          return debounced;
        }

        // Adds compatibility for ES modules
        debounce.debounce = debounce;

        module.exports = debounce;
      },
      {}
    ],
    4: [
      function(require, module, exports) {
        /**
         * Module dependencies.
         */

        var closest = require("closest"),
          event = require("component-event");

        /**
         * Delegate event `type` to `selector`
         * and invoke `fn(e)`. A callback function
         * is returned which may be passed to `.unbind()`.
         *
         * @param {Element} el
         * @param {String} selector
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @return {Function}
         * @api public
         */

        // Some events don't bubble, so we want to bind to the capture phase instead
        // when delegating.
        var forceCaptureEvents = ["focus", "blur"];

        exports.bind = function(el, selector, type, fn, capture) {
          if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

          return event.bind(
            el,
            type,
            function(e) {
              var target = e.target || e.srcElement;
              e.delegateTarget = closest(target, selector, true, el);
              if (e.delegateTarget) fn.call(el, e);
            },
            capture
          );
        };

        /**
         * Unbind event `type`'s callback `fn`.
         *
         * @param {Element} el
         * @param {String} type
         * @param {Function} fn
         * @param {Boolean} capture
         * @api public
         */

        exports.unbind = function(el, type, fn, capture) {
          if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

          event.unbind(el, type, fn, capture);
        };
      },
      { closest: 1, "component-event": 2 }
    ],
    5: [
      function(require, module, exports) {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var objectCreate = Object.create || objectCreatePolyfill;
        var objectKeys = Object.keys || objectKeysPolyfill;
        var bind = Function.prototype.bind || functionBindPolyfill;

        function EventEmitter() {
          if (!this._events || !Object.prototype.hasOwnProperty.call(this, "_events")) {
            this._events = objectCreate(null);
            this._eventsCount = 0;
          }

          this._maxListeners = this._maxListeners || undefined;
        }
        module.exports = EventEmitter;

        // Backwards-compat with node 0.10.x
        EventEmitter.EventEmitter = EventEmitter;

        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._maxListeners = undefined;

        // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.
        var defaultMaxListeners = 10;

        var hasDefineProperty;
        try {
          var o = {};
          if (Object.defineProperty) Object.defineProperty(o, "x", { value: 0 });
          hasDefineProperty = o.x === 0;
        } catch (err) {
          hasDefineProperty = false;
        }
        if (hasDefineProperty) {
          Object.defineProperty(EventEmitter, "defaultMaxListeners", {
            enumerable: true,
            get: function() {
              return defaultMaxListeners;
            },
            set: function(arg) {
              // check whether the input is a positive number (whose value is zero or
              // greater and not a NaN).
              if (typeof arg !== "number" || arg < 0 || arg !== arg)
                throw new TypeError('"defaultMaxListeners" must be a positive number');
              defaultMaxListeners = arg;
            }
          });
        } else {
          EventEmitter.defaultMaxListeners = defaultMaxListeners;
        }

        // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== "number" || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
          this._maxListeners = n;
          return this;
        };

        function $getMaxListeners(that) {
          if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }

        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return $getMaxListeners(this);
        };

        // These standalone emit* functions are used to optimize calling of event
        // handlers for fast cases because emit() itself often has a variable number of
        // arguments and can be deoptimized because of that. These functions always have
        // the same number of arguments and thus do not get deoptimized, so the code
        // inside them can execute faster.
        function emitNone(handler, isFn, self) {
          if (isFn) handler.call(self);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i) listeners[i].call(self);
          }
        }
        function emitOne(handler, isFn, self, arg1) {
          if (isFn) handler.call(self, arg1);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
          }
        }
        function emitTwo(handler, isFn, self, arg1, arg2) {
          if (isFn) handler.call(self, arg1, arg2);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
          }
        }
        function emitThree(handler, isFn, self, arg1, arg2, arg3) {
          if (isFn) handler.call(self, arg1, arg2, arg3);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
          }
        }

        function emitMany(handler, isFn, self, args) {
          if (isFn) handler.apply(self, args);
          else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
          }
        }

        EventEmitter.prototype.emit = function emit(type) {
          var er, handler, len, args, i, events;
          var doError = type === "error";

          events = this._events;
          if (events) doError = doError && events.error == null;
          else if (!doError) return false;

          // If there is no 'error' event listener then throw.
          if (doError) {
            if (arguments.length > 1) er = arguments[1];
            if (er instanceof Error) {
              throw er; // Unhandled 'error' event
            } else {
              // At least give some kind of context to the user
              var err = new Error('Unhandled "error" event. (' + er + ")");
              err.context = er;
              throw err;
            }
            return false;
          }

          handler = events[type];

          if (!handler) return false;

          var isFn = typeof handler === "function";
          len = arguments.length;
          switch (len) {
            // fast cases
            case 1:
              emitNone(handler, isFn, this);
              break;
            case 2:
              emitOne(handler, isFn, this, arguments[1]);
              break;
            case 3:
              emitTwo(handler, isFn, this, arguments[1], arguments[2]);
              break;
            case 4:
              emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
              break;
            // slower
            default:
              args = new Array(len - 1);
              for (i = 1; i < len; i++) args[i - 1] = arguments[i];
              emitMany(handler, isFn, this, args);
          }

          return true;
        };

        function _addListener(target, type, listener, prepend) {
          var m;
          var events;
          var existing;

          if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');

          events = target._events;
          if (!events) {
            events = target._events = objectCreate(null);
            target._eventsCount = 0;
          } else {
            // To avoid recursion in the case that type === "newListener"! Before
            // adding it to the listeners, first emit "newListener".
            if (events.newListener) {
              target.emit("newListener", type, listener.listener ? listener.listener : listener);

              // Re-assign `events` because a newListener handler could have caused the
              // this._events to be assigned to a new object
              events = target._events;
            }
            existing = events[type];
          }

          if (!existing) {
            // Optimize the case of one listener. Don't need the extra array object.
            existing = events[type] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === "function") {
              // Adding the second element, need to change to array.
              existing = events[type] = prepend ? [listener, existing] : [existing, listener];
            } else {
              // If we've already got an array, just append.
              if (prepend) {
                existing.unshift(listener);
              } else {
                existing.push(listener);
              }
            }

            // Check for listener leak
            if (!existing.warned) {
              m = $getMaxListeners(target);
              if (m && m > 0 && existing.length > m) {
                existing.warned = true;
                var w = new Error(
                  "Possible EventEmitter memory leak detected. " +
                    existing.length +
                    ' "' +
                    String(type) +
                    '" listeners ' +
                    "added. Use emitter.setMaxListeners() to " +
                    "increase limit."
                );
                w.name = "MaxListenersExceededWarning";
                w.emitter = target;
                w.type = type;
                w.count = existing.length;
                if (typeof console === "object" && console.warn) {
                  console.warn("%s: %s", w.name, w.message);
                }
              }
            }
          }

          return target;
        }

        EventEmitter.prototype.addListener = function addListener(type, listener) {
          return _addListener(this, type, listener, false);
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.prependListener = function prependListener(type, listener) {
          return _addListener(this, type, listener, true);
        };

        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            switch (arguments.length) {
              case 0:
                return this.listener.call(this.target);
              case 1:
                return this.listener.call(this.target, arguments[0]);
              case 2:
                return this.listener.call(this.target, arguments[0], arguments[1]);
              case 3:
                return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
              default:
                var args = new Array(arguments.length);
                for (var i = 0; i < args.length; ++i) args[i] = arguments[i];
                this.listener.apply(this.target, args);
            }
          }
        }

        function _onceWrap(target, type, listener) {
          var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
          var wrapped = bind.call(onceWrapper, state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }

        EventEmitter.prototype.once = function once(type, listener) {
          if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');
          this.on(type, _onceWrap(this, type, listener));
          return this;
        };

        EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
          if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');
          this.prependListener(type, _onceWrap(this, type, listener));
          return this;
        };

        // Emits a 'removeListener' event if and only if the listener was removed.
        EventEmitter.prototype.removeListener = function removeListener(type, listener) {
          var list, events, position, i, originalListener;

          if (typeof listener !== "function") throw new TypeError('"listener" argument must be a function');

          events = this._events;
          if (!events) return this;

          list = events[type];
          if (!list) return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0) this._events = objectCreate(null);
            else {
              delete events[type];
              if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
            }
          } else if (typeof list !== "function") {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0) return this;

            if (position === 0) list.shift();
            else spliceOne(list, position);

            if (list.length === 1) events[type] = list[0];

            if (events.removeListener) this.emit("removeListener", type, originalListener || listener);
          }

          return this;
        };

        EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
          var listeners, events, i;

          events = this._events;
          if (!events) return this;

          // not listening for removeListener, no need to emit
          if (!events.removeListener) {
            if (arguments.length === 0) {
              this._events = objectCreate(null);
              this._eventsCount = 0;
            } else if (events[type]) {
              if (--this._eventsCount === 0) this._events = objectCreate(null);
              else delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = objectKeys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === "removeListener") continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = objectCreate(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === "function") {
            this.removeListener(type, listeners);
          } else if (listeners) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

        EventEmitter.prototype.listeners = function listeners(type) {
          var evlistener;
          var ret;
          var events = this._events;

          if (!events) ret = [];
          else {
            evlistener = events[type];
            if (!evlistener) ret = [];
            else if (typeof evlistener === "function") ret = [evlistener.listener || evlistener];
            else ret = unwrapListeners(evlistener);
          }

          return ret;
        };

        EventEmitter.listenerCount = function(emitter, type) {
          if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type);
          } else {
            return listenerCount.call(emitter, type);
          }
        };

        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
          var events = this._events;

          if (events) {
            var evlistener = events[type];

            if (typeof evlistener === "function") {
              return 1;
            } else if (evlistener) {
              return evlistener.length;
            }
          }

          return 0;
        }

        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
        };

        // About 1.5x faster than the two-arg version of Array#splice().
        function spliceOne(list, index) {
          for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
          list.pop();
        }

        function arrayClone(arr, n) {
          var copy = new Array(n);
          for (var i = 0; i < n; ++i) copy[i] = arr[i];
          return copy;
        }

        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }

        function objectCreatePolyfill(proto) {
          var F = function() {};
          F.prototype = proto;
          return new F();
        }
        function objectKeysPolyfill(obj) {
          var keys = [];
          for (var k in obj)
            if (Object.prototype.hasOwnProperty.call(obj, k)) {
              keys.push(k);
            }
          return k;
        }
        function functionBindPolyfill(context) {
          var fn = this;
          return function() {
            return fn.apply(context, arguments);
          };
        }
      },
      {}
    ],
    6: [
      function(require, module, exports) {
        "use strict";

        var FindParent = {
          byMatcher: function(element, func, opts) {
            if (opts === undefined) {
              opts = {};
            }

            if (opts === null || Array.isArray(opts) || typeof opts !== "object") {
              throw new Error("Expected opts to be an object.");
            }

            if (!element || element === document) {
              if (opts.throwOnMiss) {
                throw new Error("Expected to find parent node, but none was found.");
              }

              return undefined;
            }

            if (func(element)) {
              return element;
            }

            return this.byMatcher(element.parentNode, func, opts);
          },

          byClassName: function(element, className, opts) {
            return this.byMatcher(
              element,
              function(el) {
                return el.classList.contains(className);
              },
              opts
            );
          },

          withDataAttribute: function(element, attName, opts) {
            return this.byMatcher(
              element,
              function(el) {
                return el.dataset.hasOwnProperty(attName);
              },
              opts
            );
          }
        };

        module.exports = FindParent;
      },
      {}
    ],
    7: [
      function(require, module, exports) {
        var tabbable = require("tabbable");
        var xtend = require("xtend");

        var listeningFocusTrap = null;

        function focusTrap(element, userOptions) {
          var doc = document;
          var container = typeof element === "string" ? doc.querySelector(element) : element;

          var config = xtend(
            {
              returnFocusOnDeactivate: true,
              escapeDeactivates: true
            },
            userOptions
          );

          var state = {
            firstTabbableNode: null,
            lastTabbableNode: null,
            nodeFocusedBeforeActivation: null,
            mostRecentlyFocusedNode: null,
            active: false,
            paused: false
          };

          var trap = {
            activate: activate,
            deactivate: deactivate,
            pause: pause,
            unpause: unpause
          };

          return trap;

          function activate(activateOptions) {
            if (state.active) return;

            updateTabbableNodes();

            state.active = true;
            state.paused = false;
            state.nodeFocusedBeforeActivation = doc.activeElement;

            var onActivate =
              activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;
            if (onActivate) {
              onActivate();
            }

            addListeners();
            return trap;
          }

          function deactivate(deactivateOptions) {
            if (!state.active) return;

            removeListeners();
            state.active = false;
            state.paused = false;

            var onDeactivate =
              deactivateOptions && deactivateOptions.onDeactivate !== undefined
                ? deactivateOptions.onDeactivate
                : config.onDeactivate;
            if (onDeactivate) {
              onDeactivate();
            }

            var returnFocus =
              deactivateOptions && deactivateOptions.returnFocus !== undefined
                ? deactivateOptions.returnFocus
                : config.returnFocusOnDeactivate;
            if (returnFocus) {
              delay(function() {
                tryFocus(state.nodeFocusedBeforeActivation);
              });
            }

            return trap;
          }

          function pause() {
            if (state.paused || !state.active) return;
            state.paused = true;
            removeListeners();
          }

          function unpause() {
            if (!state.paused || !state.active) return;
            state.paused = false;
            addListeners();
          }

          function addListeners() {
            if (!state.active) return;

            // There can be only one listening focus trap at a time
            if (listeningFocusTrap) {
              listeningFocusTrap.pause();
            }
            listeningFocusTrap = trap;

            updateTabbableNodes();

            // Delay ensures that the focused element doesn't capture the event
            // that caused the focus trap activation.
            delay(function() {
              tryFocus(getInitialFocusNode());
            });
            doc.addEventListener("focusin", checkFocusIn, true);
            doc.addEventListener("mousedown", checkPointerDown, true);
            doc.addEventListener("touchstart", checkPointerDown, true);
            doc.addEventListener("click", checkClick, true);
            doc.addEventListener("keydown", checkKey, true);

            return trap;
          }

          function removeListeners() {
            if (!state.active || listeningFocusTrap !== trap) return;

            doc.removeEventListener("focusin", checkFocusIn, true);
            doc.removeEventListener("mousedown", checkPointerDown, true);
            doc.removeEventListener("touchstart", checkPointerDown, true);
            doc.removeEventListener("click", checkClick, true);
            doc.removeEventListener("keydown", checkKey, true);

            listeningFocusTrap = null;

            return trap;
          }

          function getNodeForOption(optionName) {
            var optionValue = config[optionName];
            var node = optionValue;
            if (!optionValue) {
              return null;
            }
            if (typeof optionValue === "string") {
              node = doc.querySelector(optionValue);
              if (!node) {
                throw new Error("`" + optionName + "` refers to no known node");
              }
            }
            if (typeof optionValue === "function") {
              node = optionValue();
              if (!node) {
                throw new Error("`" + optionName + "` did not return a node");
              }
            }
            return node;
          }

          function getInitialFocusNode() {
            var node;
            if (getNodeForOption("initialFocus") !== null) {
              node = getNodeForOption("initialFocus");
            } else if (container.contains(doc.activeElement)) {
              node = doc.activeElement;
            } else {
              node = state.firstTabbableNode || getNodeForOption("fallbackFocus");
            }

            if (!node) {
              throw new Error("You can't have a focus-trap without at least one focusable element");
            }

            return node;
          }

          // This needs to be done on mousedown and touchstart instead of click
          // so that it precedes the focus event.
          function checkPointerDown(e) {
            if (container.contains(e.target)) return;
            if (config.clickOutsideDeactivates) {
              deactivate({
                returnFocus: !tabbable.isFocusable(e.target)
              });
            } else {
              e.preventDefault();
            }
          }

          // In case focus escapes the trap for some strange reason, pull it back in.
          function checkFocusIn(e) {
            // In Firefox when you Tab out of an iframe the Document is briefly focused.
            if (container.contains(e.target) || e.target instanceof Document) {
              return;
            }
            e.stopImmediatePropagation();
            tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
          }

          function checkKey(e) {
            if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
              e.preventDefault();
              deactivate();
              return;
            }
            if (isTabEvent(e)) {
              checkTab(e);
              return;
            }
          }

          // Hijack Tab events on the first and last focusable nodes of the trap,
          // in order to prevent focus from escaping. If it escapes for even a
          // moment it can end up scrolling the page and causing confusion so we
          // kind of need to capture the action at the keydown phase.
          function checkTab(e) {
            updateTabbableNodes();
            if (e.shiftKey && e.target === state.firstTabbableNode) {
              e.preventDefault();
              tryFocus(state.lastTabbableNode);
              return;
            }
            if (!e.shiftKey && e.target === state.lastTabbableNode) {
              e.preventDefault();
              tryFocus(state.firstTabbableNode);
              return;
            }
          }

          function checkClick(e) {
            if (config.clickOutsideDeactivates) return;
            if (container.contains(e.target)) return;
            e.preventDefault();
            e.stopImmediatePropagation();
          }

          function updateTabbableNodes() {
            var tabbableNodes = tabbable(container);
            state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
            state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
          }

          function tryFocus(node) {
            if (node === doc.activeElement) return;
            if (!node || !node.focus) {
              tryFocus(getInitialFocusNode());
              return;
            }

            node.focus();
            state.mostRecentlyFocusedNode = node;
            if (isSelectableInput(node)) {
              node.select();
            }
          }
        }

        function isSelectableInput(node) {
          return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
        }

        function isEscapeEvent(e) {
          return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
        }

        function isTabEvent(e) {
          return e.key === "Tab" || e.keyCode === 9;
        }

        function delay(fn) {
          return setTimeout(fn, 0);
        }

        module.exports = focusTrap;
      },
      { tabbable: 14, xtend: 15 }
    ],
    8: [
      function(require, module, exports) {
        /**
         * Copyright 2013-2014 Facebook, Inc.
         *
         * Licensed under the Apache License, Version 2.0 (the "License");
         * you may not use this file except in compliance with the License.
         * You may obtain a copy of the License at
         *
         * http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software
         * distributed under the License is distributed on an "AS IS" BASIS,
         * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
         * See the License for the specific language governing permissions and
         * limitations under the License.
         *
         */

        "use strict";

        /**
         * Constructs an enumeration with keys equal to their value.
         *
         * For example:
         *
         *   var COLORS = keyMirror({blue: null, red: null});
         *   var myColor = COLORS.blue;
         *   var isColorValid = !!COLORS[myColor];
         *
         * The last line could not be performed if the values of the generated enum were
         * not equal to their keys.
         *
         *   Input:  {key1: val1, key2: val2}
         *   Output: {key1: key1, key2: key2}
         *
         * @param {object} obj
         * @return {object}
         */
        var keyMirror = function(obj) {
          var ret = {};
          var key;
          if (!(obj instanceof Object && !Array.isArray(obj))) {
            throw new Error("keyMirror(...): Argument must be an object.");
          }
          for (key in obj) {
            if (!obj.hasOwnProperty(key)) {
              continue;
            }
            ret[key] = key;
          }
          return ret;
        };

        module.exports = keyMirror;
      },
      {}
    ],
    9: [
      function(require, module, exports) {
        /**
         * Element prototype.
         */

        var proto = Element.prototype;

        /**
         * Vendor function.
         */

        var vendor =
          proto.matchesSelector ||
          proto.webkitMatchesSelector ||
          proto.mozMatchesSelector ||
          proto.msMatchesSelector ||
          proto.oMatchesSelector;

        /**
         * Expose `match()`.
         */

        module.exports = match;

        /**
         * Match `el` to `selector`.
         *
         * @param {Element} el
         * @param {String} selector
         * @return {Boolean}
         * @api public
         */

        function match(el, selector) {
          if (vendor) return vendor.call(el, selector);
          var nodes = el.parentNode.querySelectorAll(selector);
          for (var i = 0; i < nodes.length; ++i) {
            if (nodes[i] == el) return true;
          }
          return false;
        }
      },
      {}
    ],
    10: [
      function(require, module, exports) {
        /*
object-assign
(c) Sindre Sorhus
@license MIT
*/

        "use strict";
        /* eslint-disable no-unused-vars */
        var getOwnPropertySymbols = Object.getOwnPropertySymbols;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        var propIsEnumerable = Object.prototype.propertyIsEnumerable;

        function toObject(val) {
          if (val === null || val === undefined) {
            throw new TypeError("Object.assign cannot be called with null or undefined");
          }

          return Object(val);
        }

        function shouldUseNative() {
          try {
            if (!Object.assign) {
              return false;
            }

            // Detect buggy property enumeration order in older V8 versions.

            // https://bugs.chromium.org/p/v8/issues/detail?id=4118
            var test1 = new String("abc"); // eslint-disable-line no-new-wrappers
            test1[5] = "de";
            if (Object.getOwnPropertyNames(test1)[0] === "5") {
              return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test2 = {};
            for (var i = 0; i < 10; i++) {
              test2["_" + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
              return test2[n];
            });
            if (order2.join("") !== "0123456789") {
              return false;
            }

            // https://bugs.chromium.org/p/v8/issues/detail?id=3056
            var test3 = {};
            "abcdefghijklmnopqrst".split("").forEach(function(letter) {
              test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
              return false;
            }

            return true;
          } catch (err) {
            // We don't expect any of the above to throw, but better to be safe.
            return false;
          }
        }

        module.exports = shouldUseNative()
          ? Object.assign
          : function(target, source) {
              var from;
              var to = toObject(target);
              var symbols;

              for (var s = 1; s < arguments.length; s++) {
                from = Object(arguments[s]);

                for (var key in from) {
                  if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                  }
                }

                if (getOwnPropertySymbols) {
                  symbols = getOwnPropertySymbols(from);
                  for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                      to[symbols[i]] = from[symbols[i]];
                    }
                  }
                }
              }

              return to;
            };
      },
      {}
    ],
    11: [
      function(require, module, exports) {
        var COMPLETE = "complete",
          CANCELED = "canceled";

        function raf(task) {
          if ("requestAnimationFrame" in window) {
            return window.requestAnimationFrame(task);
          }

          setTimeout(task, 16);
        }

        function setElementScroll(element, x, y) {
          if (element.self === element) {
            element.scrollTo(x, y);
          } else {
            element.scrollLeft = x;
            element.scrollTop = y;
          }
        }

        function getTargetScrollLocation(target, parent, align) {
          var targetPosition = target.getBoundingClientRect(),
            parentPosition,
            x,
            y,
            differenceX,
            differenceY,
            targetWidth,
            targetHeight,
            leftAlign = align && align.left != null ? align.left : 0.5,
            topAlign = align && align.top != null ? align.top : 0.5,
            leftOffset = align && align.leftOffset != null ? align.leftOffset : 0,
            topOffset = align && align.topOffset != null ? align.topOffset : 0,
            leftScalar = leftAlign,
            topScalar = topAlign;

          if (parent.self === parent) {
            targetWidth = Math.min(targetPosition.width, parent.innerWidth);
            targetHeight = Math.min(targetPosition.height, parent.innerHeight);
            x = targetPosition.left + parent.pageXOffset - parent.innerWidth * leftScalar + targetWidth * leftScalar;
            y = targetPosition.top + parent.pageYOffset - parent.innerHeight * topScalar + targetHeight * topScalar;
            x -= leftOffset;
            y -= topOffset;
            differenceX = x - parent.pageXOffset;
            differenceY = y - parent.pageYOffset;
          } else {
            targetWidth = targetPosition.width;
            targetHeight = targetPosition.height;
            parentPosition = parent.getBoundingClientRect();
            var offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
            var offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
            x = offsetLeft + targetWidth * leftScalar - parent.clientWidth * leftScalar;
            y = offsetTop + targetHeight * topScalar - parent.clientHeight * topScalar;
            x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
            y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
            x -= leftOffset;
            y -= topOffset;
            differenceX = x - parent.scrollLeft;
            differenceY = y - parent.scrollTop;
          }

          return {
            x: x,
            y: y,
            differenceX: differenceX,
            differenceY: differenceY
          };
        }

        function animate(parent) {
          var scrollSettings = parent._scrollSettings;
          if (!scrollSettings) {
            return;
          }

          var location = getTargetScrollLocation(scrollSettings.target, parent, scrollSettings.align),
            time = Date.now() - scrollSettings.startTime,
            timeValue = Math.min((1 / scrollSettings.time) * time, 1);

          if (time > scrollSettings.time && scrollSettings.endIterations > 3) {
            setElementScroll(parent, location.x, location.y);
            parent._scrollSettings = null;
            return scrollSettings.end(COMPLETE);
          }

          scrollSettings.endIterations++;

          var easeValue = 1 - scrollSettings.ease(timeValue);

          setElementScroll(
            parent,
            location.x - location.differenceX * easeValue,
            location.y - location.differenceY * easeValue
          );

          // At the end of animation, loop synchronously
          // to try and hit the taget location.
          if (time >= scrollSettings.time) {
            return animate(parent);
          }

          raf(animate.bind(null, parent));
        }
        function transitionScrollTo(target, parent, settings, callback) {
          var idle = !parent._scrollSettings,
            lastSettings = parent._scrollSettings,
            now = Date.now(),
            endHandler;

          if (lastSettings) {
            lastSettings.end(CANCELED);
          }

          function end(endType) {
            parent._scrollSettings = null;
            if (parent.parentElement && parent.parentElement._scrollSettings) {
              parent.parentElement._scrollSettings.end(endType);
            }
            callback(endType);
            parent.removeEventListener("touchstart", endHandler, { passive: true });
          }

          parent._scrollSettings = {
            startTime: lastSettings ? lastSettings.startTime : Date.now(),
            endIterations: 0,
            target: target,
            time: settings.time + (lastSettings ? now - lastSettings.startTime : 0),
            ease: settings.ease,
            align: settings.align,
            end: end
          };

          endHandler = end.bind(null, CANCELED);
          parent.addEventListener("touchstart", endHandler, { passive: true });

          if (idle) {
            animate(parent);
          }
        }

        function defaultIsScrollable(element) {
          return (
            "pageXOffset" in element ||
            ((element.scrollHeight !== element.clientHeight || element.scrollWidth !== element.clientWidth) &&
              getComputedStyle(element).overflow !== "hidden")
          );
        }

        function defaultValidTarget() {
          return true;
        }

        module.exports = function(target, settings, callback) {
          if (!target) {
            return;
          }

          if (typeof settings === "function") {
            callback = settings;
            settings = null;
          }

          if (!settings) {
            settings = {};
          }

          settings.time = isNaN(settings.time) ? 1000 : settings.time;
          settings.ease =
            settings.ease ||
            function(v) {
              return 1 - Math.pow(1 - v, v / 2);
            };

          var parent = target.parentElement,
            parents = 0;

          function done(endType) {
            parents--;
            if (!parents) {
              callback && callback(endType);
            }
          }

          var validTarget = settings.validTarget || defaultValidTarget;
          var isScrollable = settings.isScrollable;

          while (parent) {
            if (
              validTarget(parent, parents) &&
              (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))
            ) {
              parents++;
              transitionScrollTo(target, parent, settings, done);
            }

            parent = parent.parentElement;

            if (!parent) {
              return;
            }

            if (parent.tagName === "BODY") {
              parent = parent.ownerDocument;
              parent = parent.defaultView || parent.ownerWindow;
            }
          }
        };
      },
      {}
    ],
    12: [
      function(require, module, exports) {
        (function(global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? (module.exports = factory())
            : typeof define === "function" && define.amd
              ? define(factory)
              : (global.scrollama = factory());
        })(this, function() {
          "use strict";

          // DOM helper functions

          // private
          function selectionToArray(selection) {
            var len = selection.length;
            var result = [];
            for (var i = 0; i < len; i += 1) {
              result.push(selection[i]);
            }
            return result;
          }

          // public
          function select(selector) {
            if (selector instanceof Element) {
              return selector;
            } else if (typeof selector === "string") {
              return document.querySelector(selector);
            }
            return null;
          }

          function selectAll(selector, parent) {
            if (parent === void 0) parent = document;

            if (typeof selector === "string") {
              return selectionToArray(parent.querySelectorAll(selector));
            } else if (selector instanceof Element) {
              return selectionToArray([selector]);
            } else if (selector instanceof NodeList) {
              return selectionToArray(selector);
            } else if (selector instanceof Array) {
              return selector;
            }
            return [];
          }

          function getStepId(ref) {
            var id = ref.id;
            var i = ref.i;

            return "scrollama__debug-step--" + id + "-" + i;
          }

          function getOffsetId(ref) {
            var id = ref.id;

            return "scrollama__debug-offset--" + id;
          }

          // SETUP

          function setupOffset(ref) {
            var id = ref.id;
            var offsetVal = ref.offsetVal;
            var stepClass = ref.stepClass;

            var el = document.createElement("div");
            el.setAttribute("id", getOffsetId({ id: id }));
            el.setAttribute("class", "scrollama__debug-offset");

            el.style.position = "fixed";
            el.style.left = "0";
            el.style.width = "100%";
            el.style.height = "0px";
            el.style.borderTop = "2px dashed black";
            el.style.zIndex = "9999";

            var text = document.createElement("p");
            text.innerText = '".' + stepClass + '" trigger: ' + offsetVal;
            text.style.fontSize = "12px";
            text.style.fontFamily = "monospace";
            text.style.color = "black";
            text.style.margin = "0";
            text.style.padding = "6px";
            el.appendChild(text);
            document.body.appendChild(el);
          }

          function setup(ref) {
            var id = ref.id;
            var offsetVal = ref.offsetVal;
            var stepEl = ref.stepEl;

            var stepClass = stepEl[0].getAttribute("class");
            setupOffset({ id: id, offsetVal: offsetVal, stepClass: stepClass });
          }

          // UPDATE
          function updateOffset(ref) {
            var id = ref.id;
            var offsetMargin = ref.offsetMargin;
            var offsetVal = ref.offsetVal;

            var idVal = getOffsetId({ id: id });
            var el = document.querySelector("#" + idVal);
            el.style.top = offsetMargin + "px";
          }

          function update(ref) {
            var id = ref.id;
            var stepOffsetHeight = ref.stepOffsetHeight;
            var offsetMargin = ref.offsetMargin;
            var offsetVal = ref.offsetVal;

            updateOffset({ id: id, offsetMargin: offsetMargin });
          }

          function notifyStep(ref) {
            var id = ref.id;
            var index = ref.index;
            var state = ref.state;

            var idVal = getStepId({ id: id, i: index });
            var elA = document.querySelector("#" + idVal + "_above");
            var elB = document.querySelector("#" + idVal + "_below");
            var display = state === "enter" ? "block" : "none";

            if (elA) {
              elA.style.display = display;
            }
            if (elB) {
              elB.style.display = display;
            }
          }

          function scrollama() {
            var ZERO_MOE = 1; // zero with some rounding margin of error
            var callback = {};
            var io = {};

            var containerEl = null;
            var graphicEl = null;
            var stepEl = null;

            var id = null;
            var offsetVal = 0;
            var offsetMargin = 0;
            var vh = 0;
            var ph = 0;
            var stepOffsetHeight = null;
            var stepOffsetTop = null;
            var bboxGraphic = null;

            var isReady = false;
            var isEnabled = false;
            var debugMode = false;
            var progressMode = false;
            var progressThreshold = 0;
            var preserveOrder = false;
            var triggerOnce = false;

            var stepStates = null;
            var containerState = null;
            var previousYOffset = -1;
            var direction = null;

            var exclude = [];

            // HELPERS
            function generateId() {
              var a = "abcdefghijklmnopqrstuv";
              var l = a.length;
              var t = new Date().getTime();
              var r = [0, 0, 0]
                .map(function(d) {
                  return a[Math.floor(Math.random() * l)];
                })
                .join("");
              return "" + r + t;
            }

            //www.gomakethings.com/how-to-get-an-elements-distance-from-the-top-of-the-page-with-vanilla-javascript/
            function getOffsetTop(el) {
              // Set our distance placeholder
              var distance = 0;

              // Loop up the DOM
              if (el.offsetParent) {
                do {
                  distance += el.offsetTop;
                  el = el.offsetParent;
                } while (el);
              }

              // Return our distance
              return distance < 0 ? 0 : distance;
            }

            function getPageHeight() {
              var body = document.body;
              var html = document.documentElement;

              return Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
              );
            }

            function getIndex(element) {
              return +element.getAttribute("data-scrollama-index");
            }

            function updateDirection() {
              if (window.pageYOffset > previousYOffset) {
                direction = "down";
              } else if (window.pageYOffset < previousYOffset) {
                direction = "up";
              }
              previousYOffset = window.pageYOffset;
            }

            function handleResize() {
              vh = window.innerHeight;
              ph = getPageHeight();

              bboxGraphic = graphicEl ? graphicEl.getBoundingClientRect() : null;

              offsetMargin = offsetVal * vh;

              stepOffsetHeight = stepEl
                ? stepEl.map(function(el) {
                    return el.offsetHeight;
                  })
                : [];

              stepOffsetTop = stepEl ? stepEl.map(getOffsetTop) : [];

              if (isEnabled && isReady) {
                updateIO();
              }

              if (debugMode) {
                update({
                  id: id,
                  stepOffsetHeight: stepOffsetHeight,
                  offsetMargin: offsetMargin,
                  offsetVal: offsetVal
                });
              }
            }

            function handleEnable(enable) {
              if (enable && !isEnabled) {
                if (isReady) {
                  updateIO();
                }
                isEnabled = true;
              } else if (!enable) {
                if (io.top) {
                  io.top.disconnect();
                }
                if (io.bottom) {
                  io.bottom.disconnect();
                }
                if (io.stepAbove) {
                  io.stepAbove.forEach(function(d) {
                    return d.disconnect();
                  });
                }
                if (io.stepBelow) {
                  io.stepBelow.forEach(function(d) {
                    return d.disconnect();
                  });
                }
                if (io.stepProgress) {
                  io.stepProgress.forEach(function(d) {
                    return d.disconnect();
                  });
                }
                if (io.viewportAbove) {
                  io.viewportAbove.forEach(function(d) {
                    return d.disconnect();
                  });
                }
                if (io.viewportBelow) {
                  io.viewportBelow.forEach(function(d) {
                    return d.disconnect();
                  });
                }
                isEnabled = false;
              }
            }

            function createThreshold(height) {
              var count = Math.ceil(height / progressThreshold);
              var t = [];
              var ratio = 1 / count;
              for (var i = 0; i < count; i++) {
                t.push(i * ratio);
              }
              return t;
            }

            // NOTIFY CALLBACKS
            function notifyOthers(index, location) {
              if (location === "above") {
                // check if steps above/below were skipped and should be notified first
                for (var i = 0; i < index; i++) {
                  var ss = stepStates[i];
                  if (ss.state === "enter") {
                    notifyStepExit(stepEl[i], "down");
                  }
                  if (ss.direction === "up") {
                    notifyStepEnter(stepEl[i], "down", false);
                    notifyStepExit(stepEl[i], "down");
                  }
                }
              } else if (location === "below") {
                for (var i$1 = stepStates.length - 1; i$1 > index; i$1--) {
                  var ss$1 = stepStates[i$1];
                  if (ss$1.state === "enter") {
                    notifyStepExit(stepEl[i$1], "up");
                  }
                  if (ss$1.direction === "down") {
                    notifyStepEnter(stepEl[i$1], "up", false);
                    notifyStepExit(stepEl[i$1], "up");
                  }
                }
              }
            }

            function notifyStepEnter(element, direction, check) {
              if (check === void 0) check = true;

              var index = getIndex(element);
              var resp = { element: element, index: index, direction: direction };

              // store most recent trigger
              stepStates[index].direction = direction;
              stepStates[index].state = "enter";

              if (preserveOrder && check && direction === "down") {
                notifyOthers(index, "above");
              }

              if (preserveOrder && check && direction === "up") {
                notifyOthers(index, "below");
              }

              if (callback.stepEnter && typeof callback.stepEnter === "function" && !exclude[index]) {
                callback.stepEnter(resp, stepStates);
                if (debugMode) {
                  notifyStep({ id: id, index: index, state: "enter" });
                }
                if (triggerOnce) {
                  exclude[index] = true;
                }
              }

              if (progressMode) {
                if (direction === "down") {
                  notifyStepProgress(element, 0);
                } else {
                  notifyStepProgress(element, 1);
                }
              }
            }

            function notifyStepExit(element, direction) {
              var index = getIndex(element);
              var resp = { element: element, index: index, direction: direction };

              // store most recent trigger
              stepStates[index].direction = direction;
              stepStates[index].state = "exit";

              if (progressMode) {
                if (direction === "down") {
                  notifyStepProgress(element, 1);
                } else {
                  notifyStepProgress(element, 0);
                }
              }

              if (callback.stepExit && typeof callback.stepExit === "function") {
                callback.stepExit(resp, stepStates);
                if (debugMode) {
                  notifyStep({ id: id, index: index, state: "exit" });
                }
              }
            }

            function notifyStepProgress(element, progress) {
              var index = getIndex(element);
              var resp = { element: element, index: index, progress: progress };
              if (callback.stepProgress && typeof callback.stepProgress === "function") {
                callback.stepProgress(resp);
              }
            }

            function notifyContainerEnter() {
              var resp = { direction: direction };
              containerState.direction = direction;
              containerState.state = "enter";
              if (callback.containerEnter && typeof callback.containerEnter === "function") {
                callback.containerEnter(resp);
              }
            }

            function notifyContainerExit() {
              var resp = { direction: direction };
              containerState.direction = direction;
              containerState.state = "exit";
              if (callback.containerExit && typeof callback.containerExit === "function") {
                callback.containerExit(resp);
              }
            }

            // OBSERVER - INTERSECT HANDLING

            // if TOP edge of step crosses threshold,
            // bottom must be > 0 which means it is on "screen" (shifted by offset)
            function intersectStepAbove(entries) {
              updateDirection();
              entries.forEach(function(entry) {
                var isIntersecting = entry.isIntersecting;
                var boundingClientRect = entry.boundingClientRect;
                var target = entry.target;

                // bottom is how far bottom edge of el is from top of viewport
                var bottom = boundingClientRect.bottom;
                var height = boundingClientRect.height;
                var bottomAdjusted = bottom - offsetMargin;
                var index = getIndex(target);
                var ss = stepStates[index];

                if (bottomAdjusted >= -ZERO_MOE) {
                  if (isIntersecting && direction === "down" && ss.state !== "enter") {
                    notifyStepEnter(target, direction);
                  } else if (!isIntersecting && direction === "up" && ss.state === "enter") {
                    notifyStepExit(target, direction);
                  } else if (
                    !isIntersecting &&
                    bottomAdjusted >= height &&
                    direction === "down" &&
                    ss.state === "enter"
                  ) {
                    notifyStepExit(target, direction);
                  }
                }
              });
            }

            function intersectStepBelow(entries) {
              updateDirection();
              entries.forEach(function(entry) {
                var isIntersecting = entry.isIntersecting;
                var boundingClientRect = entry.boundingClientRect;
                var target = entry.target;

                var bottom = boundingClientRect.bottom;
                var height = boundingClientRect.height;
                var bottomAdjusted = bottom - offsetMargin;
                var index = getIndex(target);
                var ss = stepStates[index];

                if (
                  bottomAdjusted >= -ZERO_MOE &&
                  bottomAdjusted < height &&
                  isIntersecting &&
                  direction === "up" &&
                  ss.state !== "enter"
                ) {
                  notifyStepEnter(target, direction);
                } else if (
                  bottomAdjusted <= ZERO_MOE &&
                  !isIntersecting &&
                  direction === "down" &&
                  ss.state === "enter"
                ) {
                  notifyStepExit(target, direction);
                }
              });
            }

            /*
	if there is a scroll event where a step never intersects (therefore
	skipping an enter/exit trigger), use this fallback to detect if it is
	in view
	*/
            function intersectViewportAbove(entries) {
              updateDirection();
              entries.forEach(function(entry) {
                var isIntersecting = entry.isIntersecting;
                var target = entry.target;
                var index = getIndex(target);
                var ss = stepStates[index];
                if (isIntersecting && direction === "down" && ss.state !== "enter" && ss.direction !== "down") {
                  notifyStepEnter(target, "down");
                  notifyStepExit(target, "down");
                }
              });
            }

            function intersectViewportBelow(entries) {
              updateDirection();
              entries.forEach(function(entry) {
                var isIntersecting = entry.isIntersecting;
                var target = entry.target;
                var index = getIndex(target);
                var ss = stepStates[index];
                if (isIntersecting && direction === "up" && ss.state !== "enter" && ss.direction !== "up") {
                  notifyStepEnter(target, "up");
                  notifyStepExit(target, "up");
                }
              });
            }

            function intersectStepProgress(entries) {
              updateDirection();
              entries.forEach(function(ref) {
                var isIntersecting = ref.isIntersecting;
                var intersectionRatio = ref.intersectionRatio;
                var boundingClientRect = ref.boundingClientRect;
                var target = ref.target;

                var bottom = boundingClientRect.bottom;
                var bottomAdjusted = bottom - offsetMargin;

                if (isIntersecting && bottomAdjusted >= -ZERO_MOE) {
                  notifyStepProgress(target, +intersectionRatio.toFixed(3));
                }
              });
            }

            function intersectTop(entries) {
              updateDirection();
              var ref = entries[0];
              var isIntersecting = ref.isIntersecting;
              var boundingClientRect = ref.boundingClientRect;
              var top = boundingClientRect.top;
              var bottom = boundingClientRect.bottom;

              if (bottom > -ZERO_MOE) {
                if (isIntersecting) {
                  notifyContainerEnter(direction);
                } else if (containerState.state === "enter") {
                  notifyContainerExit(direction);
                }
              }
            }

            function intersectBottom(entries) {
              updateDirection();
              var ref = entries[0];
              var isIntersecting = ref.isIntersecting;
              var boundingClientRect = ref.boundingClientRect;
              var top = boundingClientRect.top;

              if (top < ZERO_MOE) {
                if (isIntersecting) {
                  notifyContainerEnter(direction);
                } else if (containerState.state === "enter") {
                  notifyContainerExit(direction);
                }
              }
            }

            // OBSERVER - CREATION

            function updateTopIO() {
              if (io.top) {
                io.top.unobserve(containerEl);
              }

              var options = {
                root: null,
                rootMargin: vh + "px 0px -" + vh + "px 0px",
                threshold: 0
              };

              io.top = new IntersectionObserver(intersectTop, options);
              io.top.observe(containerEl);
            }

            function updateBottomIO() {
              if (io.bottom) {
                io.bottom.unobserve(containerEl);
              }
              var options = {
                root: null,
                rootMargin: "-" + bboxGraphic.height + "px 0px " + bboxGraphic.height + "px 0px",
                threshold: 0
              };

              io.bottom = new IntersectionObserver(intersectBottom, options);
              io.bottom.observe(containerEl);
            }

            // top edge
            function updateStepAboveIO() {
              if (io.stepAbove) {
                io.stepAbove.forEach(function(d) {
                  return d.disconnect();
                });
              }

              io.stepAbove = stepEl.map(function(el, i) {
                var marginTop = stepOffsetHeight[i];
                var marginBottom = -vh + offsetMargin;
                var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";

                var options = {
                  root: null,
                  rootMargin: rootMargin,
                  threshold: 0
                };

                var obs = new IntersectionObserver(intersectStepAbove, options);
                obs.observe(el);
                return obs;
              });
            }

            // bottom edge
            function updateStepBelowIO() {
              if (io.stepBelow) {
                io.stepBelow.forEach(function(d) {
                  return d.disconnect();
                });
              }

              io.stepBelow = stepEl.map(function(el, i) {
                var marginTop = -offsetMargin;
                var marginBottom = ph - vh + stepOffsetHeight[i] + offsetMargin;
                var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";

                var options = {
                  root: null,
                  rootMargin: rootMargin,
                  threshold: 0
                };

                var obs = new IntersectionObserver(intersectStepBelow, options);
                obs.observe(el);
                return obs;
              });
            }

            // jump into viewport
            function updateViewportAboveIO() {
              if (io.viewportAbove) {
                io.viewportAbove.forEach(function(d) {
                  return d.disconnect();
                });
              }
              io.viewportAbove = stepEl.map(function(el, i) {
                var marginTop = stepOffsetTop[i];
                var marginBottom = -(vh - offsetMargin + stepOffsetHeight[i]);
                var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
                var options = {
                  root: null,
                  rootMargin: rootMargin,
                  threshold: 0
                };

                var obs = new IntersectionObserver(intersectViewportAbove, options);
                obs.observe(el);
                return obs;
              });
            }

            function updateViewportBelowIO() {
              if (io.viewportBelow) {
                io.viewportBelow.forEach(function(d) {
                  return d.disconnect();
                });
              }
              io.viewportBelow = stepEl.map(function(el, i) {
                var marginTop = -(offsetMargin + stepOffsetHeight[i]);
                var marginBottom = ph - stepOffsetTop[i] - stepOffsetHeight[i] - offsetMargin;
                var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";
                var options = {
                  root: null,
                  rootMargin: rootMargin,
                  threshold: 0
                };

                var obs = new IntersectionObserver(intersectViewportBelow, options);
                obs.observe(el);
                return obs;
              });
            }

            // progress progress tracker
            function updateStepProgressIO() {
              if (io.stepProgress) {
                io.stepProgress.forEach(function(d) {
                  return d.disconnect();
                });
              }

              io.stepProgress = stepEl.map(function(el, i) {
                var marginTop = stepOffsetHeight[i] - offsetMargin;
                var marginBottom = -vh + offsetMargin;
                var rootMargin = marginTop + "px 0px " + marginBottom + "px 0px";

                var threshold = createThreshold(stepOffsetHeight[i]);
                var options = {
                  root: null,
                  rootMargin: rootMargin,
                  threshold: threshold
                };

                var obs = new IntersectionObserver(intersectStepProgress, options);
                obs.observe(el);
                return obs;
              });
            }

            function updateIO() {
              updateViewportAboveIO();
              updateViewportBelowIO();
              updateStepAboveIO();
              updateStepBelowIO();

              if (progressMode) {
                updateStepProgressIO();
              }

              if (containerEl && graphicEl) {
                updateTopIO();
                updateBottomIO();
              }
            }

            // SETUP FUNCTIONS

            function indexSteps() {
              stepEl.forEach(function(el, i) {
                return el.setAttribute("data-scrollama-index", i);
              });
            }

            function setupStates() {
              stepStates = stepEl.map(function() {
                return {
                  direction: null,
                  state: null
                };
              });

              containerState = { direction: null, state: null };
            }

            function addDebug() {
              if (debugMode) {
                setup({ id: id, stepEl: stepEl, offsetVal: offsetVal });
              }
            }

            var S = {};

            S.setup = function(ref) {
              var container = ref.container;
              var graphic = ref.graphic;
              var step = ref.step;
              var offset = ref.offset;
              if (offset === void 0) offset = 0.5;
              var progress = ref.progress;
              if (progress === void 0) progress = false;
              var threshold = ref.threshold;
              if (threshold === void 0) threshold = 4;
              var debug = ref.debug;
              if (debug === void 0) debug = false;
              var order = ref.order;
              if (order === void 0) order = true;
              var once = ref.once;
              if (once === void 0) once = false;

              id = generateId();
              // elements
              stepEl = selectAll(step);
              containerEl = container ? select(container) : null;
              graphicEl = graphic ? select(graphic) : null;

              // error if no step selected
              if (!stepEl.length) {
                console.error("scrollama error: no step elements");
                return S;
              }

              // options
              debugMode = debug;
              progressMode = progress;
              preserveOrder = order;
              triggerOnce = once;

              S.offsetTrigger(offset);
              progressThreshold = Math.max(1, +threshold);

              isReady = true;

              // customize
              addDebug();
              indexSteps();
              setupStates();
              handleResize();
              handleEnable(true);
              return S;
            };

            S.resize = function() {
              handleResize();
              return S;
            };

            S.enable = function() {
              handleEnable(true);
              return S;
            };

            S.disable = function() {
              handleEnable(false);
              return S;
            };

            S.destroy = function() {
              handleEnable(false);
              Object.keys(callback).forEach(function(c) {
                return (callback[c] = null);
              });
              Object.keys(io).forEach(function(i) {
                return (io[i] = null);
              });
            };

            S.offsetTrigger = function(x) {
              if (x && !isNaN(x)) {
                offsetVal = Math.min(Math.max(0, x), 1);
                return S;
              }
              return offsetVal;
            };

            S.onStepEnter = function(cb) {
              callback.stepEnter = cb;
              return S;
            };

            S.onStepExit = function(cb) {
              callback.stepExit = cb;
              return S;
            };

            S.onStepProgress = function(cb) {
              callback.stepProgress = cb;
              return S;
            };

            S.onContainerEnter = function(cb) {
              callback.containerEnter = cb;
              return S;
            };

            S.onContainerExit = function(cb) {
              callback.containerExit = cb;
              return S;
            };

            return S;
          }

          return scrollama;
        });
      },
      {}
    ],
    13: [
      function(require, module, exports) {
        /*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
        (function(global, factory) {
          typeof exports === "object" && typeof module !== "undefined"
            ? factory(exports)
            : typeof define === "function" && define.amd
              ? define(["exports"], factory)
              : factory((global.slideAnim = {}));
        })(this, function(exports) {
          "use strict";

          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }

          var isPromiseSuppoted = typeof Promise === "function";
          var PromiseLike$1 = isPromiseSuppoted
            ? Promise
            : function PromiseLike(executor) {
                _classCallCheck(this, PromiseLike);

                var callback = function callback() {};
                var resolve = function resolve() {
                  callback();
                };
                executor(resolve);

                return {
                  then: function then(_callback) {
                    callback = _callback;
                  }
                };
              };

          var inAnimItems = {
            _: [],

            add: function add(el, defaultStyle, timeoutId, onCancelled) {
              inAnimItems.remove(el);
              inAnimItems._.push({
                el: el,
                defaultStyle: defaultStyle,
                timeoutId: timeoutId,
                onCancelled: onCancelled
              });
            },
            remove: function remove(el) {
              var index = inAnimItems.findIndex(el);

              if (index === -1) return;

              var inAnimItem = inAnimItems._[index];

              clearTimeout(inAnimItem.timeoutId);
              inAnimItem.onCancelled();
              inAnimItems._.splice(index, 1);
            },
            find: function find(el) {
              return inAnimItems._[inAnimItems.findIndex(el)];
            },
            findIndex: function findIndex(el) {
              var index = -1;

              inAnimItems._.some(function(item, i) {
                if (item.el === el) {
                  index = i;
                  return true;
                }
              });

              return index;
            }
          };

          var CSS_EASEOUT_EXPO = "cubic-bezier( 0.19, 1, 0.22, 1 )";

          function slideDown(el) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new PromiseLike$1(function(resolve) {
              if (!!options.onComplete) {
                console.warn("options.onComplete will be deprecated. use 'then' instead");
              }

              if (inAnimItems.findIndex(el) !== -1) return;

              var _isVisible = isVisible(el);
              var hasEndHeight = typeof options.endHeight === "number";
              var display = options.display || "block";
              var duration = options.duration || 400;
              var onComplete = options.onComplete || function() {}; // will be deprecated
              var onCancelled = options.onCancelled || function() {};

              var defaultStyle = el.getAttribute("style") || "";
              var style = window.getComputedStyle(el);
              var defaultStyles = getDefaultStyles(el, display);
              var isBorderBox = /border-box/.test(style.getPropertyValue("box-sizing"));

              var contentHeight = defaultStyles.height;
              var paddingTop = defaultStyles.paddingTop;
              var paddingBottom = defaultStyles.paddingBottom;
              var borderTop = defaultStyles.borderTop;
              var borderBottom = defaultStyles.borderBottom;

              var cssDuration = duration + "ms";
              var cssEasing = CSS_EASEOUT_EXPO;
              var cssTransition = [
                "height " + cssDuration + " " + cssEasing,
                "padding " + cssDuration + " " + cssEasing,
                "border-width " + cssDuration + " " + cssEasing
              ].join();

              var startHeight = _isVisible ? style.height : "0px";
              var startPaddingTop = _isVisible ? style.paddingTop : "0px";
              var startPaddingBottom = _isVisible ? style.paddingBottom : "0px";
              var startBorderTopWidth = _isVisible ? style.borderTopWidth : "0px";
              var startBorderBottomWidth = _isVisible ? style.borderBottomWidth : "0px";

              var endHeight = (function() {
                if (hasEndHeight) return options.endHeight + "px";

                return !isBorderBox
                  ? contentHeight - paddingTop - paddingBottom + "px"
                  : contentHeight + borderTop + borderBottom + "px";
              })();
              var endPaddingTop = paddingTop + "px";
              var endPaddingBottom = paddingBottom + "px";
              var endBorderTopWidth = borderTop + "px";
              var endBorderBottomWidth = borderBottom + "px";

              if (
                startHeight === endHeight &&
                startPaddingTop === endPaddingTop &&
                startPaddingBottom === endPaddingBottom &&
                startBorderTopWidth === endBorderTopWidth &&
                startBorderBottomWidth === endBorderBottomWidth
              ) {
                onComplete(); // will be deprecated
                resolve();
                return;
              }

              requestAnimationFrame(function() {
                el.style.height = startHeight;
                el.style.paddingTop = startPaddingTop;
                el.style.paddingBottom = startPaddingBottom;
                el.style.borderTopWidth = startBorderTopWidth;
                el.style.borderBottomWidth = startBorderBottomWidth;
                el.style.display = display;
                el.style.overflow = "hidden";
                el.style.visibility = "visible";
                el.style.transition = cssTransition;
                el.style.webkitTransition = cssTransition;

                requestAnimationFrame(function() {
                  el.style.height = endHeight;
                  el.style.paddingTop = endPaddingTop;
                  el.style.paddingBottom = endPaddingBottom;
                  el.style.borderTopWidth = endBorderTopWidth;
                  el.style.borderBottomWidth = endBorderBottomWidth;
                });
              });

              var timeoutId = setTimeout(function() {
                // el.setAttribute( 'style', defaultStyle );
                resetStyle(el);
                el.style.display = display;
                if (hasEndHeight) {
                  el.style.height = options.endHeight + "px";
                  el.style.overflow = "hidden";
                }
                inAnimItems.remove(el);

                onComplete(); // will be deprecated
                resolve();
              }, duration);

              inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
            });
          }

          function slideUp(el) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return new PromiseLike$1(function(resolve) {
              if (!!options.onComplete) {
                console.warn("options.onComplete will be deprecated. use 'then' instead");
              }

              if (inAnimItems.findIndex(el) !== -1) return;

              var _isVisible = isVisible(el);
              var display = options.display || "block";
              var duration = options.duration || 400;
              var onComplete = options.onComplete || function() {}; // will be deprecated
              var onCancelled = options.onCancelled || function() {};

              if (!_isVisible) {
                onComplete(); // will be deprecated
                resolve();
                return;
              }

              var defaultStyle = el.getAttribute("style") || "";
              var style = window.getComputedStyle(el);
              var isBorderBox = /border-box/.test(style.getPropertyValue("box-sizing"));
              var paddingTop = pxToNumber(style.getPropertyValue("padding-top"));
              var paddingBottom = pxToNumber(style.getPropertyValue("padding-bottom"));
              var borderTop = pxToNumber(style.getPropertyValue("border-top-width"));
              var borderBottom = pxToNumber(style.getPropertyValue("border-bottom-width"));
              var contentHeight = el.scrollHeight;
              var cssDuration = duration + "ms";
              var cssEasing = CSS_EASEOUT_EXPO;
              var cssTransition = [
                "height " + cssDuration + " " + cssEasing,
                "padding " + cssDuration + " " + cssEasing,
                "border-width " + cssDuration + " " + cssEasing
              ].join();

              var startHeight = !isBorderBox
                ? contentHeight - paddingTop - paddingBottom + "px"
                : contentHeight + borderTop + borderBottom + "px";
              var startPaddingTop = paddingTop + "px";
              var startPaddingBottom = paddingBottom + "px";
              var startBorderTopWidth = borderTop + "px";
              var startBorderBottomWidth = borderBottom + "px";

              requestAnimationFrame(function() {
                el.style.height = startHeight;
                el.style.paddingTop = startPaddingTop;
                el.style.paddingBottom = startPaddingBottom;
                el.style.borderTopWidth = startBorderTopWidth;
                el.style.borderBottomWidth = startBorderBottomWidth;
                el.style.display = display;
                el.style.overflow = "hidden";
                el.style.transition = cssTransition;
                el.style.webkitTransition = cssTransition;

                requestAnimationFrame(function() {
                  el.style.height = 0;
                  el.style.paddingTop = 0;
                  el.style.paddingBottom = 0;
                  el.style.borderTopWidth = 0;
                  el.style.borderBottomWidth = 0;
                });
              });

              var timeoutId = setTimeout(function() {
                // el.setAttribute( 'style', defaultStyle );
                resetStyle(el);
                el.style.display = "none";
                inAnimItems.remove(el);
                onComplete(); // will be deprecated
                resolve();
              }, duration);

              inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
            });
          }

          function slideStop(el) {
            var elementObject = inAnimItems.find(el);

            if (!elementObject) return;

            var style = window.getComputedStyle(el);
            var height = style.height;
            var paddingTop = style.paddingTop;
            var paddingBottom = style.paddingBottom;
            var borderTopWidth = style.borderTopWidth;
            var borderBottomWidth = style.borderBottomWidth;

            resetStyle(el);
            el.style.height = height;
            el.style.paddingTop = paddingTop;
            el.style.paddingBottom = paddingBottom;
            el.style.borderTopWidth = borderTopWidth;
            el.style.borderBottomWidth = borderBottomWidth;
            el.style.overflow = "hidden";
            inAnimItems.remove(el);
          }

          function isVisible(el) {
            return el.offsetHeight !== 0;
          }

          function resetStyle(el) {
            el.style.visibility = "";
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.borderTopWidth = "";
            el.style.borderBottomWidth = "";
            el.style.overflow = "";
            el.style.transition = "";
            el.style.webkitTransition = "";
          }

          function getDefaultStyles(el, defaultDisplay) {
            var defaultStyle = el.getAttribute("style") || "";
            var style = window.getComputedStyle(el);

            el.style.visibility = "hidden";
            el.style.display = defaultDisplay || "block";

            var width = pxToNumber(style.getPropertyValue("width"));

            el.style.position = "absolute";
            el.style.width = width + "px";
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.borderTopWidth = "";
            el.style.borderBottomWidth = "";

            var paddingTop = pxToNumber(style.getPropertyValue("padding-top"));
            var paddingBottom = pxToNumber(style.getPropertyValue("padding-bottom"));
            var borderTop = pxToNumber(style.getPropertyValue("border-top-width"));
            var borderBottom = pxToNumber(style.getPropertyValue("border-bottom-width"));
            var height = el.scrollHeight;

            el.setAttribute("style", defaultStyle);

            return {
              height: height,
              paddingTop: paddingTop,
              paddingBottom: paddingBottom,
              borderTop: borderTop,
              borderBottom: borderBottom
            };
          }

          function pxToNumber(px) {
            return +px.replace(/px/, "");
          }

          exports.slideDown = slideDown;
          exports.slideUp = slideUp;
          exports.slideStop = slideStop;
          exports.isVisible = isVisible;

          Object.defineProperty(exports, "__esModule", { value: true });
        });
      },
      {}
    ],
    14: [
      function(require, module, exports) {
        var candidateSelectors = [
          "input",
          "select",
          "textarea",
          "a[href]",
          "button",
          "[tabindex]",
          "audio[controls]",
          "video[controls]",
          '[contenteditable]:not([contenteditable="false"])'
        ];
        var candidateSelector = candidateSelectors.join(",");

        var matches =
          typeof Element === "undefined"
            ? function() {}
            : Element.prototype.matches ||
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector;

        function tabbable(el, options) {
          options = options || {};

          var elementDocument = el.ownerDocument || el;
          var regularTabbables = [];
          var orderedTabbables = [];

          var untouchabilityChecker = new UntouchabilityChecker(elementDocument);
          var candidates = el.querySelectorAll(candidateSelector);

          if (options.includeContainer) {
            if (matches.call(el, candidateSelector)) {
              candidates = Array.prototype.slice.apply(candidates);
              candidates.unshift(el);
            }
          }

          var i, candidate, candidateTabindex;
          for (i = 0; i < candidates.length; i++) {
            candidate = candidates[i];

            if (!isNodeMatchingSelectorTabbable(candidate, untouchabilityChecker)) continue;

            candidateTabindex = getTabindex(candidate);
            if (candidateTabindex === 0) {
              regularTabbables.push(candidate);
            } else {
              orderedTabbables.push({
                documentOrder: i,
                tabIndex: candidateTabindex,
                node: candidate
              });
            }
          }

          var tabbableNodes = orderedTabbables
            .sort(sortOrderedTabbables)
            .map(function(a) {
              return a.node;
            })
            .concat(regularTabbables);

          return tabbableNodes;
        }

        tabbable.isTabbable = isTabbable;
        tabbable.isFocusable = isFocusable;

        function isNodeMatchingSelectorTabbable(node, untouchabilityChecker) {
          if (
            !isNodeMatchingSelectorFocusable(node, untouchabilityChecker) ||
            isNonTabbableRadio(node) ||
            getTabindex(node) < 0
          ) {
            return false;
          }
          return true;
        }

        function isTabbable(node, untouchabilityChecker) {
          if (!node) throw new Error("No node provided");
          if (matches.call(node, candidateSelector) === false) return false;
          return isNodeMatchingSelectorTabbable(node, untouchabilityChecker);
        }

        function isNodeMatchingSelectorFocusable(node, untouchabilityChecker) {
          untouchabilityChecker = untouchabilityChecker || new UntouchabilityChecker(node.ownerDocument || node);
          if (node.disabled || isHiddenInput(node) || untouchabilityChecker.isUntouchable(node)) {
            return false;
          }
          return true;
        }

        var focusableCandidateSelector = candidateSelectors.concat("iframe").join(",");
        function isFocusable(node, untouchabilityChecker) {
          if (!node) throw new Error("No node provided");
          if (matches.call(node, focusableCandidateSelector) === false) return false;
          return isNodeMatchingSelectorFocusable(node, untouchabilityChecker);
        }

        function getTabindex(node) {
          var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
          if (!isNaN(tabindexAttr)) return tabindexAttr;
          // Browsers do not return `tabIndex` correctly for contentEditable nodes;
          // so if they don't have a tabindex attribute specifically set, assume it's 0.
          if (isContentEditable(node)) return 0;
          return node.tabIndex;
        }

        function sortOrderedTabbables(a, b) {
          return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
        }

        // Array.prototype.find not available in IE.
        function find(list, predicate) {
          for (var i = 0, length = list.length; i < length; i++) {
            if (predicate(list[i])) return list[i];
          }
        }

        function isContentEditable(node) {
          return node.contentEditable === "true";
        }

        function isInput(node) {
          return node.tagName === "INPUT";
        }

        function isHiddenInput(node) {
          return isInput(node) && node.type === "hidden";
        }

        function isRadio(node) {
          return isInput(node) && node.type === "radio";
        }

        function isNonTabbableRadio(node) {
          return isRadio(node) && !isTabbableRadio(node);
        }

        function getCheckedRadio(nodes) {
          for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked) {
              return nodes[i];
            }
          }
        }

        function isTabbableRadio(node) {
          if (!node.name) return true;
          // This won't account for the edge case where you have radio groups with the same
          // in separate forms on the same page.
          var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
          var checked = getCheckedRadio(radioSet);
          return !checked || checked === node;
        }

        // An element is "untouchable" if *it or one of its ancestors* has
        // `visibility: hidden` or `display: none`.
        function UntouchabilityChecker(elementDocument) {
          this.doc = elementDocument;
          // Node cache must be refreshed on every check, in case
          // the content of the element has changed. The cache contains tuples
          // mapping nodes to their boolean result.
          this.cache = [];
        }

        // getComputedStyle accurately reflects `visibility: hidden` of ancestors
        // but not `display: none`, so we need to recursively check parents.
        UntouchabilityChecker.prototype.hasDisplayNone = function hasDisplayNone(node, nodeComputedStyle) {
          if (node === this.doc.documentElement) return false;

          // Search for a cached result.
          var cached = find(this.cache, function(item) {
            return item === node;
          });
          if (cached) return cached[1];

          nodeComputedStyle = nodeComputedStyle || this.doc.defaultView.getComputedStyle(node);

          var result = false;

          if (nodeComputedStyle.display === "none") {
            result = true;
          } else if (node.parentNode) {
            result = this.hasDisplayNone(node.parentNode);
          }

          this.cache.push([node, result]);

          return result;
        };

        UntouchabilityChecker.prototype.isUntouchable = function isUntouchable(node) {
          if (node === this.doc.documentElement) return false;
          var computedStyle = this.doc.defaultView.getComputedStyle(node);
          if (this.hasDisplayNone(node, computedStyle)) return true;
          return computedStyle.visibility === "hidden";
        };

        module.exports = tabbable;
      },
      {}
    ],
    15: [
      function(require, module, exports) {
        module.exports = extend;

        var hasOwnProperty = Object.prototype.hasOwnProperty;

        function extend() {
          var target = {};

          for (var i = 0; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }

          return target;
        }
      },
      {}
    ],
    16: [
      function(require, module, exports) {
        var delegate = require("delegate-events");
        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");

        /**
         * Scroll to element by setting focus when internal anchor link is clicked
         */

        function onAnchorLinkClick(e) {
          var href = e.delegateTarget.getAttribute("href");
          if (href.indexOf("#") !== 0) {
            return;
          }

          var $rel = document.getElementById(href.substring(1));
          if ($rel) {
            if ($rel.hasAttribute("aria-modal")) {
              return;
            }

            e.preventDefault();

            dispatcher.dispatch({
              type: constants.REQUEST_SCROLLTO,
              target: $rel
            });
          }
        }

        delegate.bind(document.body, "a", "click", onAnchorLinkClick);
      },
      { "../../../constants": 34, "../../dispatcher": 25, "delegate-events": 4 }
    ],
    17: [
      function(require, module, exports) {
        var delegate = require("delegate-events");
        var constants = require("../../../constants");
        var slideUp = require("slide-anim").slideUp;
        var slideDown = require("slide-anim").slideDown;
        var findParent = require("find-parent");

        /**
         * Open/close collapsible item
         * checks aria-expanded attribute on button
         * to decide whether to expand or not
         */

        function toggle($btn, $content, setImmediate) {
          if (!$btn || !$content) {
            return;
          }

          var speed = 200;
          if (setImmediate === true) {
            speed = 1;
          }

          // get button collapsible parent
          var $collapsible = findParent.byClassName($content, "js-collapsible");

          // current state: not expanded
          if ($btn.getAttribute("aria-expanded") === "false") {
            // set expanded
            $btn.setAttribute("aria-expanded", true);

            // add is-open class
            $collapsible.classList.add(constants.OPEN_CLASS);

            // animate open content div
            slideDown($content, { duration: speed }).then(function() {
              if (setImmediate === true) {
                return;
              }

              // make focusable
              $content.setAttribute("tabIndex", "-1");

              // set focus for screenreaders
              $content.focus();
            });

            // current state: expanded
          } else {
            // set not expanded
            $btn.setAttribute("aria-expanded", false);

            // remove is-open class
            $collapsible.classList.remove(constants.OPEN_CLASS);

            // animate close content div
            slideUp($content, { duration: speed });
          }
        }

        /**
         * Toggle collapsible on button click
         * find element referenced by aria-controls and toggle
         */

        function onButtonClick(e) {
          var $btn = e.delegateTarget;
          var rel = $btn.getAttribute("aria-controls");
          if (rel) {
            toggle($btn, document.getElementById(rel));
          }
        }

        delegate.bind(document.body, ".js-collapsible__button", "click", onButtonClick);

        /**
         * Hide/show all collapsibles on load̦
         */

        function toggleOnLoad() {
          var $$collapsibles = document.querySelectorAll(".js-collapsible");
          for (var i = 0, l = $$collapsibles.length; i < l; ++i) {
            // find buttton and content elements
            var $collapsible = $$collapsibles[i];
            var $btn = $collapsible.querySelector(".js-collapsible__button");
            var $content = $collapsible.querySelector(".js-collapsible__content");

            // show/hide with 1ms speed
            toggle($btn, $content, true);
          }
        }

        toggleOnLoad();
      },
      { "../../../constants": 34, "delegate-events": 4, "find-parent": 6, "slide-anim": 13 }
    ],
    18: [
      function(require, module, exports) {
        var scrollama = require("scrollama");
        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");

        /**
         * Track in/out view state and dispatch events accordingly
         */

        function onEnter(e) {
          if (!e.element.classList.contains(constants.INVIEW_CLASS)) {
            e.element.classList.add(constants.INVIEW_CLASS);
          }

          dispatcher.dispatch({
            type: constants.EVENT_SECTION_INVIEW,
            target: e.element,
            direction: e.direction
          });
        }

        function onExit(e) {
          if (e.element.classList.contains(constants.INVIEW_CLASS)) {
            e.element.classList.remove(constants.INVIEW_CLASS);
          }

          dispatcher.dispatch({
            type: constants.EVENT_SECTION_OUTVIEW,
            target: e.element,
            direction: e.direction
          });
        }

        if (document.querySelectorAll(".section").length) {
          var scroller = scrollama();

          scroller
            .setup({
              step: ".section"
            })
            .onStepEnter(onEnter)
            .onStepExit(onExit);

          dispatcher.on(constants.EVENT_RESIZE, scroller.resize);
        }
      },
      { "../../../constants": 34, "../../dispatcher": 25, scrollama: 12 }
    ],
    19: [
      function(require, module, exports) {
        var scrollama = require("scrollama");

        var lerp = require("../../utils/lerp");
        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");
        var getBreakpoint = require("../../ui/get-breakpoint");

        /**
         * Parallax effect for the hero
         */

        var $hero = document.querySelector(".js-course-hero");
        var $picture = document.querySelector(".js-course-hero__image__picture");
        var $overlay = document.querySelector(".js-course-hero__image__picture__overlay");
        var $img = document.querySelector(".js-course-hero__image__picture img");

        function onProgress(e) {
          if (getBreakpoint() !== constants.DESKTOP) {
            e.progress = 0;
          }

          $overlay.style.opacity = lerp(0, 1, e.progress);

          e.progress *= 0.3;

          $picture.style.transform = "scaleY(" + (1 - e.progress) + ")";
          $img.style.transform = $overlay.style.transform = "scaleY(" + (1 + e.progress) + ")";
        }

        var scroller = scrollama();

        function setupParallax() {
          if (!$hero || !$picture || !$img) return;

          scroller
            .setup({
              step: ".js-course-hero__image",
              offset: 0,
              progress: true,
              debug: false
            })
            .onStepProgress(onProgress);
        }

        function onResize() {
          scroller.resize();
        }

        dispatcher.on(constants.EVENT_RESIZE, onResize);
        setupParallax();
      },
      {
        "../../../constants": 34,
        "../../dispatcher": 25,
        "../../ui/get-breakpoint": 29,
        "../../utils/lerp": 32,
        scrollama: 12
      }
    ],
    20: [
      function(require, module, exports) {
        var delegate = require("delegate-events");
        var focusTrap = require("../ui/focus-trap");
        var constants = require("../../constants");
        var dispatcher = require("../dispatcher");

        /**
         * This is a script for a generic modal window
         * there are listeners for button.js-modal-open and button.js-modal-close
         * it will set classes on body and modal element
         * and trap focus inside the modal
         *
         * <div hidden id="menu" role="dialog" aria-modal="true" aria-label="My modal">
         *  <button type="button" aria-label="Close modal" aria-expanded="false" aria-controls="menu" class="js-modal-close">close</button>
         * </div>
         *
         * <button type="button" aria-label="Open modal" aria-expanded="false" aria-controls="menu" class="js-modal-open">open</button>
         * <button type="button" aria-label="Toggle modal" aria-expanded="false" aria-controls="menu" class="js-modal-toggle">toggle</button>
         *
         * TODO: for now only 1 item can be opened at a time
         * things go wrong when more items are open at the same time
         * may need to be refactored to allow for multiple,
         * or at least to a point where things don't break
         *
         * TODO: url history for some modals?
         */

        /**
         * Show modal
         */

        var currentModalId = null;
        var currentModalType = null;

        function open(rel) {
          if (!rel) return;

          if (currentModalId) {
            close(currentModalId);
          }

          var $currentModal = document.getElementById(rel);
          if (!$currentModal) {
            return;
          }

          currentModalId = rel;
          currentModalType = $currentModal.getAttribute("data-modal") || currentModalId;

          function openAnimationEnd() {
            // remove opening class
            document.body.classList.remove(constants.MODAL_OPENING_CLASS);

            // stop listening to animationend
            $currentModal.removeEventListener("animationend", openAnimationEnd);

            // listen for key press
            document.addEventListener("keydown", onKeyDown, false);

            // toggle buttons aria-expanded attribute
            var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModalId + "']");
            for (var i = 0, l = $$showButtons.length; i < l; ++i) {
              $$showButtons[i].setAttribute("aria-expanded", true);
            }

            var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModalId + "']");
            for (i = 0, l = $$closeButtons.length; i < l; ++i) {
              $$closeButtons[i].setAttribute("aria-expanded", false);
            }

            var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModalId + "']");
            for (i = 0, l = $$toggleButtons.length; i < l; ++i) {
              $$toggleButtons[i].setAttribute("aria-expanded", true);
            }

            // trap focus inside element
            focusTrap.enable($currentModal);

            // emit event
            dispatcher.dispatch({
              type: constants.EVENT_MODAL_AFTER_OPEN,
              target: $currentModal
            });
          }

          // emit event
          dispatcher.dispatch({
            type: constants.EVENT_MODAL_BEFORE_OPEN,
            target: $currentModal
          });

          // unhide
          $currentModal.removeAttribute("hidden");

          // add class to body
          document.body.classList.add(constants.MODAL_OPEN_CLASS);
          document.body.classList.add(constants.MODAL_OPEN_CLASS + "--" + currentModalType);
          document.body.classList.add(constants.MODAL_OPENING_CLASS);

          // add class to element
          $currentModal.classList.add(constants.OPEN_CLASS);

          // listen for animation ending
          $currentModal.addEventListener("animationend", openAnimationEnd, false);
        }

        /**
         * Listen for show button clicks
         */

        function onOpenButtonClick(e) {
          var $btn = e.delegateTarget;
          var rel = $btn.getAttribute("aria-controls");

          if (rel) {
            open(rel);
          }
        }

        delegate.bind(document.body, ".js-modal-open", "click", onOpenButtonClick);

        /**
         * Close
         */

        function close(rel, cb) {
          if (rel && rel !== currentModalId) {
            return;
          }

          var $currentModal = document.getElementById(currentModalId);
          if (!$currentModal) {
            return;
          }

          function closeAnimationEnd() {
            // remove closing class from body
            document.body.classList.remove(constants.MODAL_CLOSING_CLASS);

            // stop listening for keydown
            document.removeEventListener("keydown", onKeyDown);

            // stop listening to animationend
            $currentModal.removeEventListener("animationend", closeAnimationEnd);

            // remove closed class from modal
            $currentModal.classList.remove(constants.CLOSED_CLASS);

            // remove open class from modal
            $currentModal.classList.remove(constants.OPEN_CLASS);

            // hide
            $currentModal.setAttribute("hidden", true);

            // remove class from body
            document.body.classList.remove(constants.MODAL_OPEN_CLASS);
            document.body.classList.remove(constants.MODAL_OPEN_CLASS + "--" + currentModalType);

            // enable focus outside of modal
            focusTrap.disable();

            // toggle buttons aria-expanded attribute
            var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModalId + "']");
            for (var i = 0, l = $$showButtons.length; i < l; ++i) {
              $$showButtons[i].setAttribute("aria-expanded", true);
            }

            var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModalId + "']");
            for (i = 0, l = $$closeButtons.length; i < l; ++i) {
              $$closeButtons[i].setAttribute("aria-expanded", false);
            }

            var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModalId + "']");
            for (i = 0, l = $$toggleButtons.length; i < l; ++i) {
              $$toggleButtons[i].setAttribute("aria-expanded", false);
            }

            // emit event
            dispatcher.dispatch({
              type: constants.EVENT_MODAL_AFTER_CLOSE,
              target: $currentModal
            });

            currentModalId = null;
            currentModalType = null;

            if (cb) cb();
          }

          // emit event
          dispatcher.dispatch({
            type: constants.EVENT_MODAL_BEFORE_CLOSE,
            target: $currentModal
          });

          // listen for animation ending
          $currentModal.addEventListener("animationend", closeAnimationEnd, false);

          // start closing
          $currentModal.classList.add(constants.CLOSED_CLASS);
          document.body.classList.add(constants.MODAL_CLOSING_CLASS);

          history.pushState("", "", window.location.pathname);
        }

        /**
         * Listen for close button clicks
         */

        function onCloseButtonClick(e) {
          var $btn = e.delegateTarget;
          var rel = $btn.getAttribute("aria-controls");
          if (rel) {
            close(rel);
          }
        }

        delegate.bind(document.body, ".js-modal-close", "click", onCloseButtonClick);

        /**
         * Listen for toggle button clicks
         */

        function onToggleButtonClick(e) {
          var $btn = e.delegateTarget;
          var rel = $btn.getAttribute("aria-controls");
          if (rel) {
            if ($btn.getAttribute("aria-expanded") === "true") {
              close(rel);
            } else {
              open(rel);
            }
          }
        }

        delegate.bind(document.body, ".js-modal-toggle", "click", onToggleButtonClick);

        /**
         * Close on escape press
         */

        function onKeyDown(e) {
          if (e.which === constants.KEY_ESCAPE) {
            close(null);
          }
        }

        /**
         * Open via dispatcher
         *
         * dispatcher.dispatch({
         *  type: constants.REQUEST_MODAL_OPEN,
         *  id: 'menu'
         * })
         */

        function onRequestOpen(e) {
          open(e.id);
        }

        dispatcher.on(constants.REQUEST_MODAL_OPEN, onRequestOpen);

        /**
         * Close via dispatcher
         *
         * dispatcher.dispatch({
         *  type: constants.REQUEST_MODAL_CLOSE
         *  cb: function() {}
         * })
         */

        function onRequestClose(e) {
          close(null, e.cb);
        }

        dispatcher.on(constants.REQUEST_MODAL_CLOSE, onRequestClose);

        /**
         * Catch hash change
         */

        function onPopState() {
          if (location.hash) {
            try {
              open(location.hash.substring(1));
            } catch (err) {
              console.log(err);
            }
          } else {
            close(null);
          }
        }
        onPopState();
        window.addEventListener("popstate", onPopState);
      },
      { "../../constants": 34, "../dispatcher": 25, "../ui/focus-trap": 28, "delegate-events": 4 }
    ],
    21: [
      function(require, module, exports) {
        var delegate = require("delegate-events");
        var findParent = require("find-parent");
        var constants = require("../../../constants");
        var getBreakpoint = require("../../ui/get-breakpoint");

        /**
         * Coursenav dropdown logic for desktop
         */

        var $currentDropdown;

        function open($el) {
          if (getBreakpoint() !== constants.DESKTOP) return;

          if ($el === $currentDropdown) {
            return;
          }

          close(null);
          $currentDropdown = $el;
          $currentDropdown.classList.add(constants.FOCUS_CLASS);
          document.body.classList.add(constants.COURSENAV_DROPDOWN_OPEN_CLASS);

          // listen for key press
          document.addEventListener("keydown", onKeyDown);
        }

        /**
         * Close
         */
        function close($el) {
          if (getBreakpoint() !== constants.DESKTOP) return;

          if ($el === $currentDropdown) {
            return;
          }

          if ($currentDropdown) {
            $currentDropdown.classList.remove(constants.FOCUS_CLASS);
            document.body.classList.remove(constants.COURSENAV_DROPDOWN_OPEN_CLASS);
            $currentDropdown = null;
          }

          // listen for key press
          document.removeEventListener("keydown", onKeyDown, false);
        }

        /**
         * Key press
         */

        function onKeyDown(e) {
          if (e.which === constants.KEY_ESCAPE) {
            var $focus = findParent.byClassName($currentDropdown, "js-subnav__item");
            if ($focus) {
              $focus.querySelector("a").focus();
            }
            close(null);
          }
        }

        /**
         * Open with pointer
         */

        function onMouseOver(e) {
          open(findParent.byClassName(e.delegateTarget, "js-subnav__item"));
        }

        delegate.bind(document.body, ".js-subnav__item", "mouseover", onMouseOver);

        /**
         * Close with pointer
         */

        function onMouseOut(e) {
          close(findParent.byClassName(e.relatedTarget, "js-subnav__item"));
        }

        delegate.bind(document.body, ".js-subnav__item", "mouseout", onMouseOut);

        /**
         * Open with keyboard focus
         */

        function onFocus(e) {
          open(findParent.byClassName(e.delegateTarget, "js-subnav__item"));
        }

        delegate.bind(document.body, ".js-subnav__item a", "focusin", onFocus);

        /**
         * Close with keyboard
         */

        function onFocusOut(e) {
          close(findParent.byClassName(e.relatedTarget, "js-subnav__item"));
        }

        delegate.bind(document.body, ".js-subnav__item a", "focusout", onFocusOut);
      },
      { "../../../constants": 34, "../../ui/get-breakpoint": 29, "delegate-events": 4, "find-parent": 6 }
    ],
    22: [
      function(require, module, exports) {
        var findParent = require("find-parent");
        var constants = require("../../../constants");
        var dispatcher = require("../../dispatcher");

        var $coursenav = document.querySelector(".js-coursenav");
        var $coursenavWrapper = document.querySelector(".js-coursenav-wrapper");

        /**
         * Before modal open, unhide wrapper
         */

        function onModalOpen(e) {
          if (!$coursenav) return;
          if (e.breakpoint === constants.DESKTOP) return;
          if (e.target !== $coursenav) {
            return;
          }
          $coursenavWrapper.removeAttribute("hidden");
          document.body.addEventListener("click", onBodyClick, false);
        }

        dispatcher.on(constants.EVENT_MODAL_BEFORE_OPEN, onModalOpen);

        /**
         * After modal closes, hide wrapper
         */

        function onModalClose(e) {
          if (!$coursenav) return;
          if (e.breakpoint === constants.DESKTOP) return;
          if (e.target !== $coursenav) {
            return;
          }
          $coursenavWrapper.setAttribute("hidden", true);
          document.body.removeEventListener("click", onBodyClick);
        }

        dispatcher.on(constants.EVENT_MODAL_AFTER_CLOSE, onModalClose);

        /**
         * Catch body clicks outside coursenav and close
         */

        function onBodyClick(e) {
          if (e.breakpoint === constants.DESKTOP) return;

          if (findParent.byClassName(e.target, "js-coursenav")) {
            if (e.target.nodeName !== "A") {
              return;
            } else {
              if (e.target.getAttribute("href").indexOf("#") !== 0) {
                return;
              }
            }
          }

          e.preventDefault();

          dispatcher.dispatch({
            type: constants.REQUEST_MODAL_CLOSE
          });
        }
      },
      { "../../../constants": 34, "../../dispatcher": 25, "find-parent": 6 }
    ],
    23: [
      function(require, module, exports) {
        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");
        var getBreakpoint = require("../../ui/get-breakpoint");

        /**
         * Listen to breakpoint changes
         * and make the coursenav modal or not based on breakpoint
         */

        var $coursenav = document.querySelector(".js-coursenav");
        var $coursenavWrapper = document.querySelector(".js-coursenav-wrapper");

        function onBreakpointChange(e) {
          if (!$coursenav) return;

          // for desktop
          if (e.breakpoint === constants.DESKTOP) {
            // make non modal
            $coursenavWrapper.setAttribute("aria-modal", "false");

            // remove open class
            $coursenav.classList.remove(constants.OPEN_CLASS);

            // remove hidden attribute
            $coursenavWrapper.removeAttribute("hidden");

            // for tablet and mobile
          } else {
            // if the coursenav isn't already open (e.g when switching between tablet/mobile)
            if (!$coursenav.classList.contains(constants.OPEN_CLASS)) {
              // make it modal
              $coursenavWrapper.setAttribute("aria-modal", true);

              // set hidden attribute
              $coursenavWrapper.setAttribute("hidden", "true");
            }
          }

          // clean up modal window
          $coursenav.removeAttribute("hidden");

          if (document.body.classList.contains(constants.MODAL_OPEN_CLASS + "--coursenav")) {
            dispatcher.dispatch({
              type: constants.REQUEST_MODAL_CLOSE,
              cb: function() {
                $coursenav.removeAttribute("hidden");
              }
            });
          }
        }

        onBreakpointChange({
          breakpoint: getBreakpoint()
        });

        dispatcher.on(constants.EVENT_BREAKPOINT_CHANGE, onBreakpointChange);

        /**
         * Add active state to coursenav anchor link
         */

        var $$subnavLinks = document.querySelectorAll(".js-subnav__item.is-active .js-coursenav-dropdown a");

        function setActiveNavItem(e) {
          var id = e.target.getAttribute("id");

          for (var i = 0, l = $$subnavLinks.length; i < l; ++i) {
            var $subnavLink = $$subnavLinks[i];
            var href = $subnavLink.getAttribute("href");

            // not an anchor link, move on
            if (href.indexOf("#") !== 0) continue;

            if (href.substring(1) === id) {
              $subnavLink.classList.add(constants.INVIEW_CLASS);
            } else {
              if ($subnavLink.classList.contains(constants.INVIEW_CLASS)) {
                $subnavLink.classList.remove(constants.INVIEW_CLASS);
              }
            }
          }
        }

        dispatcher.on(constants.EVENT_SECTION_INVIEW, setActiveNavItem);
      },
      { "../../../constants": 34, "../../dispatcher": 25, "../../ui/get-breakpoint": 29 }
    ],
    24: [
      function(require, module, exports) {
        var debounce = require("debounce");

        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");
        var getBreakpoint = require("../../ui/get-breakpoint");

        var $nav = document.querySelector(".js-nav");
        var $topbar = document.querySelector(".js-topbar");
        var $coursenav = document.querySelector(".js-coursenav");
        var $coursenavMobileToggle = document.querySelector(".js-coursenav-toggle");

        /**
         * Add a spacer to compensate the fixed header height
         */

        var $spacer = document.querySelector(".js-nav-spacer");
        function resizeSpacer() {
          if (!$nav || !$spacer) {
            return;
          }

          var h = 0;

          // always add topnav height
          if ($topbar) {
            h += $topbar.getBoundingClientRect().height;
          }

          // add coursenav height
          if ($coursenav) {
            if (getBreakpoint() === constants.DESKTOP) {
              h += $coursenav.getBoundingClientRect().height;
            } else {
              h += $coursenavMobileToggle.getBoundingClientRect().height;
            }
          }

          // set spacer height
          $spacer.style.height = h + "px";
        }

        /**
         * Window resize
         */

        function onResize() {
          resizeSpacer();
          calculateVisibleSpace();
        }

        dispatcher.on(constants.EVENT_RESIZE, onResize);

        setTimeout(onResize, 0);

        /**
         * Calculate visible space and set data attribute for easy access
         */

        function calculateVisibleSpace() {
          var visibleSpace = $spacer.getBoundingClientRect().height + $nav.getBoundingClientRect().top;

          if (+$spacer.getAttribute("data-space") !== visibleSpace) {
            $spacer.setAttribute("data-space", visibleSpace);

            dispatcher.dispatch({
              type: constants.EVENT_NAV_VISIBLE_SPACE_CHANGE,
              space: visibleSpace
            });
          }
        }

        // listen for current scroll for accurate measurement
        window.addEventListener("scroll", calculateVisibleSpace, { passive: true });

        // debounce for final measurement
        window.onscroll = debounce(calculateVisibleSpace, 250);
      },
      { "../../../constants": 34, "../../dispatcher": 25, "../../ui/get-breakpoint": 29, debounce: 3 }
    ],
    25: [
      function(require, module, exports) {
        var EventEmitter = require("events").EventEmitter;
        var assign = require("object-assign");

        /**
         * Dispatcher
         * The only task of the dispatcher is to notify
         * all handlers which actions have taken place.
         * Dispatcher should never have to handle any values directly,
         * it just passes them along.
         */

        var Dispatcher = assign({}, EventEmitter.prototype, {
          dispatch: function(payload) {
            if (!payload.type || payload.type.trim() === "" || payload.type === null) {
              throw new EventError("Invalid event name: " + payload.type);
            }
            this.emit(payload.type, payload);
          }
        });

        // set max number of listeners
        // this prevents: (node) warning: possible EventEmitter memory leak detected.
        // 11 listeners added. Use emitter.setMaxListeners() to increase limit.
        Dispatcher.setMaxListeners(200);

        module.exports = Dispatcher;

        /**
         * Event error
         */

        function EventError(message) {
          this.name = "EventError";
          this.message = message || "Event error";
          this.stack = new Error().stack;
        }

        EventError.prototype = Object.create(Error.prototype);
        EventError.prototype.constructor = EventError;

        module.exports.EventError = EventError;
      },
      { events: 5, "object-assign": 10 }
    ],
    26: [
      function(require, module, exports) {
        window.HAN = {};
        require("./ui/breakpoint-events");

        require("./components/nav/fixed");
        require("./ui/scroll");

        // course specific, split later?
        require("./components/nav/coursenav");
        require("./components/nav/coursenav-desktop");
        require("./components/nav/coursenav-mobile");
        require("./components/hero/course-hero");

        // content
        require("./components/content/collapsibles");
        require("./components/content/section");
        require("./components/content/anchor-link");
        require("./components/modal");
        require("./utils/video");
        require("./utils/grid");
      },
      {
        "./components/content/anchor-link": 16,
        "./components/content/collapsibles": 17,
        "./components/content/section": 18,
        "./components/hero/course-hero": 19,
        "./components/modal": 20,
        "./components/nav/coursenav": 23,
        "./components/nav/coursenav-desktop": 21,
        "./components/nav/coursenav-mobile": 22,
        "./components/nav/fixed": 24,
        "./ui/breakpoint-events": 27,
        "./ui/scroll": 30,
        "./utils/grid": 31,
        "./utils/video": 33
      }
    ],
    27: [
      function(require, module, exports) {
        var constants = require("../../constants");
        var dispatcher = require("../dispatcher");
        var getBreakpoint = require("./get-breakpoint");

        /**
         * Check for breakpoint changes
         * and notify dispatcher if breakpoint changes
         * or if window resizes
         */

        var _breakpoint = null;

        // check for initial breakpoint
        checkBreakpointChange();

        // debounce resize events
        window.addEventListener("resize", onResize, { passive: true });
        onResize();

        /**
         * on resize
         * dispatch window resize
         * check for breakpoint change
         */

        function onResize() {
          // notify dispatcher viewport has been resized
          dispatcher.dispatch({
            type: constants.EVENT_RESIZE
          });

          // check for breakpoint change
          checkBreakpointChange();
        }

        /**
         * check breakpoint change
         * dispatch event if changed
         */

        function checkBreakpointChange() {
          var newBreakpoint = getBreakpoint();

          // if breakpoint changed
          if (newBreakpoint !== _breakpoint) {
            _breakpoint = newBreakpoint;

            // notify dispatcher
            dispatcher.dispatch({
              type: constants.EVENT_BREAKPOINT_CHANGE,
              breakpoint: _breakpoint
            });

            // set html class
            document.documentElement.setAttribute("data-breakpoint", _breakpoint.toLowerCase());
          }
        }
      },
      { "../../constants": 34, "../dispatcher": 25, "./get-breakpoint": 29 }
    ],
    28: [
      function(require, module, exports) {
        var focusTrap = require("focus-trap");
        var assign = require("object-assign");

        /**
         * Trap focus
         */

        var focusTrapInstance;

        function enable($el, $initialFocus, options) {
          setTimeout(function() {
            focusTrapInstance = focusTrap(
              $el,
              assign(
                {},
                {
                  initialFocus: $initialFocus,
                  escapeDeactivates: false,
                  clickOutsideDeactivates: true
                },
                options
              )
            ).activate();
          }, 0);
        }

        module.exports.enable = enable;

        /**
         * Stop trap focus
         */

        function disable() {
          if (focusTrapInstance) {
            focusTrapInstance.deactivate();
            focusTrapInstance = null;
          }
        }

        module.exports.disable = disable;
      },
      { "focus-trap": 7, "object-assign": 10 }
    ],
    29: [
      function(require, module, exports) {
        var constants = require("../../constants");

        /**
         * get current breakpoint
         */

        function getBreakpoint() {
          var view = null;

          for (var key in constants.BREAKPOINTS) {
            if (window.matchMedia) {
              if (window.matchMedia("(min-width: " + constants.BREAKPOINTS[key] + "px)").matches) {
                view = key;
              }
            } else {
              if (document.documentElement.clientWidth >= constants.BREAKPOINTS[key]) {
                view = key;
              }
            }
          }

          return view;
        }

        module.exports = getBreakpoint;
      },
      { "../../constants": 34 }
    ],
    30: [
      function(require, module, exports) {
        var constants = require("../../constants");
        var dispatcher = require("../dispatcher");
        var scrollIntoView = require("scroll-into-view");

        var $topbar = document.querySelector(".js-topbar");

        /**
         * Check scroll and set body classes
         * - scrolling up
         * - scrolled to top
         * - scrolled to bottom
         */

        var y = document.documentElement.scrollTop;
        var preventScrollBehavior = false;

        function onScroll() {
          // do nothing is scrolling is done by javascript
          if (preventScrollBehavior) {
            return;
          }

          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

          // scroll direction
          var up = false;
          if (scrollTop < y) {
            up = true;
          }

          if (up) {
            if (!document.body.classList.contains(constants.SCROLLING_UP_CLASS)) {
              document.body.classList.add(constants.SCROLLING_UP_CLASS);
            }
          } else {
            if (document.body.classList.contains(constants.SCROLLING_UP_CLASS)) {
              document.body.classList.remove(constants.SCROLLING_UP_CLASS);
            }
          }

          y = scrollTop;

          // scrolled to top
          var scrolledTop = false;
          var scrolledBottom = false;

          if ($topbar) {
            if (y <= $topbar.getBoundingClientRect().height) {
              scrolledTop = true;
            }
          } else {
            if (y === 0) {
              scrolledTop = true;
            }
          }

          if (scrolledTop) {
            if (!document.body.classList.contains(constants.SCROLLED_TOP_CLASS)) {
              document.body.classList.add(constants.SCROLLED_TOP_CLASS);
            }
          } else {
            if (document.body.classList.contains(constants.SCROLLED_TOP_CLASS)) {
              document.body.classList.remove(constants.SCROLLED_TOP_CLASS);
            }
          }

          // scrolled to bottom
          if (y + window.innerHeight >= document.body.offsetHeight) {
            scrolledBottom = true;
          }

          if (scrolledBottom) {
            if (!document.body.classList.contains(constants.SCROLLED_BOTTOM_CLASS)) {
              document.body.classList.add(constants.SCROLLED_BOTTOM_CLASS);
            }
          } else {
            if (document.body.classList.contains(constants.SCROLLED_BOTTOM_CLASS)) {
              document.body.classList.remove(constants.SCROLLED_BOTTOM_CLASS);
            }
          }

          // scrolling main
          if (!scrolledTop && !scrolledBottom) {
            if (!document.body.classList.contains(constants.SCROLLED_FREE_CLASS)) {
              document.body.classList.add(constants.SCROLLED_FREE_CLASS);
            }
          } else {
            if (document.body.classList.contains(constants.SCROLLED_FREE_CLASS)) {
              document.body.classList.remove(constants.SCROLLED_FREE_CLASS);
            }
          }
        }

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        /**
         * handle request scroll to element
         * this behavior is way too complex, due to differences
         * in mobile/tablet and desktop navigation
         *
         * dispatcher.dispatch({
         *   type: constants.REQUEST_SCROLLTO,
         *   target: $element
         * });
         */

        var $navSpacer = document.querySelector(".js-nav-spacer");

        function onRequestScrollto(e) {
          if (!e.target) return;

          y = 0;
          onScroll();
          preventScrollBehavior = true;

          // adjust scroll a bit to update current scroll anchor
          scrollIntoView(
            e.target,
            {
              time: 250,
              align: {
                top: 0
              }
            },
            function() {
              // set focus
              e.target.setAttribute("tabindex", "-1");
              e.target.focus();

              // adjust scroll ofset
              if ($navSpacer) {
                window.scrollBy({ top: -$navSpacer.getAttribute("data-space"), behavior: "smooth" });
              }

              // re-enable scroll up/down logic
              setTimeout(function() {
                preventScrollBehavior = false;
              }, 200);
            }
          );
        }

        dispatcher.on(constants.REQUEST_SCROLLTO, onRequestScrollto);

        /**
         * Initial scroll offset
         */

        if (location.hash) {
          var $rel = document.getElementById(location.hash.substring(1));
          if ($rel) {
            dispatcher.dispatch({
              type: constants.REQUEST_SCROLLTO,
              target: $rel
            });
          }
        }
      },
      { "../../constants": 34, "../dispatcher": 25, "scroll-into-view": 11 }
    ],
    31: [
      function(require, module, exports) {
        /**
         * Toggle demo grid overlay with control + L
         */

        var i = 0;
        function toggle() {
          if (i % 2 === 0) {
            var $grid = document.createElement("div");
            $grid.classList.add("demo-grid-overlay");
            $grid.innerHTML =
              '<div class="demo-grid"><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div><div class="demo-grid__item"><span></span></div></div>';
            document.body.appendChild($grid);
          } else {
            document.body.removeChild(document.querySelector(".demo-grid-overlay"));
          }
          ++i;
        }

        window.HAN.grid = toggle;

        document.addEventListener(
          "keydown",
          function(e) {
            if (e.which === 76 && e.ctrlKey) {
              toggle();
            }
          },
          false
        );
      },
      {}
    ],
    32: [
      function(require, module, exports) {
        /**
         * Linear Interpolation util
         */

        module.exports = function lerp(start, end, t) {
          return start * (1 - t) + end * t;
        };
      },
      {}
    ],
    33: [
      function(require, module, exports) {
        /**
         * Video controls
         */

        var x = document.getElementsByClassName("play-pause");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].addEventListener("click", function() {
            var video = document.getElementById(this.dataset.target);

            if (video.paused == true) {
              video.play();
              this.classList.remove("paused");
              this.classList.add("playing");
            } else {
              video.pause();
              this.classList.add("paused");
              this.classList.remove("playing");
            }
          });
        }
      },
      {}
    ],
    34: [
      function(require, module, exports) {
        var keyMirror = require("keymirror");
        var assign = require("object-assign");

        /**
         * Classes
         */

        var classes = {
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
        };

        /**
         * Events
         */

        var events = keyMirror({
          EVENT_BREAKPOINT_CHANGE: null,
          EVENT_RESIZE: null,
          EVENT_MODAL_AFTER_OPEN: null,
          EVENT_MODAL_BEFORE_OPEN: null,
          EVENT_MODAL_AFTER_CLOSE: null,
          EVENT_MODAL_BEFORE_CLOSE: null,
          EVENT_SECTION_INVIEW: null,
          EVENT_SECTION_OUTVIEW: null,
          EVENT_NAV_VISIBLE_SPACE_CHANGE: null,
          REQUEST_MODAL_OPEN: null,
          REQUEST_MODAL_CLOSE: null,
          REQUEST_SCROLLTO: null
        });

        /**
         * Misc
         */

        var misc = {
          KEY_ESCAPE: 27,
          KEY_ENTER: 13,
          KEY_TAB: 9,
          KEY_BACKSPACE: 8,
          KEY_DELETE: 46,
          KEY_UP: 38,
          KEY_DOWN: 40,
          BREAKPOINTS: {
            MOBILE: 0,
            TABLET: 768,
            DESKTOP: 1024
          },
          MOBILE: "MOBILE",
          TABLET: "TABLET",
          DESKTOP: "DESKTOP"
        };

        var constants = assign({}, classes, events, misc);

        module.exports = constants;
      },
      { keymirror: 8, "object-assign": 10 }
    ]
  },
  {},
  [26]
);
