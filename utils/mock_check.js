console.log("mock_check");
const mockSearchParam = window.location.search.replace("?", "").split("&").map(part => part.split("="))
  .reduce((tmp, part) => Object.assign(tmp, {[part[0]]: part[1]}), {});

const mockDataSrc = mockSearchParam["mock"];

window.mockEnabled = !!mockDataSrc;

let loaded = false;
if (mockDataSrc && typeof MockDataPool === "undefined") {
  const scriptTag = document.createElement("script");
  scriptTag.type = "text/javascript";
  scriptTag.src = mockDataSrc;
  scriptTag.onload = () => {
    loaded = true;
  };
  document.head.appendChild(scriptTag);
  
}

