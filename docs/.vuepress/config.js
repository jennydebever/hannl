module.exports = {
  title: "HAN.nl Design System ",
  description: "Design System and documentation for the new han.nl website",
  head: [
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.6.0/iframeResizer.min.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/10.14.0/lazyload.min.js"
      }
    ],
    [
      "script",
      { src: "https://unpkg.com/interactjs@1.3.3/dist/interact.min.js" }
    ],
    [
      "script",
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/prism.min.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/components/prism-markup-templating.js"
      }
    ],
    [
      "script",
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.7.5/beautify-html.min.js"
      }
    ],
    ["meta", { name: "robots", content: "noindex" }],
    ["link", { rel: "shortcut icon", href: "http://han.nl/favicon.ico" }]
  ],
  themeConfig: {
    lastUpdated: "",
    nav: [{ text: "han.nl", link: "https://www.han.nl" }],
    sidebar: [
      ["templates/", "Templates"],
      {
        title: "Components",
        collapsible: true,
        children: [
          ["components/", "Components"],
          ["components/atoms/btn-primary", "Knop (Primair)"],
          ["components/atoms/btn-secondary", "Knop (Secundair)"],
          ["components/atoms/strong-link", "Knop (Strong link)"],
          ["components/content/collapsibles", "Uitklappers"],
          ["components/content/richtext", "Richtext"],
          ["components/content/textmedia", "Tekst en Media"]
        ]
      },
      {
        title: "Docs",
        collapsible: true,
        children: [
          ["docs/", "Docs"],
          ["docs/iconen", "Iconen"],
          ["docs/typografie", "Typografie"]
        ]
      }
    ]
  }
};
