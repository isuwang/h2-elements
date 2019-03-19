/*
`h2-dialog`

Example:
```html
<h2-dialog id="dialog">
  <div slot="container">
    Put your Content here inside an element which with [slot=container]
  </div>
</h2-dialog>
<button id="btn" onclick="javascript:dialog.open();">Click to open the Dialog</button>
```
## Styling

The following custom properties and mixins are available for styling:

|Custom property | Description | Default|
|----------------|-------------|----------|
|`--h2-dialog-width` | Mixin applied to the width of dialog | 85%
|`--h2-dialog-height` | Mixin applied to the height of dialog | 90%


*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './behaviors/base-behavior.js';

/**
 * @customElement
 * @polymer
 * @demo demo/h2-dialog/index.html
 */
class H2Dialog extends Polymer.mixinBehaviors([BaseBehavior], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: block;
      }

      paper-dialog {
        display: flex;
        flex-flow: column nowrap;
        align-content: stretch;
        width: var(--h2-dialog-width, 85%);
        height: var(--h2-dialog-height, 90%);
      }

      .scrollable-container {
        flex: 1;
        overflow: auto;
      }

      :host .close-dialog {
        width: 40px;
        height: 40px;
        position: absolute;
        font-size: 20px;
        right: -16px;
        top: -16px;
        background: white;
        border: 1px solid #ededed;
        border-radius: 50%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      }

      .title {
        margin: 20px 20px 0;
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px dashed #000;
      }

    </style>

    <paper-dialog id="dialog" modal="" entry-animation="scale-up-animation" exit-animation="fade-out-animation">
      <div class="close-dialog" on-tap="close">X</div>
      <template is="dom-if" if="[[ toBoolean(title) ]]">
        <h2 class="title">[[title]]</h2>
      </template>
      <div class="scrollable-container">
        <slot name="container"></slot>
      </div>
    </paper-dialog>
`;
  }

  static get properties() {
    return {
      /**
       * Title of the dialog
       */
      title: {
        type: String
      },
      /**
       * Set to True to stop auto dismiss.
       * @type {boolean}
       * @default false
       */
      stopAutoDismiss: {
        type: Boolean,
        value: false
      }
    };
  }

  static get is() {
    return "h2-dialog";
  }

  connectedCallback() {
    super.connectedCallback();

    /**
     * @listens iron-overlay-closed
     */
    this.addEventListener('iron-overlay-closed', e => {
      // ignore 'iron-overlay-closed' event fired by other element
      if (e.path[0] != this.$.dialog) return;
      e.stopPropagation();
      /**
       * @event h2-dialog-closed
       * Fired when the dialog closed.
       */
      this.dispatchEvent(new CustomEvent('h2-dialog-closed'), {
        composed: true,
        bubbles: true
      });
      if (!this.stopAutoDismiss) {
        setTimeout(() => {
          this.parentElement.removeChild(this);
        }, 100);
      }
    });

    /**
     * @listens h2-dialog-dismiss
     */
    this.addEventListener('h2-dialog-dismiss', this.close);
  }

  /**
   * Open the dialog.
   */
  open() {
    this.$.dialog.open();
  }

  /**
   * Close the dialog.
   */
  close() {
    this.$.dialog.close();
  }
}

window.customElements.define(H2Dialog.is, H2Dialog);
