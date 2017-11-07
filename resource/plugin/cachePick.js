/**
 * 搜索缓存的插件
 */
class CachePick {
    constructor() {
        this.resetCache();
    }
    /**
     * 查询
     * @param        {String}    关键字
     * @param        {Function}    回调函数(每一次成功匹配都将运行，
     *                            函数接收的第一个参数为匹配到的内容数据)
     * @return        {*}        所有匹配到的内容数据列表
     * @example        search(function (val) {html += '<p>' + val + '</p>'});
     */
    search(keyword, callback) {
        let cache = this._cache,
            history = this._history,
            value = [];
        if (!keyword) {
            return;
        }
        keyword = keyword.toUpperCase().trim();
        callback = callback || function () {};
        let splitKeyWords = keyword.split(",");

        // 如果上一次查询过该关键字，则从上一次的历史查询结果中查询
        if (history.length && keyword.indexOf(history.keyword) !== -1) {
            cache = history.value;
        }

        for (let i = 0, len = cache.length, val; i < len; i++) {
            val = cache[i];

            let keywordCount = splitKeyWords.length;
            let matches = 0;

            for (let j = 0; j < splitKeyWords.length; j++) {
                if (val.tags.indexOf(splitKeyWords[j]) !== -1)
                    matches++;
            }

            if (matches == keywordCount || val.content.indexOf(keyword) !== -1) {
                let m_index = val.tags.indexOf(splitKeyWords[0]);
                if (m_index == -1) {
                    m_index = val.content.indexOf(splitKeyWords[0]);
                }
                val.matchIndex = m_index;
                value.push(val);
                callback(val.content);
            }
        }

        //排序
        for (let i = 1; i < value.length; i++) {
            let tmp = value[i];
            let key = value[i].matchIndex;
            let j = i - 1;
            while (j >= 0 && value[j].matchIndex > key) {
                value[j + 1] = value[j];
                j--;
            }
            value[j + 1] = tmp;
        }

        // 缓存本次查询结果
        this._history = {
            keyword: keyword,
            value: value,
            length: value.length
        };

        return value;
    }

    /**
     * 建立索引缓存
     * @param        {Array}        标签
     * @param        {Any}        被索引的内容
     * @example        setCache(['art', 'js', 'web', 'html5'], 'http://planeart.cn');
     */
    setCache(tags, label, content) {
        let keys = tags.join().toUpperCase();
        this._cache.push({
            tags: keys,
            label: label,
            content: content,
            matchIndex: 0
        });
    }

    /**
     * 重置索引缓存
     */
    resetCache() {
        this._cache = [];
        this._history = {};
    }


    getCache() {
        return this._cache;
    }
}