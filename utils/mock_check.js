(function (global) {
  const mockSearchParam = window.location.search.replace("?", "").split("&").map(part => part.split("="))
    .reduce((tmp, part) => Object.assign(tmp, {[part[0]]: part[1]}), {});
  
  const mockDataSrc = mockSearchParam["mock"];
  
  global.__mockEnabled = !!mockDataSrc;
  
  if (mockDataSrc) {
    document.write(`<script type="text/javascript" src="${mockDataSrc}"></script>`)
  }
})(window);

