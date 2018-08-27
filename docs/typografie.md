## Typografie

In /styles/libs/fonts.scss staan alle fonts. Niet gebruikte fonts zijn uitgecommentarieerd.
In /styles/typography/fonts.scss zijn de mixins van de fonts gedefinieerd
- bigtitle
- h1 t/m h5
- title1 t/m title4
- eyebrow
- lead
- p
- base

In demo-typo.scss is te zien hoe de mixins ingezet kunnen worden in een component. Elk element krijgt een class (h1.demo) en deze krijgt z'n eigen opmaak. De underscore achter de titel is optioneel, soms wordt deze wel ingezet en soms niet. In overleg met designers geen standaard van gemaakt.

```css
//in component X.scss
h2.demo-typo__title {
  @include h2;
  @include margin-bottom-small;
  @include underscore;
}

//in text.scss
@mixin underscore {
  @include breakpoint($bp-m) {
    &:after {
      color: $hanred;
      content: '_';
    }
  }
}
```

In styles/typograpy/richtext.scss is de opmaak van de standaardtekst die uit de editor komt opgemaakt, zodat tekst altijd opmaak heeft. In styles/libs is margins.scss aangemaakt met daarin de standaard margins. Is nu nog vrij basaal, maar zal waarschijnlijk nog veel uitgebreider worden.