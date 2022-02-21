let store = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.webRequest.onBeforeRequest.addListener(
    ({ url }) => {
        const redirect = store.find(param => param && url.includes(Object.keys(param)[0]));
        if (redirect && Object.keys(redirect)[0]) {
          return {
            redirectUrl: url.replace(Object.keys(redirect)[0], Object.values(redirect)[0]),
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
      store[port.name] = data;
    });
  });
});

