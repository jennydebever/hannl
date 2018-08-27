## Iconen
We includen op alle pagina's (_base.pug) een verborgen svg-sprite DOM element waarin alle iconen gedefinieerd staan. Deze kunnen we vervolgens instantiëren op de plekken waar we ze daadwerkelijk gebruiken. Dit heeft als nadeel dat we op alle pagina's álle iconen altijd meesturen naar de gebruiker (zwaarder voor eindgebruiker). Dit heeft als voordeel dat we maar op 1 plek de icoon-paden hoeven aan te passen en hoeven doorsturen naar de backendimplementatie (minimale overdracht nodig). 

!!{Algemeen (Iconen)}

---

## Laadtijd
Voor nu weegt het voordeel op tegen het nadeel, namelijk pagina-laadtijd. Dit moet echter wel in de gaten worden gehouden. Mochten we in de toekomst teveel iconen krijgen die we altijd meesturen, kunnen we eventueel kiezen om een subset van de svg-sprite mee te gaan sturen per pagina of te gaan kijken naar een andere oplossing.

---

## Alleen iconen
Let wel op dat alleen iconen hierin worden opgenomen. Mochten het illustraties zijn of andere svg's dan is dit niet de plek daarvoor.

---

## Stappen voor toevoegen nieuw icoon
Voor het toevoegen van een nieuw icoon:

1. Exporteer svg code (vanuit Sketch). Let op dat er geen gekke transforms op zitten, dat doet sketch soms. Even kopieren naar een schoon bestand en vanuit daar exporteren kan helpen;
2. Verwijder alle svg code behalve de paden (ook `id=`, onnodige `<g>`, `<mask>` etc) en draai eventueel [svgo](https://github.com/svg/svgo) of een andere svg optimaliseer-tool om paden op te schonen. Soms maakt dit de iconen ook stuk, dus bekijk het resultaat eerst;
3. Sla op als `/project/templates/icons/beepboop.pug`;
* Kopieer viewbox attribuut en
* voeg deze toe in `/project/templates/icon/_icon.pug`: `- VIEWBOXES['beepboop'] = [x, y, width, height];`
* Voeg een include toe in `/project/templates/icons/_symbols.pug`;
* Voeg een demo voor de stijlgids toe aan `/project/templates/icon/_icon.pug`: `+icon#beepboop`;
* Vanaf nu kun je overal waar je `_icon.pug` include in pug `+icon#beepboop` gebruiken om een icoon te plaatsen.