(window.webpackJsonp = window.webpackJsonp || []).push([
  [14],
  {
    200: function(t, e, a) {
      "use strict";
      a.r(e);
      var s = a(0),
        r = Object(s.a)(
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
                  { attrs: { id: "carousel" } },
                  [
                    e("a", { staticClass: "header-anchor", attrs: { href: "#carousel", "aria-hidden": "true" } }, [
                      this._v("#")
                    ]),
                    this._v(" Carousel "),
                    e("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                this._v(" "),
                e("Todo", { attrs: { name: "carousel-whale" } }),
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
                      "https://user-images.githubusercontent.com/9093958/42751828-53dd4386-88ec-11e8-950a-65375aa3674b.jpg",
                    alt: "carousel-whale"
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
      r.options.__file = "carousel.md";
      e.default = r.exports;
    }
  }
]);
