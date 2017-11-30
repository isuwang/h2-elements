import {testObj, testObj1, helloStr, testStr} from "./data.js";
MockDataPool.when("POST", "/path/to/index.do")
    .withExpectedHeader("content-type", "application/json;charset=utf-8")
    .withExpectedHeader("Cache-Control", "no-cache")
    .responseWith({status: 200, body: JSON.stringify(testObj)});

MockDataPool.when("POST", "/path/to/index.do")
    .withExpectedHeader("Cache-Control", "no-cache")
    .responseWith({status: 200, body: JSON.stringify(testObj1)});

MockDataPool.when("POST", "/path/to/index.do")
    .withExpectedHeader("test-header", "no-value")
    .responseWith({status: 200, body: helloStr});

MockDataPool.when("GET", "/path/to/helloworld.do")
    .responseWith({status: 200, body: testStr});
