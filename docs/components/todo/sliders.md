# Sliders <Badge text="todo" type="warn" vertical="middle" />
<Todo name="slider-regular" />

## Concept:
Klikbare etalage om projecten, faciliteiten, etc. visueel te presenteren. Deze versie van de slider heeft mogelijkheden voor het plaasten van een onderschrift, link, video en foto. Het component kan op elke pagina geplaatst worden.

![slider-regular](https://trello-attachments.s3.amazonaws.com/5aa687df45545365963f69ce/5b4c88a70a5d3f118b774dd7/5c4a73829b6ef1830a80922c1b64320d/Regular_Slider.jpg)

## Notes voor dev:
- Op dekstop is het element maximaal container breed (1160px). Als de container smaller is dan de maximale breedte, dan 'snapt'de slider aan de randen van de container.
- Transitie voor overgang van de verschillende slides: @speed: 0.8s; @easing: cubic-bezier(.05, 0, .002, 1); // ease-out
- Op alle breakpoints de mogelijkheid hebben om d.m.v de knoppen en swipen te switchen tussen de volgende/vorige slide.
- Slide met een playbutton, deze met een fade in te laden van @speed 0.3s;
- Spacing in _.Slider-Block_: LG/XL 40px; MD: 32px ; SM/XS: 24px.
- Buttons Next Slide / Prev Slide rechts uitgelijnd met margin op LG/XL: -24px; MD: -24px; SM/XS: -20px.
- Mocht er meer tekst dan in het ontwerp geplaatst worden in het component: vergroten naar onderen.
- [Link naar huidige versie van het ontwerpdocument:](https://share.goabstract.com/f78784e8-c4cb-465d-a1fd-ce1a8f3262db)
- [Link naar prototype desktop:](https://app.atomic.io/d/6e2ZJSnqUkLP)
- [Link naar prototype mobile:](https://app.atomic.io/d/9oxlaQKEDVvw)

## Notes voor content:
- Titel lengte: minimaal 70, maximaal 150 karakters
- Link lengte: minimaal 15, maximaal 40 karakters
- Minimaal aantal slides van 3, maximaal 8