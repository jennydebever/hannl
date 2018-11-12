(window.webpackJsonp = window.webpackJsonp || []).push([
  [23],
  {
    191: function(e, t, n) {
      "use strict";
      n.r(t);
      var a = n(0),
        o = Object(a.a)(
          {},
          function() {
            var e = this,
              t = e.$createElement,
              n = e._self._c || t;
            return n(
              "div",
              { staticClass: "content" },
              [
                n(
                  "h1",
                  { attrs: { id: "maps" } },
                  [
                    n("a", { staticClass: "header-anchor", attrs: { href: "#maps", "aria-hidden": "true" } }, [
                      e._v("#")
                    ]),
                    e._v(" Maps "),
                    n("Badge", { attrs: { text: "todo", type: "warn", vertical: "middle" } })
                  ],
                  1
                ),
                e._v(" "),
                n("Todo", { attrs: { name: "worldmap" } }),
                e._v(" "),
                n("Todo", { attrs: { name: "map-and-address" } }),
                e._v(" "),
                e._m(0),
                e._v(" "),
                e._m(1),
                e._v(" "),
                e._m(2),
                e._v(" "),
                n("ul", [
                  n("li", [
                    e._v(
                      "De card heeft een licht parallax effect op de afbeelding om het gevoel van ruimte te geven. Zie prototype als voorbeeld."
                    )
                  ]),
                  e._v(" "),
                  n("li", [
                    e._v(
                      "Als de opleiding in twee verschillende steden gegeven wordt komt de switcher erboven om te kunnen switchen tussen beide steden."
                    )
                  ]),
                  e._v(" "),
                  e._m(3),
                  e._v(" "),
                  e._m(4),
                  e._v(" "),
                  n("li", [e._v("Het telefoonnummer moet een tel: actie hebben om direct te kunnen bellen.")]),
                  e._v(" "),
                  n("li", [
                    n(
                      "a",
                      {
                        attrs: {
                          href: "https://share.goabstract.com/2dd650d4-794e-4ee5-be8e-84ad449a4e12",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }
                      },
                      [e._v("Link naar huidige versie van het ontwerpdocument:"), n("OutboundLink")],
                      1
                    )
                  ]),
                  e._v(" "),
                  n("li", [
                    n(
                      "a",
                      {
                        attrs: {
                          href: "https://app.atomic.io/d/3RZa2NGypOAF",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }
                      },
                      [e._v("Link naar prototype desktop:"), n("OutboundLink")],
                      1
                    )
                  ])
                ]),
                e._v(" "),
                e._m(5),
                e._v(" "),
                e._m(6)
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
                this._v(
                  "Component wat de adresgegevens, telefoonnummer en locatie laten zien van opleiding. Hierin is de mogelijkheid om je reistijd te berekenen vanaf eigen locatie naar de school. In sommige gevallen wordt een opleiding in meerdere steden gegeven, dan is het mogelijk om binnen dit component beide locatie gegevens te bekijken. Het component wordt getoond bij opleidingspagina's.\n"
                ),
                t("img", {
                  attrs: {
                    src:
                      "https://trello-attachments.s3.amazonaws.com/5aa687df45545365963f69ce/5b72bf7a73a1795faed56e7c/x/d508c13446000484c8a2b925dcd88de2/C._Map_and_Address__5BLG_XL_5D.jpg",
                    alt: "map-and-address"
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
                this._v("Button 'bereken je reistijd' gaat naar een "),
                t("em", [this._v("takeover")]),
                this._v(". Dit component, "),
                t("em", [this._v("route")]),
                this._v(", wordt nog ontworpen.")
              ]);
            },
            function() {
              var e = this.$createElement,
                t = this._self._c || e;
              return t("li", [
                this._v("Het adres, postcode en plaatsnaam zijn underlined. Deze moeten gelinkt worden aan een "),
                t("em", [this._v("lightbox")]),
                this._v(" of "),
                t("em", [this._v("takeover")]),
                this._v(" met een google maps iframe. Deze zal samen met het "),
                t("em", [this._v("route")]),
                this._v(" component ontworpen worden. Voor de 'time-being', linken naar de maps op maps.google.com")
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
                t("li", [
                  this._v("In de foto moet het focuspunt rechts liggen zodat dit niet in conflict raakt met de card.")
                ])
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      o.options.__file = "maps.md";
      t.default = o.exports;
    }
  }
]);
