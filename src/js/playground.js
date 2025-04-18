document.addEventListener('DOMContentLoaded', () => {
  const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'default'
  });

  const log = document.getElementById('log');
  const runBtn = document.getElementById('run');

  function getTitle() { 
    console.log(document.title);
    return document.title;
  }

  runBtn.addEventListener('click', () => {
    const code = editor.getValue();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      chrome.scripting
      .executeScript({
        target : {tabId : tab.id},
        func : (userCode) => {
          try {
            const result = new Function(userCode)();
            return result;
          } catch (e) {
            return 'Error: ' + e.message;
          }
        },
        args: [code]
      })
      .then((data) => {
        console.log("injected a function");
        console.log(data);
        log.innerHTML += `[${new Date().toLocaleTimeString()}] ✅ Result: ${data[0].result}<br>`;
      });
    });
  });
});