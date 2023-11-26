console.log("FROM CONTENT");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "logRequest") {
    console.log("HTTP Request:", request.data);
  }
});
