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
      { tabbable: 14, xtend: 16 }
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
        (function(global) {
          /*!
* Tippy.js v3.1.1
* (c) 2017-2018 atomiks
* MIT
*/
          (function(global, factory) {
            typeof exports === "object" && typeof module !== "undefined"
              ? (module.exports = factory())
              : typeof define === "function" && define.amd
                ? define(factory)
                : (global.tippy = factory());
          })(this, function() {
            "use strict";

            var styles =
              '.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%);opacity:1}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%);opacity:1}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}';

            var version = "3.1.1";

            var _extends =
              Object.assign ||
              function(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];

                  for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                      target[key] = source[key];
                    }
                  }
                }

                return target;
              };

            var Defaults = {
              a11y: true,
              content: "",
              placement: "top",
              livePlacement: true,
              trigger: "mouseenter focus",
              hideOnClick: true,
              animation: "shift-away",
              animateFill: true,
              arrow: false,
              delay: [0, 20],
              duration: [325, 275],
              interactive: false,
              interactiveBorder: 2,
              interactiveDebounce: 0,
              theme: "dark",
              size: "regular",
              distance: 10,
              offset: 0,
              multiple: false,
              followCursor: false,
              inertia: false,
              updateDuration: 200,
              sticky: false,
              appendTo: function appendTo() {
                return document.body;
              },
              zIndex: 9999,
              touchHold: false,
              performance: false,
              flip: true,
              flipBehavior: "flip",
              arrowType: "sharp",
              arrowTransform: "",
              target: "",
              allowHTML: true,
              showOnInit: false,
              popperOptions: {},
              lazy: true,
              touch: true,
              wait: null,
              shouldPopperHideOnBlur: function shouldPopperHideOnBlur() {
                return true;
              },
              onShow: function onShow() {},
              onShown: function onShown() {},
              onHide: function onHide() {},
              onHidden: function onHidden() {},
              onMount: function onMount() {}
            };

            var setDefaults = function setDefaults(partialDefaults) {
              Defaults = _extends({}, Defaults, partialDefaults);
            };

            /**
             * If the set() method encounters one of these, the popperInstance must be
             * recreated
             */
            var POPPER_INSTANCE_RELATED_PROPS = [
              "placement",
              "popperOptions",
              "flip",
              "flipBehavior",
              "distance",
              "offset"
            ];

            /**!
             * @fileOverview Kickass library to create and place poppers near their reference elements.
             * @version 1.14.4
             * @license
             * Copyright (c) 2016 Federico Zivolo and contributors
             *
             * Permission is hereby granted, free of charge, to any person obtaining a copy
             * of this software and associated documentation files (the "Software"), to deal
             * in the Software without restriction, including without limitation the rights
             * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
             * copies of the Software, and to permit persons to whom the Software is
             * furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in all
             * copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
             * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
             * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
             * SOFTWARE.
             */
            var isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

            var longerTimeoutBrowsers = ["Edge", "Trident", "Firefox"];
            var timeoutDuration = 0;
            for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
              if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
                timeoutDuration = 1;
                break;
              }
            }

            function microtaskDebounce(fn) {
              var called = false;
              return function() {
                if (called) {
                  return;
                }
                called = true;
                window.Promise.resolve().then(function() {
                  called = false;
                  fn();
                });
              };
            }

            function taskDebounce(fn) {
              var scheduled = false;
              return function() {
                if (!scheduled) {
                  scheduled = true;
                  setTimeout(function() {
                    scheduled = false;
                    fn();
                  }, timeoutDuration);
                }
              };
            }

            var supportsMicroTasks = isBrowser && window.Promise;

            /**
             * Create a debounced version of a method, that's asynchronously deferred
             * but called in the minimum time possible.
             *
             * @method
             * @memberof Popper.Utils
             * @argument {Function} fn
             * @returns {Function}
             */
            var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

            /**
             * Check if the given variable is a function
             * @method
             * @memberof Popper.Utils
             * @argument {Any} functionToCheck - variable to check
             * @returns {Boolean} answer to: is a function?
             */
            function isFunction(functionToCheck) {
              var getType = {};
              return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
            }

            /**
             * Get CSS computed property of the given element
             * @method
             * @memberof Popper.Utils
             * @argument {Eement} element
             * @argument {String} property
             */
            function getStyleComputedProperty(element, property) {
              if (element.nodeType !== 1) {
                return [];
              }
              // NOTE: 1 DOM access here
              var css = getComputedStyle(element, null);
              return property ? css[property] : css;
            }

            /**
             * Returns the parentNode or the host of the element
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @returns {Element} parent
             */
            function getParentNode(element) {
              if (element.nodeName === "HTML") {
                return element;
              }
              return element.parentNode || element.host;
            }

            /**
             * Returns the scrolling parent of the given element
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @returns {Element} scroll parent
             */
            function getScrollParent(element) {
              // Return body, `getScroll` will take care to get the correct `scrollTop` from it
              if (!element) {
                return document.body;
              }

              switch (element.nodeName) {
                case "HTML":
                case "BODY":
                  return element.ownerDocument.body;
                case "#document":
                  return element.body;
              }

              // Firefox want us to check `-x` and `-y` variations as well

              var _getStyleComputedProp = getStyleComputedProperty(element),
                overflow = _getStyleComputedProp.overflow,
                overflowX = _getStyleComputedProp.overflowX,
                overflowY = _getStyleComputedProp.overflowY;

              if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
                return element;
              }

              return getScrollParent(getParentNode(element));
            }

            var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
            var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

            /**
             * Determines if the browser is Internet Explorer
             * @method
             * @memberof Popper.Utils
             * @param {Number} version to check
             * @returns {Boolean} isIE
             */
            function isIE(version) {
              if (version === 11) {
                return isIE11;
              }
              if (version === 10) {
                return isIE10;
              }
              return isIE11 || isIE10;
            }

            /**
             * Returns the offset parent of the given element
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @returns {Element} offset parent
             */
            function getOffsetParent(element) {
              if (!element) {
                return document.documentElement;
              }

              var noOffsetParent = isIE(10) ? document.body : null;

              // NOTE: 1 DOM access here
              var offsetParent = element.offsetParent;
              // Skip hidden elements which don't have an offsetParent
              while (offsetParent === noOffsetParent && element.nextElementSibling) {
                offsetParent = (element = element.nextElementSibling).offsetParent;
              }

              var nodeName = offsetParent && offsetParent.nodeName;

              if (!nodeName || nodeName === "BODY" || nodeName === "HTML") {
                return element ? element.ownerDocument.documentElement : document.documentElement;
              }

              // .offsetParent will return the closest TD or TABLE in case
              // no offsetParent is present, I hate this job...
              if (
                ["TD", "TABLE"].indexOf(offsetParent.nodeName) !== -1 &&
                getStyleComputedProperty(offsetParent, "position") === "static"
              ) {
                return getOffsetParent(offsetParent);
              }

              return offsetParent;
            }

            function isOffsetContainer(element) {
              var nodeName = element.nodeName;

              if (nodeName === "BODY") {
                return false;
              }
              return nodeName === "HTML" || getOffsetParent(element.firstElementChild) === element;
            }

            /**
             * Finds the root node (document, shadowDOM root) of the given element
             * @method
             * @memberof Popper.Utils
             * @argument {Element} node
             * @returns {Element} root node
             */
            function getRoot(node) {
              if (node.parentNode !== null) {
                return getRoot(node.parentNode);
              }

              return node;
            }

            /**
             * Finds the offset parent common to the two provided nodes
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element1
             * @argument {Element} element2
             * @returns {Element} common offset parent
             */
            function findCommonOffsetParent(element1, element2) {
              // This check is needed to avoid errors in case one of the elements isn't defined for any reason
              if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
                return document.documentElement;
              }

              // Here we make sure to give as "start" the element that comes first in the DOM
              var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
              var start = order ? element1 : element2;
              var end = order ? element2 : element1;

              // Get common ancestor container
              var range = document.createRange();
              range.setStart(start, 0);
              range.setEnd(end, 0);
              var commonAncestorContainer = range.commonAncestorContainer;

              // Both nodes are inside #document

              if (
                (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer) ||
                start.contains(end)
              ) {
                if (isOffsetContainer(commonAncestorContainer)) {
                  return commonAncestorContainer;
                }

                return getOffsetParent(commonAncestorContainer);
              }

              // one of the nodes is inside shadowDOM, find which one
              var element1root = getRoot(element1);
              if (element1root.host) {
                return findCommonOffsetParent(element1root.host, element2);
              } else {
                return findCommonOffsetParent(element1, getRoot(element2).host);
              }
            }

            /**
             * Gets the scroll value of the given element in the given side (top and left)
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @argument {String} side `top` or `left`
             * @returns {number} amount of scrolled pixels
             */
            function getScroll(element) {
              var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "top";

              var upperSide = side === "top" ? "scrollTop" : "scrollLeft";
              var nodeName = element.nodeName;

              if (nodeName === "BODY" || nodeName === "HTML") {
                var html = element.ownerDocument.documentElement;
                var scrollingElement = element.ownerDocument.scrollingElement || html;
                return scrollingElement[upperSide];
              }

              return element[upperSide];
            }

            /*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
            function includeScroll(rect, element) {
              var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

              var scrollTop = getScroll(element, "top");
              var scrollLeft = getScroll(element, "left");
              var modifier = subtract ? -1 : 1;
              rect.top += scrollTop * modifier;
              rect.bottom += scrollTop * modifier;
              rect.left += scrollLeft * modifier;
              rect.right += scrollLeft * modifier;
              return rect;
            }

            /*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

            function getBordersSize(styles, axis) {
              var sideA = axis === "x" ? "Left" : "Top";
              var sideB = sideA === "Left" ? "Right" : "Bottom";

              return (
                parseFloat(styles["border" + sideA + "Width"], 10) + parseFloat(styles["border" + sideB + "Width"], 10)
              );
            }

            function getSize(axis, body, html, computedStyle) {
              return Math.max(
                body["offset" + axis],
                body["scroll" + axis],
                html["client" + axis],
                html["offset" + axis],
                html["scroll" + axis],
                isIE(10)
                  ? parseInt(html["offset" + axis]) +
                    parseInt(computedStyle["margin" + (axis === "Height" ? "Top" : "Left")]) +
                    parseInt(computedStyle["margin" + (axis === "Height" ? "Bottom" : "Right")])
                  : 0
              );
            }

            function getWindowSizes(document) {
              var body = document.body;
              var html = document.documentElement;
              var computedStyle = isIE(10) && getComputedStyle(html);

              return {
                height: getSize("Height", body, html, computedStyle),
                width: getSize("Width", body, html, computedStyle)
              };
            }

            var classCallCheck$1 = function classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
              }
            };

            var createClass$1 = (function() {
              function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                  var descriptor = props[i];
                  descriptor.enumerable = descriptor.enumerable || false;
                  descriptor.configurable = true;
                  if ("value" in descriptor) descriptor.writable = true;
                  Object.defineProperty(target, descriptor.key, descriptor);
                }
              }

              return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
              };
            })();

            var defineProperty$1 = function defineProperty(obj, key, value) {
              if (key in obj) {
                Object.defineProperty(obj, key, {
                  value: value,
                  enumerable: true,
                  configurable: true,
                  writable: true
                });
              } else {
                obj[key] = value;
              }

              return obj;
            };

            var _extends$1 =
              Object.assign ||
              function(target) {
                for (var i = 1; i < arguments.length; i++) {
                  var source = arguments[i];

                  for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                      target[key] = source[key];
                    }
                  }
                }

                return target;
              };

            /**
             * Given element offsets, generate an output similar to getBoundingClientRect
             * @method
             * @memberof Popper.Utils
             * @argument {Object} offsets
             * @returns {Object} ClientRect like output
             */
            function getClientRect(offsets) {
              return _extends$1({}, offsets, {
                right: offsets.left + offsets.width,
                bottom: offsets.top + offsets.height
              });
            }

            /**
             * Get bounding client rect of given element
             * @method
             * @memberof Popper.Utils
             * @param {HTMLElement} element
             * @return {Object} client rect
             */
            function getBoundingClientRect(element) {
              var rect = {};

              // IE10 10 FIX: Please, don't ask, the element isn't
              // considered in DOM in some circumstances...
              // This isn't reproducible in IE10 compatibility mode of IE11
              try {
                if (isIE(10)) {
                  rect = element.getBoundingClientRect();
                  var scrollTop = getScroll(element, "top");
                  var scrollLeft = getScroll(element, "left");
                  rect.top += scrollTop;
                  rect.left += scrollLeft;
                  rect.bottom += scrollTop;
                  rect.right += scrollLeft;
                } else {
                  rect = element.getBoundingClientRect();
                }
              } catch (e) {}

              var result = {
                left: rect.left,
                top: rect.top,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
              };

              // subtract scrollbar size from sizes
              var sizes = element.nodeName === "HTML" ? getWindowSizes(element.ownerDocument) : {};
              var width = sizes.width || element.clientWidth || result.right - result.left;
              var height = sizes.height || element.clientHeight || result.bottom - result.top;

              var horizScrollbar = element.offsetWidth - width;
              var vertScrollbar = element.offsetHeight - height;

              // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
              // we make this check conditional for performance reasons
              if (horizScrollbar || vertScrollbar) {
                var styles = getStyleComputedProperty(element);
                horizScrollbar -= getBordersSize(styles, "x");
                vertScrollbar -= getBordersSize(styles, "y");

                result.width -= horizScrollbar;
                result.height -= vertScrollbar;
              }

              return getClientRect(result);
            }

            function getOffsetRectRelativeToArbitraryNode(children, parent) {
              var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

              var isIE10 = isIE(10);
              var isHTML = parent.nodeName === "HTML";
              var childrenRect = getBoundingClientRect(children);
              var parentRect = getBoundingClientRect(parent);
              var scrollParent = getScrollParent(children);

              var styles = getStyleComputedProperty(parent);
              var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
              var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

              // In cases where the parent is fixed, we must ignore negative scroll in offset calc
              if (fixedPosition && isHTML) {
                parentRect.top = Math.max(parentRect.top, 0);
                parentRect.left = Math.max(parentRect.left, 0);
              }
              var offsets = getClientRect({
                top: childrenRect.top - parentRect.top - borderTopWidth,
                left: childrenRect.left - parentRect.left - borderLeftWidth,
                width: childrenRect.width,
                height: childrenRect.height
              });
              offsets.marginTop = 0;
              offsets.marginLeft = 0;

              // Subtract margins of documentElement in case it's being used as parent
              // we do this only on HTML because it's the only element that behaves
              // differently when margins are applied to it. The margins are included in
              // the box of the documentElement, in the other cases not.
              if (!isIE10 && isHTML) {
                var marginTop = parseFloat(styles.marginTop, 10);
                var marginLeft = parseFloat(styles.marginLeft, 10);

                offsets.top -= borderTopWidth - marginTop;
                offsets.bottom -= borderTopWidth - marginTop;
                offsets.left -= borderLeftWidth - marginLeft;
                offsets.right -= borderLeftWidth - marginLeft;

                // Attach marginTop and marginLeft because in some circumstances we may need them
                offsets.marginTop = marginTop;
                offsets.marginLeft = marginLeft;
              }

              if (
                isIE10 && !fixedPosition
                  ? parent.contains(scrollParent)
                  : parent === scrollParent && scrollParent.nodeName !== "BODY"
              ) {
                offsets = includeScroll(offsets, parent);
              }

              return offsets;
            }

            function getViewportOffsetRectRelativeToArtbitraryNode(element) {
              var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              var html = element.ownerDocument.documentElement;
              var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
              var width = Math.max(html.clientWidth, window.innerWidth || 0);
              var height = Math.max(html.clientHeight, window.innerHeight || 0);

              var scrollTop = !excludeScroll ? getScroll(html) : 0;
              var scrollLeft = !excludeScroll ? getScroll(html, "left") : 0;

              var offset = {
                top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
                left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
                width: width,
                height: height
              };

              return getClientRect(offset);
            }

            /**
             * Check if the given element is fixed or is inside a fixed parent
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @argument {Element} customContainer
             * @returns {Boolean} answer to "isFixed?"
             */
            function isFixed(element) {
              var nodeName = element.nodeName;
              if (nodeName === "BODY" || nodeName === "HTML") {
                return false;
              }
              if (getStyleComputedProperty(element, "position") === "fixed") {
                return true;
              }
              return isFixed(getParentNode(element));
            }

            /**
             * Finds the first parent of an element that has a transformed property defined
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @returns {Element} first transformed parent or documentElement
             */

            function getFixedPositionOffsetParent(element) {
              // This check is needed to avoid errors in case one of the elements isn't defined for any reason
              if (!element || !element.parentElement || isIE()) {
                return document.documentElement;
              }
              var el = element.parentElement;
              while (el && getStyleComputedProperty(el, "transform") === "none") {
                el = el.parentElement;
              }
              return el || document.documentElement;
            }

            /**
             * Computed the boundaries limits and return them
             * @method
             * @memberof Popper.Utils
             * @param {HTMLElement} popper
             * @param {HTMLElement} reference
             * @param {number} padding
             * @param {HTMLElement} boundariesElement - Element used to define the boundaries
             * @param {Boolean} fixedPosition - Is in fixed position mode
             * @returns {Object} Coordinates of the boundaries
             */
            function getBoundaries(popper, reference, padding, boundariesElement) {
              var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

              // NOTE: 1 DOM access here

              var boundaries = { top: 0, left: 0 };
              var offsetParent = fixedPosition
                ? getFixedPositionOffsetParent(popper)
                : findCommonOffsetParent(popper, reference);

              // Handle viewport case
              if (boundariesElement === "viewport") {
                boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
              } else {
                // Handle other cases based on DOM element used as boundaries
                var boundariesNode = void 0;
                if (boundariesElement === "scrollParent") {
                  boundariesNode = getScrollParent(getParentNode(reference));
                  if (boundariesNode.nodeName === "BODY") {
                    boundariesNode = popper.ownerDocument.documentElement;
                  }
                } else if (boundariesElement === "window") {
                  boundariesNode = popper.ownerDocument.documentElement;
                } else {
                  boundariesNode = boundariesElement;
                }

                var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

                // In case of HTML, we need a different computation
                if (boundariesNode.nodeName === "HTML" && !isFixed(offsetParent)) {
                  var _getWindowSizes = getWindowSizes(popper.ownerDocument),
                    height = _getWindowSizes.height,
                    width = _getWindowSizes.width;

                  boundaries.top += offsets.top - offsets.marginTop;
                  boundaries.bottom = height + offsets.top;
                  boundaries.left += offsets.left - offsets.marginLeft;
                  boundaries.right = width + offsets.left;
                } else {
                  // for all the other DOM elements, this one is good
                  boundaries = offsets;
                }
              }

              // Add paddings
              padding = padding || 0;
              var isPaddingNumber = typeof padding === "number";
              boundaries.left += isPaddingNumber ? padding : padding.left || 0;
              boundaries.top += isPaddingNumber ? padding : padding.top || 0;
              boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
              boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

              return boundaries;
            }

            function getArea(_ref) {
              var width = _ref.width,
                height = _ref.height;

              return width * height;
            }

            /**
             * Utility used to transform the `auto` placement to the placement with more
             * available space.
             * @method
             * @memberof Popper.Utils
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
              var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

              if (placement.indexOf("auto") === -1) {
                return placement;
              }

              var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

              var rects = {
                top: {
                  width: boundaries.width,
                  height: refRect.top - boundaries.top
                },
                right: {
                  width: boundaries.right - refRect.right,
                  height: boundaries.height
                },
                bottom: {
                  width: boundaries.width,
                  height: boundaries.bottom - refRect.bottom
                },
                left: {
                  width: refRect.left - boundaries.left,
                  height: boundaries.height
                }
              };

              var sortedAreas = Object.keys(rects)
                .map(function(key) {
                  return _extends$1(
                    {
                      key: key
                    },
                    rects[key],
                    {
                      area: getArea(rects[key])
                    }
                  );
                })
                .sort(function(a, b) {
                  return b.area - a.area;
                });

              var filteredAreas = sortedAreas.filter(function(_ref2) {
                var width = _ref2.width,
                  height = _ref2.height;
                return width >= popper.clientWidth && height >= popper.clientHeight;
              });

              var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

              var variation = placement.split("-")[1];

              return computedPlacement + (variation ? "-" + variation : "");
            }

            /**
             * Get offsets to the reference element
             * @method
             * @memberof Popper.Utils
             * @param {Object} state
             * @param {Element} popper - the popper element
             * @param {Element} reference - the reference element (the popper will be relative to this)
             * @param {Element} fixedPosition - is in fixed position mode
             * @returns {Object} An object containing the offsets which will be applied to the popper
             */
            function getReferenceOffsets(state, popper, reference) {
              var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

              var commonOffsetParent = fixedPosition
                ? getFixedPositionOffsetParent(popper)
                : findCommonOffsetParent(popper, reference);
              return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
            }

            /**
             * Get the outer sizes of the given element (offset size + margins)
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element
             * @returns {Object} object containing width and height properties
             */
            function getOuterSizes(element) {
              var styles = getComputedStyle(element);
              var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
              var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
              var result = {
                width: element.offsetWidth + y,
                height: element.offsetHeight + x
              };
              return result;
            }

            /**
             * Get the opposite placement of the given one
             * @method
             * @memberof Popper.Utils
             * @argument {String} placement
             * @returns {String} flipped placement
             */
            function getOppositePlacement(placement) {
              var hash = { left: "right", right: "left", bottom: "top", top: "bottom" };
              return placement.replace(/left|right|bottom|top/g, function(matched) {
                return hash[matched];
              });
            }

            /**
             * Get offsets to the popper
             * @method
             * @memberof Popper.Utils
             * @param {Object} position - CSS position the Popper will get applied
             * @param {HTMLElement} popper - the popper element
             * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
             * @param {String} placement - one of the valid placement options
             * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
             */
            function getPopperOffsets(popper, referenceOffsets, placement) {
              placement = placement.split("-")[0];

              // Get popper node sizes
              var popperRect = getOuterSizes(popper);

              // Add position, width and height to our offsets object
              var popperOffsets = {
                width: popperRect.width,
                height: popperRect.height
              };

              // depending by the popper placement we have to compute its offsets slightly differently
              var isHoriz = ["right", "left"].indexOf(placement) !== -1;
              var mainSide = isHoriz ? "top" : "left";
              var secondarySide = isHoriz ? "left" : "top";
              var measurement = isHoriz ? "height" : "width";
              var secondaryMeasurement = !isHoriz ? "height" : "width";

              popperOffsets[mainSide] =
                referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
              if (placement === secondarySide) {
                popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
              } else {
                popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
              }

              return popperOffsets;
            }

            /**
             * Mimics the `find` method of Array
             * @method
             * @memberof Popper.Utils
             * @argument {Array} arr
             * @argument prop
             * @argument value
             * @returns index or -1
             */
            function find(arr, check) {
              // use native find if supported
              if (Array.prototype.find) {
                return arr.find(check);
              }

              // use `filter` to obtain the same behavior of `find`
              return arr.filter(check)[0];
            }

            /**
             * Return the index of the matching object
             * @method
             * @memberof Popper.Utils
             * @argument {Array} arr
             * @argument prop
             * @argument value
             * @returns index or -1
             */
            function findIndex(arr, prop, value) {
              // use native findIndex if supported
              if (Array.prototype.findIndex) {
                return arr.findIndex(function(cur) {
                  return cur[prop] === value;
                });
              }

              // use `find` + `indexOf` if `findIndex` isn't supported
              var match = find(arr, function(obj) {
                return obj[prop] === value;
              });
              return arr.indexOf(match);
            }

            /**
             * Loop trough the list of modifiers and run them in order,
             * each of them will then edit the data object.
             * @method
             * @memberof Popper.Utils
             * @param {dataObject} data
             * @param {Array} modifiers
             * @param {String} ends - Optional modifier name used as stopper
             * @returns {dataObject}
             */
            function runModifiers(modifiers, data, ends) {
              var modifiersToRun =
                ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, "name", ends));

              modifiersToRun.forEach(function(modifier) {
                if (modifier["function"]) {
                  // eslint-disable-line dot-notation
                  console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                }
                var fn = modifier["function"] || modifier.fn; // eslint-disable-line dot-notation
                if (modifier.enabled && isFunction(fn)) {
                  // Add properties to offsets to make them a complete clientRect object
                  // we do this before each modifier to make sure the previous one doesn't
                  // mess with these values
                  data.offsets.popper = getClientRect(data.offsets.popper);
                  data.offsets.reference = getClientRect(data.offsets.reference);

                  data = fn(data, modifier);
                }
              });

              return data;
            }

            /**
             * Updates the position of the popper, computing the new offsets and applying
             * the new style.<br />
             * Prefer `scheduleUpdate` over `update` because of performance reasons.
             * @method
             * @memberof Popper
             */
            function update() {
              // if popper is destroyed, don't perform any further update
              if (this.state.isDestroyed) {
                return;
              }

              var data = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: false,
                offsets: {}
              };

              // compute reference element offsets
              data.offsets.reference = getReferenceOffsets(
                this.state,
                this.popper,
                this.reference,
                this.options.positionFixed
              );

              // compute auto placement, store placement inside the data object,
              // modifiers will be able to edit `placement` if needed
              // and refer to originalPlacement to know the original value
              data.placement = computeAutoPlacement(
                this.options.placement,
                data.offsets.reference,
                this.popper,
                this.reference,
                this.options.modifiers.flip.boundariesElement,
                this.options.modifiers.flip.padding
              );

              // store the computed placement inside `originalPlacement`
              data.originalPlacement = data.placement;

              data.positionFixed = this.options.positionFixed;

              // compute the popper offsets
              data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

              data.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute";

              // run the modifiers
              data = runModifiers(this.modifiers, data);

              // the first `update` will call `onCreate` callback
              // the other ones will call `onUpdate` callback
              if (!this.state.isCreated) {
                this.state.isCreated = true;
                this.options.onCreate(data);
              } else {
                this.options.onUpdate(data);
              }
            }

            /**
             * Helper used to know if the given modifier is enabled.
             * @method
             * @memberof Popper.Utils
             * @returns {Boolean}
             */
            function isModifierEnabled(modifiers, modifierName) {
              return modifiers.some(function(_ref) {
                var name = _ref.name,
                  enabled = _ref.enabled;
                return enabled && name === modifierName;
              });
            }

            /**
             * Get the prefixed supported property name
             * @method
             * @memberof Popper.Utils
             * @argument {String} property (camelCase)
             * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
             */
            function getSupportedPropertyName(property) {
              var prefixes = [false, "ms", "Webkit", "Moz", "O"];
              var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

              for (var i = 0; i < prefixes.length; i++) {
                var prefix = prefixes[i];
                var toCheck = prefix ? "" + prefix + upperProp : property;
                if (typeof document.body.style[toCheck] !== "undefined") {
                  return toCheck;
                }
              }
              return null;
            }

            /**
             * Destroys the popper.
             * @method
             * @memberof Popper
             */
            function destroy() {
              this.state.isDestroyed = true;

              // touch DOM only if `applyStyle` modifier is enabled
              if (isModifierEnabled(this.modifiers, "applyStyle")) {
                this.popper.removeAttribute("x-placement");
                this.popper.style.position = "";
                this.popper.style.top = "";
                this.popper.style.left = "";
                this.popper.style.right = "";
                this.popper.style.bottom = "";
                this.popper.style.willChange = "";
                this.popper.style[getSupportedPropertyName("transform")] = "";
              }

              this.disableEventListeners();

              // remove the popper if user explicity asked for the deletion on destroy
              // do not use `remove` because IE11 doesn't support it
              if (this.options.removeOnDestroy) {
                this.popper.parentNode.removeChild(this.popper);
              }
              return this;
            }

            /**
             * Get the window associated with the element
             * @argument {Element} element
             * @returns {Window}
             */
            function getWindow(element) {
              var ownerDocument = element.ownerDocument;
              return ownerDocument ? ownerDocument.defaultView : window;
            }

            function attachToScrollParents(scrollParent, event, callback, scrollParents) {
              var isBody = scrollParent.nodeName === "BODY";
              var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
              target.addEventListener(event, callback, { passive: true });

              if (!isBody) {
                attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
              }
              scrollParents.push(target);
            }

            /**
             * Setup needed event listeners used to update the popper position
             * @method
             * @memberof Popper.Utils
             * @private
             */
            function setupEventListeners(reference, options, state, updateBound) {
              // Resize event listener on window
              state.updateBound = updateBound;
              getWindow(reference).addEventListener("resize", state.updateBound, { passive: true });

              // Scroll event listener on scroll parents
              var scrollElement = getScrollParent(reference);
              attachToScrollParents(scrollElement, "scroll", state.updateBound, state.scrollParents);
              state.scrollElement = scrollElement;
              state.eventsEnabled = true;

              return state;
            }

            /**
             * It will add resize/scroll events and start recalculating
             * position of the popper element when they are triggered.
             * @method
             * @memberof Popper
             */
            function enableEventListeners() {
              if (!this.state.eventsEnabled) {
                this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
              }
            }

            /**
             * Remove event listeners used to update the popper position
             * @method
             * @memberof Popper.Utils
             * @private
             */
            function removeEventListeners(reference, state) {
              // Remove resize event listener on window
              getWindow(reference).removeEventListener("resize", state.updateBound);

              // Remove scroll event listener on scroll parents
              state.scrollParents.forEach(function(target) {
                target.removeEventListener("scroll", state.updateBound);
              });

              // Reset state
              state.updateBound = null;
              state.scrollParents = [];
              state.scrollElement = null;
              state.eventsEnabled = false;
              return state;
            }

            /**
             * It will remove resize/scroll events and won't recalculate popper position
             * when they are triggered. It also won't trigger `onUpdate` callback anymore,
             * unless you call `update` method manually.
             * @method
             * @memberof Popper
             */
            function disableEventListeners() {
              if (this.state.eventsEnabled) {
                cancelAnimationFrame(this.scheduleUpdate);
                this.state = removeEventListeners(this.reference, this.state);
              }
            }

            /**
             * Tells if a given input is a number
             * @method
             * @memberof Popper.Utils
             * @param {*} input to check
             * @return {Boolean}
             */
            function isNumeric(n) {
              return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
            }

            /**
             * Set the style to the given popper
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element - Element to apply the style to
             * @argument {Object} styles
             * Object with a list of properties and values which will be applied to the element
             */
            function setStyles(element, styles) {
              Object.keys(styles).forEach(function(prop) {
                var unit = "";
                // add unit if the value is numeric and is one of the following
                if (
                  ["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 &&
                  isNumeric(styles[prop])
                ) {
                  unit = "px";
                }
                element.style[prop] = styles[prop] + unit;
              });
            }

            /**
             * Set the attributes to the given popper
             * @method
             * @memberof Popper.Utils
             * @argument {Element} element - Element to apply the attributes to
             * @argument {Object} styles
             * Object with a list of properties and values which will be applied to the element
             */
            function setAttributes(element, attributes) {
              Object.keys(attributes).forEach(function(prop) {
                var value = attributes[prop];
                if (value !== false) {
                  element.setAttribute(prop, attributes[prop]);
                } else {
                  element.removeAttribute(prop);
                }
              });
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @argument {Object} data.styles - List of style properties - values to apply to popper element
             * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The same data object
             */
            function applyStyle(data) {
              // any property present in `data.styles` will be applied to the popper,
              // in this way we can make the 3rd party modifiers add custom styles to it
              // Be aware, modifiers could override the properties defined in the previous
              // lines of this modifier!
              setStyles(data.instance.popper, data.styles);

              // any property present in `data.attributes` will be applied to the popper,
              // they will be set as HTML attributes of the element
              setAttributes(data.instance.popper, data.attributes);

              // if arrowElement is defined and arrowStyles has some properties
              if (data.arrowElement && Object.keys(data.arrowStyles).length) {
                setStyles(data.arrowElement, data.arrowStyles);
              }

              return data;
            }

            /**
             * Set the x-placement attribute before everything else because it could be used
             * to add margins to the popper margins needs to be calculated to get the
             * correct popper offsets.
             * @method
             * @memberof Popper.modifiers
             * @param {HTMLElement} reference - The reference element used to position the popper
             * @param {HTMLElement} popper - The HTML element used as popper
             * @param {Object} options - Popper.js options
             */
            function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
              // compute reference element offsets
              var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

              // compute auto placement, store placement inside the data object,
              // modifiers will be able to edit `placement` if needed
              // and refer to originalPlacement to know the original value
              var placement = computeAutoPlacement(
                options.placement,
                referenceOffsets,
                popper,
                reference,
                options.modifiers.flip.boundariesElement,
                options.modifiers.flip.padding
              );

              popper.setAttribute("x-placement", placement);

              // Apply `position` to popper before anything else because
              // without the position applied we can't guarantee correct computations
              setStyles(popper, { position: options.positionFixed ? "fixed" : "absolute" });

              return options;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function computeStyle(data, options) {
              var x = options.x,
                y = options.y;
              var popper = data.offsets.popper;

              // Remove this legacy support in Popper.js v2

              var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
                return modifier.name === "applyStyle";
              }).gpuAcceleration;
              if (legacyGpuAccelerationOption !== undefined) {
                console.warn(
                  "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                );
              }
              var gpuAcceleration =
                legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

              var offsetParent = getOffsetParent(data.instance.popper);
              var offsetParentRect = getBoundingClientRect(offsetParent);

              // Styles
              var styles = {
                position: popper.position
              };

              // Avoid blurry text by using full pixel integers.
              // For pixel-perfect positioning, top/bottom prefers rounded
              // values, while left/right prefers floored values.
              var offsets = {
                left: Math.floor(popper.left),
                top: Math.round(popper.top),
                bottom: Math.round(popper.bottom),
                right: Math.floor(popper.right)
              };

              var sideA = x === "bottom" ? "top" : "bottom";
              var sideB = y === "right" ? "left" : "right";

              // if gpuAcceleration is set to `true` and transform is supported,
              //  we use `translate3d` to apply the position to the popper we
              // automatically use the supported prefixed version if needed
              var prefixedProperty = getSupportedPropertyName("transform");

              // now, let's make a step back and look at this code closely (wtf?)
              // If the content of the popper grows once it's been positioned, it
              // may happen that the popper gets misplaced because of the new content
              // overflowing its reference element
              // To avoid this problem, we provide two options (x and y), which allow
              // the consumer to define the offset origin.
              // If we position a popper on top of a reference element, we can set
              // `x` to `top` to make the popper grow towards its top instead of
              // its bottom.
              var left = void 0,
                top = void 0;
              if (sideA === "bottom") {
                // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
                // and not the bottom of the html element
                if (offsetParent.nodeName === "HTML") {
                  top = -offsetParent.clientHeight + offsets.bottom;
                } else {
                  top = -offsetParentRect.height + offsets.bottom;
                }
              } else {
                top = offsets.top;
              }
              if (sideB === "right") {
                if (offsetParent.nodeName === "HTML") {
                  left = -offsetParent.clientWidth + offsets.right;
                } else {
                  left = -offsetParentRect.width + offsets.right;
                }
              } else {
                left = offsets.left;
              }
              if (gpuAcceleration && prefixedProperty) {
                styles[prefixedProperty] = "translate3d(" + left + "px, " + top + "px, 0)";
                styles[sideA] = 0;
                styles[sideB] = 0;
                styles.willChange = "transform";
              } else {
                // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
                var invertTop = sideA === "bottom" ? -1 : 1;
                var invertLeft = sideB === "right" ? -1 : 1;
                styles[sideA] = top * invertTop;
                styles[sideB] = left * invertLeft;
                styles.willChange = sideA + ", " + sideB;
              }

              // Attributes
              var attributes = {
                "x-placement": data.placement
              };

              // Update `data` attributes, styles and arrowStyles
              data.attributes = _extends$1({}, attributes, data.attributes);
              data.styles = _extends$1({}, styles, data.styles);
              data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

              return data;
            }

            /**
             * Helper used to know if the given modifier depends from another one.<br />
             * It checks if the needed modifier is listed and enabled.
             * @method
             * @memberof Popper.Utils
             * @param {Array} modifiers - list of modifiers
             * @param {String} requestingName - name of requesting modifier
             * @param {String} requestedName - name of requested modifier
             * @returns {Boolean}
             */
            function isModifierRequired(modifiers, requestingName, requestedName) {
              var requesting = find(modifiers, function(_ref) {
                var name = _ref.name;
                return name === requestingName;
              });

              var isRequired =
                !!requesting &&
                modifiers.some(function(modifier) {
                  return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
                });

              if (!isRequired) {
                var _requesting = "`" + requestingName + "`";
                var requested = "`" + requestedName + "`";
                console.warn(
                  requested +
                    " modifier is required by " +
                    _requesting +
                    " modifier in order to work, be sure to include it before " +
                    _requesting +
                    "!"
                );
              }
              return isRequired;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function arrow(data, options) {
              var _data$offsets$arrow;

              // arrow depends on keepTogether in order to work
              if (!isModifierRequired(data.instance.modifiers, "arrow", "keepTogether")) {
                return data;
              }

              var arrowElement = options.element;

              // if arrowElement is a string, suppose it's a CSS selector
              if (typeof arrowElement === "string") {
                arrowElement = data.instance.popper.querySelector(arrowElement);

                // if arrowElement is not found, don't run the modifier
                if (!arrowElement) {
                  return data;
                }
              } else {
                // if the arrowElement isn't a query selector we must check that the
                // provided DOM node is child of its popper node
                if (!data.instance.popper.contains(arrowElement)) {
                  console.warn("WARNING: `arrow.element` must be child of its popper element!");
                  return data;
                }
              }

              var placement = data.placement.split("-")[0];
              var _data$offsets = data.offsets,
                popper = _data$offsets.popper,
                reference = _data$offsets.reference;

              var isVertical = ["left", "right"].indexOf(placement) !== -1;

              var len = isVertical ? "height" : "width";
              var sideCapitalized = isVertical ? "Top" : "Left";
              var side = sideCapitalized.toLowerCase();
              var altSide = isVertical ? "left" : "top";
              var opSide = isVertical ? "bottom" : "right";
              var arrowElementSize = getOuterSizes(arrowElement)[len];

              //
              // extends keepTogether behavior making sure the popper and its
              // reference have enough pixels in conjunction
              //

              // top/left side
              if (reference[opSide] - arrowElementSize < popper[side]) {
                data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
              }
              // bottom/right side
              if (reference[side] + arrowElementSize > popper[opSide]) {
                data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
              }
              data.offsets.popper = getClientRect(data.offsets.popper);

              // compute center of the popper
              var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

              // Compute the sideValue using the updated popper offsets
              // take popper margin in account because we don't have this info available
              var css = getStyleComputedProperty(data.instance.popper);
              var popperMarginSide = parseFloat(css["margin" + sideCapitalized], 10);
              var popperBorderSide = parseFloat(css["border" + sideCapitalized + "Width"], 10);
              var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

              // prevent arrowElement from being placed not contiguously to its popper
              sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

              data.arrowElement = arrowElement;
              data.offsets.arrow = ((_data$offsets$arrow = {}),
              defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)),
              defineProperty$1(_data$offsets$arrow, altSide, ""),
              _data$offsets$arrow);

              return data;
            }

            /**
             * Get the opposite placement variation of the given one
             * @method
             * @memberof Popper.Utils
             * @argument {String} placement variation
             * @returns {String} flipped placement variation
             */
            function getOppositeVariation(variation) {
              if (variation === "end") {
                return "start";
              } else if (variation === "start") {
                return "end";
              }
              return variation;
            }

            /**
             * List of accepted placements to use as values of the `placement` option.<br />
             * Valid placements are:
             * - `auto`
             * - `top`
             * - `right`
             * - `bottom`
             * - `left`
             *
             * Each placement can have a variation from this list:
             * - `-start`
             * - `-end`
             *
             * Variations are interpreted easily if you think of them as the left to right
             * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
             * is right.<br />
             * Vertically (`left` and `right`), `start` is top and `end` is bottom.
             *
             * Some valid examples are:
             * - `top-end` (on top of reference, right aligned)
             * - `right-start` (on right of reference, top aligned)
             * - `bottom` (on bottom, centered)
             * - `auto-end` (on the side with more space available, alignment depends by placement)
             *
             * @static
             * @type {Array}
             * @enum {String}
             * @readonly
             * @method placements
             * @memberof Popper
             */
            var placements = [
              "auto-start",
              "auto",
              "auto-end",
              "top-start",
              "top",
              "top-end",
              "right-start",
              "right",
              "right-end",
              "bottom-end",
              "bottom",
              "bottom-start",
              "left-end",
              "left",
              "left-start"
            ];

            // Get rid of `auto` `auto-start` and `auto-end`
            var validPlacements = placements.slice(3);

            /**
             * Given an initial placement, returns all the subsequent placements
             * clockwise (or counter-clockwise).
             *
             * @method
             * @memberof Popper.Utils
             * @argument {String} placement - A valid placement (it accepts variations)
             * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
             * @returns {Array} placements including their variations
             */
            function clockwise(placement) {
              var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

              var index = validPlacements.indexOf(placement);
              var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
              return counter ? arr.reverse() : arr;
            }

            var BEHAVIORS = {
              FLIP: "flip",
              CLOCKWISE: "clockwise",
              COUNTERCLOCKWISE: "counterclockwise"
            };

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function flip(data, options) {
              // if `inner` modifier is enabled, we can't use the `flip` modifier
              if (isModifierEnabled(data.instance.modifiers, "inner")) {
                return data;
              }

              if (data.flipped && data.placement === data.originalPlacement) {
                // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
                return data;
              }

              var boundaries = getBoundaries(
                data.instance.popper,
                data.instance.reference,
                options.padding,
                options.boundariesElement,
                data.positionFixed
              );

              var placement = data.placement.split("-")[0];
              var placementOpposite = getOppositePlacement(placement);
              var variation = data.placement.split("-")[1] || "";

              var flipOrder = [];

              switch (options.behavior) {
                case BEHAVIORS.FLIP:
                  flipOrder = [placement, placementOpposite];
                  break;
                case BEHAVIORS.CLOCKWISE:
                  flipOrder = clockwise(placement);
                  break;
                case BEHAVIORS.COUNTERCLOCKWISE:
                  flipOrder = clockwise(placement, true);
                  break;
                default:
                  flipOrder = options.behavior;
              }

              flipOrder.forEach(function(step, index) {
                if (placement !== step || flipOrder.length === index + 1) {
                  return data;
                }

                placement = data.placement.split("-")[0];
                placementOpposite = getOppositePlacement(placement);

                var popperOffsets = data.offsets.popper;
                var refOffsets = data.offsets.reference;

                // using floor because the reference offsets may contain decimals we are not going to consider here
                var floor = Math.floor;
                var overlapsRef =
                  (placement === "left" && floor(popperOffsets.right) > floor(refOffsets.left)) ||
                  (placement === "right" && floor(popperOffsets.left) < floor(refOffsets.right)) ||
                  (placement === "top" && floor(popperOffsets.bottom) > floor(refOffsets.top)) ||
                  (placement === "bottom" && floor(popperOffsets.top) < floor(refOffsets.bottom));

                var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
                var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
                var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
                var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

                var overflowsBoundaries =
                  (placement === "left" && overflowsLeft) ||
                  (placement === "right" && overflowsRight) ||
                  (placement === "top" && overflowsTop) ||
                  (placement === "bottom" && overflowsBottom);

                // flip the variation if required
                var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
                var flippedVariation =
                  !!options.flipVariations &&
                  ((isVertical && variation === "start" && overflowsLeft) ||
                    (isVertical && variation === "end" && overflowsRight) ||
                    (!isVertical && variation === "start" && overflowsTop) ||
                    (!isVertical && variation === "end" && overflowsBottom));

                if (overlapsRef || overflowsBoundaries || flippedVariation) {
                  // this boolean to detect any flip loop
                  data.flipped = true;

                  if (overlapsRef || overflowsBoundaries) {
                    placement = flipOrder[index + 1];
                  }

                  if (flippedVariation) {
                    variation = getOppositeVariation(variation);
                  }

                  data.placement = placement + (variation ? "-" + variation : "");

                  // this object contains `position`, we want to preserve it along with
                  // any additional property we may add in the future
                  data.offsets.popper = _extends$1(
                    {},
                    data.offsets.popper,
                    getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement)
                  );

                  data = runModifiers(data.instance.modifiers, data, "flip");
                }
              });
              return data;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function keepTogether(data) {
              var _data$offsets = data.offsets,
                popper = _data$offsets.popper,
                reference = _data$offsets.reference;

              var placement = data.placement.split("-")[0];
              var floor = Math.floor;
              var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
              var side = isVertical ? "right" : "bottom";
              var opSide = isVertical ? "left" : "top";
              var measurement = isVertical ? "width" : "height";

              if (popper[side] < floor(reference[opSide])) {
                data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
              }
              if (popper[opSide] > floor(reference[side])) {
                data.offsets.popper[opSide] = floor(reference[side]);
              }

              return data;
            }

            /**
             * Converts a string containing value + unit into a px value number
             * @function
             * @memberof {modifiers~offset}
             * @private
             * @argument {String} str - Value + unit string
             * @argument {String} measurement - `height` or `width`
             * @argument {Object} popperOffsets
             * @argument {Object} referenceOffsets
             * @returns {Number|String}
             * Value in pixels, or original string if no values were extracted
             */
            function toValue(str, measurement, popperOffsets, referenceOffsets) {
              // separate value from unit
              var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
              var value = +split[1];
              var unit = split[2];

              // If it's not a number it's an operator, I guess
              if (!value) {
                return str;
              }

              if (unit.indexOf("%") === 0) {
                var element = void 0;
                switch (unit) {
                  case "%p":
                    element = popperOffsets;
                    break;
                  case "%":
                  case "%r":
                  default:
                    element = referenceOffsets;
                }

                var rect = getClientRect(element);
                return (rect[measurement] / 100) * value;
              } else if (unit === "vh" || unit === "vw") {
                // if is a vh or vw, we calculate the size based on the viewport
                var size = void 0;
                if (unit === "vh") {
                  size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                } else {
                  size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                }
                return (size / 100) * value;
              } else {
                // if is an explicit pixel unit, we get rid of the unit and keep the value
                // if is an implicit unit, it's px, and we return just the value
                return value;
              }
            }

            /**
             * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
             * @function
             * @memberof {modifiers~offset}
             * @private
             * @argument {String} offset
             * @argument {Object} popperOffsets
             * @argument {Object} referenceOffsets
             * @argument {String} basePlacement
             * @returns {Array} a two cells array with x and y offsets in numbers
             */
            function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
              var offsets = [0, 0];

              // Use height if placement is left or right and index is 0 otherwise use width
              // in this way the first offset will use an axis and the second one
              // will use the other one
              var useHeight = ["right", "left"].indexOf(basePlacement) !== -1;

              // Split the offset string to obtain a list of values and operands
              // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
              var fragments = offset.split(/(\+|\-)/).map(function(frag) {
                return frag.trim();
              });

              // Detect if the offset string contains a pair of values or a single one
              // they could be separated by comma or space
              var divider = fragments.indexOf(
                find(fragments, function(frag) {
                  return frag.search(/,|\s/) !== -1;
                })
              );

              if (fragments[divider] && fragments[divider].indexOf(",") === -1) {
                console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
              }

              // If divider is found, we divide the list of values and operands to divide
              // them by ofset X and Y.
              var splitRegex = /\s*,\s*|\s+/;
              var ops =
                divider !== -1
                  ? [
                      fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]),
                      [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))
                    ]
                  : [fragments];

              // Convert the values with units to absolute pixels to allow our computations
              ops = ops.map(function(op, index) {
                // Most of the units rely on the orientation of the popper
                var measurement = (index === 1 ? !useHeight : useHeight) ? "height" : "width";
                var mergeWithPrevious = false;
                return (
                  op
                    // This aggregates any `+` or `-` sign that aren't considered operators
                    // e.g.: 10 + +5 => [10, +, +5]
                    .reduce(function(a, b) {
                      if (a[a.length - 1] === "" && ["+", "-"].indexOf(b) !== -1) {
                        a[a.length - 1] = b;
                        mergeWithPrevious = true;
                        return a;
                      } else if (mergeWithPrevious) {
                        a[a.length - 1] += b;
                        mergeWithPrevious = false;
                        return a;
                      } else {
                        return a.concat(b);
                      }
                    }, [])
                    // Here we convert the string values into number values (in px)
                    .map(function(str) {
                      return toValue(str, measurement, popperOffsets, referenceOffsets);
                    })
                );
              });

              // Loop trough the offsets arrays and execute the operations
              ops.forEach(function(op, index) {
                op.forEach(function(frag, index2) {
                  if (isNumeric(frag)) {
                    offsets[index] += frag * (op[index2 - 1] === "-" ? -1 : 1);
                  }
                });
              });
              return offsets;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @argument {Number|String} options.offset=0
             * The offset value as described in the modifier description
             * @returns {Object} The data object, properly modified
             */
            function offset(data, _ref) {
              var offset = _ref.offset;
              var placement = data.placement,
                _data$offsets = data.offsets,
                popper = _data$offsets.popper,
                reference = _data$offsets.reference;

              var basePlacement = placement.split("-")[0];

              var offsets = void 0;
              if (isNumeric(+offset)) {
                offsets = [+offset, 0];
              } else {
                offsets = parseOffset(offset, popper, reference, basePlacement);
              }

              if (basePlacement === "left") {
                popper.top += offsets[0];
                popper.left -= offsets[1];
              } else if (basePlacement === "right") {
                popper.top += offsets[0];
                popper.left += offsets[1];
              } else if (basePlacement === "top") {
                popper.left += offsets[0];
                popper.top -= offsets[1];
              } else if (basePlacement === "bottom") {
                popper.left += offsets[0];
                popper.top += offsets[1];
              }

              data.popper = popper;
              return data;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function preventOverflow(data, options) {
              var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

              // If offsetParent is the reference element, we really want to
              // go one step up and use the next offsetParent as reference to
              // avoid to make this modifier completely useless and look like broken
              if (data.instance.reference === boundariesElement) {
                boundariesElement = getOffsetParent(boundariesElement);
              }

              // NOTE: DOM access here
              // resets the popper's position so that the document size can be calculated excluding
              // the size of the popper element itself
              var transformProp = getSupportedPropertyName("transform");
              var popperStyles = data.instance.popper.style; // assignment to help minification
              var top = popperStyles.top,
                left = popperStyles.left,
                transform = popperStyles[transformProp];

              popperStyles.top = "";
              popperStyles.left = "";
              popperStyles[transformProp] = "";

              var boundaries = getBoundaries(
                data.instance.popper,
                data.instance.reference,
                options.padding,
                boundariesElement,
                data.positionFixed
              );

              // NOTE: DOM access here
              // restores the original style properties after the offsets have been computed
              popperStyles.top = top;
              popperStyles.left = left;
              popperStyles[transformProp] = transform;

              options.boundaries = boundaries;

              var order = options.priority;
              var popper = data.offsets.popper;

              var check = {
                primary: function primary(placement) {
                  var value = popper[placement];
                  if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
                    value = Math.max(popper[placement], boundaries[placement]);
                  }
                  return defineProperty$1({}, placement, value);
                },
                secondary: function secondary(placement) {
                  var mainSide = placement === "right" ? "left" : "top";
                  var value = popper[mainSide];
                  if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
                    value = Math.min(
                      popper[mainSide],
                      boundaries[placement] - (placement === "right" ? popper.width : popper.height)
                    );
                  }
                  return defineProperty$1({}, mainSide, value);
                }
              };

              order.forEach(function(placement) {
                var side = ["left", "top"].indexOf(placement) !== -1 ? "primary" : "secondary";
                popper = _extends$1({}, popper, check[side](placement));
              });

              data.offsets.popper = popper;

              return data;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function shift(data) {
              var placement = data.placement;
              var basePlacement = placement.split("-")[0];
              var shiftvariation = placement.split("-")[1];

              // if shift shiftvariation is specified, run the modifier
              if (shiftvariation) {
                var _data$offsets = data.offsets,
                  reference = _data$offsets.reference,
                  popper = _data$offsets.popper;

                var isVertical = ["bottom", "top"].indexOf(basePlacement) !== -1;
                var side = isVertical ? "left" : "top";
                var measurement = isVertical ? "width" : "height";

                var shiftOffsets = {
                  start: defineProperty$1({}, side, reference[side]),
                  end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
                };

                data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
              }

              return data;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by update method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function hide(data) {
              if (!isModifierRequired(data.instance.modifiers, "hide", "preventOverflow")) {
                return data;
              }

              var refRect = data.offsets.reference;
              var bound = find(data.instance.modifiers, function(modifier) {
                return modifier.name === "preventOverflow";
              }).boundaries;

              if (
                refRect.bottom < bound.top ||
                refRect.left > bound.right ||
                refRect.top > bound.bottom ||
                refRect.right < bound.left
              ) {
                // Avoid unnecessary DOM access if visibility hasn't changed
                if (data.hide === true) {
                  return data;
                }

                data.hide = true;
                data.attributes["x-out-of-boundaries"] = "";
              } else {
                // Avoid unnecessary DOM access if visibility hasn't changed
                if (data.hide === false) {
                  return data;
                }

                data.hide = false;
                data.attributes["x-out-of-boundaries"] = false;
              }

              return data;
            }

            /**
             * @function
             * @memberof Modifiers
             * @argument {Object} data - The data object generated by `update` method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {Object} The data object, properly modified
             */
            function inner(data) {
              var placement = data.placement;
              var basePlacement = placement.split("-")[0];
              var _data$offsets = data.offsets,
                popper = _data$offsets.popper,
                reference = _data$offsets.reference;

              var isHoriz = ["left", "right"].indexOf(basePlacement) !== -1;

              var subtractLength = ["top", "left"].indexOf(basePlacement) === -1;

              popper[isHoriz ? "left" : "top"] =
                reference[basePlacement] - (subtractLength ? popper[isHoriz ? "width" : "height"] : 0);

              data.placement = getOppositePlacement(placement);
              data.offsets.popper = getClientRect(popper);

              return data;
            }

            /**
             * Modifier function, each modifier can have a function of this type assigned
             * to its `fn` property.<br />
             * These functions will be called on each update, this means that you must
             * make sure they are performant enough to avoid performance bottlenecks.
             *
             * @function ModifierFn
             * @argument {dataObject} data - The data object generated by `update` method
             * @argument {Object} options - Modifiers configuration and options
             * @returns {dataObject} The data object, properly modified
             */

            /**
             * Modifiers are plugins used to alter the behavior of your poppers.<br />
             * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
             * needed by the library.
             *
             * Usually you don't want to override the `order`, `fn` and `onLoad` props.
             * All the other properties are configurations that could be tweaked.
             * @namespace modifiers
             */
            var modifiers = {
              /**
               * Modifier used to shift the popper on the start or end of its reference
               * element.<br />
               * It will read the variation of the `placement` property.<br />
               * It can be one either `-end` or `-start`.
               * @memberof modifiers
               * @inner
               */
              shift: {
                /** @prop {number} order=100 - Index used to define the order of execution */
                order: 100,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: shift
              },

              /**
               * The `offset` modifier can shift your popper on both its axis.
               *
               * It accepts the following units:
               * - `px` or unit-less, interpreted as pixels
               * - `%` or `%r`, percentage relative to the length of the reference element
               * - `%p`, percentage relative to the length of the popper element
               * - `vw`, CSS viewport width unit
               * - `vh`, CSS viewport height unit
               *
               * For length is intended the main axis relative to the placement of the popper.<br />
               * This means that if the placement is `top` or `bottom`, the length will be the
               * `width`. In case of `left` or `right`, it will be the `height`.
               *
               * You can provide a single value (as `Number` or `String`), or a pair of values
               * as `String` divided by a comma or one (or more) white spaces.<br />
               * The latter is a deprecated method because it leads to confusion and will be
               * removed in v2.<br />
               * Additionally, it accepts additions and subtractions between different units.
               * Note that multiplications and divisions aren't supported.
               *
               * Valid examples are:
               * ```
               * 10
               * '10%'
               * '10, 10'
               * '10%, 10'
               * '10 + 10%'
               * '10 - 5vh + 3%'
               * '-10px + 5vh, 5px - 6%'
               * ```
               * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
               * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
               * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
               *
               * @memberof modifiers
               * @inner
               */
              offset: {
                /** @prop {number} order=200 - Index used to define the order of execution */
                order: 200,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: offset,
                /** @prop {Number|String} offset=0
                 * The offset value as described in the modifier description
                 */
                offset: 0
              },

              /**
               * Modifier used to prevent the popper from being positioned outside the boundary.
               *
               * A scenario exists where the reference itself is not within the boundaries.<br />
               * We can say it has "escaped the boundaries" — or just "escaped".<br />
               * In this case we need to decide whether the popper should either:
               *
               * - detach from the reference and remain "trapped" in the boundaries, or
               * - if it should ignore the boundary and "escape with its reference"
               *
               * When `escapeWithReference` is set to`true` and reference is completely
               * outside its boundaries, the popper will overflow (or completely leave)
               * the boundaries in order to remain attached to the edge of the reference.
               *
               * @memberof modifiers
               * @inner
               */
              preventOverflow: {
                /** @prop {number} order=300 - Index used to define the order of execution */
                order: 300,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: preventOverflow,
                /**
                 * @prop {Array} [priority=['left','right','top','bottom']]
                 * Popper will try to prevent overflow following these priorities by default,
                 * then, it could overflow on the left and on top of the `boundariesElement`
                 */
                priority: ["left", "right", "top", "bottom"],
                /**
                 * @prop {number} padding=5
                 * Amount of pixel used to define a minimum distance between the boundaries
                 * and the popper. This makes sure the popper always has a little padding
                 * between the edges of its container
                 */
                padding: 5,
                /**
                 * @prop {String|HTMLElement} boundariesElement='scrollParent'
                 * Boundaries used by the modifier. Can be `scrollParent`, `window`,
                 * `viewport` or any DOM element.
                 */
                boundariesElement: "scrollParent"
              },

              /**
               * Modifier used to make sure the reference and its popper stay near each other
               * without leaving any gap between the two. Especially useful when the arrow is
               * enabled and you want to ensure that it points to its reference element.
               * It cares only about the first axis. You can still have poppers with margin
               * between the popper and its reference element.
               * @memberof modifiers
               * @inner
               */
              keepTogether: {
                /** @prop {number} order=400 - Index used to define the order of execution */
                order: 400,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: keepTogether
              },

              /**
               * This modifier is used to move the `arrowElement` of the popper to make
               * sure it is positioned between the reference element and its popper element.
               * It will read the outer size of the `arrowElement` node to detect how many
               * pixels of conjunction are needed.
               *
               * It has no effect if no `arrowElement` is provided.
               * @memberof modifiers
               * @inner
               */
              arrow: {
                /** @prop {number} order=500 - Index used to define the order of execution */
                order: 500,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: arrow,
                /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
                element: "[x-arrow]"
              },

              /**
               * Modifier used to flip the popper's placement when it starts to overlap its
               * reference element.
               *
               * Requires the `preventOverflow` modifier before it in order to work.
               *
               * **NOTE:** this modifier will interrupt the current update cycle and will
               * restart it if it detects the need to flip the placement.
               * @memberof modifiers
               * @inner
               */
              flip: {
                /** @prop {number} order=600 - Index used to define the order of execution */
                order: 600,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: flip,
                /**
                 * @prop {String|Array} behavior='flip'
                 * The behavior used to change the popper's placement. It can be one of
                 * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
                 * placements (with optional variations)
                 */
                behavior: "flip",
                /**
                 * @prop {number} padding=5
                 * The popper will flip if it hits the edges of the `boundariesElement`
                 */
                padding: 5,
                /**
                 * @prop {String|HTMLElement} boundariesElement='viewport'
                 * The element which will define the boundaries of the popper position.
                 * The popper will never be placed outside of the defined boundaries
                 * (except if `keepTogether` is enabled)
                 */
                boundariesElement: "viewport"
              },

              /**
               * Modifier used to make the popper flow toward the inner of the reference element.
               * By default, when this modifier is disabled, the popper will be placed outside
               * the reference element.
               * @memberof modifiers
               * @inner
               */
              inner: {
                /** @prop {number} order=700 - Index used to define the order of execution */
                order: 700,
                /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
                enabled: false,
                /** @prop {ModifierFn} */
                fn: inner
              },

              /**
               * Modifier used to hide the popper when its reference element is outside of the
               * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
               * be used to hide with a CSS selector the popper when its reference is
               * out of boundaries.
               *
               * Requires the `preventOverflow` modifier before it in order to work.
               * @memberof modifiers
               * @inner
               */
              hide: {
                /** @prop {number} order=800 - Index used to define the order of execution */
                order: 800,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: hide
              },

              /**
               * Computes the style that will be applied to the popper element to gets
               * properly positioned.
               *
               * Note that this modifier will not touch the DOM, it just prepares the styles
               * so that `applyStyle` modifier can apply it. This separation is useful
               * in case you need to replace `applyStyle` with a custom implementation.
               *
               * This modifier has `850` as `order` value to maintain backward compatibility
               * with previous versions of Popper.js. Expect the modifiers ordering method
               * to change in future major versions of the library.
               *
               * @memberof modifiers
               * @inner
               */
              computeStyle: {
                /** @prop {number} order=850 - Index used to define the order of execution */
                order: 850,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: computeStyle,
                /**
                 * @prop {Boolean} gpuAcceleration=true
                 * If true, it uses the CSS 3D transformation to position the popper.
                 * Otherwise, it will use the `top` and `left` properties
                 */
                gpuAcceleration: true,
                /**
                 * @prop {string} [x='bottom']
                 * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
                 * Change this if your popper should grow in a direction different from `bottom`
                 */
                x: "bottom",
                /**
                 * @prop {string} [x='left']
                 * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
                 * Change this if your popper should grow in a direction different from `right`
                 */
                y: "right"
              },

              /**
               * Applies the computed styles to the popper element.
               *
               * All the DOM manipulations are limited to this modifier. This is useful in case
               * you want to integrate Popper.js inside a framework or view library and you
               * want to delegate all the DOM manipulations to it.
               *
               * Note that if you disable this modifier, you must make sure the popper element
               * has its position set to `absolute` before Popper.js can do its work!
               *
               * Just disable this modifier and define your own to achieve the desired effect.
               *
               * @memberof modifiers
               * @inner
               */
              applyStyle: {
                /** @prop {number} order=900 - Index used to define the order of execution */
                order: 900,
                /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
                enabled: true,
                /** @prop {ModifierFn} */
                fn: applyStyle,
                /** @prop {Function} */
                onLoad: applyStyleOnLoad,
                /**
                 * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
                 * @prop {Boolean} gpuAcceleration=true
                 * If true, it uses the CSS 3D transformation to position the popper.
                 * Otherwise, it will use the `top` and `left` properties
                 */
                gpuAcceleration: undefined
              }
            };

            /**
             * The `dataObject` is an object containing all the information used by Popper.js.
             * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
             * @name dataObject
             * @property {Object} data.instance The Popper.js instance
             * @property {String} data.placement Placement applied to popper
             * @property {String} data.originalPlacement Placement originally defined on init
             * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
             * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
             * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
             * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
             * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
             * @property {Object} data.boundaries Offsets of the popper boundaries
             * @property {Object} data.offsets The measurements of popper, reference and arrow elements
             * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
             * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
             * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
             */

            /**
             * Default options provided to Popper.js constructor.<br />
             * These can be overridden using the `options` argument of Popper.js.<br />
             * To override an option, simply pass an object with the same
             * structure of the `options` object, as the 3rd argument. For example:
             * ```
             * new Popper(ref, pop, {
             *   modifiers: {
             *     preventOverflow: { enabled: false }
             *   }
             * })
             * ```
             * @type {Object}
             * @static
             * @memberof Popper
             */
            var Defaults$1 = {
              /**
               * Popper's placement.
               * @prop {Popper.placements} placement='bottom'
               */
              placement: "bottom",

              /**
               * Set this to true if you want popper to position it self in 'fixed' mode
               * @prop {Boolean} positionFixed=false
               */
              positionFixed: false,

              /**
               * Whether events (resize, scroll) are initially enabled.
               * @prop {Boolean} eventsEnabled=true
               */
              eventsEnabled: true,

              /**
               * Set to true if you want to automatically remove the popper when
               * you call the `destroy` method.
               * @prop {Boolean} removeOnDestroy=false
               */
              removeOnDestroy: false,

              /**
               * Callback called when the popper is created.<br />
               * By default, it is set to no-op.<br />
               * Access Popper.js instance with `data.instance`.
               * @prop {onCreate}
               */
              onCreate: function onCreate() {},

              /**
               * Callback called when the popper is updated. This callback is not called
               * on the initialization/creation of the popper, but only on subsequent
               * updates.<br />
               * By default, it is set to no-op.<br />
               * Access Popper.js instance with `data.instance`.
               * @prop {onUpdate}
               */
              onUpdate: function onUpdate() {},

              /**
               * List of modifiers used to modify the offsets before they are applied to the popper.
               * They provide most of the functionalities of Popper.js.
               * @prop {modifiers}
               */
              modifiers: modifiers
            };

            /**
             * @callback onCreate
             * @param {dataObject} data
             */

            /**
             * @callback onUpdate
             * @param {dataObject} data
             */

            // Utils
            // Methods
            var Popper = (function() {
              /**
               * Creates a new Popper.js instance.
               * @class Popper
               * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
               * @param {HTMLElement} popper - The HTML element used as the popper
               * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
               * @return {Object} instance - The generated Popper.js instance
               */
              function Popper(reference, popper) {
                var _this = this;

                var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                classCallCheck$1(this, Popper);

                this.scheduleUpdate = function() {
                  return requestAnimationFrame(_this.update);
                };

                // make update() debounced, so that it only runs at most once-per-tick
                this.update = debounce(this.update.bind(this));

                // with {} we create a new object with the options inside it
                this.options = _extends$1({}, Popper.Defaults, options);

                // init state
                this.state = {
                  isDestroyed: false,
                  isCreated: false,
                  scrollParents: []
                };

                // get reference and popper elements (allow jQuery wrappers)
                this.reference = reference && reference.jquery ? reference[0] : reference;
                this.popper = popper && popper.jquery ? popper[0] : popper;

                // Deep merge modifiers options
                this.options.modifiers = {};
                Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function(name) {
                  _this.options.modifiers[name] = _extends$1(
                    {},
                    Popper.Defaults.modifiers[name] || {},
                    options.modifiers ? options.modifiers[name] : {}
                  );
                });

                // Refactoring modifiers' list (Object => Array)
                this.modifiers = Object.keys(this.options.modifiers)
                  .map(function(name) {
                    return _extends$1(
                      {
                        name: name
                      },
                      _this.options.modifiers[name]
                    );
                  })
                  // sort the modifiers by order
                  .sort(function(a, b) {
                    return a.order - b.order;
                  });

                // modifiers have the ability to execute arbitrary code when Popper.js get inited
                // such code is executed in the same order of its modifier
                // they could add new properties to their options configuration
                // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
                this.modifiers.forEach(function(modifierOptions) {
                  if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
                  }
                });

                // fire the first update to position the popper in the right place
                this.update();

                var eventsEnabled = this.options.eventsEnabled;
                if (eventsEnabled) {
                  // setup event listeners, they will take care of update the position in specific situations
                  this.enableEventListeners();
                }

                this.state.eventsEnabled = eventsEnabled;
              }

              // We can't use class properties because they don't get listed in the
              // class prototype and break stuff like Sinon stubs

              createClass$1(Popper, [
                {
                  key: "update",
                  value: function update$$1() {
                    return update.call(this);
                  }
                },
                {
                  key: "destroy",
                  value: function destroy$$1() {
                    return destroy.call(this);
                  }
                },
                {
                  key: "enableEventListeners",
                  value: function enableEventListeners$$1() {
                    return enableEventListeners.call(this);
                  }
                },
                {
                  key: "disableEventListeners",
                  value: function disableEventListeners$$1() {
                    return disableEventListeners.call(this);
                  }

                  /**
                   * Schedules an update. It will run on the next UI update available.
                   * @method scheduleUpdate
                   * @memberof Popper
                   */

                  /**
                   * Collection of utilities useful when writing custom modifiers.
                   * Starting from version 1.7, this method is available only if you
                   * include `popper-utils.js` before `popper.js`.
                   *
                   * **DEPRECATION**: This way to access PopperUtils is deprecated
                   * and will be removed in v2! Use the PopperUtils module directly instead.
                   * Due to the high instability of the methods contained in Utils, we can't
                   * guarantee them to follow semver. Use them at your own risk!
                   * @static
                   * @private
                   * @type {Object}
                   * @deprecated since version 1.8
                   * @member Utils
                   * @memberof Popper
                   */
                }
              ]);
              return Popper;
            })();

            /**
             * The `referenceObject` is an object that provides an interface compatible with Popper.js
             * and lets you use it as replacement of a real DOM node.<br />
             * You can use this method to position a popper relatively to a set of coordinates
             * in case you don't have a DOM node to use as reference.
             *
             * ```
             * new Popper(referenceObject, popperNode);
             * ```
             *
             * NB: This feature isn't supported in Internet Explorer 10.
             * @name referenceObject
             * @property {Function} data.getBoundingClientRect
             * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
             * @property {number} data.clientWidth
             * An ES6 getter that will return the width of the virtual reference element.
             * @property {number} data.clientHeight
             * An ES6 getter that will return the height of the virtual reference element.
             */

            Popper.Utils = (typeof window !== "undefined" ? window : global).PopperUtils;
            Popper.placements = placements;
            Popper.Defaults = Defaults$1;

            var Selectors = {
              POPPER: ".tippy-popper",
              TOOLTIP: ".tippy-tooltip",
              CONTENT: ".tippy-content",
              BACKDROP: ".tippy-backdrop",
              ARROW: ".tippy-arrow",
              ROUND_ARROW: ".tippy-roundarrow"
            };

            /**
             * Firefox extensions doesn't allow 'innerHTML' to be set but we can trick it
             * + aid for minifiers not to remove the trick
             */
            var FF_EXTENSION_TRICK = {
              x: true

              /**
               * Determines if the runtime is a browser
               */
            };
            var isBrowser$1 = typeof window !== "undefined";

            /**
             * Determines if the browser is supported
             */
            var isBrowserSupported = isBrowser$1 && "MutationObserver" in window;

            /**
             * Injects a string of CSS styles to the style node in the document head
             */
            var injectCSS = function injectCSS(css) {
              if (isBrowserSupported) {
                var style = document.createElement("style");
                style.type = "text/css";
                style.textContent = css;
                document.head.insertBefore(style, document.head.firstChild);
              }
            };

            /**
             * Ponyfill for Array.from; converts iterable values to an array
             */
            var toArray$1 = function toArray$$1(value) {
              return [].slice.call(value);
            };

            /**
             * Sets the content of a tooltip
             */
            var setContent = function setContent(contentEl, props) {
              if (props.content instanceof Element) {
                setInnerHTML(contentEl, "");
                contentEl.appendChild(props.content);
              } else {
                contentEl[props.allowHTML ? "innerHTML" : "textContent"] = props.content;
              }
            };

            /**
             * Determines if an element can receive focus
             */
            var elementCanReceiveFocus = function elementCanReceiveFocus(el) {
              return el instanceof Element
                ? matches.call(el, "a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]") &&
                    !el.hasAttribute("disabled")
                : true;
            };

            /**
             * Applies a transition duration to a list of elements
             */
            var applyTransitionDuration = function applyTransitionDuration(els, value) {
              els.filter(Boolean).forEach(function(el) {
                el.style.transitionDuration = value + "ms";
              });
            };

            /**
             * Returns the child elements of a popper element
             */
            var getChildren = function getChildren(popper) {
              var select = function select(s) {
                return popper.querySelector(s);
              };
              return {
                tooltip: select(Selectors.TOOLTIP),
                backdrop: select(Selectors.BACKDROP),
                content: select(Selectors.CONTENT),
                arrow: select(Selectors.ARROW) || select(Selectors.ROUND_ARROW)
              };
            };

            /**
             * Determines if a value is a plain object
             */
            var isPlainObject = function isPlainObject(value) {
              return {}.toString.call(value) === "[object Object]";
            };

            /**
             * Creates and returns a div element
             */
            var div = function div() {
              return document.createElement("div");
            };

            /**
             * Sets the innerHTML of an element while tricking linters & minifiers
             */
            var setInnerHTML = function setInnerHTML(el, html) {
              el[FF_EXTENSION_TRICK.x && "innerHTML"] =
                html instanceof Element ? html[FF_EXTENSION_TRICK.x && "innerHTML"] : html;
            };

            /**
             * Returns an array of elements based on the value
             */
            var getArrayOfElements = function getArrayOfElements(value) {
              if (value instanceof Element || isPlainObject(value)) {
                return [value];
              }
              if (value instanceof NodeList) {
                return toArray$1(value);
              }
              if (Array.isArray(value)) {
                return value;
              }

              try {
                return toArray$1(document.querySelectorAll(value));
              } catch (e) {
                return [];
              }
            };

            /**
             * Determines if a value is numeric
             */
            var isNumeric$1 = function isNumeric(value) {
              return !isNaN(value) && !isNaN(parseFloat(value));
            };

            /**
             * Returns a value at a given index depending on if it's an array or number
             */
            var getValue = function getValue(value, index, defaultValue) {
              if (Array.isArray(value)) {
                var v = value[index];
                return v == null ? defaultValue : v;
              }
              return value;
            };

            /**
             * Creates an arrow element and returns it
             */
            var createArrowElement = function createArrowElement(arrowType) {
              var arrow = div();
              if (arrowType === "round") {
                arrow.className = "tippy-roundarrow";
                setInnerHTML(
                  arrow,
                  '<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>'
                );
              } else {
                arrow.className = "tippy-arrow";
              }
              return arrow;
            };

            /**
             * Creates a backdrop element and returns it
             */
            var createBackdropElement = function createBackdropElement() {
              var backdrop = div();
              backdrop.className = "tippy-backdrop";
              backdrop.setAttribute("data-state", "hidden");
              return backdrop;
            };

            /**
             * Adds interactive attributes
             */
            var addInteractive = function addInteractive(popper, tooltip) {
              popper.setAttribute("tabindex", "-1");
              tooltip.setAttribute("data-interactive", "");
            };

            /**
             * Removes interactive attributes
             */
            var removeInteractive = function removeInteractive(popper, tooltip) {
              popper.removeAttribute("tabindex");
              tooltip.removeAttribute("data-interactive");
            };

            /**
             * Adds inertia attribute
             */
            var addInertia = function addInertia(tooltip) {
              tooltip.setAttribute("data-inertia", "");
            };

            /**
             * Removes inertia attribute
             */
            var removeInertia = function removeInertia(tooltip) {
              tooltip.removeAttribute("data-inertia");
            };

            /**
             * Constructs the popper element and returns it
             */
            var createPopperElement = function createPopperElement(id, props) {
              var popper = div();
              popper.className = "tippy-popper";
              popper.setAttribute("role", "tooltip");
              popper.id = "tippy-" + id;
              popper.style.zIndex = props.zIndex;

              var tooltip = div();
              tooltip.className = "tippy-tooltip";
              tooltip.setAttribute("data-size", props.size);
              tooltip.setAttribute("data-animation", props.animation);
              tooltip.setAttribute("data-state", "hidden");
              props.theme.split(" ").forEach(function(t) {
                tooltip.classList.add(t + "-theme");
              });

              var content = div();
              content.className = "tippy-content";
              content.setAttribute("data-state", "hidden");

              if (props.interactive) {
                addInteractive(popper, tooltip);
              }

              if (props.arrow) {
                tooltip.appendChild(createArrowElement(props.arrowType));
              }

              if (props.animateFill) {
                tooltip.appendChild(createBackdropElement());
                tooltip.setAttribute("data-animatefill", "");
              }

              if (props.inertia) {
                tooltip.setAttribute("data-inertia", "");
              }

              setContent(content, props);

              tooltip.appendChild(content);
              popper.appendChild(tooltip);

              popper.addEventListener("focusout", function(e) {
                if (
                  e.relatedTarget &&
                  popper._tippy &&
                  !closestCallback(e.relatedTarget, function(el) {
                    return el === popper;
                  }) &&
                  e.relatedTarget !== popper._tippy.reference &&
                  popper._tippy.props.shouldPopperHideOnBlur(e)
                ) {
                  popper._tippy.hide();
                }
              });

              return popper;
            };

            /**
             * Updates the popper element based on the new props
             */
            var updatePopperElement = function updatePopperElement(popper, prevProps, nextProps) {
              var _getChildren = getChildren(popper),
                tooltip = _getChildren.tooltip,
                content = _getChildren.content,
                backdrop = _getChildren.backdrop,
                arrow = _getChildren.arrow;

              popper.style.zIndex = nextProps.zIndex;
              tooltip.setAttribute("data-size", nextProps.size);
              tooltip.setAttribute("data-animation", nextProps.animation);

              if (prevProps.content !== nextProps.content) {
                setContent(content, nextProps);
              }

              // animateFill
              if (!prevProps.animateFill && nextProps.animateFill) {
                tooltip.appendChild(createBackdropElement());
                tooltip.setAttribute("data-animatefill", "");
              } else if (prevProps.animateFill && !nextProps.animateFill) {
                tooltip.removeChild(backdrop);
                tooltip.removeAttribute("data-animatefill");
              }

              // arrow
              if (!prevProps.arrow && nextProps.arrow) {
                tooltip.appendChild(createArrowElement(nextProps.arrowType));
              } else if (prevProps.arrow && !nextProps.arrow) {
                tooltip.removeChild(arrow);
              }

              // arrowType
              if (prevProps.arrow && nextProps.arrow && prevProps.arrowType !== nextProps.arrowType) {
                tooltip.replaceChild(createArrowElement(nextProps.arrowType), arrow);
              }

              // interactive
              if (!prevProps.interactive && nextProps.interactive) {
                addInteractive(popper, tooltip);
              } else if (prevProps.interactive && !nextProps.interactive) {
                removeInteractive(popper, tooltip);
              }

              // inertia
              if (!prevProps.inertia && nextProps.inertia) {
                addInertia(tooltip);
              } else if (prevProps.inertia && !nextProps.inertia) {
                removeInertia(tooltip);
              }

              // theme
              if (prevProps.theme !== nextProps.theme) {
                prevProps.theme.split(" ").forEach(function(theme) {
                  tooltip.classList.remove(theme + "-theme");
                });
                nextProps.theme.split(" ").forEach(function(theme) {
                  tooltip.classList.add(theme + "-theme");
                });
              }
            };

            /**
             * Hides all visible poppers on the document
             */
            var hideAllPoppers = function hideAllPoppers(excludeTippy) {
              toArray$1(document.querySelectorAll(Selectors.POPPER)).forEach(function(popper) {
                var tip = popper._tippy;
                if (tip && tip.props.hideOnClick === true && (!excludeTippy || popper !== excludeTippy.popper)) {
                  tip.hide();
                }
              });
            };

            /**
             * Returns an object of optional props from data-tippy-* attributes
             */
            var getDataAttributeOptions = function getDataAttributeOptions(reference) {
              return Object.keys(Defaults).reduce(function(acc, key) {
                var valueAsString = (reference.getAttribute("data-tippy-" + key) || "").trim();

                if (!valueAsString) {
                  return acc;
                }

                if (key === "content") {
                  acc[key] = valueAsString;
                } else if (valueAsString === "true") {
                  acc[key] = true;
                } else if (valueAsString === "false") {
                  acc[key] = false;
                } else if (isNumeric$1(valueAsString)) {
                  acc[key] = Number(valueAsString);
                } else if (valueAsString[0] === "[" || valueAsString[0] === "{") {
                  acc[key] = JSON.parse(valueAsString);
                } else {
                  acc[key] = valueAsString;
                }

                return acc;
              }, {});
            };

            /**
             * Polyfills the virtual reference (plain object) with needed props
             * Mutating because DOM elements are mutated, adds _tippy property
             */
            var polyfillVirtualReferenceProps = function polyfillVirtualReferenceProps(virtualReference) {
              var polyfills = {
                isVirtual: true,
                attributes: virtualReference.attributes || {},
                setAttribute: function setAttribute(key, value) {
                  virtualReference.attributes[key] = value;
                },
                getAttribute: function getAttribute(key) {
                  return virtualReference.attributes[key];
                },
                removeAttribute: function removeAttribute(key) {
                  delete virtualReference.attributes[key];
                },
                hasAttribute: function hasAttribute(key) {
                  return key in virtualReference.attributes;
                },
                addEventListener: function addEventListener() {},
                removeEventListener: function removeEventListener() {},

                classList: {
                  classNames: {},
                  add: function add(key) {
                    virtualReference.classList.classNames[key] = true;
                  },
                  remove: function remove(key) {
                    delete virtualReference.classList.classNames[key];
                  },
                  contains: function contains(key) {
                    return key in virtualReference.classList.classNames;
                  }
                }
              };

              for (var key in polyfills) {
                virtualReference[key] = polyfills[key];
              }

              return virtualReference;
            };

            /**
             * Ponyfill for Element.prototype.matches
             */
            var matches = (function() {
              if (isBrowser$1) {
                var e = Element.prototype;
                return (
                  e.matches ||
                  e.matchesSelector ||
                  e.webkitMatchesSelector ||
                  e.mozMatchesSelector ||
                  e.msMatchesSelector
                );
              }
            })();

            /**
             * Ponyfill for Element.prototype.closest
             */
            var closest = function closest(element, parentSelector) {
              return (
                Element.prototype.closest ||
                function(selector) {
                  var el = this;
                  while (el) {
                    if (matches.call(el, selector)) return el;
                    el = el.parentElement;
                  }
                }
              ).call(element, parentSelector);
            };

            /**
             * Works like Element.prototype.closest, but uses a callback instead
             */
            var closestCallback = function closestCallback(element, callback) {
              while (element) {
                if (callback(element)) return element;
                element = element.parentElement;
              }
            };

            /**
             * Focuses an element while preventing a scroll jump if it's not within the viewport
             */
            var focus = function focus(el) {
              var x = window.scrollX || window.pageXOffset;
              var y = window.scrollY || window.pageYOffset;
              el.focus();
              scroll(x, y);
            };

            /**
             * Triggers reflow
             */
            var reflow = function reflow(popper) {
              void popper.offsetHeight;
            };

            /**
             * Transforms the x/y axis ased on the placement
             */
            var transformAxisBasedOnPlacement = function transformAxisBasedOnPlacement(axis, isVertical) {
              return (
                (isVertical
                  ? axis
                  : {
                      X: "Y",
                      Y: "X"
                    }[axis]) || ""
              );
            };

            /**
             * Transforms the scale/translate numbers based on the placement
             */
            var transformNumbersBasedOnPlacement = function transformNumbersBasedOnPlacement(
              type,
              numbers,
              isVertical,
              isReverse
            ) {
              /**
               * Avoid destructuring because a large boilerplate function is generated
               * by Babel
               */
              var a = numbers[0];
              var b = numbers[1];

              if (!a && !b) {
                return "";
              }

              var transforms = {
                scale: (function() {
                  if (!b) {
                    return "" + a;
                  } else {
                    return isVertical ? a + ", " + b : b + ", " + a;
                  }
                })(),
                translate: (function() {
                  if (!b) {
                    return isReverse ? -a + "px" : a + "px";
                  } else {
                    if (isVertical) {
                      return isReverse ? a + "px, " + -b + "px" : a + "px, " + b + "px";
                    } else {
                      return isReverse ? -b + "px, " + a + "px" : b + "px, " + a + "px";
                    }
                  }
                })()
              };

              return transforms[type];
            };

            /**
             * Returns the axis for a CSS function (translate or scale)
             */
            var getTransformAxis = function getTransformAxis(str, cssFunction) {
              var match = str.match(new RegExp(cssFunction + "([XY])"));
              return match ? match[1] : "";
            };

            /**
             * Returns the numbers given to the CSS function
             */
            var getTransformNumbers = function getTransformNumbers(str, regex) {
              var match = str.match(regex);
              return match ? match[1].split(",").map(parseFloat) : [];
            };

            var TRANSFORM_NUMBER_RE = {
              translate: /translateX?Y?\(([^)]+)\)/,
              scale: /scaleX?Y?\(([^)]+)\)/

              /**
               * Computes the arrow's transform so that it is correct for any placement
               */
            };
            var computeArrowTransform = function computeArrowTransform(arrow, arrowTransform) {
              var placement = getPopperPlacement(closest(arrow, Selectors.POPPER));
              var isVertical = placement === "top" || placement === "bottom";
              var isReverse = placement === "right" || placement === "bottom";

              var matches = {
                translate: {
                  axis: getTransformAxis(arrowTransform, "translate"),
                  numbers: getTransformNumbers(arrowTransform, TRANSFORM_NUMBER_RE.translate)
                },
                scale: {
                  axis: getTransformAxis(arrowTransform, "scale"),
                  numbers: getTransformNumbers(arrowTransform, TRANSFORM_NUMBER_RE.scale)
                }
              };

              var computedTransform = arrowTransform
                .replace(
                  TRANSFORM_NUMBER_RE.translate,
                  "translate" +
                    transformAxisBasedOnPlacement(matches.translate.axis, isVertical) +
                    "(" +
                    transformNumbersBasedOnPlacement("translate", matches.translate.numbers, isVertical, isReverse) +
                    ")"
                )
                .replace(
                  TRANSFORM_NUMBER_RE.scale,
                  "scale" +
                    transformAxisBasedOnPlacement(matches.scale.axis, isVertical) +
                    "(" +
                    transformNumbersBasedOnPlacement("scale", matches.scale.numbers, isVertical, isReverse) +
                    ")"
                );

              arrow.style[
                typeof document.body.style.transform !== "undefined" ? "transform" : "webkitTransform"
              ] = computedTransform;
            };

            /**
             * Sets the visibility state of a popper so it can begin to transition in or out
             */
            var setVisibilityState = function setVisibilityState(els, type) {
              els.filter(Boolean).forEach(function(el) {
                el.setAttribute("data-state", type);
              });
            };

            /**
             * Runs the callback after the popper's position has been updated
             * update() is debounced with setTimeout(0) and scheduleUpdate() is
             * update() wrapped in requestAnimationFrame().
             */
            var afterPopperPositionUpdates = function afterPopperPositionUpdates(popperInstance, callback) {
              var popper = popperInstance.popper,
                options = popperInstance.options;
              var onCreate = options.onCreate,
                onUpdate = options.onUpdate;

              options.onCreate = options.onUpdate = function() {
                reflow(popper);
                callback();
                onUpdate();
                options.onCreate = onCreate;
                options.onUpdate = onUpdate;
              };
            };

            /**
             * Defers a function's execution until the call stack has cleared
             */
            var defer = function defer(fn) {
              setTimeout(fn, 1);
            };

            /**
             * Determines if the mouse cursor is outside of the popper's interactive border
             * region
             */
            var isCursorOutsideInteractiveBorder = function isCursorOutsideInteractiveBorder(
              popperPlacement,
              popperRect,
              event,
              props
            ) {
              if (!popperPlacement) {
                return true;
              }

              var x = event.clientX,
                y = event.clientY;
              var interactiveBorder = props.interactiveBorder,
                distance = props.distance;

              var exceedsTop =
                popperRect.top - y > (popperPlacement === "top" ? interactiveBorder + distance : interactiveBorder);

              var exceedsBottom =
                y - popperRect.bottom >
                (popperPlacement === "bottom" ? interactiveBorder + distance : interactiveBorder);

              var exceedsLeft =
                popperRect.left - x > (popperPlacement === "left" ? interactiveBorder + distance : interactiveBorder);

              var exceedsRight =
                x - popperRect.right > (popperPlacement === "right" ? interactiveBorder + distance : interactiveBorder);

              return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
            };

            /**
             * Returns the distance offset, taking into account the default offset due to
             * the transform: translate() rule in CSS
             */
            var getOffsetDistanceInPx = function getOffsetDistanceInPx(distance, defaultDistance) {
              return -(distance - defaultDistance) + "px";
            };

            /**
             * Returns the popper's placement, ignoring shifting (top-start, etc)
             */
            var getPopperPlacement = function getPopperPlacement(popper) {
              var fullPlacement = popper.getAttribute("x-placement");
              return fullPlacement ? fullPlacement.split("-")[0] : "";
            };

            /**
             * Evaluates props
             */
            var evaluateProps = function evaluateProps(reference, props) {
              var out = _extends({}, props, props.performance ? {} : getDataAttributeOptions(reference));

              if (out.arrow) {
                out.animateFill = false;
              }

              if (typeof out.appendTo === "function") {
                out.appendTo = props.appendTo(reference);
              }

              if (typeof out.content === "function") {
                out.content = props.content(reference);
              }

              return out;
            };

            /**
             * Add/remove transitionend listener from tooltip
             */
            var toggleTransitionEndListener = function toggleTransitionEndListener(tooltip, action, listener) {
              tooltip[action + "EventListener"]("transitionend", listener);
            };

            /**
             * Debounce utility
             */
            var debounce$1 = function debounce(fn, ms) {
              var timeoutId = void 0;
              return function() {
                var _this = this,
                  _arguments = arguments;

                clearTimeout(timeoutId);
                timeoutId = setTimeout(function() {
                  return fn.apply(_this, _arguments);
                }, ms);
              };
            };

            /**
             * Validates an object of options with the valid default props object
             */
            var validateOptions = function validateOptions(options, props) {
              for (var option in options || {}) {
                if (!(option in props)) {
                  throw Error("[tippy]: `" + option + "` is not a valid option");
                }
              }
            };

            var nav = isBrowser$1 ? navigator : {};
            var win = isBrowser$1 ? window : {};
            var isIE$1 = /MSIE |Trident\//.test(nav.userAgent);
            var isIOS = /iPhone|iPad|iPod/.test(nav.platform) && !win.MSStream;
            var supportsTouch = "ontouchstart" in win;
            var isUsingTouch = false;

            var onDocumentTouch = function onDocumentTouch() {
              if (isUsingTouch) {
                return;
              }

              isUsingTouch = true;

              if (isIOS) {
                document.body.classList.add("tippy-iOS");
              }

              if (window.performance) {
                document.addEventListener("mousemove", onDocumentMouseMove);
              }
            };

            var lastMouseMoveTime = 0;
            var onDocumentMouseMove = function onDocumentMouseMove() {
              var now = performance.now();

              // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
              if (now - lastMouseMoveTime < 20) {
                isUsingTouch = false;
                document.removeEventListener("mousemove", onDocumentMouseMove);
                if (!isIOS) {
                  document.body.classList.remove("tippy-iOS");
                }
              }

              lastMouseMoveTime = now;
            };

            var onDocumentClick = function onDocumentClick(_ref) {
              var target = _ref.target;

              // Simulated events dispatched on the document
              if (!(target instanceof Element)) {
                return hideAllPoppers();
              }

              // Clicked on an interactive popper
              var popper = closest(target, Selectors.POPPER);
              if (popper && popper._tippy && popper._tippy.props.interactive) {
                return;
              }

              // Clicked on a reference
              var reference = closestCallback(target, function(el) {
                return el._tippy && el._tippy.reference === el;
              });
              if (reference) {
                var tip = reference._tippy;
                var isClickTrigger = tip.props.trigger.indexOf("click") > -1;

                if (isUsingTouch || isClickTrigger) {
                  return hideAllPoppers(tip);
                }

                if (tip.props.hideOnClick !== true || isClickTrigger) {
                  return;
                }

                tip.clearDelayTimeouts();
              }

              hideAllPoppers();
            };

            var onWindowBlur = function onWindowBlur() {
              var _document = document,
                activeElement = _document.activeElement;

              if (activeElement && activeElement.blur && activeElement._tippy) {
                activeElement.blur();
              }
            };

            var onWindowResize = function onWindowResize() {
              toArray$1(document.querySelectorAll(Selectors.POPPER)).forEach(function(popper) {
                var tippyInstance = popper._tippy;
                if (!tippyInstance.props.livePlacement) {
                  tippyInstance.popperInstance.scheduleUpdate();
                }
              });
            };

            /**
             * Adds the needed global event listeners
             */
            function bindEventListeners(useCapture) {
              document.addEventListener("click", onDocumentClick, useCapture);
              document.addEventListener("touchstart", onDocumentTouch);
              window.addEventListener("blur", onWindowBlur);
              window.addEventListener("resize", onWindowResize);

              if (!supportsTouch && (navigator.maxTouchPoints || navigator.msMaxTouchPoints)) {
                document.addEventListener("pointerdown", onDocumentTouch);
              }
            }

            var idCounter = 1;

            function createTippy(reference, collectionProps) {
              var props = evaluateProps(reference, collectionProps);

              // If the reference shouldn't have multiple tippys, return null early
              if (!props.multiple && reference._tippy) {
                return null;
              }

              /* ======================= 🔒 Private members 🔒 ======================= */
              var popperMutationObserver = null;
              var lastTriggerEvent = {};
              var lastMouseMoveEvent = null;
              var showTimeoutId = 0;
              var hideTimeoutId = 0;
              var isPreparingToShow = false;
              var transitionEndListener = function transitionEndListener() {};
              var listeners = [];
              var referenceJustProgrammaticallyFocused = false;
              var firstPopperInstanceInit = false;
              var debouncedOnMouseMove =
                props.interactiveDebounce > 0 ? debounce$1(onMouseMove, props.interactiveDebounce) : onMouseMove;

              /* ======================= 🔑 Public members 🔑 ======================= */
              var id = idCounter++;

              var popper = createPopperElement(id, props);

              var popperChildren = getChildren(popper);

              var state = {
                isEnabled: true,
                isVisible: false,
                isDestroyed: false,
                isMounted: false,
                isShown: false
              };

              var popperInstance = null;

              // 🌟 tippy instance
              var tip = {
                // properties
                id: id,
                reference: reference,
                popper: popper,
                popperChildren: popperChildren,
                popperInstance: popperInstance,
                props: props,
                state: state,
                // methods
                clearDelayTimeouts: clearDelayTimeouts,
                set: set$$1,
                setContent: setContent$$1,
                show: show,
                hide: hide,
                enable: enable,
                disable: disable,
                destroy: destroy
              };

              addTriggersToReference();

              reference.addEventListener("click", onReferenceClick);

              if (!props.lazy) {
                tip.popperInstance = createPopperInstance();
                tip.popperInstance.disableEventListeners();
              }

              if (props.showOnInit) {
                /**
                 * Firefox has a bug where the tooltip will be placed incorrectly due to
                 * strange layout on load, `setTimeout` gives the layout time to adjust
                 * properly
                 */
                setTimeout(prepareShow, 20);
              }

              // Ensure the reference element can receive focus (and is not a delegate)
              if (props.a11y && !props.target && !elementCanReceiveFocus(reference)) {
                reference.setAttribute("tabindex", "0");
              }

              // Install shortcuts
              reference._tippy = tip;
              popper._tippy = tip;

              return tip;

              /* ======================= 🔒 Private methods 🔒 ======================= */
              /**
               * If the reference was clicked, it also receives focus
               */
              function onReferenceClick() {
                defer(function() {
                  referenceJustProgrammaticallyFocused = false;
                });
              }

              /**
               * Positions the virtual reference near the mouse cursor
               */
              function positionVirtualReferenceNearCursor(event) {
                var _lastMouseMoveEvent = (lastMouseMoveEvent = event),
                  clientX = _lastMouseMoveEvent.clientX,
                  clientY = _lastMouseMoveEvent.clientY;

                if (!tip.popperInstance) {
                  return;
                }

                var rect = tip.reference.getBoundingClientRect();
                var followCursor = tip.props.followCursor;

                var isHorizontal = followCursor === "horizontal";
                var isVertical = followCursor === "vertical";

                tip.popperInstance.reference = {
                  getBoundingClientRect: function getBoundingClientRect() {
                    return {
                      width: 0,
                      height: 0,
                      top: isHorizontal ? rect.top : clientY,
                      bottom: isHorizontal ? rect.bottom : clientY,
                      left: isVertical ? rect.left : clientX,
                      right: isVertical ? rect.right : clientX
                    };
                  },
                  clientWidth: 0,
                  clientHeight: 0
                };

                tip.popperInstance.scheduleUpdate();
              }

              /**
               * Creates the tippy instance for a delegate when it's been triggered
               */
              function createDelegateChildTippy(event) {
                var targetEl = closest(event.target, tip.props.target);
                if (targetEl && !targetEl._tippy) {
                  createTippy(
                    targetEl,
                    _extends({}, tip.props, {
                      target: "",
                      showOnInit: true
                    })
                  );
                  prepareShow(event);
                }
              }

              /**
               * Setup before show() is invoked (delays, etc.)
               */
              function prepareShow(event) {
                clearDelayTimeouts();

                if (tip.state.isVisible) {
                  return;
                }

                // Is a delegate, create an instance for the child target
                if (tip.props.target) {
                  return createDelegateChildTippy(event);
                }

                isPreparingToShow = true;

                if (tip.props.wait) {
                  return tip.props.wait(tip, event);
                }

                /**
                 * If the tooltip has a delay, we need to be listening to the mousemove as
                 * soon as the trigger event is fired so that it's in the correct position
                 * upon mount
                 */
                if (hasFollowCursorBehavior()) {
                  if (popperChildren.arrow) {
                    popperChildren.arrow.style.margin = "0";
                  }
                  document.addEventListener("mousemove", positionVirtualReferenceNearCursor);
                }

                var delay = getValue(tip.props.delay, 0, Defaults.delay);

                if (delay) {
                  showTimeoutId = setTimeout(function() {
                    show();
                  }, delay);
                } else {
                  show();
                }
              }

              /**
               * Setup before hide() is invoked (delays, etc.)
               */
              function prepareHide() {
                clearDelayTimeouts();

                if (!tip.state.isVisible) {
                  return removeFollowCursorListener();
                }

                isPreparingToShow = false;

                var delay = getValue(tip.props.delay, 1, Defaults.delay);

                if (delay) {
                  hideTimeoutId = setTimeout(function() {
                    if (tip.state.isVisible) {
                      hide();
                    }
                  }, delay);
                } else {
                  hide();
                }
              }

              /**
               * Removes the follow cursor listener
               */
              function removeFollowCursorListener() {
                document.removeEventListener("mousemove", positionVirtualReferenceNearCursor);
                lastMouseMoveEvent = null;
              }

              /**
               * Cleans up old listeners
               */
              function cleanupOldMouseMoveListeners() {
                document.body.removeEventListener("mouseleave", prepareHide);
                document.removeEventListener("mousemove", debouncedOnMouseMove);
              }

              /**
               * Event listener invoked upon trigger
               */
              function onTrigger(event) {
                if (!tip.state.isEnabled || isEventListenerStopped(event)) {
                  return;
                }

                if (!tip.state.isVisible) {
                  lastTriggerEvent = event;
                }

                // Toggle show/hide when clicking click-triggered tooltips
                if (event.type === "click" && tip.props.hideOnClick !== false && tip.state.isVisible) {
                  prepareHide();
                } else {
                  prepareShow(event);
                }
              }

              /**
               * Event listener used for interactive tooltips to detect when they should hide
               */
              function onMouseMove(event) {
                var referenceTheCursorIsOver = closestCallback(event.target, function(el) {
                  return el._tippy;
                });

                var isCursorOverPopper = closest(event.target, Selectors.POPPER) === tip.popper;
                var isCursorOverReference = referenceTheCursorIsOver === tip.reference;

                if (isCursorOverPopper || isCursorOverReference) {
                  return;
                }

                if (
                  isCursorOutsideInteractiveBorder(
                    getPopperPlacement(tip.popper),
                    tip.popper.getBoundingClientRect(),
                    event,
                    tip.props
                  )
                ) {
                  cleanupOldMouseMoveListeners();
                  prepareHide();
                }
              }

              /**
               * Event listener invoked upon mouseleave
               */
              function onMouseLeave(event) {
                if (isEventListenerStopped(event)) {
                  return;
                }

                if (tip.props.interactive) {
                  document.body.addEventListener("mouseleave", prepareHide);
                  document.addEventListener("mousemove", debouncedOnMouseMove);
                  return;
                }

                prepareHide();
              }

              /**
               * Event listener invoked upon blur
               */
              function onBlur(event) {
                if (event.target !== tip.reference) {
                  return;
                }

                if (tip.props.interactive) {
                  if (!event.relatedTarget) {
                    return;
                  }
                  if (closest(event.relatedTarget, Selectors.POPPER)) {
                    return;
                  }
                }

                prepareHide();
              }

              /**
               * Event listener invoked when a child target is triggered
               */
              function onDelegateShow(event) {
                if (closest(event.target, tip.props.target)) {
                  prepareShow(event);
                }
              }

              /**
               * Event listener invoked when a child target should hide
               */
              function onDelegateHide(event) {
                if (closest(event.target, tip.props.target)) {
                  prepareHide();
                }
              }

              /**
               * Determines if an event listener should stop further execution due to the
               * `touchHold` option.
               */
              function isEventListenerStopped(event) {
                var isTouchEvent = event.type.indexOf("touch") > -1;
                var caseA = supportsTouch && isUsingTouch && tip.props.touchHold && !isTouchEvent;
                var caseB = isUsingTouch && !tip.props.touchHold && isTouchEvent;
                return caseA || caseB;
              }

              /**
               * Creates the popper instance for the tip
               */
              function createPopperInstance() {
                var tooltip = tip.popperChildren.tooltip;
                var popperOptions = tip.props.popperOptions;

                var arrowSelector = Selectors[tip.props.arrowType === "round" ? "ROUND_ARROW" : "ARROW"];
                var arrow = tooltip.querySelector(arrowSelector);

                var config = _extends(
                  {
                    placement: tip.props.placement
                  },
                  popperOptions || {},
                  {
                    modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
                      arrow: _extends(
                        {
                          element: arrowSelector
                        },
                        popperOptions && popperOptions.modifiers ? popperOptions.modifiers.arrow : {}
                      ),
                      flip: _extends(
                        {
                          enabled: tip.props.flip,
                          padding: tip.props.distance + 5 /* 5px from viewport boundary */,
                          behavior: tip.props.flipBehavior
                        },
                        popperOptions && popperOptions.modifiers ? popperOptions.modifiers.flip : {}
                      ),
                      offset: _extends(
                        {
                          offset: tip.props.offset
                        },
                        popperOptions && popperOptions.modifiers ? popperOptions.modifiers.offset : {}
                      )
                    }),
                    onCreate: function onCreate() {
                      tooltip.style[getPopperPlacement(tip.popper)] = getOffsetDistanceInPx(
                        tip.props.distance,
                        Defaults.distance
                      );

                      if (arrow && tip.props.arrowTransform) {
                        computeArrowTransform(arrow, tip.props.arrowTransform);
                      }
                    },
                    onUpdate: function onUpdate() {
                      var styles = tooltip.style;
                      styles.top = "";
                      styles.bottom = "";
                      styles.left = "";
                      styles.right = "";
                      styles[getPopperPlacement(tip.popper)] = getOffsetDistanceInPx(
                        tip.props.distance,
                        Defaults.distance
                      );

                      if (arrow && tip.props.arrowTransform) {
                        computeArrowTransform(arrow, tip.props.arrowTransform);
                      }
                    }
                  }
                );

                /**
                 * Ensure the popper's position stays correct if its dimensions change.
                 * Use .update() over .scheduleUpdate() so there is no 1 frame flash
                 * due to async update.
                 */
                var observer = new MutationObserver(function() {
                  tip.popperInstance.update();
                });
                observer.observe(tip.popper, { childList: true, subtree: true });
                if (popperMutationObserver) {
                  popperMutationObserver.disconnect();
                }
                popperMutationObserver = observer;

                // fixes https://github.com/atomiks/tippyjs/issues/193
                if (!firstPopperInstanceInit) {
                  firstPopperInstanceInit = true;
                  tip.popper.addEventListener("mouseenter", function(event) {
                    if (tip.props.interactive && tip.state.isVisible && lastTriggerEvent.type === "mouseenter") {
                      prepareShow(event);
                    }
                  });
                  tip.popper.addEventListener("mouseleave", function(event) {
                    if (
                      tip.props.interactive &&
                      lastTriggerEvent.type === "mouseenter" &&
                      tip.props.interactiveDebounce === 0 &&
                      isCursorOutsideInteractiveBorder(
                        getPopperPlacement(tip.popper),
                        tip.popper.getBoundingClientRect(),
                        event,
                        tip.props
                      )
                    ) {
                      prepareHide();
                    }
                  });
                }

                return new Popper(tip.reference, tip.popper, config);
              }

              /**
               * Mounts the tooltip to the DOM, callback to show tooltip is run **after**
               * popper's position has updated
               */
              function mount(callback) {
                if (!tip.popperInstance) {
                  tip.popperInstance = createPopperInstance();
                  if (!tip.props.livePlacement) {
                    tip.popperInstance.disableEventListeners();
                  }
                } else {
                  if (!hasFollowCursorBehavior()) {
                    tip.popperInstance.scheduleUpdate();
                  }
                  if (tip.props.livePlacement && !hasFollowCursorBehavior()) {
                    tip.popperInstance.enableEventListeners();
                  }
                }

                /**
                 * If the instance previously had followCursor behavior, it will be
                 * positioned incorrectly if triggered by `focus` afterwards.
                 * Update the reference back to the real DOM element
                 */
                tip.popperInstance.reference = tip.reference;
                if (hasFollowCursorBehavior()) {
                  if (tip.popperChildren.arrow) {
                    tip.popperChildren.arrow.style.margin = "";
                  }
                  var delay = getValue(tip.props.delay, 0, Defaults.delay);
                  if (lastTriggerEvent.type) {
                    positionVirtualReferenceNearCursor(
                      delay && lastMouseMoveEvent ? lastMouseMoveEvent : lastTriggerEvent
                    );
                  }
                }

                afterPopperPositionUpdates(tip.popperInstance, callback);

                if (!tip.props.appendTo.contains(tip.popper)) {
                  tip.props.appendTo.appendChild(tip.popper);
                  tip.props.onMount(tip);
                  tip.state.isMounted = true;
                }
              }

              /**
               * Determines if the instance is in `followCursor` mode
               */
              function hasFollowCursorBehavior() {
                return tip.props.followCursor && !isUsingTouch && lastTriggerEvent.type !== "focus";
              }

              /**
               * Updates the tooltip's position on each animation frame + timeout
               */
              function makeSticky() {
                applyTransitionDuration([tip.popper], isIE$1 ? 0 : tip.props.updateDuration);

                var updatePosition = function updatePosition() {
                  if (tip.popperInstance) {
                    tip.popperInstance.scheduleUpdate();
                  }

                  if (tip.state.isMounted) {
                    requestAnimationFrame(updatePosition);
                  } else {
                    applyTransitionDuration([tip.popper], 0);
                  }
                };

                updatePosition();
              }

              /**
               * Invokes a callback once the tooltip has fully transitioned out
               */
              function onTransitionedOut(duration, callback) {
                onTransitionEnd(duration, function() {
                  if (!tip.state.isVisible && tip.props.appendTo.contains(tip.popper)) {
                    callback();
                  }
                });
              }

              /**
               * Invokes a callback once the tooltip has fully transitioned in
               */
              function onTransitionedIn(duration, callback) {
                onTransitionEnd(duration, callback);
              }

              /**
               * Invokes a callback once the tooltip's CSS transition ends
               */
              function onTransitionEnd(duration, callback) {
                // Make callback synchronous if duration is 0
                if (duration === 0) {
                  return callback();
                }

                var tooltip = tip.popperChildren.tooltip;

                var listener = function listener(e) {
                  if (e.target === tooltip) {
                    toggleTransitionEndListener(tooltip, "remove", listener);
                    callback();
                  }
                };

                toggleTransitionEndListener(tooltip, "remove", transitionEndListener);
                toggleTransitionEndListener(tooltip, "add", listener);

                transitionEndListener = listener;
              }

              /**
               * Adds an event listener to the reference
               */
              function on(eventType, handler, acc) {
                tip.reference.addEventListener(eventType, handler);
                acc.push({ eventType: eventType, handler: handler });
              }

              /**
               * Adds event listeners to the reference based on the `trigger` prop
               */
              function addTriggersToReference() {
                listeners = tip.props.trigger
                  .trim()
                  .split(" ")
                  .reduce(function(acc, eventType) {
                    if (eventType === "manual") {
                      return acc;
                    }

                    if (!tip.props.target) {
                      on(eventType, onTrigger, acc);

                      if (tip.props.touchHold) {
                        on("touchstart", onTrigger, acc);
                        on("touchend", onMouseLeave, acc);
                      }

                      switch (eventType) {
                        case "mouseenter":
                          on("mouseleave", onMouseLeave, acc);
                          break;
                        case "focus":
                          on(isIE$1 ? "focusout" : "blur", onBlur, acc);
                          break;
                      }
                    } else {
                      switch (eventType) {
                        case "mouseenter":
                          on("mouseover", onDelegateShow, acc);
                          on("mouseout", onDelegateHide, acc);
                          break;
                        case "focus":
                          on("focusin", onDelegateShow, acc);
                          on("focusout", onDelegateHide, acc);
                          break;
                        case "click":
                          on(eventType, onDelegateShow, acc);
                          break;
                      }
                    }

                    return acc;
                  }, []);
              }

              /**
               * Removes event listeners from the reference
               */
              function removeTriggersFromReference() {
                listeners.forEach(function(_ref) {
                  var eventType = _ref.eventType,
                    handler = _ref.handler;

                  tip.reference.removeEventListener(eventType, handler);
                });
              }

              /* ======================= 🔑 Public methods 🔑 ======================= */
              /**
               * Enables the instance to allow it to show or hide
               */
              function enable() {
                tip.state.isEnabled = true;
              }

              /**
               * Disables the instance to disallow it to show or hide
               */
              function disable() {
                tip.state.isEnabled = false;
              }

              /**
               * Clears pending timeouts related to the `delay` prop if any
               */
              function clearDelayTimeouts() {
                clearTimeout(showTimeoutId);
                clearTimeout(hideTimeoutId);
              }

              /**
               * Sets new props for the instance and redraws the tooltip
               */
              function set$$1(options) {
                validateOptions(options, Defaults);

                var prevProps = tip.props;
                var nextProps = evaluateProps(
                  tip.reference,
                  _extends({}, tip.props, options, {
                    performance: true
                  })
                );
                nextProps.performance = options.performance || prevProps.performance;
                tip.props = nextProps;

                if ("trigger" in options || "touchHold" in options) {
                  removeTriggersFromReference();
                  addTriggersToReference();
                }

                if ("interactiveDebounce" in options) {
                  cleanupOldMouseMoveListeners();
                  debouncedOnMouseMove = debounce$1(onMouseMove, options.interactiveDebounce);
                }

                updatePopperElement(tip.popper, prevProps, nextProps);
                tip.popperChildren = getChildren(tip.popper);

                if (
                  tip.popperInstance &&
                  POPPER_INSTANCE_RELATED_PROPS.some(function(prop) {
                    return prop in options;
                  })
                ) {
                  tip.popperInstance.destroy();
                  tip.popperInstance = createPopperInstance();
                  if (!tip.state.isVisible) {
                    tip.popperInstance.disableEventListeners();
                  }
                  if (tip.props.followCursor && lastMouseMoveEvent) {
                    positionVirtualReferenceNearCursor(lastMouseMoveEvent);
                  }
                }
              }

              /**
               * Shortcut for .set({ content: newContent })
               */
              function setContent$$1(content) {
                set$$1({ content: content });
              }

              /**
               * Shows the tooltip
               */
              function show() {
                var duration =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : getValue(tip.props.duration, 0, Defaults.duration[0]);

                if (tip.state.isDestroyed || !tip.state.isEnabled || (isUsingTouch && !tip.props.touch)) {
                  return;
                }

                // Destroy tooltip if the reference element is no longer on the DOM
                if (!tip.reference.isVirtual && !document.documentElement.contains(tip.reference)) {
                  return destroy();
                }

                // Do not show tooltip if the reference element has a `disabled` attribute
                if (tip.reference.hasAttribute("disabled")) {
                  return;
                }

                // If the reference was just programmatically focused for accessibility reasons
                if (referenceJustProgrammaticallyFocused) {
                  referenceJustProgrammaticallyFocused = false;
                  return;
                }

                if (tip.props.onShow(tip) === false) {
                  return;
                }

                tip.popper.style.visibility = "visible";
                tip.state.isVisible = true;

                // Prevent a transition if the popper is at the opposite placement
                applyTransitionDuration([tip.popper, tip.popperChildren.tooltip, tip.popperChildren.backdrop], 0);

                mount(function() {
                  if (!tip.state.isVisible) {
                    return;
                  }

                  // Arrow will sometimes not be positioned correctly. Force another update.
                  if (!hasFollowCursorBehavior()) {
                    tip.popperInstance.update();
                  }

                  applyTransitionDuration(
                    [tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content],
                    duration
                  );
                  if (tip.popperChildren.backdrop) {
                    tip.popperChildren.content.style.transitionDelay = Math.round(duration / 6) + "ms";
                  }

                  if (tip.props.interactive) {
                    tip.reference.classList.add("tippy-active");
                  }

                  if (tip.props.sticky) {
                    makeSticky();
                  }

                  setVisibilityState(
                    [tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content],
                    "visible"
                  );

                  onTransitionedIn(duration, function() {
                    if (tip.props.updateDuration === 0) {
                      tip.popperChildren.tooltip.classList.add("tippy-notransition");
                    }

                    if (tip.props.interactive && ["focus", "click"].indexOf(lastTriggerEvent.type) > -1) {
                      focus(tip.popper);
                    }

                    tip.reference.setAttribute("aria-describedby", tip.popper.id);

                    tip.props.onShown(tip);
                    tip.state.isShown = true;
                  });
                });
              }

              /**
               * Hides the tooltip
               */
              function hide() {
                var duration =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : getValue(tip.props.duration, 1, Defaults.duration[1]);

                if (tip.state.isDestroyed || !tip.state.isEnabled) {
                  return;
                }

                if (tip.props.onHide(tip) === false) {
                  return;
                }

                if (tip.props.updateDuration === 0) {
                  tip.popperChildren.tooltip.classList.remove("tippy-notransition");
                }

                if (tip.props.interactive) {
                  tip.reference.classList.remove("tippy-active");
                }

                tip.popper.style.visibility = "hidden";
                tip.state.isVisible = false;
                tip.state.isShown = false;

                applyTransitionDuration(
                  [tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content],
                  duration
                );

                setVisibilityState(
                  [tip.popperChildren.tooltip, tip.popperChildren.backdrop, tip.popperChildren.content],
                  "hidden"
                );

                if (
                  tip.props.interactive &&
                  !referenceJustProgrammaticallyFocused &&
                  ["focus", "click"].indexOf(lastTriggerEvent.type) > -1
                ) {
                  if (lastTriggerEvent.type === "focus") {
                    referenceJustProgrammaticallyFocused = true;
                  }
                  focus(tip.reference);
                }

                onTransitionedOut(duration, function() {
                  if (!isPreparingToShow) {
                    removeFollowCursorListener();
                  }

                  tip.reference.removeAttribute("aria-describedby");

                  tip.popperInstance.disableEventListeners();

                  tip.props.appendTo.removeChild(tip.popper);
                  tip.state.isMounted = false;

                  tip.props.onHidden(tip);
                });
              }

              /**
               * Destroys the tooltip
               */
              function destroy(destroyTargetInstances) {
                if (tip.state.isDestroyed) {
                  return;
                }

                // Ensure the popper is hidden
                if (tip.state.isVisible) {
                  hide(0);
                }

                removeTriggersFromReference();

                tip.reference.removeEventListener("click", onReferenceClick);

                delete tip.reference._tippy;

                if (tip.props.target && destroyTargetInstances) {
                  toArray$1(tip.reference.querySelectorAll(tip.props.target)).forEach(function(child) {
                    return child._tippy && child._tippy.destroy();
                  });
                }

                if (tip.popperInstance) {
                  tip.popperInstance.destroy();
                }

                if (popperMutationObserver) {
                  popperMutationObserver.disconnect();
                }

                tip.state.isDestroyed = true;
              }
            }

            var eventListenersBound = false;
            var useCapture = false;

            function tippy(targets, options, one) {
              validateOptions(options, Defaults);

              if (!eventListenersBound) {
                bindEventListeners(useCapture);
                eventListenersBound = true;
              }

              var props = _extends({}, Defaults, options);

              /**
               * If they are specifying a virtual positioning reference, we need to polyfill
               * some native DOM props
               */
              if (isPlainObject(targets)) {
                polyfillVirtualReferenceProps(targets);
              }

              var references = getArrayOfElements(targets);
              var firstReference = references[0];

              var instances = (one && firstReference ? [firstReference] : references).reduce(function(acc, reference) {
                var tip = reference && createTippy(reference, props);
                if (tip) {
                  acc.push(tip);
                }
                return acc;
              }, []);

              return {
                targets: targets,
                props: props,
                instances: instances,
                destroyAll: function destroyAll() {
                  this.instances.forEach(function(instance) {
                    instance.destroy();
                  });
                  this.instances = [];
                }
              };
            }

            /**
             * Static props
             */
            tippy.version = version;
            tippy.defaults = Defaults;

            /**
             * Static methods
             */
            tippy.one = function(targets, options) {
              return tippy(targets, options, true).instances[0];
            };
            tippy.setDefaults = function(partialDefaults) {
              setDefaults(partialDefaults);
              tippy.defaults = Defaults;
            };
            tippy.disableAnimations = function() {
              tippy.setDefaults({
                duration: 0,
                updateDuration: 0,
                animateFill: false
              });
            };
            tippy.hideAllPoppers = hideAllPoppers;
            tippy.useCapture = function() {
              useCapture = true;
            };

            /**
             * Auto-init tooltips for elements with a `data-tippy="..."` attribute
             */
            var autoInit = function autoInit() {
              toArray$1(document.querySelectorAll("[data-tippy]")).forEach(function(el) {
                var content = el.getAttribute("data-tippy");
                if (content) {
                  tippy(el, { content: content });
                }
              });
            };
            if (isBrowser$1) {
              setTimeout(autoInit);
            }

            injectCSS(styles);

            return tippy;
          });
        }.call(
          this,
          typeof global !== "undefined"
            ? global
            : typeof self !== "undefined"
              ? self
              : typeof window !== "undefined"
                ? window
                : {}
        ));
      },
      {}
    ],
    16: [
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
    17: [
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
      { "../../../constants": 37, "../../dispatcher": 28, "delegate-events": 4 }
    ],
    18: [
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
      { "../../../constants": 37, "delegate-events": 4, "find-parent": 6, "slide-anim": 13 }
    ],
    19: [
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
      { "../../../constants": 37, "../../dispatcher": 28, scrollama: 12 }
    ],
    20: [
      function(require, module, exports) {
        /**
         * Wrap a scrollable div around tables inside the body section
         */

        function tableify($$tables) {
          for (var i = 0, l = $$tables.length; i < l; ++i) {
            var $table = $$tables[i];
            var $wrapper = document.createElement("div");
            $wrapper.className = "table-wrapper";
            $wrapper.innerHTML = $table.outerHTML;

            $table.parentNode.insertBefore($wrapper, $table);
            $table.parentNode.removeChild($table);
          }
        }

        tableify(document.querySelectorAll("table"));
      },
      {}
    ],
    21: [
      function(require, module, exports) {
        var tippy = require("tippy.js");
        var constants = require("../../../constants");
        var focusTrap = require("../../ui/focus-trap");

        /**
         * Make tippy
         */

        function makeTippy($btn) {
          var rel = $btn.getAttribute("aria-controls");
          var $tooltip = document.getElementById(rel);

          if (!$tooltip) {
            return;
          }

          tippy($btn, {
            content: $tooltip,
            delay: 100,
            arrow: true,
            arrowType: "round",
            size: "large",
            duration: 500,
            animation: "scale",
            allowHTML: true,
            interactive: true,
            theme: "light",
            trigger: "click",
            inertia: true,
            onShown: function(e) {
              e.reference.setAttribute("aria-expanded", true);
              $tooltip.firstChild.setAttribute("tabIndex", "-1");
              focusTrap.enable($tooltip, $tooltip.firstChild);
              document.addEventListener("keydown", onKeyDown);
            },
            onHidden: function(e) {
              e.reference.setAttribute("aria-expanded", false);
              document.removeEventListener("keydown", onKeyDown);
            }
          });
        }

        var $$tippies = document.querySelectorAll(".js-tooltip-button");
        for (var i = 0, l = $$tippies.length; i < l; ++i) {
          makeTippy($$tippies[i]);
        }

        /**
         * Close on escape
         */

        function onKeyDown(e) {
          if (e.which === constants.KEY_ESCAPE) {
            focusTrap.disable();
            tippy.hideAllPoppers();
          }
        }
      },
      { "../../../constants": 37, "../../ui/focus-trap": 31, "tippy.js": 15 }
    ],
    22: [
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
        "../../../constants": 37,
        "../../dispatcher": 28,
        "../../ui/get-breakpoint": 32,
        "../../utils/lerp": 35,
        scrollama: 12
      }
    ],
    23: [
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
      { "../../constants": 37, "../dispatcher": 28, "../ui/focus-trap": 31, "delegate-events": 4 }
    ],
    24: [
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
      { "../../../constants": 37, "../../ui/get-breakpoint": 32, "delegate-events": 4, "find-parent": 6 }
    ],
    25: [
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
      { "../../../constants": 37, "../../dispatcher": 28, "find-parent": 6 }
    ],
    26: [
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
      { "../../../constants": 37, "../../dispatcher": 28, "../../ui/get-breakpoint": 32 }
    ],
    27: [
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
      { "../../../constants": 37, "../../dispatcher": 28, "../../ui/get-breakpoint": 32, debounce: 3 }
    ],
    28: [
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
    29: [
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
        require("./components/content/tooltip");
        require("./components/content/table");
        require("./components/modal");
        require("./utils/video");
        require("./utils/grid");
      },
      {
        "./components/content/anchor-link": 17,
        "./components/content/collapsibles": 18,
        "./components/content/section": 19,
        "./components/content/table": 20,
        "./components/content/tooltip": 21,
        "./components/hero/course-hero": 22,
        "./components/modal": 23,
        "./components/nav/coursenav": 26,
        "./components/nav/coursenav-desktop": 24,
        "./components/nav/coursenav-mobile": 25,
        "./components/nav/fixed": 27,
        "./ui/breakpoint-events": 30,
        "./ui/scroll": 33,
        "./utils/grid": 34,
        "./utils/video": 36
      }
    ],
    30: [
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
      { "../../constants": 37, "../dispatcher": 28, "./get-breakpoint": 32 }
    ],
    31: [
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
    32: [
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
      { "../../constants": 37 }
    ],
    33: [
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
      { "../../constants": 37, "../dispatcher": 28, "scroll-into-view": 11 }
    ],
    34: [
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
    35: [
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
    36: [
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
    37: [
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
  [29]
);
