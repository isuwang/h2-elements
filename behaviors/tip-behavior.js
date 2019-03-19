/**
 * @polymerBehavior
 */
export const TipBehavior = {
  /**
   * h2Tip提供了以下便捷方法来使用 `h2-tip`.
   * - `h2Tip.success(message, duration = 1500)`
   * - `h2Tip.warn(message, duration = 5000)`
   * - `h2Tip.error(message, duration = 600000)`
   * - `h2Tip.confirm(message, confirmCallback, cancelCallback)`
   * - `h2Tip.prompt(message, confirmCallback, cancelCallback)`
   * - `h2Tip.tip({message, type, duration = 0, confirmCallback, cancelCallback})`
   * @type {object}
   */
  h2Tip: {
    /**
     * 成功提示框
     * @param {string} message
     * @param {number=1500} duration
     */
    success(message, duration = 1500) {
      this.tip({message, duration, type: 'success'});
    },

    /**
     * 警告提示框
     * @param {string} message
     * @param {number=5000} duration
     */
    warn(message, duration = 5000) {
      this.tip({message, duration, type: 'warn'});
    },

    /**
     * 错误提示框
     * @param {string} message
     * @param {number=600000} duration
     */
    error(message, duration = 600000) {
      this.tip({message, duration, type: 'error'});
    },

    /**
     * 确认提示框
     * @param {string} message
     * @param {function} confirmCallback
     * @param {function} cancelCallback
     */
    confirm(message, confirmCallback, cancelCallback) {
      this.tip({message, type: 'confirm', confirmCallback, cancelCallback});
    },

    /**
     * 确认提示框（带备注）
     * @param {string} message
     * @param {function} confirmCallback
     * @param {function} cancelCallback
     */
    prompt(message, confirmCallback, cancelCallback) {
      this.tip({message, type: 'prompt', confirmCallback, cancelCallback});
    },

    /**
     * @param {string} message
     * @param {{message:string, type:string, duration:number = 0, confirmCallback:function, cancelCallback:function}}
     */
    tip({message, type, duration = 0, confirmCallback, cancelCallback}) {
      const tip = document.createElement('h2-tip');
      tip.setAttribute('type', type);
      tip.message = message;
      tip.duration = duration;
      tip.autoDetach = true;
      document.body.appendChild(tip);
      tip.open(confirmCallback, cancelCallback);
    }
  }
};