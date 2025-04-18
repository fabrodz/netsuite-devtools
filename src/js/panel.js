console.log("Panel script loaded");
console.error("DEBUG")

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    const isNetSuite = /https:\/\/.*\.netsuite\.com/.test(tab.url);

    if (!isNetSuite) {
      console.log("Not a NetSuite tab ❌");
      document.body.innerHTML = `
        <div style="padding:20px; color: red;">
          ⚠️ This extension works only on NetSuite pages.
        </div>
      `;
    } else {
      console.log("NetSuite tab detected ✅");

      console.log(tab.url);
      
      const code = `
        (function() {
          try {
            if (typeof require !== 'undefined') {
              const currentRecord = require('N/currentRecord');
              const rec = currentRecord.get();
              const id = rec.getValue({ fieldId: 'id' });
              console.log('[✅ Script] Record ID:', id);
            } else {
              console.warn('[❌ Script] require no está definido');
            }
          } catch (e) {
            console.error('[💥 Error]', e);
          }
        })();
      `;

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (scriptCode) => {
          const script = document.createElement('script');
          script.textContent = scriptCode;
          document.documentElement.appendChild(script);
          script.remove(); // limpieza
        },
        args: [code]
      });
      /*
        require(['N'], function(N) {
        for(var n in N){window[n] = N[n];};
        try{
        
        } catch(e){console.error(e.message);}})
      */
    }
  });
});

document.getElementById('tab-playground').addEventListener('click', () => {
  document.getElementById('content-playground').style.display = 'block';
  document.getElementById('content-query').style.display = 'none';
});

document.getElementById('tab-query').addEventListener('click', () => {
  document.getElementById('content-playground').style.display = 'none';
  document.getElementById('content-query').style.display = 'block';
});