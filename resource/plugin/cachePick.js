(function () {

    if (!window.ks) {
        window.ks = {};
    }
    var ks = window.ks;

    if (ks.cachePick) {
        return;
    }

    ks.cachePick = {};


    ks.cachePick.newInstance = function () {
        return new cachePickInstance();
    }

    var cachePickInstance = function () {
        return (this instanceof cachePickInstance) ? this.resetCache() : new cachePickInstance;
    };

    cachePickInstance.prototype = {

        /**
         * 查询
         * @param        {String}    关键字
         * @param        {Function}    回调函数(每一次成功匹配都将运行，
         *                            函数接收的第一个参数为匹配到的内容数据)
         * @return        {*}        所有匹配到的内容数据列表
         * @example        search(function (val) {html += '<p>' + val + '</p>'});
         */
        search: function (keyword, callback) {
            var cache = this._cache,
                history = this._history,
                value = [];

            if (!keyword) {
                return;
            }
            keyword = keyword.toUpperCase().trim();

            callback = callback || function () {
                };

            var splitKeyWords = keyword.split(",")

            // 在上一次搜索结果中查询
            if (history.length && keyword.indexOf(history.keyword) !== -1) {
                cache = history.value;
            }

            for (var i = 0, len = cache.length, val; i < len; i++) {
                val = cache[i];

                var keywordCount = splitKeyWords.length
                var matches = 0

                for (var j = 0; j < splitKeyWords.length; j++) {
                    if (val.tags.indexOf(splitKeyWords[j]) !== -1)
                        matches++
                }

                if (matches == keywordCount || val.label.indexOf(keyword) !== -1) {

                    var m_index = val.tags.indexOf(splitKeyWords[0])
                    if(m_index == -1){
                        m_index = val.label.indexOf(splitKeyWords[0])
                    }
                    val.matchIndex = m_index
                    value.push(val);
                    callback(val.content);
                }
            }

            //排序
            for (var i = 1; i < value.length; i++) {
                var tmp = value[i]
                var key = value[i].matchIndex;
                var j = i - 1;
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
        },

        /**
         * 建立索引缓存
         * @param        {Array}        标签
         * @param        {Any}        被索引的内容
         * @example        setCache(['art', 'js', 'web', 'html5'], 'http://planeart.cn');
         */
        setCache: function (tags, label, content) {
            var keys, excision = '\u0001'
            keys = tags.join().toUpperCase();
            var obj = {
                tags: keys,
                label: label,
                content: content,
                matchIndex: 0
            };
            this._cache.push(obj);
        },

        /**
         * 重置索引缓存
         */
        resetCache: function () {
            this._cache = [];
            this._history = {};
        },


        getCache: function () {
            return this._cache;
        }
    };

})();