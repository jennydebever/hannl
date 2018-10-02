<template>
  <div class="discodip">
    <p v-if="description" v-html="description"></p>
    <slot></slot>

    <!-- tools -->
    <div class="discodip__tools">

      <!-- code button -->
      <button v-on:click="toggleCodeView" class="discodip__tools__button" v-bind:class="{ 'active': showsource }" v-if="jsonLoaded && source">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M0.7 9.3l4.8-4.8 1.4 1.42-4.060 4.080 4.070 4.070-1.41 1.42-5.5-5.49 0.7-0.7zM19.3 10.7l0.7-0.7-5.49-5.49-1.4 1.42 4.050 4.070-4.070 4.070 1.41 1.42 4.78-4.78z"></path>  
        </svg>
        <span>code</span>
      </button>

      <!-- link button -->
      <a :href="htmlFile" target="_blank" class="discodip__tools__button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <path d="M9.26 13c-0.167-0.286-0.266-0.63-0.266-0.996 0-0.374 0.103-0.724 0.281-1.023l-0.005 0.009c1.549-0.13 2.757-1.419 2.757-2.99 0-1.657-1.343-3-3-3-0.009 0-0.019 0-0.028 0l0.001-0h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3v0h0.080c-0.053 0.301-0.083 0.647-0.083 1s0.030 0.699 0.088 1.036l-0.005-0.036h-0.080c-2.761 0-5-2.239-5-5s2.239-5 5-5v0h4c0.039-0.001 0.084-0.002 0.13-0.002 2.762 0 5.002 2.239 5.002 5.002 0 2.717-2.166 4.927-4.865 5l-0.007 0zM10.74 7c0.167 0.286 0.266 0.63 0.266 0.996 0 0.374-0.103 0.724-0.281 1.023l0.005-0.009c-1.549 0.13-2.757 1.419-2.757 2.99 0 1.657 1.343 3 3 3 0.009 0 0.019-0 0.028-0l-0.001 0h4c1.657 0 3-1.343 3-3s-1.343-3-3-3v0h-0.080c0.053-0.301 0.083-0.647 0.083-1s-0.030-0.699-0.088-1.036l0.005 0.036h0.080c2.761 0 5 2.239 5 5s-2.239 5-5 5v0h-4c-0.039 0.001-0.084 0.002-0.13 0.002-2.762 0-5.002-2.239-5.002-5.002 0-2.717 2.166-4.927 4.865-5l0.007-0z"></path>
        </svg>
        <span>{{ htmlFile }}</span>
      </a>
    </div>

    <!-- code view -->
    <div class="discodip__code" v-if="showsource && jsonLoaded && source">
      <pre class="language-html"><code v-html="prettifyHTML(source)"></code></pre>
    </div>
    
    <!-- discodip iframe -->
    <div class="discodip__preview" v-show="!showsource" v-bind:style="styles">

      <!-- resizer -->
      <span class="discodip__preview__handle">
        <span class="discodip__preview__handle__overlay"></span>
        <svg class="discodip__preview__handle__icon" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM10 6c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0zM10 18c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z"></path>
        </svg>
      </span>

      <!-- height spacer -->
      <div class="discodip__preview__iframe-spacer" ref="iframe_spacer" v-if="!htmlLoaded" v-bind:style="{ height: height + 'px' }"></div>

      <!-- discodip iframe -->
      <iframe class="discodip__preview__iframe" ref="iframe" v-if="inview" :src="htmlFile" frameborder="0" scrolling="no" v-on:load="onIframeLoad" v-bind:class="{ 'loading': !htmlLoaded }"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    styles: String
  },
  data() {
    return {
      description: null,
      htmlLoaded: false,
      jsonLoaded: false,
      height: 0,
      source: null,
      showsource: false,
      inview: false,
      htmlFile: this.getHTMLFilePath(this.$props.name),
      jsonFile: this.getJSONFilePath(this.$props.name)
    };
  },
  mounted() {
    /**
     * set in view observer for async loading iframe
     */

    var observer = new IntersectionObserver(
      function(entries, observer) {
        entries.forEach(
          function(entry) {
            if (entry.isIntersecting) {
              if (!this.inview) {
                this.inview = true;
              }
            }
          }.bind(this)
        );
      }.bind(this)
    );
    observer.observe(this.$el);

    /**
     * get meta info from lib/file.json
     */

    fetch(this.jsonFile).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    }).then((obj) => {
      this.jsonLoaded = true;

      if (obj) {
        this.height = obj.height;
        this.source = obj.source;
        this.description = obj.description;
      }
    }).catch((err) => {});
  },
  methods: {

    /**
     * get html file path
     */

    getHTMLFilePath: function(str) {
      return "/components/" + this.slugify(str) + ".html";
    },

    /**
     * get json file path
     */

    getJSONFilePath: function(str) {
      return "/components/" + this.slugify(str) + ".json";
    },

    /**
     * beautify and highlight html
     */
    prettifyHTML: function(str) {
      return window.Prism.highlight(window.html_beautify(str), window.Prism.languages.markup)
    },

    /**
     * create slug-from-string
     */

    slugify: function(str) {
      return str
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    },

    /**
     * toggle code/preview view
     */

    toggleCodeView: function (e) {
      this.showsource = !this.showsource;
      
      if (!this.showsource) {
        window.iFrameResize({ checkOrigin: false }, this.$refs.iframe);
      }
    },

    /**
     * iframe loaded handler
     */

    onIframeLoad: function(e) {
      
      // resize iframe
      window.iFrameResize({ checkOrigin: false }, this.$refs.iframe);

      // make preview draggable
      window.interact(this.$el.querySelector(".discodip__preview")).resizable({
        edges: {
          left: false,
          right: ".discodip__preview__handle",
          bottom: false,
          top: false
        },
        onmove: function(e) {
          e.target.style.width = e.rect.width - 24 + "px";
          e.target.querySelector('iframe').contentWindow.parentIFrame.size();
          if (!e.target.classList.contains("discodip-is-resizing")) {
            e.target.classList.add("discodip-is-resizing");
          }
        },
        onend: function(e) {
          e.target.querySelector("iframe").contentWindow.parentIFrame.size();
          if (e.target.classList.contains("discodip-is-resizing")) {
            e.target.classList.remove("discodip-is-resizing");
          }
        }
      });

      // set loaded state
      this.htmlLoaded = true;
    }
  }
};
</script>

