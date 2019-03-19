/*
`h2-mask`

Example:
```html
<h2-mask label="输入框" class="mask">
  <h2-input placeholder="测试输入" value="Test"></h2-input>
</h2-mask>
```

## Styling

The following custom properties and mixins are available for styling:

|Custom property | Description | Default|
|----------------|-------------|----------|
|`--h2-mask-label` | Mixin applied to the label of mask | {}

*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './behaviors/base-behavior.js';

import './h2-input.js';
/**
 * @customElement
 * @polymer
 * @demo demo/h2-mask/index.html
 */
class H2Mask extends Polymer.mixinBehaviors([BaseBehavior], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
        width: 300px;
        height: 34px;
        line-height: 34px;
      }

      h2-label {
        @apply --h2-mask-label;
      }

      :host .mask__container {
        position: relative;
        flex: 1;
        line-height: inherit;
        height: inherit;
      }

      :host #mask__viewer:hover {
        border-color: #cccccc;
      }

      :host #mask__viewer:hover .mask__viewer__editor {
        display: block;
      }

      :host #mask__viewer {
        position: absolute;
        top: -1px;
        right: 1px;
        bottom: -1px;
        left: -1px;

        border: 1px solid transparent;
        border-radius: 4px;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;

      }

      :host .mask__viewer__editor {
        display: none;

        background-color: #eeeeee;
        justify-self: flex-end;
        padding: 0 4px;
        height: inherit;
        border-left: 1px solid #ccc;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;

        cursor: pointer;
      }

      :host .mask__viewer__container {
        flex: 1;
        text-align: left;
        font-size: inherit;
        padding: 4px 8px;
        line-height: inherit;

        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }

      :host #mask__editor:focus {
        display: block;
      }

      :host #mask__editor {
        display: none;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        height: inherit;
        line-height: inherit;
      }

      :host .button-container {
        position: absolute;
        right: 5px;
        padding: 4px;
        border: 1px solid #ccc;
        border-top: none;
        border-radius: 0 0 4px 4px;
        background-color: #f0f0f0;
        box-shadow: 0 3px 6px rgba(111, 111, 111, 0.2);
        z-index: 5;

        display: flex;
        flex-flow: row nowrap;
      }

      :host .button-container > button {
        background-color: #f0f0f0;
        border: 1px solid #cccccc;
        cursor: pointer;
        border-radius: 4px;
        padding: 0;
        width: 22px;
        height: 22px;
      }

      :host .button-container > button:hover {
        background-color: #ffffff;
        border-color: #66afe9;
      }

      :host iron-icon {
        width: 20px;
        height: 20px;
      }

      :host .btn--cancel {
        margin-left: 3px;
      }

      ::slotted(*) {
        width: inherit;
        height: inherit;
        line-height: inherit;
        font-size: inherit;
      }

      :host([data-edit-mode]) #mask__viewer {
        display: none !important;
      }

      :host([data-edit-mode]) #mask__editor {
        display: block !important;
      }

    </style>

    <h2-label value="[[label]]"></h2-label>

    <div class="mask__container">
      <div id="mask__editor">
        <slot>
          <div id="defaultSlot"></div>
        </slot>
        <div class="button-container">
          <button title="提交" on-click="_submit">
            <iron-icon icon="icons:check"></iron-icon>
          </button>
          <button title="取消" class="btn--cancel" on-click="_cancel">
            <iron-icon icon="icons:clear"></iron-icon>
          </button>
        </div>
      </div>
      <div id="mask__viewer">
        <div class="mask__viewer__container">[[_viewValue]]</div>
        <div id="editBtn" class="mask__viewer__editor" title="点击开始编辑">
          <iron-icon icon="editor:mode-edit"></iron-icon>
        </div>
      </div>
    </div>
