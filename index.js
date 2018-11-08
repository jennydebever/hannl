console.log("hello world");

const path = window.location.pathname;

const template = require(`./project/templates/pages${path}.pug`);

var locals = {
  htmlWebpackPlugin: {
    options: {
      variables: {
        IMGIX_URL: "wqewr"
      }
    },
    files: {
      chunks: {
        head: {
          entry: ""
        }
      }
    }
  }
};

var html = template(locals);

document.body.innerHTML = html;
