/*

```html
<h2-grid-body></h2-grid-body>
```
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
/**
 * @customElement
 * @polymer
 */
class H2GridBody extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: table-row-group;
      }
    </style>

    <slot></slot>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-grid-body";
  }
}

window.customElements.define(H2GridBody.is, H2GridBody);
