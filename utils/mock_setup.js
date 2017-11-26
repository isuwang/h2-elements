(function (global) {
  
  const mockSearchParam = window.location.search.replace("?", "").split("&").map(part => part.split("="))
    .reduce((tmp, [key, value]) => Object.assign(tmp, {[key]: value}), {});
  
  const mockDataSrc = mockSearchParam["mock"];
  
  global.__mockEnabled = !!mockDataSrc;
  
  if (mockDataSrc) {
    // instance MockDataPool
    const MockDataPool = (function () {
      const mockDatas = {};
      
      const calHash = function (method, url, headersArr) {
        const headersHash = headersArr.sort()
          .map(([headerKey, headerVal]) => `${headerKey}:${headerVal}`).join(";");
        return `[${method}]${url}##${headersHash}`.toLowerCase();
      };
      
      return {
        /**
         *
         * @param {{url:string, method:string, headers:object}}
         * @return {*|response|{type, notify}|Object|Response|null}
         */
        match({url, method, headers = {}} = {}) {
          
          if (typeof headers !== "object") throw new TypeError("headers must be an object");
          
          const headersArr = [];
          
          // make sure headers is an instance of Headers
          if (!Headers.prototype.isPrototypeOf(headers)) {
            headers = new Headers(headers);
          }
          
          for (let h of headers.entries()) {
            headersArr.push(h);
          }
          
          const hash = calHash(method, url, headersArr);
          return mockDatas[hash] && mockDatas[hash].response || null;
        },
        
        /**
         *
         * @param {string} method , http method i.e. GET|POST
         * @param {string} url
         * @return {*}
         */
        when(method, url) {
          // fix url
          const fixedUrl = new URL(url, window.location.href).href;
          const headers = [];
          
          return {
            /**
             *
             * @param {string} key, http header key
             * @param {string} value , http header value
             * @return {MockDataPool}
             */
            withExpectedHeader(key, value) {
              headers.push([key, value]);
              return this;
            },
            /**
             *
             * @param {object|Response} response
             */
            responseWith(response) {
              let hash = calHash(method, fixedUrl, headers);
              mockDatas[hash] = {request: {url: fixedUrl, method, headers}, response};
            }
          };
        }
      }
    })();
    
    window.MockDataPool = MockDataPool;
    // load init data
    document.write(`<script type="module" src="${mockDataSrc}"></script>`);
    document.close();
  }
  
})(window);

