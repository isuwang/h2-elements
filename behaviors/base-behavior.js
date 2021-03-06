import '../h2-loading.js';

/**
 * @polymerBehavior
 */
export const BaseBehavior = {
  /**
   * 判断第一个参数是否与后面的某个参数相等， 使用Object.is() 进行判断
   * @param {...*} args
   * @return {boolean}
   */
  isOneOf(...args) {
    if (Array.isArray(args) && args.length > 0) {
      const target = args[0];
      return args.slice(1).some(arg => Object.is(arg, target));
    }
    
    return false;
  },
  
  /**
   * 判断两个值是否相等，使用 `Object.is` 判断。
   * @param {*} left
   * @param {*} right
   * @returns {Boolean}
   */
  isEqual(left, right) {
    return Object.is(left, right);
  },
  
  
  /**
   * 函数判断
   * @param {*} fn
   * @returns {Boolean}
   */
  isFunction(fn) {
    return Function.prototype.isPrototypeOf(fn);
  },
  
  /**
   * Return the first giving arg which is not ``undefined``, ``null``, ``NaN`` , ``false`` ,``0`` or ``''``.
   *
   * eg.
   * ```
   * orElse(undefined, null, "foo")  // "foo"
   * orElse(0, 1)  // 1
   * orElse("bar", "foo")  // "bar"
   * ```
   * @param {...*} args
   * @returns {*}
   */
  orElse(...args) {
    const [first, ...rest] = args;
    return rest.length === 0 ? first : (first || this.orElse(...rest));
  },
  
  /**
   * 通过key查询对象中的值
   * @param {Object} model
   * @param {String} key
   * @param {String} defVal  支持任何符合json格式的字符串
   * @returns {*}
   */
  getValueByKey(model, key, defVal = "") {
    return (model && (key in model)) ? model[key] : defVal;
  },
  
  /**
   * 等价于 model[key1 || key2 || ...]
   * @param {Object} model
   * @param {...String} keys
   * @returns {*}
   */
  getValueOrElse(model, ...keys) {
    const key = this.orElse(...keys);
    return this.getValueByKey(model, key);
  },
  /**
   * 等价于 model[key1 || key2 || ...] 如果找不到值，返回null
   * @param {Object} model
   * @param {...String} keys
   * @returns {*}
   */
  getValueOrElseNull(model, ...keys) {
    const key = this.orElse(...keys);
    return this.getValueByKey(model, key, null);
  },
  /**
   * 等价于 model[key1 || key2 || ...] 如果找不到值，返回 undefined
   * @param {Object} model
   * @param {...String} keys
   * @returns {*}
   */
  getValueOrElseUndefined(model, ...keys) {
    const key = this.orElse(...keys);
    return (model && (key in model)) ? model[key] : undefined;
  },
  /**
   * 通过路径获取对象字段值
   * @param {Object} model eg. { foo: { bar: 1} }
   * @param {String} path  eg. "foo.bar"
   * @param {String} defVal  支持任何符合json格式的字符串
   * @returns {*}
   */
  getValueByPath(model, path = '', defVal) {
    // TODO if user wants a defVal equal to '', this won't work.
    if (!model) return !!defVal ? JSON.parse(defVal) : undefined;
    
    const splits = path.split('.');
    let copy = model;
    for (let key of splits) {
      if (!copy[key]) return !!defVal ? JSON.parse(defVal) : undefined;
      copy = copy[key];
    }
    
    return copy;
  },
  
  /**
   * To boolean.
   * @param {*} val
   */
  toBoolean(val) {
    return !!val;
  },
  /**
   * 添加loading
   */
  showLoading() {
    let loadingDiv = document.body.querySelector("#h2-loading");
    if (!loadingDiv) {
      loadingDiv = document.createElement("h2-loading");
      loadingDiv.setAttribute("id", "h2-loading");
      loadingDiv.noCancelOnOutsideClick = true;
      loadingDiv.noCancelOnEscKey = true;
      loadingDiv.withBackdrop = true;
      document.body.appendChild(loadingDiv);
    }
    this.async(function () {
      loadingDiv.open();
    }, 100);
  },
  
  /**
   * 消除loading
   */
  hideLoading() {
    this.async(function () {
      const loadingDiv = document.body.querySelector("#h2-loading");
      loadingDiv && loadingDiv.close();
    }, 100);
  },
  
  throwNotFoundError(string) {
    throw new TypeError(string + " should not be undefined.")
  },
  
  deepClone(obj) {
    return obj == null || typeof (obj) !== "object" ? obj : JSON.parse(JSON.stringify(obj));
  }
};
