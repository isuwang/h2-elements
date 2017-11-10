/**
 * Created by SkyLin on 2017/11/8.
 */
class PinyinUtil {
    constructor() {
        /**
         * 无加载字典文件的时候抛错提示
         */
        if (!this.firstLetterDictionary) {
            console.error("拼音插件初始化失败，请先加载首字母拼音字典firstLetterDictionary.js");
            return;
        }
        if (!this.commonDictionary) {
            console.error("拼音插件初始化失败，请先加载通用拼音字典commonDictionary.js");
            return;
        }
    }

    /**
     * 汉字转全拼
     * @param userInput 用户输入关键字(允许输入英文字母和中文)
     * @returns {*}
     */
    converToCompletePinyin(userInput) {
        /**
         * 过滤words中的所有非中文非字母的字符
         */
        let keyword = (userInput + "").trim().replace(/[^(a-zA-Z\u4e00-\u9fa5)]/g, "");
        if (!keyword) {
            return [];
        }

        let dealtWords = keyword.split("");
        let reg = /[a-zA-Z]/;
        let results = dealtWords.map(word => {
            return reg.test(word) ? word : this.commonDictionary[word]
        });
        return this._handlePolyphone(results, " ");
    }

    /**
     * 汉字转拼音首字母
     * @param userInput 用户输入关键字(允许输入英文字母和中文)
     * @returns {*}
     */
    converToFirstLetterPinyin(userInput) {
        /**
         * 过滤words中的所有非中文非字母的字符
         */
        let keyword = (userInput + "").trim().replace(/[^(a-zA-Z\u4e00-\u9fa5)]/g, "");
        if (!keyword) {
            return [];
        }

        let result = [];
        for (let i = 0; i < keyword.length; i++) {
            let ch = keyword.charAt(i);
            /**
             * 字母不转换
             */
            if (/a-zA-Z/.test(ch)) {
                result.push(ch);
                continue;
            }

            /**
             * 在首字母拼音字典中查找，优先查找多音字，否则查找所有字
             */
            let unicode = keyword.charCodeAt(i);
            if (unicode >= 19968 && unicode <= 40869) {
                ch = this.firstLetterDictionary.polyphone[unicode] || this.firstLetterDictionary.all.charAt(unicode - 19968);
            }
            result.push(ch);
        }
        return this._handlePolyphone(result, "");
    }

    /**
     * 处理多音字，并去重
     * 1.['hen', 'xing heng xing hang'] 转换成 ['hen xing', 'hen heng', 'hen hang']
     * 2.['D', 'ZCZ', 'F']转换成['DZF', 'DCF']
     * @param arr 字符串数组
     * @param splitter 字符串分隔符
     * @returns {[string]}
     * @private
     */
    _handlePolyphone(arr, splitter) {
        splitter = splitter || "";
        // 对数组的字符串元素去重,封装成字符串二维数组
        let array = arr.map(e => Array.from(new Set(e.split(splitter))));

        let result = [''], temp = [];
        for (let i = 0; i < array.length; i++) {
            temp = [];
            let t = array[i];
            for (let j = 0; j < t.length; j++) {
                for (let k = 0; k < result.length; k++)
                    temp.push(result[k] + "" + t[j]);
            }
            result = temp;
        }
        return result.map(e => e.toUpperCase());
    }
}

/**
 * 初始化通用字典和拼音首字母字典,加载到原型上
 */
PinyinUtil.prototype.commonDictionary = (function () {
    let commonDictionary = {};
    let commonDict = window.commonDictionary;
    let pinyinArr = commonDict.split(',');
    for (let i = 0, len = pinyinArr.length; i < len; i++) {
        // 这段代码耗时28毫秒左右，对性能影响不大，所以一次性处理完毕
        commonDictionary[String.fromCharCode(i + 19968)] = pinyinArr[i];
    }
    return commonDictionary;
})();

PinyinUtil.prototype.firstLetterDictionary = window.firstLetterDictionary;