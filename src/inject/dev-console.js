(function () {
  if (document.getElementById('ns-dev-console')) return;

  // Inject console panel
  const panel = document.createElement('div');
  panel.id = 'ns-dev-console';
  panel.innerHTML = `
    <style>
      #ns-dev-console {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        background: #1e1e1e;
        color: white;
        font-family: monospace;
        z-index: 9999;
        padding: 10px;
        border: 1px solid #444;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      #ns-dev-console .toolbar {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      #ns-dev-console button {
        background: #007acc;
        color: white;
        border: none;
        padding: 6px 12px;
        cursor: pointer;
        margin-left: 6px;
      }

      #ns-editor {
        width: 100%;
        height: 200px;
        background: #111;
        color: white;
        border: 1px solid #555;
        font-family: monospace;
        font-size: 13px;
        padding: 6px;
      }
      #pageContainer {
        width: 50%;
      }
    </style>
    <div class="toolbar">
      <span><strong>NetSuite Dev Console</strong></span>
      <div>
        <button id="ns-run">Run</button>
        <button id="ns-close">Close</button>
      </div>
    </div>
    <textarea id="ns-editor">// Try: require('N/currentRecord').get()</textarea>
    <div id="output"></div>
  `;
  document.body.appendChild(panel);

  const waitForCodeMirror = () => {
    if (typeof window.CodeMirror !== 'undefined') {
      const editor = CodeMirror.fromTextArea(document.getElementById('ns-editor'), {
        mode: 'javascript',
        lineNumbers: true,
        theme: 'default'
      });

      document.getElementById('ns-run').addEventListener('click', () => {
        try {
          const code = editor.getValue();
          //const result = Function(code)();
          let result;
          quickjsEval.getInstance().then(mod => {
            try {
                const result = mod.eval(code);
                document.getElementById('output').textContent = JSON.stringify(result, null, 2);
            } catch (e) {
                document.getElementById('output').textContent = `Error: ${e.message}`;
            }
          });
          console.log('[✅ Dev Console]', result);
        } catch (e) {
          console.error('[❌ Dev Console]', e);
        }
      });

      document.getElementById('ns-close').addEventListener('click', () => {
        panel.remove();
      });

    } else {
      setTimeout(waitForCodeMirror, 100); // espera y vuelve a intentar
    }
  };

  waitForCodeMirror();
  
})();
