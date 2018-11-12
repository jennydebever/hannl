(window.webpackJsonp = window.webpackJsonp || []).push([
  [3],
  {
    159: function(t, i, e) {},
    164: function(t, i, e) {
      "use strict";
      e(165);
      var s = e(8),
        n = e(88),
        o = e(6),
        r = /./.toString,
        a = function(t) {
          e(9)(RegExp.prototype, "toString", t, !0);
        };
      e(5)(function() {
        return "/a/b" != r.call({ source: "a", flags: "b" });
      })
        ? a(function() {
            var t = s(this);
            return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? n.call(t) : void 0);
          })
        : "toString" != r.name &&
          a(function() {
            return r.call(this);
          });
    },
    165: function(t, i, e) {
      e(6) && "g" != /./g.flags && e(7).f(RegExp.prototype, "flags", { configurable: !0, get: e(88) });
    },
    166: function(t, i, e) {
      var s = Date.prototype,
        n = s.toString,
        o = s.getTime;
      new Date(NaN) + "" != "Invalid Date" &&
        e(9)(s, "toString", function() {
          var t = o.call(this);
          return t == t ? n.call(this) : "Invalid Date";
        });
    },
    167: function(t, i, e) {
      var s = e(2);
      s(s.P, "Function", { bind: e(168) });
    },
    168: function(t, i, e) {
      "use strict";
      var s = e(21),
        n = e(4),
        o = e(89),
        r = [].slice,
        a = {};
      t.exports =
        Function.bind ||
        function(t) {
          var i = s(this),
            e = r.call(arguments, 1),
            c = function() {
              var s = e.concat(r.call(arguments));
              return this instanceof c
                ? (function(t, i, e) {
                    if (!(i in a)) {
                      for (var s = [], n = 0; n < i; n++) s[n] = "a[" + n + "]";
                      a[i] = Function("F,a", "return new F(" + s.join(",") + ")");
                    }
                    return a[i](t, e);
                  })(i, s.length, s)
                : o(i, s, t);
            };
          return n(i.prototype) && (c.prototype = i.prototype), c;
        };
    },
    169: function(t, i, e) {
      "use strict";
      var s = e(159);
      e.n(s).a;
    },
    174: function(t, i, e) {
      "use strict";
      e.r(i);
      e(164), e(166), e(23), e(12), e(22), e(167), e(50);
      var s = {
          props: { name: String, styles: String, tight: Boolean },
          data: function() {
            return {
              description: null,
              htmlLoaded: !1,
              jsonLoaded: !1,
              height: 0,
              source: null,
              showsource: !1,
              inview: !1,
              htmlFile: this.getHTMLFilePath(this.$props.name),
              jsonFile: this.getJSONFilePath(this.$props.name)
            };
          },
          mounted: function() {
            var t = this;
            new IntersectionObserver(
              function(t, i) {
                t.forEach(
                  function(t) {
                    t.isIntersecting && (this.inview || (this.inview = !0));
                  }.bind(this)
                );
              }.bind(this)
            ).observe(this.$el),
              fetch(this.jsonFile)
                .then(function(t) {
                  if (200 === t.status) return t.json();
                })
                .then(function(i) {
                  (t.jsonLoaded = !0),
                    i && ((t.height = i.height), (t.source = i.source), (t.description = i.description));
                })
                .catch(function(t) {});
          },
          methods: {
            getHTMLFilePath: function(t) {
              return "/components/" + this.slugify(t) + ".html";
            },
            getJSONFilePath: function(t) {
              return "/components/" + this.slugify(t) + ".json";
            },
            prettifyHTML: function(t) {
              return window.Prism.highlight(window.html_beautify(t), window.Prism.languages.markup);
            },
            slugify: function(t) {
              return t
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "")
                .replace(/--+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
            },
            toggleCodeView: function(t) {
              (this.showsource = !this.showsource),
                this.showsource || window.iFrameResize({ checkOrigin: !1 }, this.$refs.iframe);
            },
            onIframeLoad: function(t) {
              window.iFrameResize({ checkOrigin: !1 }, this.$refs.iframe),
                window.interact(this.$el.querySelector(".discodip__preview")).resizable({
                  edges: { left: !1, right: ".discodip__preview__handle", bottom: !1, top: !1 },
                  onmove: function(t) {
                    (t.target.style.width = t.rect.width - 24 + "px"),
                      t.target.querySelector("iframe").contentWindow.parentIFrame.size(),
                      t.target.classList.contains("discodip-is-resizing") ||
                        t.target.classList.add("discodip-is-resizing");
                  },
                  onend: function(t) {
                    t.target.querySelector("iframe").contentWindow.parentIFrame.size(),
                      t.target.classList.contains("discodip-is-resizing") &&
                        t.target.classList.remove("discodip-is-resizing");
                  }
                }),
                (this.htmlLoaded = !0);
            }
          }
        },
        n = (e(169), e(0)),
        o = Object(n.a)(
          s,
          function() {
            var t = this,
              i = t.$createElement,
              e = t._self._c || i;
            return e(
              "div",
              { staticClass: "discodip", class: { tight: t.tight } },
              [
                t.description ? e("p", { domProps: { innerHTML: t._s(t.description) } }) : t._e(),
                t._v(" "),
                t._t("default"),
                t._v(" "),
                e("div", { staticClass: "discodip__tools" }, [
                  t.jsonLoaded && t.source
                    ? e(
                        "button",
                        {
                          staticClass: "discodip__tools__button",
                          class: { active: t.showsource },
                          on: { click: t.toggleCodeView }
                        },
                        [
                          e(
                            "svg",
                            {
                              attrs: {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "20",
                                height: "20",
                                viewBox: "0 0 20 20"
                              }
                            },
                            [
                              e("path", {
                                attrs: {
                                  d:
                                    "M0.7 9.3l4.8-4.8 1.4 1.42-4.060 4.080 4.070 4.070-1.41 1.42-5.5-5.49 0.7-0.7zM19.3 10.7l0.7-0.7-5.49-5.49-1.4 1.42 4.050 4.070-4.070 4.070 1.41 1.42 4.78-4.78z"
                                }
                              })
                            ]
                          ),
                          t._v(" "),
                          e("span", [t._v("code")])
                        ]
                      )
                    : t._e(),
                  t._v(" "),
                  e("a", { staticClass: "discodip__tools__button", attrs: { href: t.htmlFile, target: "_blank" } }, [
                    e(
                      "svg",
                      {
                        attrs: { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20" }
                      },
                      [
                        e("path", {
                          attrs: {
                            d:
                              "M9.26 13c-0.167-0.286-0.266-0.63-0.266-0.996 0-0.374 0.103-0.724 0.281-1.023l-0.005 0.009c1.549-0.13 2.757-1.419 2.757-2.99 0-1.657-1.343-3-3-3-0.009 0-0.019 0-0.028 0l0.001-0h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3v0h0.080c-0.053 0.301-0.083 0.647-0.083 1s0.030 0.699 0.088 1.036l-0.005-0.036h-0.080c-2.761 0-5-2.239-5-5s2.239-5 5-5v0h4c0.039-0.001 0.084-0.002 0.13-0.002 2.762 0 5.002 2.239 5.002 5.002 0 2.717-2.166 4.927-4.865 5l-0.007 0zM10.74 7c0.167 0.286 0.266 0.63 0.266 0.996 0 0.374-0.103 0.724-0.281 1.023l0.005-0.009c-1.549 0.13-2.757 1.419-2.757 2.99 0 1.657 1.343 3 3 3 0.009 0 0.019-0 0.028-0l-0.001 0h4c1.657 0 3-1.343 3-3s-1.343-3-3-3v0h-0.080c0.053-0.301 0.083-0.647 0.083-1s-0.030-0.699-0.088-1.036l0.005 0.036h0.080c2.761 0 5 2.239 5 5s-2.239 5-5 5v0h-4c-0.039 0.001-0.084 0.002-0.13 0.002-2.762 0-5.002-2.239-5.002-5.002 0-2.717 2.166-4.927 4.865-5l0.007-0z"
                          }
                        })
                      ]
                    ),
                    t._v(" "),
                    e("span", [t._v(t._s(t.htmlFile))])
                  ])
                ]),
                t._v(" "),
                t.showsource && t.jsonLoaded && t.source
                  ? e("div", { staticClass: "discodip__code" }, [
                      e("pre", { staticClass: "language-html" }, [
                        e("code", { domProps: { innerHTML: t._s(t.prettifyHTML(t.source)) } })
                      ])
                    ])
                  : t._e(),
                t._v(" "),
                e(
                  "div",
                  {
                    directives: [{ name: "show", rawName: "v-show", value: !t.showsource, expression: "!showsource" }],
                    staticClass: "discodip__preview",
                    style: t.styles
                  },
                  [
                    e("span", { staticClass: "discodip__preview__handle" }, [
                      e("span", { staticClass: "discodip__preview__handle__overlay" }),
                      t._v(" "),
                      e(
                        "svg",
                        {
                          staticClass: "discodip__preview__handle__icon",
                          attrs: {
                            width: "20",
                            height: "20",
                            viewBox: "0 0 20 20",
                            xmlns: "http://www.w3.org/2000/svg"
                          }
                        },
                        [
                          e("path", {
                            attrs: {
                              d:
                                "M10 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM10 6c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM10 18c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z"
                            }
                          })
                        ]
                      )
                    ]),
                    t._v(" "),
                    t.htmlLoaded
                      ? t._e()
                      : e("div", {
                          ref: "iframe_spacer",
                          staticClass: "discodip__preview__iframe-spacer",
                          style: { height: t.height + "px" }
                        }),
                    t._v(" "),
                    t.inview
                      ? e("iframe", {
                          ref: "iframe",
                          staticClass: "discodip__preview__iframe",
                          class: { loading: !t.htmlLoaded },
                          attrs: { src: t.htmlFile, frameborder: "0", scrolling: "no" },
                          on: { load: t.onIframeLoad }
                        })
                      : t._e()
                  ]
                )
              ],
              2
            );
          },
          [],
          !1,
          null,
          "71d76d72",
          null
        );
      o.options.__file = "Discodip.vue";
      i.default = o.exports;
    }
  }
]);
