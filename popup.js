const $ = (selector) => document.querySelectorAll(selector);

$('.section').forEach(e => {
  if (localStorage[e.id]) {
    const data = JSON.parse(localStorage[e.id]);
    e.children[0].value = Object.keys(data)[0];
    e.children[1].value = Object.values(data)[0];
  }
})

$('body')[0].onclick = e => {
  const parent = e.target.parentNode
  const children = parent.children;
  if (e.target.className === 'redirect') {
    localStorage[parent.id] = JSON.stringify({[children[0].value]: children[1].value});
    const port = chrome.extension.connect({
      name: parent.id
    });
    port.postMessage(localStorage[parent.id]);
  }
};
