/**
 * 缓存搜索的插件
 *
 * 缓存数据结构_cacheItems:
 * [{item: {label:"快塑网",business:"塑料"}, searches: ["快塑网","KUAISUWANG","KSW","塑料","SULIAO","SL"],matchCount:0},
 *  {item: {label:"京东",business:"电商"}, searches: ["京东","JINGDONG","JD","电商","DIANSHANG","DS"],matchCount:0 }]
 *
 */
class CacheSearchUtil {
    constructor() {
        this.resetCache();
    }

    /**
     * 查询
     * @param keyword 关键字
     * @returns {Array.<*>}
     */
    search(keyword = "") {
        let parts = keyword.toUpperCase().trim().split(",");
        /**
         * 匹配的结果集
         * 1.filter操作：将关键字匹配的cacheItem过滤出来，得到匹配缓存数组
         * 2.map操作：将匹配的缓存项的匹配计数器matchCount加1
         * 3.sort操作：通过匹配计数器matchCount按从大到小对结果集排序
         * 4.map操作：返回pojo数组
         */
        return this._cacheItems.filter(
            cacheItem => parts.every(part => cacheItem.searches.some(s => s.indexOf(part) > -1))
        ).map(cacheItem => {
            cacheItem.matchCount++;
            return cacheItem
        }).sort((prev, next) => next.matchCount - prev.matchCount
        ).map(
            cacheItem => cacheItem.item
        );
    }

    /**
     * 新增缓存项
     * @param item 缓存对象POJO 如:{label:"快塑网",business:"塑料"}
     * @param searches 缓存对象搜索关键字符串数组，包含了item的特定字段值，特定字段的全拼、简拼字符串,如：["快塑网","KUAISUWANG","KSW","塑料","SULIAO","SL"]
     */
    addCacheItem(item, searches) {
        this._cacheItems.push({"item": item, "searches": searches, matchCount: 0});
    }

    /**
     * 重置索引缓存
     */
    resetCache() {
        this._cacheItems = [];
    }
}