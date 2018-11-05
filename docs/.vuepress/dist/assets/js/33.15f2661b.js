(window.webpackJsonp = window.webpackJsonp || []).push([
  [33],
  {
    181: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = s(0),
        i = Object(a.a)(
          {},
          function() {
            var t = this,
              e = t.$createElement,
              s = t._self._c || e;
            return s(
              "div",
              { staticClass: "content" },
              [
                s(
                  "h1",
                  { attrs: { id: "text-list" } },
                  [
                    s("a", { staticClass: "header-anchor", attrs: { href: "#text-list", "aria-hidden": "true" } }, [
                      t._v("#")
                    ]),
                    t._v(" Text-List "),
                    s("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                t._v(" "),
                s("Todo", { attrs: { name: "text-list-double-column" } }),
                t._v(" "),
                t._m(0),
                t._v(" "),
                s("Todo", { attrs: { name: "text-list-triple-column" } }),
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
                      "https://user-images.githubusercontent.com/9093958/42025827-dd73528c-7ac5-11e8-9482-9e0ec0915960.jpg",
                    alt: "text-list-double-column"
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
                      "https://user-images.githubusercontent.com/9093958/42760297-4ced35fe-890a-11e8-9b41-d7629b57cefa.jpg",
                    alt: "text-list-triple-column"
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
      i.options.__file = "text-list.md";
      e.default = i.exports;
    }
  }
]);
