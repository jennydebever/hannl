(window.webpackJsonp = window.webpackJsonp || []).push([
  [34],
  {
    180: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = a(0),
        n = Object(s.a)(
          {},
          function() {
            var t = this,
              e = t.$createElement,
              a = t._self._c || e;
            return a(
              "div",
              { staticClass: "content" },
              [
                a(
                  "h1",
                  { attrs: { id: "text" } },
                  [
                    a("a", { staticClass: "header-anchor", attrs: { href: "#text", "aria-hidden": "true" } }, [
                      t._v("#")
                    ]),
                    t._v(" Text "),
                    a("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                t._v(" "),
                a("Todo", { attrs: { name: "text-double-column" } }),
                t._v(" "),
                t._m(0),
                t._v(" "),
                a("Todo", { attrs: { name: "text-lead" } }),
                t._v(" "),
                t._m(1)
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
                      "https://user-images.githubusercontent.com/9093958/45950551-8f35c980-c000-11e8-9df7-331c970ce522.png",
                    alt: "text-double-column"
                  }
                })
              ]);
            },
            function() {
              var t = this.$createElement,
                e = this._self._c || t;
              return e("p", [
                e("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/42763092-5aff0f0c-8912-11e8-9395-fb7f7c524a64.jpg",
                    alt: "text-lead"
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
      n.options.__file = "text.md";
      e.default = n.exports;
    }
  }
]);
