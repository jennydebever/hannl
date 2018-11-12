(window.webpackJsonp = window.webpackJsonp || []).push([
  [13],
  {
    201: function(e, t, r) {
      "use strict";
      r.r(t);
      var a = r(0),
        s = Object(a.a)(
          {},
          function() {
            var e = this,
              t = e.$createElement,
              r = e._self._c || t;
            return r(
              "div",
              { staticClass: "content" },
              [
                r(
                  "h1",
                  { attrs: { id: "cards" } },
                  [
                    r("a", { staticClass: "header-anchor", attrs: { href: "#cards", "aria-hidden": "true" } }, [
                      e._v("#")
                    ]),
                    e._v(" Cards "),
                    r("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                e._v(" "),
                r("Todo", { attrs: { name: "card-skinny" } }),
                e._v(" "),
                e._m(0),
                e._v(" "),
                r("Todo", { attrs: { name: "card-regular" } }),
                e._v(" "),
                e._m(1),
                e._v(" "),
                r("Todo", { attrs: { name: "card-news-event-regular" } }),
                e._v(" "),
                e._m(2)
              ],
              1
            );
          },
          [
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("p", [
                this._v("Gebruikt voor USP's bij een opleiding.\n"),
                t("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/45949194-6232e800-bffb-11e8-813c-94765ea6b4a0.jpg",
                    alt: "card-skinny"
                  }
                })
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("p", [
                t("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/42753119-292fa2ec-88f0-11e8-8827-630aec24ba41.jpg",
                    alt: "card-regular"
                  }
                })
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("p", [
                t("img", {
                  attrs: {
                    src:
                      "https://user-images.githubusercontent.com/9093958/43150715-e586f76c-8f6a-11e8-88ee-3a077e1cdf61.jpg",
                    alt: "card-news-event-regular"
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
      s.options.__file = "cards.md";
      t.default = s.exports;
    }
  }
]);
