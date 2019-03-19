/*
`h2-loading`

Example:
```html
<h2-loading opened></h2-loading>
```
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {PolymerElement} from "@polymer/polymer";
import {IronOverlayBehavior} from "@polymer/iron-overlay-behavior";

/**
 * @customElement
 * @polymer
 * @demo demo/h2-loading/index.html
 */
class H2Loading extends mixinBehaviors([IronOverlayBehavior], PolymerElement) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 999;
        opacity: 0.5;
        display: flex;
      }

      img {
        width: 40px;
        margin: auto;
      }
    </style>
    <img src="[[importPath]]/img/loading-4.gif">
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-loading";
  }
}

window.customElements.define(H2Loading.is, H2Loading);
