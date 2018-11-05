(window.webpackJsonp = window.webpackJsonp || []).push([
  [25],
  {
    189: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = a(0),
        r = Object(s.a)(
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
                  { attrs: { id: "quote" } },
                  [
                    a("a", { staticClass: "header-anchor", attrs: { href: "#quote", "aria-hidden": "true" } }, [
                      t._v("#")
                    ]),
                    t._v(" Quote "),
                    a("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                t._v(" "),
                a("Todo", { attrs: { name: "quote-skinny" } }),
                t._v(" "),
                t._m(0),
                t._v(" "),
                a("Todo", { attrs: { name: "quote-regular" } }),
                t._v(" "),
                t._m(1),
                t._v(" "),
                a("Todo", { attrs: { name: "quote-fat" } }),
                t._v(" "),
                t._m(2)
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
                      "https://user-images.githubusercontent.com/9093958/42767769-26f4bc28-891e-11e8-8336-a0bf801bef4b.jpg",
                    alt: "quote-skinny"
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
                      "https://user-images.githubusercontent.com/9093958/42764853-f280a58a-8916-11e8-9624-80c8b37a8adb.jpg",
                    alt: "quote-regular"
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
                      "https://user-images.githubusercontent.com/9093958/45954861-81874080-c00e-11e8-8220-b4c0d37aa7d7.png",
                    alt: "quote-fat"
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
      r.options.__file = "quote.md";
      e.default = r.exports;
    }
  }
]);
