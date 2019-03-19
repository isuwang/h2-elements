/*
`h2-pagination`

Example:
```html
<h2-pagination total="30" limit="5" paging="{{paging}}"></h2-pagination>
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
 * @demo demo/h2-pagination/index.html
 */
class H2Pagination extends Polymer.mixinBehaviors([], Polymer.Element) {
  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: inline-block;
        height: 38px;
        line-height: 38px;
        font-size: 14px;
      }

      .pagination {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
      }

      li > div {
        padding: 0 8px;
        color: #337ab7;
        background-color: #fff;
        border: 1px solid #ddd;
        border-right: none;
        white-space: nowrap;
        cursor: default;
      }

      li:first-of-type > div {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      li:last-of-type > div {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: 1px solid #ddd;
      }

      li > div:hover {
        color: #23527c;
        background-color: #eee;
        border-color: #ddd;
      }

      #inner-input {
        width: 50px;
        font-size: inherit;
        padding: 4px;
        outline: none;
        border-radius: 2px;
        border: 1px solid #6fa5d3;
      }

    </style>
    <ul class="pagination">
      <li>
        <div on-click="first" id="first">第一页</div>
      </li>
      <li>
        <div on-click="prev" id="prev">上一页</div>
      </li>
      <li>
        <div>第 <input id="inner-input" value="{{ __pageIndex::input }}" type="number" maxlength\$="10">
          页/ 总共[[ totalPageSize ]]页 ，每页[[ limit ]]条
        </div>
      </li>
      <li>
        <div on-click="next" id="next">下一页</div>
      </li>
      <li>
        <div on-click="last" id="last">最后一页</div>
      </li>
      <li>
        <div>共[[ total ]]条记录</div>
      </li>
    </ul>
`;
  }

  static get is() {
    return "h2-pagination";
  }

  static get properties() {
    return {
      /**
       * @type {{start:Number, limit:Number}}
       */
      paging: {
        type: Object,
        notify: true
      },
      /**
       * Max count of single page.
       * @type {number}
       * @default 10
       */
      limit: {
        type: Number,
        value: 10
      },
      /**
       * Total count.
       * @type {number}
       * @default 0
       */
      total: {
        type: Number,
        value: 0
      },

      /**
       * Total page sizes
       */
      totalPageSize: {
        type: Number,
        computed: '_calTotalPageSize(total, limit)'
      },
      __pageIndex: {
        type: Number,
        value: 1
      },
    };
  }

  static get observers() {
    return [
      '_pageIndexChanged(__pageIndex)',
      '_pageStartChanged(paging.start)'
    ];
  }

  _pageStartChanged(start) {
    const pageIndex = Math.floor(start / this.limit) + 1;
    if (pageIndex !== this.__pageIndex) {
      this.__pageIndex = pageIndex;
    }
  }

  _pageIndexChanged() {
    const start = (this.__pageIndex - 1) * this.limit;
    if(!this.paging || this.paging.start !== start) {
      this.paging = {start, limit: this.limit};
    }
  }

  _calTotalPageSize(total, limit) {
    return Math.ceil((total || 0) / limit);
  }

  /**
   * Go to the first page.
   */
  first() {
    this.__pageIndex = 1;
  }

  /**
   * Go to previous page.
   */
  prev() {
    if (this.__pageIndex > 1) {
      this.__pageIndex--;
    }
  }

  /**
   * Go to next page.
   */
  next() {
    if (this.__pageIndex < this.totalPageSize) {
      this.__pageIndex++;
    }
  }

  /**
   * Go to the last page.
   */
  last() {
    this.__pageIndex = this.totalPageSize;
  }
}

window.customElements.define(H2Pagination.is, H2Pagination);
