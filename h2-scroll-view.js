/*
`h2-scroll-view`

Example:
```html
<h2-scroll-view>
  <p>Alice was beginning to get very tired of sitting by her sisteron the bank, and of having nothing to do</p>
</h2-scroll-view>
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
 * @demo demo/h2-scroll-view/index.html
 */
class H2ScrollView extends Polymer.mixinBehaviors([], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
      }

      #scroll-container {
        flex: 1;
        display: flex;
      }

      #inner-container {
        flex: 1;
      }
    </style>
    <paper-dialog-scrollable id="scroll-container">
      <div id="inner-container">
        <slot></slot>
      </div>
    </paper-dialog-scrollable>
`;
  }

  static get properties() {
    return {};
  }

  static get is() {
    return "h2-scroll-view";
  }
}

window.customElements.define(H2ScrollView.is, H2ScrollView);
