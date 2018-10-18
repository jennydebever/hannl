module.exports = {
  title: "🐠 HAN.nl Design System ",
  description: "Design-systeem en documentatie voor de nieuwe han.nl website",
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
          ["components/atoms/buttons", "Knoppen"],
          ["components/content/collapsibles", "Uitklappers"],
          ["components/content/richtext", "Richtext"],
          ["components/content/textmedia-regular", "Tekst en Media Regular"],
          ["components/todo/textmedia-skinny", "Tekst en Media Skinny"],
          ["components/todo/textmedia-fat", "Tekst en Media Fat"],
          ["components/todo/textmedia-whale", "Tekst en Media Whale"],
          ["components/todo/textmedia-highlight", "Tekst en Media Highlight"],
          ["components/todo/bio", "Bio"],
          ["components/todo/cards", "Cards"],
          ["components/todo/carousel", "Carousel"],
          ["components/todo/contact", "Contact"],
          ["components/todo/course-hero", "Course-hero"],
          ["components/todo/cta", "Cta"],
          ["components/todo/facts", "Facts"],
          ["components/todo/filters", "Filters"],
          ["components/todo/image-list", "Image-list"],
          ["components/todo/images", "Images"],
          ["components/todo/link-list", "Link-list"],
          ["components/todo/maps", "Maps"],
          ["components/todo/navigation", "Navigation"],
          ["components/todo/quote", "Quote"],
          ["components/todo/route", "Route"],
          ["components/todo/sliders", "Sliders"],
          ["components/todo/specials", "Specials"],
          ["components/todo/tables", "Tables"],
          ["components/todo/tabs", "Tabs"],
          ["components/todo/takeover", "Takeover"],
          ["components/todo/testimonial", "Testimonial"],
          ["components/todo/text-list", "Text-list"],
          ["components/todo/text", "Text"],
          ["components/todo/tooltip", "Tooltip"],
          ["components/todo/video", "Video"]
        ]
      },
      {
        title: "Design",
        collapsible: true,
        children: [
          ["design/", "Design"],
          ["design/rules", "Rules"],
          ["design/principles", "Principles"]
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