<style scoped>
.discodip {
  --grey: #eaecef;
  --darkgrey: #111;
  margin-top: 20px;
  margin-bottom: 150px;
}

/**
 * Tools
 */

.discodip__tools {
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
}

.discodip__tools__button {
  border: 1px solid var(--grey);
  background-color: white;
  border-radius: 3px;
  padding: 6px 8px;
  margin-right: 5px;
  display: inline-flex;
  outline: 0;
  text-decoration: none !important;
  cursor: pointer;
  transition: background-color .025s;
}

.discodip__tools__button:hover,
.discodip__tools__button.active {
  background-color: var(--grey);
}

.discodip__tools__button svg {
  margin: auto;
}

.discodip__tools__button span {
  font-size: 12px;
  font-weight: normal;
  color: var(--darkgrey);
  margin: auto 0 auto 6px;
}

/**
 * Code
 */

.discodip__code {
  max-width: 100vw;
  width: 100%;
  position: relative;
  min-width: 275px;
}

@media (min-width: 1140px) {
  .discodip__code {
    width: 1200px;
    max-width: calc(100vw - 20rem - 2.5rem - 2.5rem);
    transform: translateX(-50%) translateX(370px);
  }
}

/**
 * Preview
 */

.discodip__preview {
  position: relative;
  min-width: 275px;
  outline: 1px solid var(--grey);
  width: 100%;
  box-sizing: border-box;
  padding: 10px 34px 10px 10px;
  background-color: white;
}

@media (min-width: 1140px) {
  .discodip__preview {
    width: 1200px;
    max-width: calc(100vw - 20rem - 2.5rem - 2.5rem);
    transform: translateX(-50%) translateX(370px);
  }
}

.discodip__preview__iframe {
  display: block;
  width: 100%;
}

.discodip__preview__iframe.loading {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 34px;
  bottom: 10px;
  width: calc(100% - 34px - 10px);
}

.discodip__preview__iframe-spacer {
  display: block;
}

/**
 * Resize handle
 */

.discodip__preview__handle {
  display: block;
  position: absolute;
  width: 24px;
  height: 100%;
  right: 0;
  top: 0;
  bottom: 0;
}

.discodip-is-resizing >>> .discodip__preview__handle {
  left: 0;
  width: 100%;
}

.discodip__preview__handle__overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 24px;
  content: "";
  background-color: white;
  transition: background-color 0.15s, border-color 0.15s;
  border-left: 1px solid var(--grey);
}

.discodip__preview__handle:hover >>> .discodip__preview__handle__overlay,
.discodip-is-resizing >>> .discodip__preview__handle__overlay {
  background-color: #f5f5f5;
  border-color: var(--grey);
}

/**
 * Resize handle icon
 */

.discodip__preview__handle__icon {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 2px;
  transform: translate(0, -50%);
  opacity: 0.25;
  transition: opacity 0.15s;
}

.discodip-is-resizing >>> .discodip__preview__handle__icon {
  opacity: 0.5;
}
</style>