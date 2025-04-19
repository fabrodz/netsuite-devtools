document.addEventListener('DOMContentLoaded', () => {
  const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'default'
  });

  const initCode = `require(['N'], function(N) {
  for(var n in N){window[n] = N[n];};
  try{
      
  console.log(currentRecord.get())

  } catch(e){console.error(e.message);}})`;

  chrome.devtools.inspectedWindow.eval(initCode, (result, exceptionInfo) => {
    if (exceptionInfo && exceptionInfo.value) {
      console.warn('DevConsole bootstrap error:', exceptionInfo.value);
    } else {
      console.log('✅ NetSuite modules exposed to global scope');
    }
  });

  document.getElementById('run').addEventListener('click', () => {
    const code = editor.getValue();
    const wrappedCode = `
    (() => {
      const logs = [];
      const oldLog = console.log;
      console.log = (...args) => { logs.push(args.map(String).join(' ')); oldLog(...args); };
      const result = (function() {
        ${code}
      })();
      return { logs, result };
    })()
    `;

    chrome.devtools.inspectedWindow.eval(wrappedCode, (output, exceptionInfo) => {
      const log = document.getElementById('log');
      if (exceptionInfo && exceptionInfo.value) {
        log.textContent = '❌ ' + exceptionInfo.value;
      } else {
        const logs = output.logs || [];
        const res = output.result;
        const jsonViewer = document.createElement("andypf-json-viewer")
        jsonViewer.id = "json"
        jsonViewer.expanded = 2
        jsonViewer.indent = 2
        jsonViewer.showDataTypes = true
        jsonViewer.theme = "monokai"
        jsonViewer.showToolbar = true
        jsonViewer.showSize = true
        jsonViewer.showCopy = true
        jsonViewer.expandIconType = "square"
        jsonViewer.data = res;
        log.innerHTML = logs.map(l => `📝 ${l}`).join('\n') + `\n✅ Result: ${JSON.stringify(res)}`;
      }
    });
  });

  document.querySelectorAll('#quickbar button').forEach(btn => {
    btn.addEventListener('click', () => {
      const snippet = btn.getAttribute('data-snippet');
      const doc = editor.getDoc();
      const cursor = doc.getCursor();
      doc.replaceRange(snippet + '\n', cursor);
      editor.focus();
    });
  });

});