# hannl

https://han-devteam.netlify.com/

---

## Development
Node.js (getest met `8.11.2`) installeren, `npm install` draaien (kan even duren). Gebruik bijvoorbeeld Node Version Manager https://github.com/creationix/nvm voor het beheren van Node versies. 

`npm start`
* devserver op localhost:8000
* pug › html
* sass › css
* js modules › js bundle

Om het design system lokaal te bouwen moet je in een ander terminal-tab `npm run start-docs` draaien. 
* vuepress devserver op localhost:8080

Voor een productie-build: `npm run docs:build`. Dit laten wij door Netlify doen.

### Watch / build
Type `npm start` voor een static file server en sass, js, pug compilatie. Server draait vanuit `docs/.vuepress/public` op http://localhost:8000.

### Single build
Type `npm run build` voor een eenmalige dev-build naar `docs/.vuepress/public`.

### Netlify
We gebruiken Netlify voor hosting van die statische project. Voor branches in git maakt Netlify automatisch een  branch url aan.

https://han-devteam.netlify.com/
https://my-git-branch--han-devteam.netlify.com/

### Afbeeldingen
Voor afbeeldingen wordt de service imgix gebruikt. Plaats een afbeelding op origineel (grootst) formaat in `.vuepress/lib/images/imgix`. Daarna zal deze via de url benaderbaar en te manipuleren zijn: https://hannl-eightmedia.imgix.net/koraal.jpg?w=100&h=100

Afbeeldingen die door imgix moeten worden opgepikt, moeten in de master branch worden geplaatst.

---

## Mappenstructuur

* `/project` - source code
  * `/project/scripts` - javascript modules
  * `/project/styles` - sass modules
  * `/project/templates` - pug componenten en pagina's
* `/docs` - documentatie
  * `/docs/.vuepress` - configuratie van vuepress
    * `/docs/.vuepress/components` - Vue components voor gebruik in Vuepress
    * `/docs/.vuepress/public` - alle static assets, hier worden sass, js en pug naartoe gecompileerd
    * `/docs/.vuepress/public/components` - alle losse html componenten voor in de stijlgids
    * `/docs/.vuepress/public/lib` - alle non-html static bestanden
  * `/docs/[folder]` - documentatie
* `/gulp` - build taken
