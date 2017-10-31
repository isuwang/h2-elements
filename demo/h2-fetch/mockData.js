let MockDatas = {
  "label decription": {
    request: {
      uri: "http://www.baidu.com | /path/to/ | to/",
      header: {},
      method: "POST"
    },
    
    response: {
      status: "200",
      header: {},
      body: ""
    }
  }
};
const MockDataPool = (function () {
  
  const mockDatas = {};
  
  return {
    match(request) {
      
      
      return {
        status: "404",
        statusText: "NOT FOUND",
        headers: {
          "content-type":"application/json;",
          "content-length":20
        },
        body: JSON.stringify({a:1})
      };
    },
    add() {
    
    }
  }
})();