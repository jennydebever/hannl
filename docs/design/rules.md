# Rules

Standaarden voor shadows, animaties, gebruik van underscore.

!{Animatie}

Snelle ease in, trage ease out. Alsof een monolytisch blok over ijs glijdt.

speed: 1.5s;

easing: cubic-bezier(.05, 0, .002, 1);

[Codepen voorbeeld](https://codepen.io/manchap/pen/PBePvN)

---

## Buttons
Volgorde staat altijd vast. Een Strong link mag niet voor een Secondary of Primary geplaatst worden. Een Secondary niet voor een Primary

[Button hierarchie opties ](/components/atoms/buttons.html#button-hierarchie-opties)

---

!{Schaduw}

### Concept

De schaduw geeft het effect aan een object dat het zweeft. Het geeft een lichtheid mee aan Witte objecten en foto's. Grote zwarte objecten zijn monolitisch en gegrond. Deze krijgen geen schaduw mee.

### Technisch

Box shadow op een element met een negative spread

#### Normaal

box-shadow: 0 15px 60px -30px rgba(0,0,0, .8);

#### Hover

box-shadow: 0 20px 60px -30px rgba(0,0,0, .8);

[Codepen voorbeeld](https://codepen.io/manchap/pen/pOvXPL)

---

!{Underscore}