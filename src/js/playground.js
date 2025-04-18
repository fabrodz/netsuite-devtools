document.getElementById('run-script').addEventListener('click', () => {
  const code = document.getElementById('script-input').value;
  chrome.scripting.executeScript({
    target: {tabId: chrome.devtools.inspectedWindow.tabId},
    func: (userCode) => {
      try {
        const result = eval(userCode);
        console.log('[SuiteScript Playground]', result);
        alert('Execution result: ' + result);
      } catch (e) {
        alert('Error: ' + e.message);
      }
    },
    args: [code]
  });
});
