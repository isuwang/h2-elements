// test
// init first mock
MockDataPool.when("POST", "/test1.do")
    .withExpectedHeader("content-type", "application/json;charset=utf-8")
    .responseWith({status: 200, body: JSON.stringify({message: "保存成功！"})});

MockDataPool.when("POST", "/test.do")
    .withExpectedHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8")
    .responseWith({status: 200, body: JSON.stringify({a: 1, b: 2, c: 3})});

MockDataPool.when("GET", "/test2.do")
    .responseWith({status: 200, body: "表单保存成功！"});
