document.addEventListener("DOMContentLoaded", () => {
  const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "javascript",
    lineNumbers: true,
    theme: "default",
  });

  // Expose NetSuite's `N/*` modules on the inspected window so snippets can
  // call things like `record.load(...)` directly without `require(['N/record'])`.
  const bootstrapCode = `require(['N'], function (N) {
    for (var n in N) { window[n] = N[n]; }
  });`;

  chrome.devtools.inspectedWindow.eval(bootstrapCode, (_, exceptionInfo) => {
    if (exceptionInfo && exceptionInfo.value) {
      console.warn("NetSuite DevTools bootstrap error:", exceptionInfo.value);
    }
  });

  const logEl = document.getElementById("log");

  const renderResult = (logs, result) => {
    logEl.innerHTML = "";

    if (logs && logs.length) {
      const logBlock = document.createElement("pre");
      logBlock.className = "log-output";
      logBlock.textContent = logs.map((l) => `📝 ${l}`).join("\n");
      logEl.appendChild(logBlock);
    }

    if (typeof result !== "undefined") {
      const viewer = document.createElement("andypf-json-viewer");
      viewer.expanded = 2;
      viewer.indent = 2;
      viewer.showDataTypes = true;
      viewer.theme = "monokai";
      viewer.showToolbar = true;
      viewer.showSize = true;
      viewer.showCopy = true;
      viewer.expandIconType = "square";
      viewer.data = result;
      logEl.appendChild(viewer);
    }
  };

  const renderError = (message) => {
    logEl.textContent = `❌ ${message}`;
  };

  document.getElementById("run").addEventListener("click", () => {
    const code = editor.getValue();
    const wrappedCode = `
      (() => {
        const logs = [];
        const oldLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(String).join(' '));
          oldLog(...args);
        };
        try {
          const result = (function () { ${code} })();
          return { logs, result };
        } finally {
          console.log = oldLog;
        }
      })()
    `;

    chrome.devtools.inspectedWindow.eval(
      wrappedCode,
      (output, exceptionInfo) => {
        if (exceptionInfo && exceptionInfo.value) {
          renderError(exceptionInfo.value);
          return;
        }
        renderResult(output.logs || [], output.result);
      },
    );
  });

  document.querySelectorAll("#quickbar button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const snippet = btn.getAttribute("data-snippet");
      const doc = editor.getDoc();
      doc.replaceRange(snippet + "\n", doc.getCursor());
      editor.focus();
    });
  });
});
