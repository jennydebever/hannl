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
      { tabbable: 12, xtend: 13 }
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
    12: [
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
    13: [
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
    14: [
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

        function toggle($btn, $content, speed) {
          if (!$btn || !$content) {
            return;
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
            slideDown($content, { duration: speed || 200 }).then(function() {
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
            slideUp($content, { duration: speed || 200 });
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
            toggle($btn, $content, 1);
          }
        }

        toggleOnLoad();
      },
      { "../../../constants": 28, "delegate-events": 4, "find-parent": 6, "slide-anim": 11 }
    ],
    15: [
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
         * <button type="button" aria-label="Open modal" aria-expanded="false" aria-controls="menu" class="js-modal-open">close</button>
         * <button type="button" aria-label="Toggle modal" aria-expanded="false" aria-controls="menu" class="js-modal-toggle">toggle</button>
         *
         * TODO: for now only 1 item can be opened at a time
         * things go wrong when more items are open at the same time
         * may need to be refactored to allow for multiple,
         * or at least to a point where things don't break
         */

        /**
         * Show modal
         */

        var currentModal = null;

        function open(rel) {
          if (!rel) return;

          if (currentModal) {
            close(currentModal);
          }

          currentModal = rel;

          var $currentModal = document.getElementById(rel);
          if (!$currentModal) {
            return;
          }

          function openAnimationEnd() {
            // stop listening to animationend
            $currentModal.removeEventListener("animationend", openAnimationEnd);

            // listen for key press
            document.addEventListener("keydown", onKeyDown, false);

            // toggle buttons aria-expanded attribute
            var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModal + "']");
            for (var i = 0, l = $$showButtons.length; i < l; ++i) {
              $$showButtons[i].setAttribute("aria-expanded", true);
            }

            var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModal + "']");
            for (i = 0, l = $$closeButtons.length; i < l; ++i) {
              $$closeButtons[i].setAttribute("aria-expanded", false);
            }

            var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModal + "']");
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
          document.body.classList.add(constants.MODAL_OPEN_CLASS + "--" + currentModal);

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
          if (rel && rel !== currentModal) {
            return;
          }

          var $currentModal = document.getElementById(currentModal);
          if (!$currentModal) {
            return;
          }

          function closeAnimationEnd() {
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
            document.body.classList.remove(constants.MODAL_OPEN_CLASS + "--" + currentModal);

            // enable focus outside of modal
            focusTrap.disable();

            // toggle buttons aria-expanded attribute
            var $$showButtons = document.querySelectorAll(".js-modal-show[aria-controls='" + currentModal + "']");
            for (var i = 0, l = $$showButtons.length; i < l; ++i) {
              $$showButtons[i].setAttribute("aria-expanded", true);
            }

            var $$closeButtons = document.querySelectorAll(".js-modal-hide[aria-controls='" + currentModal + "']");
            for (i = 0, l = $$closeButtons.length; i < l; ++i) {
              $$closeButtons[i].setAttribute("aria-expanded", false);
            }

            var $$toggleButtons = document.querySelectorAll(".js-modal-toggle[aria-controls='" + currentModal + "']");
            for (i = 0, l = $$toggleButtons.length; i < l; ++i) {
              $$toggleButtons[i].setAttribute("aria-expanded", false);
            }

            // emit event
            dispatcher.dispatch({
              type: constants.EVENT_MODAL_AFTER_CLOSE,
              target: $currentModal
            });

            currentModal = null;

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
          open(e.id, true);
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
      },
      { "../../constants": 28, "../dispatcher": 20, "../ui/focus-trap": 23, "delegate-events": 4 }
    ],
    16: [
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
      { "../../../constants": 28, "../../ui/get-breakpoint": 24, "delegate-events": 4, "find-parent": 6 }
    ],
    17: [
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
            return;
          }

          dispatcher.dispatch({
            type: constants.REQUEST_MODAL_CLOSE
          });
        }
      },
      { "../../../constants": 28, "../../dispatcher": 20, "find-parent": 6 }
    ],
    18: [
      function(require, module, exports) {
        var dispatcher = require("../../dispatcher");
        var constants = require("../../../constants");
        var getBreakpoint = require("../../ui/get-breakpoint");

        /**
         * Listen to breakpoint changes
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
      },
      { "../../../constants": 28, "../../dispatcher": 20, "../../ui/get-breakpoint": 24 }
    ],
    19: [
      function(require, module, exports) {
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
        }

        dispatcher.on(constants.EVENT_RESIZE, onResize);

        setTimeout(onResize, 0);
      },
      { "../../../constants": 28, "../../dispatcher": 20, "../../ui/get-breakpoint": 24 }
    ],
    20: [
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
    21: [
      function(require, module, exports) {
        window.HAN = {};
        require("./ui/breakpoint-events");

        require("./components/nav/fixed");
        require("./components/nav/coursenav");
        require("./components/nav/coursenav-desktop");
        require("./components/nav/coursenav-mobile");
        require("./ui/scroll-direction");
        require("./utils/grid");
        require("./utils/video");
        require("./components/content/collapsibles");
        require("./components/modal");
        require("./utils/grid");
      },
      {
        "./components/content/collapsibles": 14,
        "./components/modal": 15,
        "./components/nav/coursenav": 18,
        "./components/nav/coursenav-desktop": 16,
        "./components/nav/coursenav-mobile": 17,
        "./components/nav/fixed": 19,
        "./ui/breakpoint-events": 22,
        "./ui/scroll-direction": 25,
        "./utils/grid": 26,
        "./utils/video": 27
      }
    ],
    22: [
      function(require, module, exports) {
        var constants = require("../../constants");
        var dispatcher = require("../dispatcher");
        var debounce = require("debounce");
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
        window.addEventListener("resize", debounce(onResize, 50));
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
      { "../../constants": 28, "../dispatcher": 20, "./get-breakpoint": 24, debounce: 3 }
    ],
    23: [
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
    24: [
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
      { "../../constants": 28 }
    ],
    25: [
      function(require, module, exports) {
        var constants = require("../../constants");

        var $topbar = document.querySelector(".js-topbar");

        /**
         * Check scroll and set body classes
         * - scrolling up
         * - scrolled to top
         * - scrolled to bottom
         */

        var y = document.documentElement.scrollTop;

        function onScroll() {
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
      },
      { "../../constants": 28 }
    ],
    26: [
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
    27: [
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
    28: [
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
          MODAL_OPEN_CLASS: "modal-is-open",
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
          REQUEST_MODAL_OPEN: null,
          REQUEST_MODAL_CLOSE: null
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
  [21]
);
