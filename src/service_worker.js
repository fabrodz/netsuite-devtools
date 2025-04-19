chrome.runtime.onInstalled.addListener(() => {
  console.log('NetSuite DevTools extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['libs/codemirror/5.65.13/codemirror.min.css']
  })
  .then(() => {
    console.log('CSS injected');
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [
      'libs/codemirror/5.65.13/codemirror.min.js',
      'libs/codemirror/5.65.13/javascript.min.js',
      'libs/quickEval.js',
      'inject/dev-console.js'
    ]
  })
  .then(injectionResults => {
    for (const {frameId, result} of injectionResults) {
      console.log(`Frame ${frameId} result:`, result);
    }
  });
});