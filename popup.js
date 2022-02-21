const $ = (selector) => document.querySelectorAll(selector);

$('.section').forEach(e => {
  const data = JSON.parse(localStorage[e.id]);
  e.children[0].value = Object.keys(data)[0];
  e.children[1].value = Object.values(data)[0];
})

$('body')[0].onclick = e => {
  if (e.target.className === 'redirect') {
    const parent = e.target.parentNode
    const children = parent.children;
    localStorage[parent.id] = JSON.stringify({[children[0].value]: children[1].value});
    const port = chrome.extension.connect({
      name: "Sample Communication"
    });
    port.postMessage(localStorage[parent.id]);
  }
};
