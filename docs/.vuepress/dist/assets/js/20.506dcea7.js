(window.webpackJsonp = window.webpackJsonp || []).push([
  [20],
  {
    194: function(t, e, s) {
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
                  { attrs: { id: "image-list" } },
                  [
                    s("a", { staticClass: "header-anchor", attrs: { href: "#image-list", "aria-hidden": "true" } }, [
                      t._v("#")
                    ]),
                    t._v(" Image-List "),
                    s("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                t._v(" "),
                s("Todo", { attrs: { name: "image-list-single-column" } }),
                t._v(" "),
                t._m(0),
                t._v(" "),
                s("Todo", { attrs: { name: "image-list-double-column" } }),
                t._v(" "),
                t._m(1),
                t._v(" "),
                s("Todo", { attrs: { name: "image-list-triple-column" } }),
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
                      "https://user-images.githubusercontent.com/9093958/42761476-faaf5d54-890d-11e8-8e0b-64d119cdcb49.jpg",
                    alt: "image-list-single-column"
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
                      "https://user-images.githubusercontent.com/9093958/43391801-f173bf16-93f1-11e8-9eae-b4429e3bcc57.jpg",
                    alt: "image-list-double-column"
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
                      "https://user-images.githubusercontent.com/9093958/43391802-f1907188-93f1-11e8-8b7c-a997b71d29fb.jpg",
                    alt: "image-list-triple-column"
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
      i.options.__file = "image-list.md";
      e.default = i.exports;
    }
  }
]);
