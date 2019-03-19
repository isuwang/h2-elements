/*
`h2-input-datetime`

Example:
```html
<h2-input-datetime class="datetime" label="无默认日期"></h2-input-datetime>
<h2-input-datetime class="datetime" label="默认value" value="2017-10-26T10:20"></h2-input-datetime>
<h2-input-datetime class="datetime" label="默认time" timestamp="1509008130349"></h2-input-datetime>
```

## Styling

The following custom properties and mixins are available for styling:

|Custom property | Description | Default|
|----------------|-------------|----------|
|`--h2-input-datetime-label` | Mixin applied to the label of input | {}


*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import './behaviors/format-behavior.js';

import './h2-input.js';
/**
 * @customElement
 * @polymer
 * @demo demo/h2-input-datetime/index.html
 */
class H2InputDatetime extends Polymer.mixinBehaviors([FormatBehavior], Polymer.Element) {
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

      #input {
        flex: 1;
        width: inherit;
        height: inherit;
        font-size: inherit;
        line-height: inherit;

        --h2-input-label: {
          @apply --h2-input-datetime-label;
        };
      }

    </style>
    <h2-input id="input" value="{{value}}" label="[[label]]" placeholder="[[placeholder]]" required="[[required]]" min="[[min]]" max="[[max]]" readonly\$="[[readonly]]" type="datetime-local">
    </h2-input>
`;
  }

  static get properties() {
    return {
      /**
       * The value of the input, return a date string format to `yyyy-MM-ddTHH:mm`. i.e. 2017-10-26T12:20
       */
      value: {
        type: String,
        notify: true
      },
      /**
       * 时间戳
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
       * The minimum datetime which can be chosen. It should be a string format to `yyyy-MM-ddTHH:mm`.
       * @type {string}
       */
      min: {
        type: String
      },
      /**
       * The maximum datetime which can be chosen. It should be a string format to `yyyy-MM-ddTHH:mm`.
       * @type {string}
       */
      max: {
        type: String
      }
    };
  }

  static get is() {
    return "h2-input-datetime";
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
    const time = new Date(value).getTime();
    this.set("timestamp", time);
  }

  /**
   * @param timestamp
   * @private
   */
  _timestampChanged(timestamp) {
    if (!timestamp) {
      this.set("value", undefined);
      return;
    }
    const date = new Date(timestamp);
    this.set("value", this.formatDate(date, "yyyy-MM-ddTHH:mm"));
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

window.customElements.define(H2InputDatetime.is, H2InputDatetime);
