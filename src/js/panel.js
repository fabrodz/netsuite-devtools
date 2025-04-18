console.log("Panel script loaded");

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
    }
  });
});