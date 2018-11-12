(window.webpackJsonp = window.webpackJsonp || []).push([
  [39],
  {
    212: function(t, e, i) {
      "use strict";
      i.r(e);
      var s = i(0),
        a = Object(s.a)(
          {},
          function() {
            var t = this.$createElement,
              e = this._self._c || t;
            return e(
              "div",
              { staticClass: "content" },
              [
                e(
                  "h1",
                  { attrs: { id: "tooltip" } },
                  [
                    e("a", { staticClass: "header-anchor", attrs: { href: "#tooltip", "aria-hidden": "true" } }, [
                      this._v("#")
                    ]),
                    this._v(" Tooltip "),
                    e("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                this._v(" "),
                e("Todo", { attrs: { name: "tooltip-regular" } }),
                this._v(" "),
                this._m(0)
              ],
              1
            );
          },
          [
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("p", [
                e("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/43395195-889e1d7c-93fd-11e8-86fc-e8cfbfc82903.jpg",
                    alt: "tooltip-regular"
                  }
                })
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      a.options.__file = "tooltip.md";
      e.default = a.exports;
    }
  }
]);
