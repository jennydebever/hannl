(window.webpackJsonp = window.webpackJsonp || []).push([
  [30],
  {
    184: function(t, s, a) {
      "use strict";
      a.r(s);
      var e = a(0),
        r = Object(e.a)(
          {},
          function() {
            var t = this.$createElement,
              s = this._self._c || t;
            return s(
              "div",
              { staticClass: "content" },
              [
                s(
                  "h1",
                  { attrs: { id: "tabs" } },
                  [
                    s("a", { staticClass: "header-anchor", attrs: { href: "#tabs", "aria-hidden": "true" } }, [
                      this._v("#")
                    ]),
                    this._v(" Tabs "),
                    s("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                this._v(" "),
                s("Todo", { attrs: { name: "tabs-regular" } }),
                this._v(" "),
                this._m(0)
              ],
              1
            );
          },
          [
            function() {
              var t = this.$createElement,
                s = this._self._c || t;
              return s("p", [
                s("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/42764991-47da4f5e-8917-11e8-910d-25dccbbc45ab.jpg",
                    alt: "tabs-regular"
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
      r.options.__file = "tabs.md";
      s.default = r.exports;
    }
  }
]);
