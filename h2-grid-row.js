/*

```html
<h2-grid-row></h2-grid-row>
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
class H2GridRow extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: table-row;
        padding: 0;
        margin: 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        position: relative;
      }

      :host(:hover) {
        background: #CAF1FF !important;
      }

      :host(:nth-of-type(odd)) {
        background: #ffffff;
      }

      :host(:nth-of-type(even)) {
        background: #efefef;
      }

      ::slotted([slot=subItem]) {
        padding: 10px;
      }

    </style>

    <slot></slot>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-grid-row";
  }
}

window.customElements.define(H2GridRow.is, H2GridRow);
