/*

```html
<h2-grid-cell></h2-grid-cell>
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
class H2GridCell extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: table-cell;
        padding: 8px;
        text-align: left;
        vertical-align: middle;
      }

    </style>
    <slot></slot>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-grid-cell";
  }
}

window.customElements.define(H2GridCell.is, H2GridCell);
