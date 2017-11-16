MockDataPool.when("GET", "/init.do")
    .responseWith({
        status: 200,
        body: JSON.stringify([
            {"id": 1, "label": "快塑网银行", "business": "塑料"},
            {"id": 2, "label": "唯品会银行", "business": "电商"},
            {"id": 3, "label": "腾讯银行", "business": "游戏"},
            {"id": 4, "label": "京东银行", "business": "电商"},
            {"id": 5, "label": "淘宝银行", "business": "电商"},
            {"id": 6, "label": "工商银行", "business": "银行"},
            {"id": 7, "label": "招商银行", "business": "银行"}
        ])
    });


MockDataPool.when("GET", "/query.do")
    .responseWith({
        status: 200, body: JSON.stringify([
            {"id": 8, "label": "快塑网", "business": "塑料"},
            {"id": 9, "label": "唯品会", "business": "电商"},
            {"id": 10, "label": "腾讯", "business": "游戏"},
            {"id": 11, "label": "京东", "business": "电商"},
            {"id": 12, "label": "淘宝2", "business": "电商"}
        ])
    });