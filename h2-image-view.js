/*
`h2-image-view`

Example: 
```html
<h2-image-view src="https://test.com/test.jpg"></h2-image-view>
```
```
## Styling

The following custom properties and mixins are available for styling:

|Custom property | Description | Default|
|----------------|-------------|----------|
|`--h2-image-upload-button` | Mixin applied to tool button of the viewer | {}

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './h2-button.js';

/**
 * @customElement
 * @polymer
 * @demo demo/h2-image-view/index.html
 */
class H2ImageView extends Polymer.mixinBehaviors([], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
        width: 140px;
        height: 180px;
        flex-flow: column nowrap;
        text-align: center;
        border: 1px dashed #ccc;
        font-size: 14px;
        background: #f0f0f0;
      }

      .img__container {
        flex: 1;
        cursor: zoom-in;
        background-size: contain;
        background: no-repeat center;
      }

      .toolbar {
        display: flex;
        background: rgba(79, 79, 79, 0.33);
        height: 36px;
        justify-content: center;
        align-items: center;
        justify-self: flex-end;
      }

      .toolbar h2-button {
        height: 26px;
        --h2-button: {
          background-color: #5cb85c;
          @apply --h2-image-upload-button;
        }
      }

      .img__viewer {
        display: flex;
        overflow: hidden;
        width: 90%;
        height: 90%;
        background: transparent;
        padding: 0;
      }

      #viewer-img {
        cursor: zoom-out;
        padding: 0;
        margin: auto;
        width: 100%;
        height: 100%;
      }

    </style>

    <div class="img__container" id="result-img" on-click="openViewZoom"></div>

    <div class="toolbar">
      <h2-button on-click="openViewZoom">查看大图</h2-button>
    </div>
    <paper-dialog class="img__viewer" id="dialog" on-click="closeViewZoom" with-backdrop="">
      <div id="viewer-img"></div>
    </paper-dialog>
`;
  }

  static get properties() {
    return {
      /**
       * The remote uri of image.
       */
      src: {
        type: String,
        observer: '_changeSrc'
      },
    };
  }

  static get is() {
    return "h2-image-view";
  }

  _changeSrc(newValue) {
    if (newValue) {
      const style = this.$["result-img"].style;
      const viewerStyle = this.$['viewer-img'].style;
      
      style.background = `url(${newValue}) no-repeat center`;
      style.backgroundSize = "contain";
      viewerStyle.background = `url(${newValue}) no-repeat center`;
      viewerStyle.backgroundSize = "contain";
    }
  }


  /**
   * Open the view zoom
   */
  openViewZoom() {
    if (this.src) {
      this.$.dialog.open();
    }
  }
  /**
   * Close the view zoom.
   */
  closeViewZoom() {
    this.$.dialog.close();
  }
}

window.customElements.define(H2ImageView.is, H2ImageView);
