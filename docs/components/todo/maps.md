# Maps <Badge text="todo" type="warn" vertical="middle" />
<Todo name="worldmap" />

<Todo name="map-and-address" />

## Concept:
Component wat de adresgegevens, telefoonnummer en locatie laten zien van opleiding. Hierin is de mogelijkheid om je reistijd te berekenen vanaf eigen locatie naar de school. In sommige gevallen wordt een opleiding in meerdere steden gegeven, dan is het mogelijk om binnen dit component beide locatie gegevens te bekijken. Het component wordt getoond bij opleidingspagina's.
![map-and-address](https://trello-attachments.s3.amazonaws.com/5aa687df45545365963f69ce/5b72bf7a73a1795faed56e7c/x/d508c13446000484c8a2b925dcd88de2/C._Map_and_Address__5BLG_XL_5D.jpg)

## Notes voor dev:
- De card heeft een licht parallax effect op de afbeelding om het gevoel van ruimte te geven. Zie prototype als voorbeeld.
- Als de opleiding in twee verschillende steden gegeven wordt komt de switcher erboven om te kunnen switchen tussen beide steden.
- Button 'bereken je reistijd' gaat naar een _takeover_. Dit component, _route_, wordt nog ontworpen.
- Het adres, postcode en plaatsnaam zijn underlined. Deze moeten gelinkt worden aan een _lightbox_ of _takeover_ met een google maps iframe. Deze zal samen met het _route_ component ontworpen worden. Voor de 'time-being', linken naar de maps op maps.google.com
- Het telefoonnummer moet een tel: actie hebben om direct te kunnen bellen.
- [Link naar huidige versie van het ontwerpdocument:](https://share.goabstract.com/2dd650d4-794e-4ee5-be8e-84ad449a4e12)
- [Link naar prototype desktop:](https://app.atomic.io/d/3RZa2NGypOAF)

## Notes voor content:
- In de foto moet het focuspunt rechts liggen zodat dit niet in conflict raakt met de card.