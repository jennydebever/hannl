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
    2: [
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
    3: [
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
      { "../../constants": 4 }
    ],
    4: [
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
      { keymirror: 1, "object-assign": 2 }
    ],
    5: [
      function(require, module, exports) {
        /**
         * Script loaded in head
         * must be kept as lightweight as possible
         */

        // set data attribute on body for current breakpoint
        var getBreakpoint = require("../app/ui/get-breakpoint");
        document.documentElement.setAttribute("data-breakpoint", getBreakpoint().toLowerCase());
      },
      { "../app/ui/get-breakpoint": 3 }
    ]
  },
  {},
  [5]
);
