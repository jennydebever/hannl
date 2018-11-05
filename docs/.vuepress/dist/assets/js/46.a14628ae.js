(window.webpackJsonp = window.webpackJsonp || []).push([
  [46],
  {
    203: function(t, s, n) {
      "use strict";
      n.r(s);
      var a = n(0),
        e = Object(a.a)(
          {},
          function() {
            this.$createElement;
            this._self._c;
            return this._m(0);
          },
          [
            function() {
              var t = this,
                s = t.$createElement,
                n = t._self._c || s;
              return n("div", { staticClass: "content" }, [
                n("h2", { attrs: { id: "typografie" } }, [
                  n("a", { staticClass: "header-anchor", attrs: { href: "#typografie", "aria-hidden": "true" } }, [
                    t._v("#")
                  ]),
                  t._v(" Typografie")
                ]),
                t._v(" "),
                n("p", [
                  t._v(
                    "In /styles/libs/fonts.scss staan alle fonts. Niet gebruikte fonts zijn uitgecommentarieerd.\nIn /styles/typography/fonts.scss zijn de mixins van de fonts gedefinieerd"
                  )
                ]),
                t._v(" "),
                n("ul", [
                  n("li", [t._v("bigtitle")]),
                  t._v(" "),
                  n("li", [t._v("h1 t/m h5")]),
                  t._v(" "),
                  n("li", [t._v("title1 t/m title4")]),
                  t._v(" "),
                  n("li", [t._v("eyebrow")]),
                  t._v(" "),
                  n("li", [t._v("lead")]),
                  t._v(" "),
                  n("li", [t._v("p")]),
                  t._v(" "),
                  n("li", [t._v("base")])
                ]),
                t._v(" "),
                n("p", [
                  t._v(
                    "In demo-typo.scss is te zien hoe de mixins ingezet kunnen worden in een component. Elk element krijgt een class (h1.demo) en deze krijgt z'n eigen opmaak. De underscore achter de titel is optioneel, soms wordt deze wel ingezet en soms niet. In overleg met designers geen standaard van gemaakt."
                  )
                ]),
                t._v(" "),
                n("div", { staticClass: "language-css extra-class" }, [
                  n("pre", { pre: !0, attrs: { class: "language-css" } }, [
                    n("code", [
                      n("span", { attrs: { class: "token selector" } }, [
                        t._v("//in component X.scss\nh2.demo-typo__title")
                      ]),
                      t._v(" "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("{")]),
                      t._v("\n  "),
                      n("span", { attrs: { class: "token atrule" } }, [
                        n("span", { attrs: { class: "token rule" } }, [t._v("@include")]),
                        t._v(" h2"),
                        n("span", { attrs: { class: "token punctuation" } }, [t._v(";")])
                      ]),
                      t._v("\n  "),
                      n("span", { attrs: { class: "token atrule" } }, [
                        n("span", { attrs: { class: "token rule" } }, [t._v("@include")]),
                        t._v(" margin-bottom-small"),
                        n("span", { attrs: { class: "token punctuation" } }, [t._v(";")])
                      ]),
                      t._v("\n\n  "),
                      n("span", { attrs: { class: "token atrule" } }, [
                        n("span", { attrs: { class: "token rule" } }, [t._v("@include")]),
                        t._v(" "),
                        n("span", { attrs: { class: "token function" } }, [t._v("breakpoint")]),
                        n("span", { attrs: { class: "token punctuation" } }, [t._v("(")]),
                        t._v("$bp-m"),
                        n("span", { attrs: { class: "token punctuation" } }, [t._v(")")])
                      ]),
                      t._v(" "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("{")]),
                      t._v("\n    "),
                      n("span", { attrs: { class: "token atrule" } }, [
                        n("span", { attrs: { class: "token rule" } }, [t._v("@include")]),
                        t._v(" underscore"),
                        n("span", { attrs: { class: "token punctuation" } }, [t._v(";")])
                      ]),
                      t._v("\n  "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("}")]),
                      t._v("\n"),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("}")]),
                      t._v("\n\n//in text.scss\n"),
                      n("span", { attrs: { class: "token atrule" } }, [
                        n("span", { attrs: { class: "token rule" } }, [t._v("@mixin")]),
                        t._v(" underscore")
                      ]),
                      t._v(" "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("{")]),
                      t._v("\n  "),
                      n("span", { attrs: { class: "token selector" } }, [t._v("&:after")]),
                      t._v(" "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("{")]),
                      t._v("\n    "),
                      n("span", { attrs: { class: "token property" } }, [t._v("color")]),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v(":")]),
                      t._v(" $hanred"),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v(";")]),
                      t._v("\n    "),
                      n("span", { attrs: { class: "token property" } }, [t._v("content")]),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v(":")]),
                      t._v(" "),
                      n("span", { attrs: { class: "token string" } }, [t._v('"_"')]),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v(";")]),
                      t._v("\n  "),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("}")]),
                      t._v("\n"),
                      n("span", { attrs: { class: "token punctuation" } }, [t._v("}")]),
                      t._v("\n")
                    ])
                  ])
                ]),
                n("p", [
                  t._v(
                    "In styles/typograpy/richtext.scss is de opmaak van de standaardtekst die uit de editor komt opgemaakt, zodat tekst altijd opmaak heeft. In styles/libs is margins.scss aangemaakt met daarin de standaard margins. Is nu nog vrij basaal, maar zal waarschijnlijk nog veel uitgebreider worden."
                  )
                ])
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      e.options.__file = "typografie.md";
      s.default = e.exports;
    }
  }
]);
