/*
`h2-input-date`

Example:
```html
<h2-input-date class="input-date" label="日期"></h2-input-date>
<h2-input-date class="input-date" label="默认value" value="2017-10-26"></h2-input-date>
<h2-input-date class="input-date" label="默认time" timestamp="1509008130349"></h2-input-date>

```
## Styling

The following custom properties and mixins are available for styling:

|Custom property | Description | Default|
|----------------|-------------|----------|
|`--h2-input-date-label` | Mixin applied to the label of input | {}


*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './h2-input.js';

/**
 * @customElement
 * @polymer
 * @demo demo/h2-input-date/index.html
 */
class H2InputDate extends Polymer.mixinBehaviors([], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: flex;
        width: 300px;
        height: 34px;
        font-size: 14px;
        line-height: 34px;
      }

      :host h2-input {
        flex: 1;
        width: inherit;
        height: inherit;
        font-size: inherit;
        line-height: inherit;

        --h2-input-label: {
          @apply --h2-input-date-label;
        };
      }

    </style>
    <h2-input id="input" value="{{value}}" label="[[label]]" placeholder="[[placeholder]]" required="[[required]]" min="[[min]]" max="[[max]]" readonly\$="[[readonly]]" type="date">
    </h2-input>
`;
  }

  static get properties() {
    return {
      /**
       * The value of the input, return a date string format to `yyyy-MM-dd`.
       * @type {string}
       */
      value: {
        type: String,
        notify: true
      },
      /**
       * The timestamp of the date selected.
       * @type {number}
       */
      timestamp: {
        type: Number,
        notify: true
      },
      /**
       * The label of the input.
       */
      label: {
        type: String
      },
      /**
       * The placeholder of the input.
       */
      placeholder: {
        type: String
      },
      /**
       * Set to true, if the input is required.
       * @type {boolean}
       * @default false
       */
      required: {
        type: Boolean,
        value: false
      },
      /**
       * Set to true, if the input is readonly.
       * @type {boolean}
       * @default false
       */
      readonly: {
        type: Boolean,
        value: false
      },
      /**
       * The minimum date which can be chosen. It should be a string format to `yyyy-MM-dd`.
       * @type {string}
       */
      min: {
        type: String
      },
      /**
       * The maximum date which can be chosen. It should be a string format to `yyyy-MM-dd`.
       * @type {string}
       */
      max: {
        type: String
      }
    };
  }

  static get is() {
    return "h2-input-date";
  }

  static get observers() {
    return [
      '_valueChanged(value)',
      '_timestampChanged(timestamp)'
    ];
  }
  /**
   * @param value
   * @private
   */
  _valueChanged(value) {
    if (!this.value) {
      this.set("timestamp", undefined);
      return;
    }
    let time = new Date(`${value} 00:00:00`).getTime();
    this.set("timestamp", time);
  }

  /**
   * @param time
   * @private
   */
  _timestampChanged(time) {
    if (!time) {
      this.set("value", undefined);
      return;
    }
    const date = new Date(time);
    this.set("value", `${date.getFullYear()}-${this._preReplenish(date.getMonth() + 1, 2, "0")}-${this._preReplenish(date.getDate(), 2, "0")}`);
  }

  /**
   * 前置填充
   * @param {*} str
   * @param {number} totalLen 填充后的长度
   * @param {string} replenisher 填充的字符
   */
  _preReplenish(str, totalLen = 0, replenisher = "") {
    return `${String(replenisher).repeat(Number(totalLen) - String(str).length)}${String(str)}`;
  }

  /**
   * Set focus to input.
   */
  doFocus() {
    this.$.input.doFocus();
  }

  /**
   * Validates the input element.
   * @returns {boolean}
   */
  validate() {
    return this.$.input.validate();
  }
}

window.customElements.define(H2InputDate.is, H2InputDate);
