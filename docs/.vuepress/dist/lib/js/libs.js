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
        /*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

        /*global self, document, DOMException */

        /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

        if ("document" in window.self) {
          // Full polyfill for browsers with no classList support
          // Including IE < Edge missing SVGElement.classList
          if (
            !("classList" in document.createElement("_")) ||
            (document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")))
          ) {
            (function(view) {
              "use strict";

              if (!("Element" in view)) return;

              var classListProp = "classList",
                protoProp = "prototype",
                elemCtrProto = view.Element[protoProp],
                objCtr = Object,
                strTrim =
                  String[protoProp].trim ||
                  function() {
                    return this.replace(/^\s+|\s+$/g, "");
                  },
                arrIndexOf =
                  Array[protoProp].indexOf ||
                  function(item) {
                    var i = 0,
                      len = this.length;
                    for (; i < len; i++) {
                      if (i in this && this[i] === item) {
                        return i;
                      }
                    }
                    return -1;
                  },
                // Vendors: please allow content code to instantiate DOMExceptions
                DOMEx = function(type, message) {
                  this.name = type;
                  this.code = DOMException[type];
                  this.message = message;
                },
                checkTokenAndGetIndex = function(classList, token) {
                  if (token === "") {
                    throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
                  }
                  if (/\s/.test(token)) {
                    throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
                  }
                  return arrIndexOf.call(classList, token);
                },
                ClassList = function(elem) {
                  var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
                    i = 0,
                    len = classes.length;
                  for (; i < len; i++) {
                    this.push(classes[i]);
                  }
                  this._updateClassName = function() {
                    elem.setAttribute("class", this.toString());
                  };
                },
                classListProto = (ClassList[protoProp] = []),
                classListGetter = function() {
                  return new ClassList(this);
                };
              // Most DOMException implementations don't allow calling DOMException's toString()
              // on non-DOMExceptions. Error's toString() is sufficient here.
              DOMEx[protoProp] = Error[protoProp];
              classListProto.item = function(i) {
                return this[i] || null;
              };
              classListProto.contains = function(token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1;
              };
              classListProto.add = function() {
                var tokens = arguments,
                  i = 0,
                  l = tokens.length,
                  token,
                  updated = false;
                do {
                  token = tokens[i] + "";
                  if (checkTokenAndGetIndex(this, token) === -1) {
                    this.push(token);
                    updated = true;
                  }
                } while (++i < l);

                if (updated) {
                  this._updateClassName();
                }
              };
              classListProto.remove = function() {
                var tokens = arguments,
                  i = 0,
                  l = tokens.length,
                  token,
                  updated = false,
                  index;
                do {
                  token = tokens[i] + "";
                  index = checkTokenAndGetIndex(this, token);
                  while (index !== -1) {
                    this.splice(index, 1);
                    updated = true;
                    index = checkTokenAndGetIndex(this, token);
                  }
                } while (++i < l);

                if (updated) {
                  this._updateClassName();
                }
              };
              classListProto.toggle = function(token, force) {
                token += "";

                var result = this.contains(token),
                  method = result ? force !== true && "remove" : force !== false && "add";

                if (method) {
                  this[method](token);
                }

                if (force === true || force === false) {
                  return force;
                } else {
                  return !result;
                }
              };
              classListProto.toString = function() {
                return this.join(" ");
              };

              if (objCtr.defineProperty) {
                var classListPropDesc = {
                  get: classListGetter,
                  enumerable: true,
                  configurable: true
                };
                try {
                  objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                } catch (ex) {
                  // IE 8 doesn't support enumerable:true
                  // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
                  // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
                  if (ex.number === undefined || ex.number === -0x7ff5ec54) {
                    classListPropDesc.enumerable = false;
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
                  }
                }
              } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter);
              }
            })(window.self);
          }

          // There is full or partial native classList support, so just check if we need
          // to normalize the add/remove and toggle APIs.

          (function() {
            "use strict";

            var testElement = document.createElement("_");

            testElement.classList.add("c1", "c2");

            // Polyfill for IE 10/11 and Firefox <26, where classList.add and
            // classList.remove exist but support only one argument at a time.
            if (!testElement.classList.contains("c2")) {
              var createMethod = function(method) {
                var original = DOMTokenList.prototype[method];

                DOMTokenList.prototype[method] = function(token) {
                  var i,
                    len = arguments.length;

                  for (i = 0; i < len; i++) {
                    token = arguments[i];
                    original.call(this, token);
                  }
                };
              };
              createMethod("add");
              createMethod("remove");
            }

            testElement.classList.toggle("c3", false);

            // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
            // support the second argument.
            if (testElement.classList.contains("c3")) {
              var _toggle = DOMTokenList.prototype.toggle;

              DOMTokenList.prototype.toggle = function(token, force) {
                if (1 in arguments && !this.contains(token) === !force) {
                  return force;
                } else {
                  return _toggle.call(this, token);
                }
              };
            }

            testElement = null;
          })();
        }
      },
      {}
    ],
    2: [
      function(require, module, exports) {
        /**
         * Copyright 2016 Google Inc. All Rights Reserved.
         *
         * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
         *
         *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
         *
         */

        (function(window, document) {
          "use strict";

          // Exits early if all IntersectionObserver and IntersectionObserverEntry
          // features are natively supported.
          if (
            "IntersectionObserver" in window &&
            "IntersectionObserverEntry" in window &&
            "intersectionRatio" in window.IntersectionObserverEntry.prototype
          ) {
            // Minimal polyfill for Edge 15's lack of `isIntersecting`
            // See: https://github.com/w3c/IntersectionObserver/issues/211
            if (!("isIntersecting" in window.IntersectionObserverEntry.prototype)) {
              Object.defineProperty(window.IntersectionObserverEntry.prototype, "isIntersecting", {
                get: function() {
                  return this.intersectionRatio > 0;
                }
              });
            }
            return;
          }

          /**
           * An IntersectionObserver registry. This registry exists to hold a strong
           * reference to IntersectionObserver instances currently observing a target
           * element. Without this registry, instances without another reference may be
           * garbage collected.
           */
          var registry = [];

          /**
           * Creates the global IntersectionObserverEntry constructor.
           * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
           * @param {Object} entry A dictionary of instance properties.
           * @constructor
           */
          function IntersectionObserverEntry(entry) {
            this.time = entry.time;
            this.target = entry.target;
            this.rootBounds = entry.rootBounds;
            this.boundingClientRect = entry.boundingClientRect;
            this.intersectionRect = entry.intersectionRect || getEmptyRect();
            this.isIntersecting = !!entry.intersectionRect;

            // Calculates the intersection ratio.
            var targetRect = this.boundingClientRect;
            var targetArea = targetRect.width * targetRect.height;
            var intersectionRect = this.intersectionRect;
            var intersectionArea = intersectionRect.width * intersectionRect.height;

            // Sets intersection ratio.
            if (targetArea) {
              // Round the intersection ratio to avoid floating point math issues:
              // https://github.com/w3c/IntersectionObserver/issues/324
              this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
            } else {
              // If area is zero and is intersecting, sets to 1, otherwise to 0
              this.intersectionRatio = this.isIntersecting ? 1 : 0;
            }
          }

          /**
           * Creates the global IntersectionObserver constructor.
           * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
           * @param {Function} callback The function to be invoked after intersection
           *     changes have queued. The function is not invoked if the queue has
           *     been emptied by calling the `takeRecords` method.
           * @param {Object=} opt_options Optional configuration options.
           * @constructor
           */
          function IntersectionObserver(callback, opt_options) {
            var options = opt_options || {};

            if (typeof callback != "function") {
              throw new Error("callback must be a function");
            }

            if (options.root && options.root.nodeType != 1) {
              throw new Error("root must be an Element");
            }

            // Binds and throttles `this._checkForIntersections`.
            this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

            // Private properties.
            this._callback = callback;
            this._observationTargets = [];
            this._queuedEntries = [];
            this._rootMarginValues = this._parseRootMargin(options.rootMargin);

            // Public properties.
            this.thresholds = this._initThresholds(options.threshold);
            this.root = options.root || null;
            this.rootMargin = this._rootMarginValues
              .map(function(margin) {
                return margin.value + margin.unit;
              })
              .join(" ");
          }

          /**
           * The minimum interval within which the document will be checked for
           * intersection changes.
           */
          IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;

          /**
           * The frequency in which the polyfill polls for intersection changes.
           * this can be updated on a per instance basis and must be set prior to
           * calling `observe` on the first target.
           */
          IntersectionObserver.prototype.POLL_INTERVAL = null;

          /**
           * Use a mutation observer on the root element
           * to detect intersection changes.
           */
          IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;

          /**
           * Starts observing a target element for intersection changes based on
           * the thresholds values.
           * @param {Element} target The DOM element to observe.
           */
          IntersectionObserver.prototype.observe = function(target) {
            var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
              return item.element == target;
            });

            if (isTargetAlreadyObserved) {
              return;
            }

            if (!(target && target.nodeType == 1)) {
              throw new Error("target must be an Element");
            }

            this._registerInstance();
            this._observationTargets.push({ element: target, entry: null });
            this._monitorIntersections();
            this._checkForIntersections();
          };

          /**
           * Stops observing a target element for intersection changes.
           * @param {Element} target The DOM element to observe.
           */
          IntersectionObserver.prototype.unobserve = function(target) {
            this._observationTargets = this._observationTargets.filter(function(item) {
              return item.element != target;
            });
            if (!this._observationTargets.length) {
              this._unmonitorIntersections();
              this._unregisterInstance();
            }
          };

          /**
           * Stops observing all target elements for intersection changes.
           */
          IntersectionObserver.prototype.disconnect = function() {
            this._observationTargets = [];
            this._unmonitorIntersections();
            this._unregisterInstance();
          };

          /**
           * Returns any queue entries that have not yet been reported to the
           * callback and clears the queue. This can be used in conjunction with the
           * callback to obtain the absolute most up-to-date intersection information.
           * @return {Array} The currently queued entries.
           */
          IntersectionObserver.prototype.takeRecords = function() {
            var records = this._queuedEntries.slice();
            this._queuedEntries = [];
            return records;
          };

          /**
           * Accepts the threshold value from the user configuration object and
           * returns a sorted array of unique threshold values. If a value is not
           * between 0 and 1 and error is thrown.
           * @private
           * @param {Array|number=} opt_threshold An optional threshold value or
           *     a list of threshold values, defaulting to [0].
           * @return {Array} A sorted list of unique and valid threshold values.
           */
          IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
            var threshold = opt_threshold || [0];
            if (!Array.isArray(threshold)) threshold = [threshold];

            return threshold.sort().filter(function(t, i, a) {
              if (typeof t != "number" || isNaN(t) || t < 0 || t > 1) {
                throw new Error("threshold must be a number between 0 and 1 inclusively");
              }
              return t !== a[i - 1];
            });
          };

          /**
           * Accepts the rootMargin value from the user configuration object
           * and returns an array of the four margin values as an object containing
           * the value and unit properties. If any of the values are not properly
           * formatted or use a unit other than px or %, and error is thrown.
           * @private
           * @param {string=} opt_rootMargin An optional rootMargin value,
           *     defaulting to '0px'.
           * @return {Array<Object>} An array of margin objects with the keys
           *     value and unit.
           */
          IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
            var marginString = opt_rootMargin || "0px";
            var margins = marginString.split(/\s+/).map(function(margin) {
              var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
              if (!parts) {
                throw new Error("rootMargin must be specified in pixels or percent");
              }
              return { value: parseFloat(parts[1]), unit: parts[2] };
            });

            // Handles shorthand.
            margins[1] = margins[1] || margins[0];
            margins[2] = margins[2] || margins[0];
            margins[3] = margins[3] || margins[1];

            return margins;
          };

          /**
           * Starts polling for intersection changes if the polling is not already
           * happening, and if the page's visibility state is visible.
           * @private
           */
          IntersectionObserver.prototype._monitorIntersections = function() {
            if (!this._monitoringIntersections) {
              this._monitoringIntersections = true;

              // If a poll interval is set, use polling instead of listening to
              // resize and scroll events or DOM mutations.
              if (this.POLL_INTERVAL) {
                this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
              } else {
                addEvent(window, "resize", this._checkForIntersections, true);
                addEvent(document, "scroll", this._checkForIntersections, true);

                if (this.USE_MUTATION_OBSERVER && "MutationObserver" in window) {
                  this._domObserver = new MutationObserver(this._checkForIntersections);
                  this._domObserver.observe(document, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                  });
                }
              }
            }
          };

          /**
           * Stops polling for intersection changes.
           * @private
           */
          IntersectionObserver.prototype._unmonitorIntersections = function() {
            if (this._monitoringIntersections) {
              this._monitoringIntersections = false;

              clearInterval(this._monitoringInterval);
              this._monitoringInterval = null;

              removeEvent(window, "resize", this._checkForIntersections, true);
              removeEvent(document, "scroll", this._checkForIntersections, true);

              if (this._domObserver) {
                this._domObserver.disconnect();
                this._domObserver = null;
              }
            }
          };

          /**
           * Scans each observation target for intersection changes and adds them
           * to the internal entries queue. If new entries are found, it
           * schedules the callback to be invoked.
           * @private
           */
          IntersectionObserver.prototype._checkForIntersections = function() {
            var rootIsInDom = this._rootIsInDom();
            var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

            this._observationTargets.forEach(function(item) {
              var target = item.element;
              var targetRect = getBoundingClientRect(target);
              var rootContainsTarget = this._rootContainsTarget(target);
              var oldEntry = item.entry;
              var intersectionRect =
                rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);

              var newEntry = (item.entry = new IntersectionObserverEntry({
                time: now(),
                target: target,
                boundingClientRect: targetRect,
                rootBounds: rootRect,
                intersectionRect: intersectionRect
              }));

              if (!oldEntry) {
                this._queuedEntries.push(newEntry);
              } else if (rootIsInDom && rootContainsTarget) {
                // If the new entry intersection ratio has crossed any of the
                // thresholds, add a new entry.
                if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                  this._queuedEntries.push(newEntry);
                }
              } else {
                // If the root is not in the DOM or target is not contained within
                // root but the previous entry for this target had an intersection,
                // add a new record indicating removal.
                if (oldEntry && oldEntry.isIntersecting) {
                  this._queuedEntries.push(newEntry);
                }
              }
            }, this);

            if (this._queuedEntries.length) {
              this._callback(this.takeRecords(), this);
            }
          };

          /**
           * Accepts a target and root rect computes the intersection between then
           * following the algorithm in the spec.
           * TODO(philipwalton): at this time clip-path is not considered.
           * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
           * @param {Element} target The target DOM element
           * @param {Object} rootRect The bounding rect of the root after being
           *     expanded by the rootMargin value.
           * @return {?Object} The final intersection rect object or undefined if no
           *     intersection is found.
           * @private
           */
          IntersectionObserver.prototype._computeTargetAndRootIntersection = function(target, rootRect) {
            // If the element isn't displayed, an intersection can't happen.
            if (window.getComputedStyle(target).display == "none") return;

            var targetRect = getBoundingClientRect(target);
            var intersectionRect = targetRect;
            var parent = getParentNode(target);
            var atRoot = false;

            while (!atRoot) {
              var parentRect = null;
              var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {};

              // If the parent isn't displayed, an intersection can't happen.
              if (parentComputedStyle.display == "none") return;

              if (parent == this.root || parent == document) {
                atRoot = true;
                parentRect = rootRect;
              } else {
                // If the element has a non-visible overflow, and it's not the <body>
                // or <html> element, update the intersection rect.
                // Note: <body> and <html> cannot be clipped to a rect that's not also
                // the document rect, so no need to compute a new intersection.
                if (
                  parent != document.body &&
                  parent != document.documentElement &&
                  parentComputedStyle.overflow != "visible"
                ) {
                  parentRect = getBoundingClientRect(parent);
                }
              }

              // If either of the above conditionals set a new parentRect,
              // calculate new intersection data.
              if (parentRect) {
                intersectionRect = computeRectIntersection(parentRect, intersectionRect);

                if (!intersectionRect) break;
              }
              parent = getParentNode(parent);
            }
            return intersectionRect;
          };

          /**
           * Returns the root rect after being expanded by the rootMargin value.
           * @return {Object} The expanded root rect.
           * @private
           */
          IntersectionObserver.prototype._getRootRect = function() {
            var rootRect;
            if (this.root) {
              rootRect = getBoundingClientRect(this.root);
            } else {
              // Use <html>/<body> instead of window since scroll bars affect size.
              var html = document.documentElement;
              var body = document.body;
              rootRect = {
                top: 0,
                left: 0,
                right: html.clientWidth || body.clientWidth,
                width: html.clientWidth || body.clientWidth,
                bottom: html.clientHeight || body.clientHeight,
                height: html.clientHeight || body.clientHeight
              };
            }
            return this._expandRectByRootMargin(rootRect);
          };

          /**
           * Accepts a rect and expands it by the rootMargin value.
           * @param {Object} rect The rect object to expand.
           * @return {Object} The expanded rect.
           * @private
           */
          IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
            var margins = this._rootMarginValues.map(function(margin, i) {
              return margin.unit == "px" ? margin.value : (margin.value * (i % 2 ? rect.width : rect.height)) / 100;
            });
            var newRect = {
              top: rect.top - margins[0],
              right: rect.right + margins[1],
              bottom: rect.bottom + margins[2],
              left: rect.left - margins[3]
            };
            newRect.width = newRect.right - newRect.left;
            newRect.height = newRect.bottom - newRect.top;

            return newRect;
          };

          /**
           * Accepts an old and new entry and returns true if at least one of the
           * threshold values has been crossed.
           * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
           *    particular target element or null if no previous entry exists.
           * @param {IntersectionObserverEntry} newEntry The current entry for a
           *    particular target element.
           * @return {boolean} Returns true if a any threshold has been crossed.
           * @private
           */
          IntersectionObserver.prototype._hasCrossedThreshold = function(oldEntry, newEntry) {
            // To make comparing easier, an entry that has a ratio of 0
            // but does not actually intersect is given a value of -1
            var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
            var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;

            // Ignore unchanged ratios
            if (oldRatio === newRatio) return;

            for (var i = 0; i < this.thresholds.length; i++) {
              var threshold = this.thresholds[i];

              // Return true if an entry matches a threshold or if the new ratio
              // and the old ratio are on the opposite sides of a threshold.
              if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
                return true;
              }
            }
          };

          /**
           * Returns whether or not the root element is an element and is in the DOM.
           * @return {boolean} True if the root element is an element and is in the DOM.
           * @private
           */
          IntersectionObserver.prototype._rootIsInDom = function() {
            return !this.root || containsDeep(document, this.root);
          };

          /**
           * Returns whether or not the target element is a child of root.
           * @param {Element} target The target element to check.
           * @return {boolean} True if the target element is a child of root.
           * @private
           */
          IntersectionObserver.prototype._rootContainsTarget = function(target) {
            return containsDeep(this.root || document, target);
          };

          /**
           * Adds the instance to the global IntersectionObserver registry if it isn't
           * already present.
           * @private
           */
          IntersectionObserver.prototype._registerInstance = function() {
            if (registry.indexOf(this) < 0) {
              registry.push(this);
            }
          };

          /**
           * Removes the instance from the global IntersectionObserver registry.
           * @private
           */
          IntersectionObserver.prototype._unregisterInstance = function() {
            var index = registry.indexOf(this);
            if (index != -1) registry.splice(index, 1);
          };

          /**
           * Returns the result of the performance.now() method or null in browsers
           * that don't support the API.
           * @return {number} The elapsed time since the page was requested.
           */
          function now() {
            return window.performance && performance.now && performance.now();
          }

          /**
           * Throttles a function and delays its execution, so it's only called at most
           * once within a given time period.
           * @param {Function} fn The function to throttle.
           * @param {number} timeout The amount of time that must pass before the
           *     function can be called again.
           * @return {Function} The throttled function.
           */
          function throttle(fn, timeout) {
            var timer = null;
            return function() {
              if (!timer) {
                timer = setTimeout(function() {
                  fn();
                  timer = null;
                }, timeout);
              }
            };
          }

          /**
           * Adds an event handler to a DOM node ensuring cross-browser compatibility.
           * @param {Node} node The DOM node to add the event handler to.
           * @param {string} event The event name.
           * @param {Function} fn The event handler to add.
           * @param {boolean} opt_useCapture Optionally adds the even to the capture
           *     phase. Note: this only works in modern browsers.
           */
          function addEvent(node, event, fn, opt_useCapture) {
            if (typeof node.addEventListener == "function") {
              node.addEventListener(event, fn, opt_useCapture || false);
            } else if (typeof node.attachEvent == "function") {
              node.attachEvent("on" + event, fn);
            }
          }

          /**
           * Removes a previously added event handler from a DOM node.
           * @param {Node} node The DOM node to remove the event handler from.
           * @param {string} event The event name.
           * @param {Function} fn The event handler to remove.
           * @param {boolean} opt_useCapture If the event handler was added with this
           *     flag set to true, it should be set to true here in order to remove it.
           */
          function removeEvent(node, event, fn, opt_useCapture) {
            if (typeof node.removeEventListener == "function") {
              node.removeEventListener(event, fn, opt_useCapture || false);
            } else if (typeof node.detatchEvent == "function") {
              node.detatchEvent("on" + event, fn);
            }
          }

          /**
           * Returns the intersection between two rect objects.
           * @param {Object} rect1 The first rect.
           * @param {Object} rect2 The second rect.
           * @return {?Object} The intersection rect or undefined if no intersection
           *     is found.
           */
          function computeRectIntersection(rect1, rect2) {
            var top = Math.max(rect1.top, rect2.top);
            var bottom = Math.min(rect1.bottom, rect2.bottom);
            var left = Math.max(rect1.left, rect2.left);
            var right = Math.min(rect1.right, rect2.right);
            var width = right - left;
            var height = bottom - top;

            return (
              width >= 0 &&
              height >= 0 && {
                top: top,
                bottom: bottom,
                left: left,
                right: right,
                width: width,
                height: height
              }
            );
          }

          /**
           * Shims the native getBoundingClientRect for compatibility with older IE.
           * @param {Element} el The element whose bounding rect to get.
           * @return {Object} The (possibly shimmed) rect of the element.
           */
          function getBoundingClientRect(el) {
            var rect;

            try {
              rect = el.getBoundingClientRect();
            } catch (err) {
              // Ignore Windows 7 IE11 "Unspecified error"
              // https://github.com/w3c/IntersectionObserver/pull/205
            }

            if (!rect) return getEmptyRect();

            // Older IE
            if (!(rect.width && rect.height)) {
              rect = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
              };
            }
            return rect;
          }

          /**
           * Returns an empty rect object. An empty rect is returned when an element
           * is not in the DOM.
           * @return {Object} The empty rect.
           */
          function getEmptyRect() {
            return {
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: 0,
              height: 0
            };
          }

          /**
           * Checks to see if a parent element contains a child element (including inside
           * shadow DOM).
           * @param {Node} parent The parent element.
           * @param {Node} child The child element.
           * @return {boolean} True if the parent node contains the child node.
           */
          function containsDeep(parent, child) {
            var node = child;
            while (node) {
              if (node == parent) return true;

              node = getParentNode(node);
            }
            return false;
          }

          /**
           * Gets the parent node of an element or its host element if the parent node
           * is a shadow root.
           * @param {Node} node The node whose parent to get.
           * @return {Node|null} The parent node or null if no parent exists.
           */
          function getParentNode(node) {
            var parent = node.parentNode;

            if (parent && parent.nodeType == 11 && parent.host) {
              // If the parent is a shadow root, return the host element.
              return parent.host;
            }
            return parent;
          }

          // Exposes the constructors globally.
          window.IntersectionObserver = IntersectionObserver;
          window.IntersectionObserverEntry = IntersectionObserverEntry;
        })(window, document);
      },
      {}
    ],
    3: [
      function(require, module, exports) {
        /* smoothscroll v0.4.0 - 2018 - Dustan Kasten, Jeremias Menichelli - MIT License */
        (function() {
          "use strict";

          // polyfill
          function polyfill() {
            // aliases
            var w = window;
            var d = document;

            // return if scroll behavior is supported and polyfill is not forced
            if ("scrollBehavior" in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
              return;
            }

            // globals
            var Element = w.HTMLElement || w.Element;
            var SCROLL_TIME = 468;

            // object gathering original scroll methods
            var original = {
              scroll: w.scroll || w.scrollTo,
              scrollBy: w.scrollBy,
              elementScroll: Element.prototype.scroll || scrollElement,
              scrollIntoView: Element.prototype.scrollIntoView
            };

            // define timing method
            var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;

            /**
             * indicates if a the current browser is made by Microsoft
             * @method isMicrosoftBrowser
             * @param {String} userAgent
             * @returns {Boolean}
             */
            function isMicrosoftBrowser(userAgent) {
              var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

              return new RegExp(userAgentPatterns.join("|")).test(userAgent);
            }

            /*
     * IE has rounding bug rounding down clientHeight and clientWidth and
     * rounding up scrollHeight and scrollWidth causing false positives
     * on hasScrollableSpace
     */
            var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

            /**
             * changes scroll position inside an element
             * @method scrollElement
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function scrollElement(x, y) {
              this.scrollLeft = x;
              this.scrollTop = y;
            }

            /**
             * returns result of applying ease math function to a number
             * @method ease
             * @param {Number} k
             * @returns {Number}
             */
            function ease(k) {
              return 0.5 * (1 - Math.cos(Math.PI * k));
            }

            /**
             * indicates if a smooth behavior should be applied
             * @method shouldBailOut
             * @param {Number|Object} firstArg
             * @returns {Boolean}
             */
            function shouldBailOut(firstArg) {
              if (
                firstArg === null ||
                typeof firstArg !== "object" ||
                firstArg.behavior === undefined ||
                firstArg.behavior === "auto" ||
                firstArg.behavior === "instant"
              ) {
                // first argument is not an object/null
                // or behavior is auto, instant or undefined
                return true;
              }

              if (typeof firstArg === "object" && firstArg.behavior === "smooth") {
                // first argument is an object and behavior is smooth
                return false;
              }

              // throw error when behavior is not supported
              throw new TypeError(
                "behavior member of ScrollOptions " +
                  firstArg.behavior +
                  " is not a valid value for enumeration ScrollBehavior."
              );
            }

            /**
             * indicates if an element has scrollable space in the provided axis
             * @method hasScrollableSpace
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function hasScrollableSpace(el, axis) {
              if (axis === "Y") {
                return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
              }

              if (axis === "X") {
                return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
              }
            }

            /**
             * indicates if an element has a scrollable overflow property in the axis
             * @method canOverflow
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function canOverflow(el, axis) {
              var overflowValue = w.getComputedStyle(el, null)["overflow" + axis];

              return overflowValue === "auto" || overflowValue === "scroll";
            }

            /**
             * indicates if an element can be scrolled in either axis
             * @method isScrollable
             * @param {Node} el
             * @param {String} axis
             * @returns {Boolean}
             */
            function isScrollable(el) {
              var isScrollableY = hasScrollableSpace(el, "Y") && canOverflow(el, "Y");
              var isScrollableX = hasScrollableSpace(el, "X") && canOverflow(el, "X");

              return isScrollableY || isScrollableX;
            }

            /**
             * finds scrollable parent of an element
             * @method findScrollableParent
             * @param {Node} el
             * @returns {Node} el
             */
            function findScrollableParent(el) {
              var isBody;

              do {
                el = el.parentNode;

                isBody = el === d.body;
              } while (isBody === false && isScrollable(el) === false);

              isBody = null;

              return el;
            }

            /**
             * self invoked function that, given a context, steps through scrolling
             * @method step
             * @param {Object} context
             * @returns {undefined}
             */
            function step(context) {
              var time = now();
              var value;
              var currentX;
              var currentY;
              var elapsed = (time - context.startTime) / SCROLL_TIME;

              // avoid elapsed times higher than one
              elapsed = elapsed > 1 ? 1 : elapsed;

              // apply easing to elapsed time
              value = ease(elapsed);

              currentX = context.startX + (context.x - context.startX) * value;
              currentY = context.startY + (context.y - context.startY) * value;

              context.method.call(context.scrollable, currentX, currentY);

              // scroll more if we have not reached our destination
              if (currentX !== context.x || currentY !== context.y) {
                w.requestAnimationFrame(step.bind(w, context));
              }
            }

            /**
             * scrolls window or element with a smooth behavior
             * @method smoothScroll
             * @param {Object|Node} el
             * @param {Number} x
             * @param {Number} y
             * @returns {undefined}
             */
            function smoothScroll(el, x, y) {
              var scrollable;
              var startX;
              var startY;
              var method;
              var startTime = now();

              // define scroll context
              if (el === d.body) {
                scrollable = w;
                startX = w.scrollX || w.pageXOffset;
                startY = w.scrollY || w.pageYOffset;
                method = original.scroll;
              } else {
                scrollable = el;
                startX = el.scrollLeft;
                startY = el.scrollTop;
                method = scrollElement;
              }

              // scroll looping over a frame
              step({
                scrollable: scrollable,
                method: method,
                startTime: startTime,
                startX: startX,
                startY: startY,
                x: x,
                y: y
              });
            }

            // ORIGINAL METHODS OVERRIDES
            // w.scroll and w.scrollTo
            w.scroll = w.scrollTo = function() {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.scroll.call(
                  w,
                  arguments[0].left !== undefined
                    ? arguments[0].left
                    : typeof arguments[0] !== "object"
                      ? arguments[0]
                      : w.scrollX || w.pageXOffset,
                  // use top prop, second argument if present or fallback to scrollY
                  arguments[0].top !== undefined
                    ? arguments[0].top
                    : arguments[1] !== undefined
                      ? arguments[1]
                      : w.scrollY || w.pageYOffset
                );

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              smoothScroll.call(
                w,
                d.body,
                arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset,
                arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset
              );
            };

            // w.scrollBy
            w.scrollBy = function() {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0])) {
                original.scrollBy.call(
                  w,
                  arguments[0].left !== undefined
                    ? arguments[0].left
                    : typeof arguments[0] !== "object"
                      ? arguments[0]
                      : 0,
                  arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0
                );

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              smoothScroll.call(
                w,
                d.body,
                ~~arguments[0].left + (w.scrollX || w.pageXOffset),
                ~~arguments[0].top + (w.scrollY || w.pageYOffset)
              );
            };

            // Element.prototype.scroll and Element.prototype.scrollTo
            Element.prototype.scroll = Element.prototype.scrollTo = function() {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                // if one number is passed, throw error to match Firefox implementation
                if (typeof arguments[0] === "number" && arguments[1] === undefined) {
                  throw new SyntaxError("Value could not be converted");
                }

                original.elementScroll.call(
                  this,
                  // use left prop, first number argument or fallback to scrollLeft
                  arguments[0].left !== undefined
                    ? ~~arguments[0].left
                    : typeof arguments[0] !== "object"
                      ? ~~arguments[0]
                      : this.scrollLeft,
                  // use top prop, second argument or fallback to scrollTop
                  arguments[0].top !== undefined
                    ? ~~arguments[0].top
                    : arguments[1] !== undefined
                      ? ~~arguments[1]
                      : this.scrollTop
                );

                return;
              }

              var left = arguments[0].left;
              var top = arguments[0].top;

              // LET THE SMOOTHNESS BEGIN!
              smoothScroll.call(
                this,
                this,
                typeof left === "undefined" ? this.scrollLeft : ~~left,
                typeof top === "undefined" ? this.scrollTop : ~~top
              );
            };

            // Element.prototype.scrollBy
            Element.prototype.scrollBy = function() {
              // avoid action when no arguments are passed
              if (arguments[0] === undefined) {
                return;
              }

              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.elementScroll.call(
                  this,
                  arguments[0].left !== undefined
                    ? ~~arguments[0].left + this.scrollLeft
                    : ~~arguments[0] + this.scrollLeft,
                  arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
                );

                return;
              }

              this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior
              });
            };

            // Element.prototype.scrollIntoView
            Element.prototype.scrollIntoView = function() {
              // avoid smooth behavior if not required
              if (shouldBailOut(arguments[0]) === true) {
                original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);

                return;
              }

              // LET THE SMOOTHNESS BEGIN!
              var scrollableParent = findScrollableParent(this);
              var parentRects = scrollableParent.getBoundingClientRect();
              var clientRects = this.getBoundingClientRect();

              if (scrollableParent !== d.body) {
                // reveal element inside parent
                smoothScroll.call(
                  this,
                  scrollableParent,
                  scrollableParent.scrollLeft + clientRects.left - parentRects.left,
                  scrollableParent.scrollTop + clientRects.top - parentRects.top
                );

                // reveal parent in viewport unless is fixed
                if (w.getComputedStyle(scrollableParent).position !== "fixed") {
                  w.scrollBy({
                    left: parentRects.left,
                    top: parentRects.top,
                    behavior: "smooth"
                  });
                }
              } else {
                // reveal element in viewport
                w.scrollBy({
                  left: clientRects.left,
                  top: clientRects.top,
                  behavior: "smooth"
                });
              }
            };
          }

          if (typeof exports === "object" && typeof module !== "undefined") {
            // commonjs
            module.exports = { polyfill: polyfill };
          } else {
            // global
            polyfill();
          }
        })();
      },
      {}
    ],
    4: [
      function(require, module, exports) {
        /**
         * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
         * @version v5.1.2
         * @link https://github.com/ten1seven/what-input
         * @license MIT
         */
        (function webpackUniversalModuleDefinition(root, factory) {
          if (typeof exports === "object" && typeof module === "object") module.exports = factory();
          else if (typeof define === "function" && define.amd) define("whatInput", [], factory);
          else if (typeof exports === "object") exports["whatInput"] = factory();
          else root["whatInput"] = factory();
        })(this, function() {
          return /******/ (function(modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/ var installedModules = {}; // The require function

            /******/ /******/ function __webpack_require__(moduleId) {
              /******/ // Check if module is in cache
              /******/ if (installedModules[moduleId]) /******/ return installedModules[moduleId].exports; // Create a new module (and put it into the cache)

              /******/ /******/ var module = (installedModules[moduleId] = {
                /******/ exports: {},
                /******/ id: moduleId,
                /******/ loaded: false
                /******/
              }); // Execute the module function

              /******/ /******/ modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); // Flag the module as loaded

              /******/ /******/ module.loaded = true; // Return the exports of the module

              /******/ /******/ return module.exports;
              /******/
            } // expose the modules object (__webpack_modules__)

            /******/ /******/ __webpack_require__.m = modules; // expose the module cache

            /******/ /******/ __webpack_require__.c = installedModules; // __webpack_public_path__

            /******/ /******/ __webpack_require__.p = ""; // Load entry module and return exports

            /******/ /******/ return __webpack_require__(0);
            /******/
          })(
            /************************************************************************/
            /******/ [
              /* 0 */
              /***/ function(module, exports) {
                "use strict";

                module.exports = (function() {
                  /*
	   * bail out if there is no document or window
	   * (i.e. in a node/non-DOM environment)
	   *
	   * Return a stubbed API instead
	   */
                  if (typeof document === "undefined" || typeof window === "undefined") {
                    return {
                      // always return "initial" because no interaction will ever be detected
                      ask: function ask() {
                        return "initial";
                      },

                      // always return null
                      element: function element() {
                        return null;
                      },

                      // no-op
                      ignoreKeys: function ignoreKeys() {},

                      // no-op
                      specificKeys: function specificKeys() {},

                      // no-op
                      registerOnChange: function registerOnChange() {},

                      // no-op
                      unRegisterOnChange: function unRegisterOnChange() {}
                    };
                  }

                  /*
	   * variables
	   */

                  // cache document.documentElement
                  var docElem = document.documentElement;

                  // currently focused dom element
                  var currentElement = null;

                  // last used input type
                  var currentInput = "initial";

                  // last used input intent
                  var currentIntent = currentInput;

                  // check for sessionStorage support
                  // then check for session variables and use if available
                  try {
                    if (window.sessionStorage.getItem("what-input")) {
                      currentInput = window.sessionStorage.getItem("what-input");
                    }

                    if (window.sessionStorage.getItem("what-intent")) {
                      currentIntent = window.sessionStorage.getItem("what-intent");
                    }
                  } catch (e) {}

                  // event buffer timer
                  var eventTimer = null;

                  // form input types
                  var formInputs = ["input", "select", "textarea"];

                  // empty array for holding callback functions
                  var functionList = [];

                  // list of modifier keys commonly used with the mouse and
                  // can be safely ignored to prevent false keyboard detection
                  var ignoreMap = [
                    16, // shift
                    17, // control
                    18, // alt
                    91, // Windows key / left Apple cmd
                    93 // Windows menu / right Apple cmd
                  ];

                  var specificMap = [];

                  // mapping of events to input types
                  var inputMap = {
                    keydown: "keyboard",
                    keyup: "keyboard",
                    mousedown: "mouse",
                    mousemove: "mouse",
                    MSPointerDown: "pointer",
                    MSPointerMove: "pointer",
                    pointerdown: "pointer",
                    pointermove: "pointer",
                    touchstart: "touch"

                    // boolean: true if touch buffer is active
                  };
                  var isBuffering = false;

                  // boolean: true if the page is being scrolled
                  var isScrolling = false;

                  // store current mouse position
                  var mousePos = {
                    x: null,
                    y: null

                    // map of IE 10 pointer events
                  };
                  var pointerMap = {
                    2: "touch",
                    3: "touch", // treat pen like touch
                    4: "mouse"

                    // check support for passive event listeners
                  };
                  var supportsPassive = false;

                  try {
                    var opts = Object.defineProperty({}, "passive", {
                      get: function get() {
                        supportsPassive = true;
                      }
                    });

                    window.addEventListener("test", null, opts);
                  } catch (e) {}

                  /*
	   * set up
	   */

                  var setUp = function setUp() {
                    // add correct mouse wheel event mapping to `inputMap`
                    inputMap[detectWheel()] = "mouse";

                    addListeners();
                    doUpdate("input");
                    doUpdate("intent");
                  };

                  /*
	   * events
	   */

                  var addListeners = function addListeners() {
                    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
                    // can only demonstrate potential, but not actual, interaction
                    // and are treated separately
                    var options = supportsPassive ? { passive: true } : false;

                    // pointer events (mouse, pen, touch)
                    if (window.PointerEvent) {
                      window.addEventListener("pointerdown", setInput);
                      window.addEventListener("pointermove", setIntent);
                    } else if (window.MSPointerEvent) {
                      window.addEventListener("MSPointerDown", setInput);
                      window.addEventListener("MSPointerMove", setIntent);
                    } else {
                      // mouse events
                      window.addEventListener("mousedown", setInput);
                      window.addEventListener("mousemove", setIntent);

                      // touch events
                      if ("ontouchstart" in window) {
                        window.addEventListener("touchstart", eventBuffer, options);
                        window.addEventListener("touchend", setInput);
                      }
                    }

                    // mouse wheel
                    window.addEventListener(detectWheel(), setIntent, options);

                    // keyboard events
                    window.addEventListener("keydown", eventBuffer);
                    window.addEventListener("keyup", eventBuffer);

                    // focus events
                    window.addEventListener("focusin", setElement);
                    window.addEventListener("focusout", clearElement);
                  };

                  // checks conditions before updating new input
                  var setInput = function setInput(event) {
                    // only execute if the event buffer timer isn't running
                    if (!isBuffering) {
                      var eventKey = event.which;
                      var value = inputMap[event.type];

                      if (value === "pointer") {
                        value = pointerType(event);
                      }

                      var ignoreMatch = !specificMap.length && ignoreMap.indexOf(eventKey) === -1;

                      var specificMatch = specificMap.length && specificMap.indexOf(eventKey) !== -1;

                      var shouldUpdate =
                        (value === "keyboard" && eventKey && (ignoreMatch || specificMatch)) ||
                        value === "mouse" ||
                        value === "touch";

                      if (currentInput !== value && shouldUpdate) {
                        currentInput = value;

                        try {
                          window.sessionStorage.setItem("what-input", currentInput);
                        } catch (e) {}

                        doUpdate("input");
                      }

                      if (currentIntent !== value && shouldUpdate) {
                        // preserve intent for keyboard typing in form fields
                        var activeElem = document.activeElement;
                        var notFormInput =
                          activeElem &&
                          activeElem.nodeName &&
                          formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1;

                        if (notFormInput) {
                          currentIntent = value;

                          try {
                            window.sessionStorage.setItem("what-intent", currentIntent);
                          } catch (e) {}

                          doUpdate("intent");
                        }
                      }
                    }
                  };

                  // updates the doc and `inputTypes` array with new input
                  var doUpdate = function doUpdate(which) {
                    docElem.setAttribute("data-what" + which, which === "input" ? currentInput : currentIntent);

                    fireFunctions(which);
                  };

                  // updates input intent for `mousemove` and `pointermove`
                  var setIntent = function setIntent(event) {
                    // test to see if `mousemove` happened relative to the screen to detect scrolling versus mousemove
                    detectScrolling(event);

                    // only execute if the event buffer timer isn't running
                    // or scrolling isn't happening
                    if (!isBuffering && !isScrolling) {
                      var value = inputMap[event.type];
                      if (value === "pointer") {
                        value = pointerType(event);
                      }

                      if (currentIntent !== value) {
                        currentIntent = value;

                        try {
                          window.sessionStorage.setItem("what-intent", currentIntent);
                        } catch (e) {}

                        doUpdate("intent");
                      }
                    }
                  };

                  var setElement = function setElement(event) {
                    if (!event.target.nodeName) {
                      // If nodeName is undefined, clear the element
                      // This can happen if click inside an <svg> element.
                      clearElement();
                      return;
                    }

                    currentElement = event.target.nodeName.toLowerCase();
                    docElem.setAttribute("data-whatelement", currentElement);

                    if (event.target.classList && event.target.classList.length) {
                      docElem.setAttribute("data-whatclasses", event.target.classList.toString().replace(" ", ","));
                    }
                  };

                  var clearElement = function clearElement() {
                    currentElement = null;

                    docElem.removeAttribute("data-whatelement");
                    docElem.removeAttribute("data-whatclasses");
                  };

                  // buffers events that frequently also fire mouse events
                  var eventBuffer = function eventBuffer(event) {
                    // set the current input
                    setInput(event);

                    // clear the timer if it happens to be running
                    window.clearTimeout(eventTimer);

                    // set the isBuffering to `true`
                    isBuffering = true;

                    // run the timer
                    eventTimer = window.setTimeout(function() {
                      // if the timer runs out, set isBuffering back to `false`
                      isBuffering = false;
                    }, 100);
                  };

                  /*
	   * utilities
	   */

                  var pointerType = function pointerType(event) {
                    if (typeof event.pointerType === "number") {
                      return pointerMap[event.pointerType];
                    } else {
                      // treat pen like touch
                      return event.pointerType === "pen" ? "touch" : event.pointerType;
                    }
                  };

                  // detect version of mouse wheel event to use
                  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
                  var detectWheel = function detectWheel() {
                    var wheelType = void 0;

                    // Modern browsers support "wheel"
                    if ("onwheel" in document.createElement("div")) {
                      wheelType = "wheel";
                    } else {
                      // Webkit and IE support at least "mousewheel"
                      // or assume that remaining browsers are older Firefox
                      wheelType = document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll";
                    }

                    return wheelType;
                  };

                  // runs callback functions
                  var fireFunctions = function fireFunctions(type) {
                    for (var i = 0, len = functionList.length; i < len; i++) {
                      if (functionList[i].type === type) {
                        functionList[i].fn.call(undefined, type === "input" ? currentInput : currentIntent);
                      }
                    }
                  };

                  // finds matching element in an object
                  var objPos = function objPos(match) {
                    for (var i = 0, len = functionList.length; i < len; i++) {
                      if (functionList[i].fn === match) {
                        return i;
                      }
                    }
                  };

                  var detectScrolling = function detectScrolling(event) {
                    if (mousePos["x"] !== event.screenX || mousePos["y"] !== event.screenY) {
                      isScrolling = false;

                      mousePos["x"] = event.screenX;
                      mousePos["y"] = event.screenY;
                    } else {
                      isScrolling = true;
                    }
                  };

                  /*
	   * init
	   */

                  // don't start script unless browser cuts the mustard
                  // (also passes if polyfills are used)
                  if ("addEventListener" in window && Array.prototype.indexOf) {
                    setUp();
                  }

                  /*
	   * api
	   */

                  return {
                    // returns string: the current input type
                    // opt: 'intent'|'input'
                    // 'input' (default): returns the same value as the `data-whatinput` attribute
                    // 'intent': includes `data-whatintent` value if it's different than `data-whatinput`
                    ask: function ask(opt) {
                      return opt === "intent" ? currentIntent : currentInput;
                    },

                    // returns string: the currently focused element or null
                    element: function element() {
                      return currentElement;
                    },

                    // overwrites ignored keys with provided array
                    ignoreKeys: function ignoreKeys(arr) {
                      ignoreMap = arr;
                    },

                    // overwrites specific char keys to update on
                    specificKeys: function specificKeys(arr) {
                      specificMap = arr;
                    },

                    // attach functions to input and intent "events"
                    // funct: function to fire on change
                    // eventType: 'input'|'intent'
                    registerOnChange: function registerOnChange(fn, eventType) {
                      functionList.push({
                        fn: fn,
                        type: eventType || "input"
                      });
                    },

                    unRegisterOnChange: function unRegisterOnChange(fn) {
                      var position = objPos(fn);

                      if (position || position === 0) {
                        functionList.splice(position, 1);
                      }
                    }
                  };
                })();

                /***/
              }
              /******/
            ]
          );
        });
      },
      {}
    ],
    5: [
      function(require, module, exports) {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf("MSIE ");
        var trident = ua.indexOf("Trident/");
        var edge = ua.indexOf("Edge/");
        if (msie > 0) {
          // IE 10 or older => return version number
          document.documentElement.className +=
            " old-ie ie ie" + parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        } else if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf("rv:");
          document.documentElement.className += " ie ie" + parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        } else if (edge > 0) {
          document.documentElement.className += " edge";
        }
      },
      {}
    ],
    6: [
      function(require, module, exports) {
        require("classlist-polyfill");
        require("intersection-observer");
        require("smoothscroll-polyfill").polyfill();
        require("what-input");
        require("./detect-ie");
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
