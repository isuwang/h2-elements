/*

```html
<h2-grid-header></h2-grid-header>
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
class H2GridHeader extends Polymer.Element {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
        background-color: #595959;
      }

      .header {
        background: inherit;
        display: table-row;
      }

    </style>

    <div class="header">
      <slot></slot>
    </div>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-grid-header";
  }
}

window.customElements.define(H2GridHeader.is, H2GridHeader);
