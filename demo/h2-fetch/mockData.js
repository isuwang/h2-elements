// test
// init first mock
MockDataPool.when("POST", "/path/to/index.do")
  .withExpectedHeader("content-type", "application/json;charset=utf-8")
  .withExpectedHeader("Cache-Control", "no-cache")
  .responseWith({status: 200, body: JSON.stringify({a: 1, b: 2})});

MockDataPool.when("POST", "/path/to/index.do")
  .withExpectedHeader("Cache-Control", "no-cache")
  .responseWith({status: 200, body: JSON.stringify({a: 1, b: 2, c: 3})});

MockDataPool.when("POST", "/path/to/index.do")
  .withExpectedHeader("test-header", "no-value")
  .responseWith({status: 200, body: "Fuck the world if you are rick, otherwise fuck yourself!"});

MockDataPool.when("GET", "/path/to/helloworld.do")
  .responseWith({status: 200, body: "达则兼济天下,穷则独善其身"});