`;
  }

  static get properties() {
    return {
      /**
       * The value of the slotted node.
       */
      value: {
        type: String,
        notify: true
      },
      /**
       * 当前的数据
       */
      _valueObj: {
        type: Object
      },
      /**
       * 最近一次保存的数据
       */
      _lastValueObj: {
        type: Object
      },
      
      _viewValue: {
        type: String
      },
      
      /**
       * The label of the mask.
       */
      label: {
        type: String
      },
      /**
       * The placeholder of the mask.
       */
      placeholder: {
        type: String
      },
      /**
       * Set to true, if the selection is required.
       * @type {boolean}
       * @default false
       */
      required: {
        type: Boolean,
        value: false
      },
      /**
       * The attribute name of the item to display on mask.
       */
      attrForDisplay: {
        type: String,
        value: 'label'
      },
      /**
       * slot插槽中的组件
       */
      _slotNode: {
        type: Object
      }
    };
  }

  static get is() {
    return "h2-mask";
  }

  static get observers() {
    return [];
  }

  ready() {
    super.ready();
    
    const viewField = this.$["mask__viewer"];
    
    const slotNodes = this.root.querySelector("slot")
      .assignedNodes()
      .filter(n => n.nodeType === Node.ELEMENT_NODE);
    
    this._slotNode = slotNodes[0];
    
    // a hack to get the init value
    const valueChangedHandler = (e) => {
      this.__initValueOfSlottedElement();
      this.__updateViewer();
      if (e.type === 'value-changed') {
        this._slotNode.removeEventListener('value-changed', valueChangedHandler);
      } else if (e.type === 'selected-values-changed') {
        this._slotNode.removeEventListener('selected-values-changed', valueChangedHandler);
      }
    };
    this._slotNode.addEventListener('value-changed', valueChangedHandler);
    this._slotNode.addEventListener('selected-values-changed', valueChangedHandler);
    
    viewField.addEventListener("click", e => {
      e.stopPropagation();
      
      this.__initValueOfSlottedElement();
      this._displayEditField(true);
      
      this.isFunction(this._slotNode.doFocus) && this._slotNode.doFocus();
    });
    
    /**
     * 组件失去焦点的时候关闭组件
     */
    this.addEventListener("focusout", e => {
      e.stopPropagation();

      setTimeout(() => {
        // double check the focus is out
        if (!this._slotNode.shadowRoot.activeElement) {
          this.__getValueOfSlottedElement();
          this.__updateViewer();
          this._displayEditField(false);
        }
      }, 100);
    });

    setTimeout(() => {
      this.__initValueOfSlottedElement();
      this.__updateViewer();
    }, 0);

  }

  /**
   * 显示编辑区域
   * @private
   */
  _displayEditField(display) {
    if (display) {
      this.setAttribute('data-edit-mode', '');
    } else {
      this.removeAttribute('data-edit-mode');
    }
  }

  __initValueOfSlottedElement() {
    const {value, selectedValues} = this._slotNode;
    
    this._lastValueObj = {value, selectedValues};
    this._valueObj = {value, selectedValues};
    this.value = this._slotNode.value;
  }

  __getValueOfSlottedElement() {
    
    this._lastValueObj = this.deepClone(this._valueObj);
    
    const {value, selectedValues} = this._slotNode;
    this._valueObj = {value, selectedValues};
    
    this.value = this._slotNode.value;
  }

  __resetValueOfSlottedElement() {
    this._valueObj = this._lastValueObj;
    this._slotNode.set('value', this._valueObj.value);
  }

  __updateViewer() {
    const selectedValues = this._valueObj.selectedValues;
    let _viewValue;
    if (Array.isArray(selectedValues)) {
      _viewValue = selectedValues.map(selected => selected[this.attrForDisplay]).join(', ')
    }
    
    this._viewValue = _viewValue || this._valueObj.value || '无';
  }

  /**
   * 提交操作
   * @private
   */
  _submit(e) {
    e.stopPropagation();
    this.__getValueOfSlottedElement();
    this.__updateViewer();
    this._displayEditField(false);
  }

  /**
   * 取消操作
   * @private
   */
  _cancel(e) {
    e.stopPropagation();
    this.__resetValueOfSlottedElement();
    this.__updateViewer();
    this._displayEditField(false);
  }
}

window.customElements.define(H2Mask.is, H2Mask);
