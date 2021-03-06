(window.webpackJsonp = window.webpackJsonp || []).push([
  [45],
  {
    204: function(e, n, t) {
      "use strict";
      t.r(n);
      var o = t(0),
        a = Object(o.a)(
          {},
          function() {
            var e = this,
              n = e.$createElement,
              t = e._self._c || n;
            return t(
              "div",
              { staticClass: "content" },
              [
                e._m(0),
                e._v(" "),
                t("p", [
                  e._v(
                    "We includen op alle pagina's (_base.pug) een verborgen svg-sprite DOM element waarin alle iconen gedefinieerd staan. Deze kunnen we vervolgens instantiëren op de plekken waar we ze daadwerkelijk gebruiken. Dit heeft als nadeel dat we op alle pagina's álle iconen altijd meesturen naar de gebruiker (zwaarder voor eindgebruiker). Dit heeft als voordeel dat we maar op 1 plek de icoon-paden hoeven aan te passen en hoeven doorsturen naar de backendimplementatie (minimale overdracht nodig)."
                  )
                ]),
                e._v(" "),
                t("Discodip", { attrs: { name: "Algemeen (Iconen)" } }),
                e._v(" "),
                t("hr"),
                e._v(" "),
                e._m(1),
                e._v(" "),
                t("p", [
                  e._v(
                    "Voor nu weegt het voordeel op tegen het nadeel, namelijk pagina-laadtijd. Dit moet echter wel in de gaten worden gehouden. Mochten we in de toekomst teveel iconen krijgen die we altijd meesturen, kunnen we eventueel kiezen om een subset van de svg-sprite mee te gaan sturen per pagina of te gaan kijken naar een andere oplossing."
                  )
                ]),
                e._v(" "),
                t("hr"),
                e._v(" "),
                e._m(2),
                e._v(" "),
                t("p", [
                  e._v(
                    "Let wel op dat alleen iconen hierin worden opgenomen. Mochten het illustraties zijn of andere svg's dan is dit niet de plek daarvoor."
                  )
                ]),
                e._v(" "),
                t("hr"),
                e._v(" "),
                e._m(3),
                e._v(" "),
                t("p", [e._v("Voor het toevoegen van een nieuw icoon:")]),
                e._v(" "),
                t("ol", [
                  t("li", [
                    e._v(
                      "Exporteer svg code (vanuit Sketch). Let op dat er geen gekke transforms op zitten, dat doet sketch soms. Even kopieren naar een schoon bestand en vanuit daar exporteren kan helpen;"
                    )
                  ]),
                  e._v(" "),
                  t("li", [
                    e._v("Verwijder alle svg code behalve de paden (ook "),
                    t("code", [e._v("id=")]),
                    e._v(", onnodige "),
                    t("code", [e._v("<g>")]),
                    e._v(", "),
                    t("code", [e._v("<mask>")]),
                    e._v(" etc) en draai eventueel "),
                    t(
                      "a",
                      { attrs: { href: "https://github.com/svg/svgo", target: "_blank", rel: "noopener noreferrer" } },
                      [e._v("svgo"), t("OutboundLink")],
                      1
                    ),
                    e._v(
                      " of een andere svg optimaliseer-tool om paden op te schonen. Soms maakt dit de iconen ook stuk, dus bekijk het resultaat eerst;"
                    )
                  ]),
                  e._v(" "),
                  e._m(4)
                ]),
                e._v(" "),
                e._m(5)
              ],
              1
            );
          },
          [
            function() {
              var e = this.$createElement,
                n = this._self._c || e;
              return n("h2", { attrs: { id: "iconen" } }, [
                n("a", { staticClass: "header-anchor", attrs: { href: "#iconen", "aria-hidden": "true" } }, [
                  this._v("#")
                ]),
                this._v(" Iconen")
              ]);
            },
            function() {
              var e = this.$createElement,
                n = this._self._c || e;
              return n("h2", { attrs: { id: "laadtijd" } }, [
                n("a", { staticClass: "header-anchor", attrs: { href: "#laadtijd", "aria-hidden": "true" } }, [
                  this._v("#")
                ]),
                this._v(" Laadtijd")
              ]);
            },
            function() {
              var e = this.$createElement,
                n = this._self._c || e;
              return n("h2", { attrs: { id: "alleen-iconen" } }, [
                n("a", { staticClass: "header-anchor", attrs: { href: "#alleen-iconen", "aria-hidden": "true" } }, [
                  this._v("#")
                ]),
                this._v(" Alleen iconen")
              ]);
            },
            function() {
              var e = this.$createElement,
                n = this._self._c || e;
              return n("h2", { attrs: { id: "stappen-voor-toevoegen-nieuw-icoon" } }, [
                n(
                  "a",
                  {
                    staticClass: "header-anchor",
                    attrs: { href: "#stappen-voor-toevoegen-nieuw-icoon", "aria-hidden": "true" }
                  },
                  [this._v("#")]
                ),
                this._v(" Stappen voor toevoegen nieuw icoon")
              ]);
            },
            function() {
              var e = this.$createElement,
                n = this._self._c || e;
              return n("li", [
                this._v("Sla op als "),
                n("code", [this._v("/project/templates/icons/beepboop.pug")]),
                this._v(";")
              ]);
            },
            function() {
              var e = this,
                n = e.$createElement,
                t = e._self._c || n;
              return t("ul", [
                t("li", [e._v("Kopieer viewbox attribuut en")]),
                e._v(" "),
                t("li", [
                  e._v("voeg deze toe in "),
                  t("code", [e._v("/project/templates/icon/_icon.pug")]),
                  e._v(": "),
                  t("code", [e._v("- VIEWBOXES['beepboop'] = [x, y, width, height];")])
                ]),
                e._v(" "),
                t("li", [
                  e._v("Voeg een include toe in "),
                  t("code", [e._v("/project/templates/icons/_symbols.pug")]),
                  e._v(";")
                ]),
                e._v(" "),
                t("li", [
                  e._v("Voeg een demo voor de stijlgids toe aan "),
                  t("code", [e._v("/project/templates/icon/_icon.pug")]),
                  e._v(": "),
                  t("code", [e._v("+icon#beepboop")]),
                  e._v(";")
                ]),
                e._v(" "),
                t("li", [
                  e._v("Vanaf nu kun je overal waar je "),
                  t("code", [e._v("_icon.pug")]),
                  e._v(" include in pug "),
                  t("code", [e._v("+icon#beepboop")]),
                  e._v(" gebruiken om een icoon te plaatsen.")
                ])
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      a.options.__file = "iconen.md";
      n.default = a.exports;
    }
  }
]);
