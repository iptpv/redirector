let store = {};

chrome.runtime.onInstalled.addListener(() => {
  chrome.webRequest.onBeforeRequest.addListener(
    ({ url }) => {
        var key = Object.keys(store).find(key => url.includes(key));
        if (key) {
          return {
            redirectUrl: url.replace(key, store[key]),
          };
        }
    },
    {
      urls: ["<all_urls>"]
    },
    ["blocking"]
  );

  chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener((message) => {
      const data = JSON.parse(message);
      store = {...store, ...data};
    });
  });
});

