/*

```html
<h2-grid-header-cell></h2-grid-header-cell>
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
class H2GridHeaderCell extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: table-cell;
        vertical-align: inherit;
        padding: 2px 8px;
        height: 32px;
        line-height: 32px;
        background: inherit;
        color: #f7f7f7;
        font-weight: bold;
      }
    </style>

    <slot></slot>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-grid-header-cell";
  }
}

window.customElements.define(H2GridHeaderCell.is, H2GridHeaderCell);
