function sendDataToServer(data) {
  console.log({ data });
  console.log(JSON.stringify(data));
  fetch("https://y5nmucfodk.execute-api.us-east-1.amazonaws.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Include any necessary authentication headers
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
}

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;

      if (tabs[0] && tabs[0].url.includes("beluacode.com")) {
        if (details.url.includes("region")) {
          console.log("GA4:", details.url);
          console.log("GA4:", details.requestBody);
          const detailsToSend = { requestUrl: details.url };
          if (details.method === "POST" && details.requestBody.raw) {
            details.requestBody.raw.forEach((dataElement) => {
              if (dataElement.bytes) {
                let encodedData = new Uint8Array(dataElement.bytes);
                let decodedData = new TextDecoder().decode(encodedData);
                detailsToSend.postData = decodedData;
              }
            });
          }
          // TO SEND TO ACTIVE TAB CONSOLE
          //   chrome.tabs.sendMessage(tabs[0].id, {
          //     type: "logRequest",
          //     data: detailsToSend,
          //   });

          // TO SEND TO DB
          sendDataToServer(detailsToSend);
        }
      }
    });
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);
