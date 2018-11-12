(window.webpackJsonp = window.webpackJsonp || []).push([
  [44],
  {
    205: function(e, t, s) {
      "use strict";
      s.r(t);
      var a = s(0),
        r = Object(a.a)(
          {},
          function() {
            this.$createElement;
            this._self._c;
            return this._m(0);
          },
          [
            function() {
              var e = this,
                t = e.$createElement,
                s = e._self._c || t;
              return s("div", { staticClass: "content" }, [
                s("h1", { attrs: { id: "han-nl-frontend-docs" } }, [
                  s(
                    "a",
                    { staticClass: "header-anchor", attrs: { href: "#han-nl-frontend-docs", "aria-hidden": "true" } },
                    [e._v("#")]
                  ),
                  e._v(" HAN.nl Frontend Docs")
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "development" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#development", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Development")
                ]),
                e._v(" "),
                s("p", [
                  e._v("Node.js (getest met "),
                  s("code", [e._v("8.11.2")]),
                  e._v(") installeren, "),
                  s("code", [e._v("npm install")]),
                  e._v(
                    " draaien (kan even duren). Gebruik bijvoorbeeld Node Version Manager https://github.com/creationix/nvm voor het beheren van Node versies."
                  )
                ]),
                e._v(" "),
                s("h3", { attrs: { id: "compile-sass-pug-js" } }, [
                  s(
                    "a",
                    { staticClass: "header-anchor", attrs: { href: "#compile-sass-pug-js", "aria-hidden": "true" } },
                    [e._v("#")]
                  ),
                  e._v(" Compile sass, pug, js")
                ]),
                e._v(" "),
                s("p", [s("code", [e._v("npm start")])]),
                e._v(" "),
                s("ul", [
                  s("li", [e._v("devserver op localhost:8000")]),
                  e._v(" "),
                  s("li", [e._v("pug › html")]),
                  e._v(" "),
                  s("li", [e._v("sass › css")]),
                  e._v(" "),
                  s("li", [e._v("js modules › js bundles")])
                ]),
                e._v(" "),
                s("h3", { attrs: { id: "vuepress-dev" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#vuepress-dev", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Vuepress dev")
                ]),
                e._v(" "),
                s("p", [
                  e._v("Om het design system lokaal te bouwen moet je in een ander terminal-tab "),
                  s("code", [e._v("npm run start-docs")]),
                  e._v(" draaien.")
                ]),
                e._v(" "),
                s("ul", [s("li", [e._v("vuepress devserver op localhost:8080")])]),
                e._v(" "),
                s("h3", { attrs: { id: "vuepress-prod" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#vuepress-prod", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Vuepress prod")
                ]),
                e._v(" "),
                s("p", [
                  e._v("Voor een productie-build: "),
                  s("code", [e._v("npm run docs:build")]),
                  e._v(". Dit laten wij door Netlify doen.")
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "watch-build" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#watch-build", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Watch / build")
                ]),
                e._v(" "),
                s("p", [
                  e._v("Type "),
                  s("code", [e._v("npm start")]),
                  e._v(" voor een static file server en sass, js, pug compilatie. Server draait vanuit "),
                  s("code", [e._v("docs/.vuepress/public")]),
                  e._v(" op http://localhost:8000.")
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "single-build" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#single-build", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Single build")
                ]),
                e._v(" "),
                s("p", [
                  e._v("Type "),
                  s("code", [e._v("npm run build")]),
                  e._v(" voor een eenmalige dev-build naar "),
                  s("code", [e._v("docs/.vuepress/public")]),
                  e._v(".")
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "netlify" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#netlify", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Netlify")
                ]),
                e._v(" "),
                s("p", [
                  e._v(
                    "We gebruiken Netlify voor hosting van die statische project. Voor branches in git maakt Netlify automatisch een  branch url aan."
                  )
                ]),
                e._v(" "),
                s("ul", [
                  s("li", [e._v("https://han-devteam.netlify.com/")]),
                  e._v(" "),
                  s("li", [e._v("https://my-git-branch--han-devteam.netlify.com/")])
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "afbeeldingen-imgix" } }, [
                  s(
                    "a",
                    { staticClass: "header-anchor", attrs: { href: "#afbeeldingen-imgix", "aria-hidden": "true" } },
                    [e._v("#")]
                  ),
                  e._v(" Afbeeldingen imgix")
                ]),
                e._v(" "),
                s("p", [
                  e._v(
                    "Voor afbeeldingen wordt de service imgix gebruikt. Plaats een afbeelding op origineel (grootst) formaat in "
                  ),
                  s("code", [e._v(".vuepress/lib/images/imgix")]),
                  e._v(". Daarna zal deze via de url benaderbaar en te manipuleren zijn:")
                ]),
                e._v(" "),
                s("p", [e._v("https://hannl-eightmedia.imgix.net/koraal.jpg?w=100&h=100")]),
                e._v(" "),
                s("p", [
                  e._v(
                    "Afbeeldingen die door imgix moeten worden opgepikt, moeten in de master branch worden geplaatst."
                  )
                ]),
                e._v(" "),
                s("hr"),
                e._v(" "),
                s("h2", { attrs: { id: "mappenstructuur" } }, [
                  s("a", { staticClass: "header-anchor", attrs: { href: "#mappenstructuur", "aria-hidden": "true" } }, [
                    e._v("#")
                  ]),
                  e._v(" Mappenstructuur")
                ]),
                e._v(" "),
                s("ul", [
                  s("li", [
                    s("code", [e._v("/project")]),
                    e._v(" - source code\n"),
                    s("ul", [
                      s("li", [s("code", [e._v("/project/scripts")]), e._v(" - javascript modules")]),
                      e._v(" "),
                      s("li", [s("code", [e._v("/project/styles")]), e._v(" - sass modules")]),
                      e._v(" "),
                      s("li", [s("code", [e._v("/project/templates")]), e._v(" - pug componenten en pagina's")])
                    ])
                  ]),
                  e._v(" "),
                  s("li", [
                    s("code", [e._v("/docs")]),
                    e._v(" - documentatie\n"),
                    s("ul", [
                      s("li", [
                        s("code", [e._v("/docs/.vuepress")]),
                        e._v(" - configuratie van vuepress\n"),
                        s("ul", [
                          s("li", [
                            s("code", [e._v("/docs/.vuepress/components")]),
                            e._v(" - Vue components voor gebruik in Vuepress")
                          ]),
                          e._v(" "),
                          s("li", [
                            s("code", [e._v("/docs/.vuepress/public")]),
                            e._v(" - alle static assets, hier worden sass, js en pug naartoe gecompileerd")
                          ]),
                          e._v(" "),
                          s("li", [
                            s("code", [e._v("/docs/.vuepress/public/components")]),
                            e._v(" - alle losse html componenten voor in de stijlgids")
                          ]),
                          e._v(" "),
                          s("li", [
                            s("code", [e._v("/docs/.vuepress/public/lib")]),
                            e._v(" - alle non-html static bestanden")
                          ])
                        ])
                      ]),
                      e._v(" "),
                      s("li", [s("code", [e._v("/docs/[folder]")]), e._v(" - documentatie")])
                    ])
                  ]),
                  e._v(" "),
                  s("li", [s("code", [e._v("/gulp")]), e._v(" - build taken")])
                ])
              ]);
            }
          ],
          !1,
          null,
          null,
          null
        );
      r.options.__file = "README.md";
      t.default = r.exports;
    }
  }
]);
