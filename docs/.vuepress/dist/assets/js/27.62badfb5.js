(window.webpackJsonp = window.webpackJsonp || []).push([
  [27],
  {
    187: function(e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = Object(n.a)(
          {},
          function() {
            var e = this,
              t = e.$createElement,
              a = e._self._c || t;
            return a(
              "div",
              { staticClass: "content" },
              [
                a(
                  "h1",
                  { attrs: { id: "sliders" } },
                  [
                    a("a", { staticClass: "header-anchor", attrs: { href: "#sliders", "aria-hidden": "true" } }, [
                      e._v("#")
                    ]),
                    e._v(" Sliders "),
                    a("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                e._v(" "),
                a("Todo", { attrs: { name: "slider-regular" } }),
                e._v(" "),
                e._m(0),
                e._v(" "),
                a("p", [
                  e._v(
                    "Klikbare etalage om projecten, faciliteiten, etc. visueel te presenteren. Deze versie van de slider heeft mogelijkheden voor het plaasten van een onderschrift, link, video en foto. Het component kan op elke pagina geplaatst worden."
                  )
                ]),
                e._v(" "),
                e._m(1),
                e._v(" "),
                e._m(2),
                e._v(" "),
                a("ul", [
                  a("li", [
                    e._v(
                      "Op dekstop is het element maximaal container breed (1160px). Als de container smaller is dan de maximale breedte, dan 'snapt'de slider aan de randen van de container."
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    e._v(
                      "Transitie voor overgang van de verschillende slides: @speed: 0.8s; @easing: cubic-bezier(.05, 0, .002, 1); // ease-out"
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    e._v(
                      "Op alle breakpoints de mogelijkheid hebben om d.m.v de knoppen en swipen te switchen tussen de volgende/vorige slide."
                    )
                  ]),
                  e._v(" "),
                  a("li", [e._v("Slide met een playbutton, deze met een fade in te laden van @speed 0.3s;")]),
                  e._v(" "),
                  e._m(3),
                  e._v(" "),
                  a("li", [
                    e._v(
                      "Buttons Next Slide / Prev Slide rechts uitgelijnd met margin op LG/XL: -24px; MD: -24px; SM/XS: -20px."
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    e._v(
                      "Mocht er meer tekst dan in het ontwerp geplaatst worden in het component: vergroten naar onderen."
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    a(
                      "a",
                      {
                        attrs: {
                          href: "https://share.goabstract.com/f78784e8-c4cb-465d-a1fd-ce1a8f3262db",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }
                      },
                      [e._v("Link naar huidige versie van het ontwerpdocument:"), a("OutboundLink")],
                      1
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    a(
                      "a",
                      {
                        attrs: {
                          href: "https://app.atomic.io/d/6e2ZJSnqUkLP",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }
                      },
                      [e._v("Link naar prototype desktop:"), a("OutboundLink")],
                      1
                    )
                  ]),
                  e._v(" "),
                  a("li", [
                    a(
                      "a",
                      {
                        attrs: {
                          href: "https://app.atomic.io/d/9oxlaQKEDVvw",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }
                      },
                      [e._v("Link naar prototype mobile:"), a("OutboundLink")],
                      1
                    )
                  ])
                ]),
                e._v(" "),
                e._m(4),
                e._v(" "),
                e._m(5)
              ],
              1
            );
          },
          [
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("h2", { attrs: { id: "concept" } }, [
                t("a", { staticClass: "header-anchor", attrs: { href: "#concept", "aria-hidden": "true" } }, [
                  this._v("#")
                ]),
                this._v(" Concept:")
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("p", [
                t("img", {
                  attrs: {
                    src:
                      "https://trello-attachments.s3.amazonaws.com/5aa687df45545365963f69ce/5b4c88a70a5d3f118b774dd7/5c4a73829b6ef1830a80922c1b64320d/Regular_Slider.jpg",
                    alt: "slider-regular"
                  }
                })
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("h2", { attrs: { id: "notes-voor-dev" } }, [
                t("a", { staticClass: "header-anchor", attrs: { href: "#notes-voor-dev", "aria-hidden": "true" } }, [
                  this._v("#")
                ]),
                this._v(" Notes voor dev:")
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("li", [
                this._v("Spacing in "),
                t("em", [this._v(".Slider-Block")]),
                this._v(": LG/XL 40px; MD: 32px ; SM/XS: 24px.")
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("h2", { attrs: { id: "notes-voor-content" } }, [
                t(
                  "a",
                  { staticClass: "header-anchor", attrs: { href: "#notes-voor-content", "aria-hidden": "true" } },
                  [this._v("#")]
                ),
                this._v(" Notes voor content:")
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("ul", [
                t("li", [this._v("Titel lengte: minimaal 70, maximaal 150 karakters")]),
                this._v(" "),
                t("li", [this._v("Link lengte: minimaal 15, maximaal 40 karakters")]),
                this._v(" "),
                t("li", [this._v("Minimaal aantal slides van 3, maximaal 8")])
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      r.options.__file = "sliders.md";
      t.default = r.exports;
    }
  }
]);
